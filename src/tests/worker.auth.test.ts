import { describe, it, expect } from 'vitest';
import { mobileToSyntheticEmail } from '../worker/auth';
import { checkRateLimit, json, handleOptions } from '../worker/middleware';
import worker from '../worker/index';

describe('Phase 2: Worker Identity, Single Active Session & API Security Verification', () => {
  it('1. mobileToSyntheticEmail correctly maps 10-digit Indian numbers to synthetic identity', () => {
    expect(mobileToSyntheticEmail('9876543210')).toBe('9876543210@student.learningpoint.in');
    // Strips spaces, country code, and dashes, extracting canonical 10-digit mobile
    expect(mobileToSyntheticEmail('+91 98765-43210')).toBe('9876543210@student.learningpoint.in');
    expect(mobileToSyntheticEmail('091-9876543210')).toBe('9876543210@student.learningpoint.in');
  });

  it('2. Rate limiter protects endpoints against brute-force abuse', () => {
    const testIp = 'test_ip_' + Math.random().toString(36).substring(2);
    // 3 requests allowed with limit of 3
    expect(checkRateLimit(testIp, 3, 10000)).toBe(true);
    expect(checkRateLimit(testIp, 3, 10000)).toBe(true);
    expect(checkRateLimit(testIp, 3, 10000)).toBe(true);
    // 4th request must be rejected
    expect(checkRateLimit(testIp, 3, 10000)).toBe(false);
  });

  it('3. Worker handles CORS OPTIONS preflight correctly', async () => {
    const req = new Request('https://agri-learning-point.workers.dev/api/auth/login', {
      method: 'OPTIONS',
    });
    const env: any = { ASSETS: { fetch: async () => new Response() } };
    const res = await worker.fetch(req, env, {} as any);

    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST');
  });

  it('4. GET /api/health returns healthy gateway status', async () => {
    const req = new Request('https://agri-learning-point.workers.dev/api/health', {
      method: 'GET',
    });
    const env: any = {
      ASSETS: { fetch: async () => new Response() },
      SUPABASE_URL: 'https://zsgcfdclajsctnoumdfi.supabase.co',
      TURSO_DATABASE_URL: 'libsql://test.turso.io',
    };
    const res = await worker.fetch(req, env, {} as any);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body.platform).toBe('Learning Point API Gateway');
    expect(body.supabaseConfigured).toBe(true);
    expect(body.tursoConfigured).toBe(true);
  });

  it('5. Unknown API route returns structured 404 JSON', async () => {
    const req = new Request('https://agri-learning-point.workers.dev/api/nonexistent-route', {
      method: 'GET',
    });
    const env: any = { ASSETS: { fetch: async () => new Response() } };
    const res = await worker.fetch(req, env, {} as any);

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe('NOT_FOUND');
  });

  it('6. Registration validation rejects invalid phone numbers and short passwords', async () => {
    // 1. Phone too short
    const shortPhoneReq = new Request('https://agri-learning-point.workers.dev/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Aspirant', phone: '123', targetExam: 'IBPS AFO', password: 'password123' }),
    });
    const env: any = { SUPABASE_URL: 'https://test.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'test' };
    const res1 = await worker.fetch(shortPhoneReq, env, {} as any);
    expect(res1.status).toBe(400);
    const body1 = await res1.json();
    expect(body1.error).toBe('INVALID_PHONE');

    // 2. Password too short
    const shortPassReq = new Request('https://agri-learning-point.workers.dev/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Aspirant', phone: '9876543210', targetExam: 'IBPS AFO', password: '123' }),
    });
    const res2 = await worker.fetch(shortPassReq, env, {} as any);
    expect(res2.status).toBe(400);
    const body2 = await res2.json();
    expect(body2.error).toBe('WEAK_PASSWORD');
  });

  it('7. Login validation rejects invalid credentials and malformed payloads', async () => {
    const invalidPhoneReq = new Request('https://agri-learning-point.workers.dev/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '987', password: 'password123' }),
    });
    const env: any = { SUPABASE_URL: 'https://test.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'test' };
    const res = await worker.fetch(invalidPhoneReq, env, {} as any);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('INVALID_PHONE');
  });

  it('8. Session verification rejects requests with no token', async () => {
    const noTokenReq = new Request('https://agri-learning-point.workers.dev/api/auth/session', {
      method: 'GET',
    });
    const env: any = { SUPABASE_URL: 'https://test.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'test' };
    const res = await worker.fetch(noTokenReq, env, {} as any);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe('NO_TOKEN');
  });
});
