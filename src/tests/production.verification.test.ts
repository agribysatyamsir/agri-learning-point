import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { handleStartExam } from '../worker/exam';
import { checkRateLimit } from '../worker/middleware';
import { WorkerEnv } from '../worker/types';

describe('Production Readiness, SEO & Security Verification', () => {
  describe('SEO & Canonical Domain Integrity', () => {
    it('verifies index.html has canonical URL, OG tags, and structured JSON-LD', () => {
      const htmlPath = path.resolve(process.cwd(), 'index.html');
      const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

      expect(htmlContent).toContain('https://agri-learning-point.agribysatyamsir.workers.dev/');
      expect(htmlContent).toContain('rel="canonical"');
      expect(htmlContent).toContain('property="og:image"');
      expect(htmlContent).toContain('application/ld+json');
      expect(htmlContent).toContain('EducationalOrganization');
    });

    it('verifies robots.txt disallows sensitive routes and references correct sitemap', () => {
      const robotsPath = path.resolve(process.cwd(), 'public/robots.txt');
      const robotsContent = fs.readFileSync(robotsPath, 'utf-8');

      expect(robotsContent).toContain('Disallow: /admin');
      expect(robotsContent).toContain('Disallow: /dashboard');
      expect(robotsContent).toContain('Disallow: /exam/');
      expect(robotsContent).toContain('https://agri-learning-point.agribysatyamsir.workers.dev/sitemap.xml');
    });

    it('verifies sitemap.xml contains official production URLs', () => {
      const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

      expect(sitemapContent).toContain('<loc>https://agri-learning-point.agribysatyamsir.workers.dev/</loc>');
      expect(sitemapContent).toContain('<loc>https://agri-learning-point.agribysatyamsir.workers.dev/exams</loc>');
      expect(sitemapContent).toContain('<loc>https://agri-learning-point.agribysatyamsir.workers.dev/courses</loc>');
    });
  });

  describe('Zero-Leak CBT Security Standard', () => {
    it('ensures /api/exam/start response strips all answer keys and explanations', async () => {
      const mockEnv: WorkerEnv = {
        APP_ENV: 'test',
        ADMIN_SHARED_SECRET: 'test-secret',
      };

      const req = new Request('https://test.workers.dev/api/exam/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testId: 'test-1' }),
      });

      const res = await handleStartExam(req, mockEnv);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.attemptId).toBeDefined();
      expect(data.questions.length).toBeGreaterThan(0);

      // Verify ZERO leak in candidate questions
      for (const q of data.questions) {
        expect((q as any).correctOptionId).toBeUndefined();
        expect((q as any).explanation).toBeUndefined();
        expect(q.options.length).toBeGreaterThanOrEqual(4);
      }
    });
  });

  describe('Rate Limiter & Anti-Spam Security', () => {
    it('allows normal burst requests and throttles excessive requests', () => {
      const testKey = 'test_ip_rate_limit_' + Date.now();
      
      // First 5 requests should pass
      for (let i = 0; i < 5; i++) {
        expect(checkRateLimit(testKey, 5, 10000)).toBe(true);
      }

      // 6th request must be throttled
      expect(checkRateLimit(testKey, 5, 10000)).toBe(false);
    });
  });
});
