/**
 * Learning Point — Cloudflare Edge Worker API Gateway & Static Assets Server
 * 
 * Intercepts /api/* requests for server-authoritative authentication, exam operations,
 * payment verifications, and AI generation with shielded backend secrets.
 * All other routes fall through to the Vite SPA single-page application.
 */

import { WorkerEnv } from './types';
import { json, handleOptions } from './middleware';
import { handleRegister, handleLogin, handleVerifySession, handleLogout } from './auth';

export default {
  async fetch(request: Request, env: WorkerEnv, _ctx?: any): Promise<Response> {
    const url = new URL(request.url);

    // 1. Handle Preflight CORS for API routes
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    // 2. Intercept API routes
    if (url.pathname.startsWith('/api/')) {
      // Health Check
      if (url.pathname === '/api/health' && request.method === 'GET') {
        return json({
          status: 'ok',
          platform: 'Learning Point API Gateway',
          version: '1.0.0',
          edgeRegion: request.headers.get('cf-ipcountry') || 'IN',
          timestamp: new Date().toISOString(),
          supabaseConfigured: Boolean(env.SUPABASE_URL),
          tursoConfigured: Boolean(env.TURSO_DATABASE_URL),
        });
      }

      // Auth Routes
      if (url.pathname === '/api/auth/register' && request.method === 'POST') {
        return handleRegister(request, env);
      }

      if (url.pathname === '/api/auth/login' && request.method === 'POST') {
        return handleLogin(request, env);
      }

      if (url.pathname === '/api/auth/session' && request.method === 'GET') {
        return handleVerifySession(request, env);
      }

      if (url.pathname === '/api/auth/logout' && request.method === 'POST') {
        return handleLogout(request, env);
      }

      return json({ error: 'NOT_FOUND', message: `API route ${url.pathname} not found.` }, 404);
    }

    // 3. Fallthrough: Serve static Vite SPA assets via Cloudflare Assets binding
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Learning Point Edge Engine Online', { status: 200 });
  },
};
