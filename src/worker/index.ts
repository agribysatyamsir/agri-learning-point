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
import { handleStartExam, handleSyncExam, handleSubmitExam, handleGetExamResult } from './exam';
import { addMasterQuestions } from './examData';
import { handleAIApi } from './ai/jobs';
import { handleCreateOrder, handleVerifyPayment, handleRazorpayWebhook, handleGetStudentEnrollments } from './payments';

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

      // Examination CBT Routes
      if (url.pathname === '/api/exam/start' && request.method === 'POST') {
        return handleStartExam(request, env);
      }

      if (url.pathname === '/api/exam/sync' && request.method === 'POST') {
        return handleSyncExam(request, env);
      }

      if (url.pathname === '/api/exam/submit' && request.method === 'POST') {
        return handleSubmitExam(request, env);
      }

      if (url.pathname.startsWith('/api/exam/result/') && request.method === 'GET') {
        return handleGetExamResult(request, env);
      }

      // AI Question Factory Admin Routes
      if (url.pathname.startsWith('/api/admin/ai/')) {
        return handleAIApi(request, env);
      }

      // Master Question Bank Ingestion Route
      if (url.pathname === '/api/admin/questions/import' && request.method === 'POST') {
        let body: any = {};
        try {
          body = await request.json();
        } catch {
          return json({ error: 'INVALID_JSON', message: 'Invalid payload.' }, 400);
        }
        const questions = Array.isArray(body.questions) ? body.questions : [];
        const mappedQuestions = questions.map((q: any, i: number) => ({
          id: q.id || `q_imp_${Date.now()}_${i}`,
          testId: q.testId || 'test-1',
          subject: q.subject || 'Agriculture General',
          topic: q.topic || 'Core Subject',
          statement: q.statement || '',
          options: q.options || [
            { id: 'opt-1', text: q.optionA || 'Option A' },
            { id: 'opt-2', text: q.optionB || 'Option B' },
            { id: 'opt-3', text: q.optionC || 'Option C' },
            { id: 'opt-4', text: q.optionD || 'Option D' },
          ],
          correctOptionId: q.correctOptionId || (q.correctAnswer === 'B' ? 'opt-2' : q.correctAnswer === 'C' ? 'opt-3' : q.correctAnswer === 'D' ? 'opt-4' : 'opt-1'),
          explanation: q.explanation || 'Detailed explanation verified by subject matter reviewer.',
          difficulty: q.difficulty || 'medium',
        }));
        const count = addMasterQuestions(mappedQuestions);
        return json({ success: true, message: `Successfully imported ${count} questions to question bank.`, count });
      }

      // Payments & Course Entitlements Routes
      if (url.pathname === '/api/payments/create-order' && request.method === 'POST') {
        return handleCreateOrder(request, env);
      }

      if (url.pathname === '/api/payments/verify' && request.method === 'POST') {
        return handleVerifyPayment(request, env);
      }

      if (url.pathname === '/api/payments/enrollments' && request.method === 'GET') {
        return handleGetStudentEnrollments(request, env);
      }

      if (url.pathname === '/api/webhooks/razorpay' && request.method === 'POST') {
        return handleRazorpayWebhook(request, env);
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
