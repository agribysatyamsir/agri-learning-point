/**
 * Learning Point — Server-Authoritative Identity & Single Active Session Controller
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WorkerEnv } from './types';
import { json, checkRateLimit } from './middleware';

export function mobileToSyntheticEmail(phone: string): string {
  const digits = phone.trim().replace(/\D/g, '');
  const cleanPhone = digits.length >= 10 ? digits.slice(-10) : digits;
  return `${cleanPhone}@student.learningpoint.in`;
}

export function getSupabase(env: WorkerEnv): SupabaseClient | null {
  const url = env.SUPABASE_URL || 'https://zsgcfdclajsctnoumdfi.supabase.co';
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_PUBLISHABLE_KEY;
  if (!key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Student Registration Handler
 * Maps 10-digit mobile to internal synthetic identity and provisions profile & session.
 */
export async function handleRegister(request: Request, env: WorkerEnv): Promise<Response> {
  const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
  if (!checkRateLimit(`reg_${clientIp}`, 5, 60000)) {
    return json({ error: 'RATE_LIMIT_EXCEEDED', message: 'Too many registration attempts. Please wait 1 minute.' }, 429);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'INVALID_JSON', message: 'Invalid JSON payload.' }, 400);
  }

  const { fullName, phone, targetExam, password } = body;

  const cleanPhone = (phone || '').trim().replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return json({ error: 'INVALID_PHONE', message: 'Please provide a valid 10-digit Indian mobile number.' }, 400);
  }

  if (!password || password.length < 6) {
    return json({ error: 'WEAK_PASSWORD', message: 'Password must be at least 6 characters.' }, 400);
  }

  if (!fullName || fullName.trim().length < 2) {
    return json({ error: 'INVALID_NAME', message: 'Please provide your full name.' }, 400);
  }

  const syntheticEmail = mobileToSyntheticEmail(cleanPhone);
  const supabase = getSupabase(env);

  if (!supabase) {
    return json({ error: 'CONFIG_ERROR', message: 'Identity service configuration missing.' }, 500);
  }

  try {
    let userId: string;

    // Check if user already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone', cleanPhone)
      .maybeSingle();

    if (existingProfile) {
      return json({ error: 'USER_EXISTS', message: 'An account with this mobile number already exists. Please sign in.' }, 409);
    }

    // Try creating user via Admin API if service key exists, else fallback to signUp
    if (env.SUPABASE_SECRET_KEY) {
      const { data: authUser, error: authErr } = await supabase.auth.admin.createUser({
        email: syntheticEmail,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName.trim(), phone: cleanPhone },
      });

      if (authErr) {
        return json({ error: 'AUTH_ERROR', message: authErr.message }, 400);
      }
      userId = authUser.user.id;
    } else {
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email: syntheticEmail,
        password,
      });

      if (authErr || !authData.user) {
        return json({ error: 'AUTH_ERROR', message: authErr?.message || 'Failed to create student account.' }, 400);
      }
      userId = authData.user.id;
    }

    // Provision Profile in public.profiles
    await supabase.from('profiles').upsert({
      id: userId,
      phone: cleanPhone,
      full_name: fullName.trim(),
      target_exam: targetExam || 'IBPS AFO',
      updated_at: new Date().toISOString(),
    });

    // Enforce Single Active Session
    const sessionToken = 'lp_' + crypto.randomUUID().replace(/-/g, '') + '_' + Date.now().toString(36);

    // Invalidate any historical sessions
    await supabase
      .from('active_sessions')
      .update({ is_active: false })
      .eq('user_id', userId);

    // Insert new authoritative active session
    await supabase.from('active_sessions').insert({
      user_id: userId,
      session_token: sessionToken,
      device_info: request.headers.get('user-agent') || 'Browser Client',
      ip_address: clientIp,
      is_active: true,
      last_seen_at: new Date().toISOString(),
    });

    return json({
      success: true,
      sessionToken,
      user: {
        id: userId,
        phone: cleanPhone,
        fullName: fullName.trim(),
        targetExam: targetExam || 'IBPS AFO',
        role: 'student',
      },
    }, 201);
  } catch (err: any) {
    return json({ error: 'SERVER_ERROR', message: err.message || 'Internal registration failure.' }, 500);
  }
}

/**
 * Student Login Handler
 * Enforces server-side Single Active Session: invalidates any prior device tokens.
 */
export async function handleLogin(request: Request, env: WorkerEnv): Promise<Response> {
  const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
  if (!checkRateLimit(`login_${clientIp}`, 10, 60000)) {
    return json({ error: 'RATE_LIMIT_EXCEEDED', message: 'Too many login attempts. Please wait 1 minute.' }, 429);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'INVALID_JSON', message: 'Invalid JSON payload.' }, 400);
  }

  const { phone, password } = body;
  const cleanPhone = (phone || '').trim().replace(/\D/g, '');

  if (cleanPhone.length !== 10) {
    return json({ error: 'INVALID_PHONE', message: 'Please enter a valid 10-digit Indian mobile number.' }, 400);
  }

  if (!password || password.length < 6) {
    return json({ error: 'INVALID_CREDENTIALS', message: 'Invalid mobile number or password.' }, 400);
  }

  const syntheticEmail = mobileToSyntheticEmail(cleanPhone);
  const supabase = getSupabase(env);

  if (!supabase) {
    return json({ error: 'CONFIG_ERROR', message: 'Identity service configuration missing.' }, 500);
  }

  try {
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
      email: syntheticEmail,
      password,
    });

    if (authErr || !authData.user) {
      return json({ error: 'INVALID_CREDENTIALS', message: 'Invalid mobile number or password.' }, 401);
    }

    const userId = authData.user.id;

    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, target_exam')
      .eq('id', userId)
      .maybeSingle();

    // Check staff role
    const { data: staffRole } = await supabase
      .from('staff_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    // SINGLE ACTIVE SESSION RULE:
    // Revoke all previous active sessions on any other device
    await supabase
      .from('active_sessions')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('is_active', true);

    // Create fresh cryptographic session token
    const sessionToken = 'lp_' + crypto.randomUUID().replace(/-/g, '') + '_' + Date.now().toString(36);

    await supabase.from('active_sessions').insert({
      user_id: userId,
      session_token: sessionToken,
      device_info: request.headers.get('user-agent') || 'Browser Client',
      ip_address: clientIp,
      is_active: true,
      last_seen_at: new Date().toISOString(),
    });

    return json({
      success: true,
      sessionToken,
      user: {
        id: userId,
        phone: cleanPhone,
        fullName: profile?.full_name || 'Aspirant',
        targetExam: profile?.target_exam || 'IBPS AFO',
        role: staffRole?.role || 'student',
      },
    });
  } catch (err: any) {
    return json({ error: 'SERVER_ERROR', message: err.message || 'Authentication error.' }, 500);
  }
}

/**
 * Active Session Verification Handler
 * Checks if the caller's session token is still active in public.active_sessions.
 * Returns HTTP 401 if revoked by another concurrent login.
 */
export async function handleVerifySession(request: Request, env: WorkerEnv): Promise<Response> {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token) {
    return json({ valid: false, error: 'NO_TOKEN', message: 'No authorization token provided.' }, 401);
  }

  const supabase = getSupabase(env);
  if (!supabase) {
    return json({ valid: false, error: 'CONFIG_ERROR', message: 'Database unconfigured.' }, 500);
  }

  try {
    const { data: session, error } = await supabase
      .from('active_sessions')
      .select('id, user_id, is_active, last_seen_at')
      .eq('session_token', token)
      .maybeSingle();

    if (error || !session) {
      return json({ valid: false, error: 'INVALID_SESSION', message: 'Session does not exist.' }, 401);
    }

    if (!session.is_active) {
      return json({
        valid: false,
        error: 'SESSION_REVOKED_CONCURRENT_LOGIN',
        message: 'Your account was signed in from another device. For examination security, only one active session is allowed.',
      }, 401);
    }

    // Touch last_seen_at
    await supabase
      .from('active_sessions')
      .update({ last_seen_at: new Date().toISOString() })
      .eq('id', session.id);

    // Fetch profile and roles
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, phone, target_exam')
      .eq('id', session.user_id)
      .maybeSingle();

    const { data: staffRole } = await supabase
      .from('staff_roles')
      .select('role')
      .eq('user_id', session.user_id)
      .maybeSingle();

    return json({
      valid: true,
      user: {
        id: session.user_id,
        phone: profile?.phone || '',
        fullName: profile?.full_name || 'Aspirant',
        targetExam: profile?.target_exam || 'IBPS AFO',
        role: staffRole?.role || 'student',
      },
    });
  } catch (err: any) {
    return json({ valid: false, error: 'VERIFICATION_ERROR', message: err.message }, 500);
  }
}

/**
 * Student Logout Handler
 * Explicitly terminates the active session record in public.active_sessions.
 */
export async function handleLogout(request: Request, env: WorkerEnv): Promise<Response> {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (token) {
    const supabase = getSupabase(env);
    if (supabase) {
      await supabase
        .from('active_sessions')
        .update({ is_active: false })
        .eq('session_token', token);
    }
  }

  return json({ success: true, message: 'Signed out successfully.' });
}
