// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import worker from '../worker/index';
import { saveLocalAttempt, getLocalAttempt, clearLocalAttempt } from '../lib/exam/indexedDb';

describe('Phase 3: CBT Examination Security, Answer Key Shielding & Server-Authoritative Scoring', () => {
  it('1. POST /api/exam/start STRICTLY OMITS correctOptionId and explanation from client payload', async () => {
    const req = new Request('https://agri-learning-point.workers.dev/api/exam/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testId: 'test-1', durationMinutes: 45 }),
    });
    const env: any = { ASSETS: { fetch: async () => new Response() } };
    const res = await worker.fetch(req, env, {} as any);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.attemptId).toBeDefined();
    expect(body.startedAt).toBeDefined();
    expect(body.expiresAt).toBeDefined();
    expect(body.questions.length).toBeGreaterThan(0);

    // CRITICAL SECURITY ASSERTION (P0-01):
    // Zero answer indicators or explanations can be present in the questions returned to the candidate
    body.questions.forEach((q: any) => {
      expect(q.correctOptionId).toBeUndefined();
      expect(q.explanation).toBeUndefined();
      expect(q.isCorrect).toBeUndefined();
      expect(q.statement).toBeDefined();
      expect(q.options.length).toBeGreaterThanOrEqual(4);
      q.options.forEach((opt: any) => {
        expect(opt.id).toBeDefined();
        expect(opt.text).toBeDefined();
        expect(opt.isCorrect).toBeUndefined();
      });
    });
  });

  it('2. POST /api/exam/submit computes server-authoritative score with -0.25 negative marking', async () => {
    // Start attempt to get sanitized questions
    const startReq = new Request('https://agri-learning-point.workers.dev/api/exam/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testId: 'test-1' }),
    });
    const env: any = { ASSETS: { fetch: async () => new Response() } };
    const startRes = await worker.fetch(startReq, env, {} as any);
    const startBody = await startRes.json();
    const attemptId = startBody.attemptId;

    // Simulate student submission:
    // Q1: Rhizobium leguminosarum ('opt-2') -> Correct (+1.0)
    // Q2: 1.5% ('opt-1') instead of 2.0% ('opt-2') -> Wrong (-0.25)
    // Q3: unattempted (0.0)
    const submitReq = new Request('https://agri-learning-point.workers.dev/api/exam/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attemptId,
        responses: {
          'q-1': 'opt-2',
          'q-2': 'opt-1',
        },
      }),
    });

    const submitRes = await worker.fetch(submitReq, env, {} as any);
    expect(submitRes.status).toBe(200);
    const submitBody = await submitRes.json();

    expect(submitBody.success).toBe(true);
    expect(submitBody.summary.correctCount).toBe(1);
    expect(submitBody.summary.wrongCount).toBe(1);
    expect(submitBody.summary.positiveMarks).toBe(1.0);
    expect(submitBody.summary.negativeMarks).toBe(0.25);
    expect(submitBody.summary.finalScore).toBe(0.75); // 1.0 - 0.25 = 0.75

    // Verified solutions & explanations are unlocked ONLY post-submission
    expect(submitBody.solutions.length).toBeGreaterThan(0);
    expect(submitBody.solutions[0].explanation).toBeDefined();
    expect(submitBody.solutions[0].correctOptionId).toBeDefined();
  });

  it('3. POST /api/exam/sync accepts and saves batched student responses', async () => {
    const syncReq = new Request('https://agri-learning-point.workers.dev/api/exam/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attemptId: 'att_sync_test_01',
        responses: { 'q-1': 'opt-2', 'q-2': 'opt-2' },
      }),
    });
    const env: any = { ASSETS: { fetch: async () => new Response() } };
    const syncRes = await worker.fetch(syncReq, env, {} as any);

    expect(syncRes.status).toBe(200);
    const body = await syncRes.json();
    expect(body.success).toBe(true);
    expect(body.syncedAt).toBeDefined();
  });

  it('4. GET /api/exam/result/:attemptId retrieves score and verified explanations', async () => {
    const resReq = new Request('https://agri-learning-point.workers.dev/api/exam/result/att_test_123', {
      method: 'GET',
    });
    const env: any = { ASSETS: { fetch: async () => new Response() } };
    const res = await worker.fetch(resReq, env, {} as any);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.solutions.length).toBeGreaterThan(0);
    expect(body.summary.finalScore).toBeDefined();
  });

  it('5. Client local attempt buffer persists and restores responses safely', async () => {
    const testState = {
      attemptId: 'att_local_test_99',
      testId: 'test-1',
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      responses: { 'q-1': 'opt-2', 'q-5': 'opt-1' },
      markedForReview: { 'q-2': true },
      lastSavedAt: new Date().toISOString(),
    };

    await saveLocalAttempt(testState);
    const restored = await getLocalAttempt('att_local_test_99');

    expect(restored).not.toBeNull();
    expect(restored?.attemptId).toBe('att_local_test_99');
    expect(restored?.responses['q-1']).toBe('opt-2');
    expect(restored?.markedForReview['q-2']).toBe(true);

    await clearLocalAttempt('att_local_test_99');
    const cleared = await getLocalAttempt('att_local_test_99');
    expect(cleared).toBeNull();
  });
});
