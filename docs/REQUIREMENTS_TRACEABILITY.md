# Learning Point — Requirements Traceability Matrix (RTM)

This document maps all core requirements from the Master Implementation Specification to system modules, routes, databases, and test verification gates.

| ID | Category | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|---|
| **REQ-01** | Branding & Design | Product Name "Learning Point" used consistently; Deep Navy/Slate + Emerald + Gold palette | `src/styles/`, `src/components/common/Header.tsx`, `tailwind.config.ts` | Visual inspection, CSS token audit | Planned (Phase 1) |
| **REQ-02** | Branding & Design | Authentic logo assets (`logo.png`, `watermark_logo.png`) utilized without artificial stock distortion | `public/assets/branding/` | Asset inspection, image rendering tests | In Place |
| **REQ-03** | Public Web | All 16 public routes accessible without login (`/`, `/exams`, `/courses`, `/test-series`, `/free-tests`, policies, etc.) | `src/app/(public)/` routes | E2E route navigation test without cookies | Planned (Phase 2) |
| **REQ-04** | UI/UX | Subtle 3D card tilt & touch depth effects, reduced-motion compliance | `src/components/ui/Card3D.tsx`, `src/styles/effects.css` | Playwright interaction test + `@media (prefers-reduced-motion)` check | Planned (Phase 2) |
| **REQ-05** | UI/UX | Responsive across 320px, 390px, 768px, 1280px, 1920px viewports without horizontal scroll | Responsive CSS layouts | Automated Playwright viewport matrix | Planned (Phase 2) |
| **REQ-06** | UI/UX | WCAG 2.2 AA accessibility (semantic markup, contrast, keyboard traps, focus rings) | Shared component library | Axe-core automated accessibility tests | Planned (Phase 2) |
| **REQ-07** | Auth | Mobile number + password authentication with identity mapping | `/api/auth/login`, `/api/auth/register`, Supabase Auth | Unit + API integration tests with test mobile numbers | Planned (Phase 3) |
| **REQ-08** | Auth | Single active login enforcement (new login invalidates previous sessions) | `active_sessions` table, auth middleware | Multi-session concurrency test (Session A kicked by Session B) | Planned (Phase 3) |
| **REQ-09** | Security | Row-Level Security (RLS) & server authorization prevents IDOR across student data | Supabase RLS policies + API validation | Unauthorized cross-user data access security tests | Planned (Phase 3) |
| **REQ-10** | Courses | Course catalog, batch management, duration & fixed-date validity rules | `courses`, `batches`, `enrollments` tables, `/courses` | Unit tests for validity calculation and expiry | Planned (Phase 4) |
| **REQ-11** | Question Bank | Master Agriculture Question Bank with Google Sheets / CSV idempotent importer | `questions`, `question_sources`, `/api/admin/questions/import` | Import 500 rows, test idempotency & source row tracking | Planned (Phase 5) |
| **REQ-12** | Question Bank | Exact and semantic duplicate detection | `src/lib/questions/dedup.ts` (hash + Jaccard / embedding) | Unit tests with identical and paraphrased questions | Planned (Phase 5) |
| **REQ-13** | AI Factory | Modular AI provider router (Gemini, Groq, OpenAI) with persistent job queue & pause/resume | `ai_jobs` table, `src/lib/ai/router.ts` | Mock provider quota exhaust test & resume verification | Planned (Phase 6) |
| **REQ-14** | AI Factory | Exam question distribution: Agriculture (40% Master Bank, 60% AI); Non-Agri (100% AI) | `paper_blueprints` generator logic | Formulaic unit tests on 50, 100, and 125 question papers | Planned (Phase 6) |
| **REQ-15** | AI Factory | Multi-stage verification: distractor sanity, answer check, pre-stored explanations | `src/lib/ai/validator.ts` | Multi-step prompt validation pipeline tests | Planned (Phase 6) |
| **REQ-16** | AI Factory | No direct student AI chat and zero live AI calls during examination | Architecture barrier | Automated security scan for client-facing AI endpoints | Planned (Phase 6) |
| **REQ-17** | Test Engine | Server-authoritative timer derived from `expires_at` (immune to client clock changes) | `src/components/exam/ExamTimer.tsx`, `/api/exam/submit` | Client clock manipulation simulation test | Planned (Phase 7) |
| **REQ-18** | Test Engine | IndexedDB autosave + 120s batched server sync with jitter | `src/lib/exam/indexeddb.ts`, `/api/exam/sync` | Offline disconnect, reconnect, and refresh tests | Planned (Phase 7) |
| **REQ-19** | Test Engine | Server-side scoring with -0.25 negative marking; answer key withheld until post-submit | `/api/exam/submit` | Scoring calculation unit tests with all permutations | Planned (Phase 7) |
| **REQ-20** | Test Engine | Safe option shuffling (stable option UUIDs independent of display indices) | `src/lib/exam/shuffler.ts` | Test answer score correctness under all 24 option permutations | Planned (Phase 7) |
| **REQ-21** | Test Engine | 1st attempt ranked + 5 practice reattempts tracked server-side | `attempts` table, attempt counter logic | Reattempt limit boundary tests (6 attempts total allowed) | Planned (Phase 7) |
| **REQ-22** | Test Engine | Results breakdown, question report workflow, and explanations view | `/exam/results/[attemptId]`, `question_reports` table | End-to-end attempt to review verification | Planned (Phase 7) |
| **REQ-23** | Payments | Razorpay test integration, HMAC SHA-256 signature verification, webhook processing | `/api/payments/create-order`, `/api/webhooks/razorpay` | Webhook replay and forged signature security tests | Planned (Phase 8) |
| **REQ-24** | Payments | Idempotent course entitlement activation upon verified capture only | `payment_orders`, `enrollments` transaction | Duplicate webhook delivery stress test | Planned (Phase 8) |
| **REQ-25** | Admin Portal | Role-Based Access Control (Admin, Reviewer, etc.) + TOTP Multi-Factor Authentication | `/admin/`, TOTP verification middleware | RBAC boundary testing & MFA prompt verification | Planned (Phase 9) |
| **REQ-26** | Admin Portal | AI Control Center: provider health, job state, tokens, latency, quality audit | `/admin/ai-control` | Admin dashboard verification | Planned (Phase 9) |
| **REQ-27** | Admin Copilot | Contextual admin assistant with intent detection, risk tier, preview & confirmation gate | `src/lib/admin/copilot.ts` | Attempt privileged action without human approval test | Planned (Phase 9) |
| **REQ-28** | Operations | Weekly automated backup (AES-256-GCM + Google Drive) + verifiable restore procedure | `scripts/backup/run-backup.ts` | End-to-end backup snapshot, encryption, and restore test | Planned (Phase 10) |
| **REQ-29** | Performance | Sub-second sync p95, under 3s submission p95 for 1,000 concurrent students | Performance optimization & load testing scripts | Load test simulation with k6 / Artillery benchmark | Planned (Phase 10) |
| **REQ-30** | Release | Full acceptance checklist verified with automated tests passing | Release gate runner | Automated test report verification | Planned (Phase 10) |
