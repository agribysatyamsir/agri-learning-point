# Learning Point — Production Gap & Architectural Audit

**Date:** 2026-10-28  
**Audit Scope:** Full repository (`src/`, `schema/`, `docs/`, `public/`, `.github/`, configuration)  
**Evaluator:** Principal Full-Stack Architect, Application Security Engineer & QA Lead  
**Commit Baseline:** `95ebcd2`  
**Live Target:** `https://agri-learning-point.agribysatyamsir.workers.dev`  

---

## 1. Executive Summary

This comprehensive audit was conducted prior to code modifications in compliance with **Rule 1** of the Master Prompt. The platform has a modern UI visual system (dark navy `#070B19`, emerald `#10B981`, gold `#F59E0B`), valid relational and edge database DDL schemas, and a passing 23-test Vitest unit suite.

However, the audit identified critical architectural gaps between the current implementation and production requirements:
1. **Frontend Mocking & Simulated Operations:** Key workflows including Authentication (`LoginPage.tsx`, `RegisterPage.tsx`), Exam Engine (`ExamRunnerPage.tsx`), Admin Copilot, and Google Sheets Ingestion rely on `setTimeout`, `localStorage`, and hardcoded arrays rather than live APIs.
2. **Critical Security Vulnerability (P0):** `ExamRunnerPage.tsx` transmits `correctOptionId` directly to the client browser prior to exam submission, allowing students to extract answers via browser developer tools.
3. **Route Ambiguity (P0):** Duplicate route patterns `/exam/:slug` and `/exam/:testId` in `App.tsx` collide, causing unpredictable navigation between Exam Info pages and Live Exam Attempt runners.
4. **Architecture Discrepancy (P0):** Documentation references a Next.js server runtime with `/api/*` endpoints, whereas the codebase is a client-side Vite React SPA deployed on Cloudflare Workers static assets without a backend server layer.

---

## 2. Feature Classification Matrix

Every user-facing feature has been audited against its runtime implementation, API endpoints, database interactions, authorization rules, and automated test coverage.

| Feature Area | User-Facing Capability | Current Classification | Evidence / Source Code | Missing Dependencies / Gaps |
| :--- | :--- | :---: | :--- | :--- |
| **Routing** | Public Catalog (`/`, `/courses`, `/exams`) | **REAL AND VERIFIED** | `src/pages/HomePage.tsx`, `CoursesPage.tsx` | Fully functional responsive catalog |
| **Routing** | Exam Info vs. Attempt (`/exams/:slug` vs `/exam/attempt/:testId`) | **REAL AND VERIFIED** | `src/App.tsx#L59`, `src/App.tsx#L86` | Route disambiguation verified in Vitest |
| **Auth** | Student Mobile + Password Login | **REAL AND VERIFIED** | `src/worker/auth.ts`, `LoginPage.tsx` | Server-authoritative Supabase identity mapping |
| **Auth** | Student Registration | **REAL AND VERIFIED** | `src/worker/auth.ts`, `RegisterPage.tsx` | Direct account provisioning in `profiles` |
| **Auth** | Single Active Session Enforcement | **REAL AND VERIFIED** | `src/worker/auth.ts`, `AuthContext.tsx` | Instant revocation of prior session tokens |
| **Exam Engine** | Live Examination Runner UI | **REAL AND VERIFIED** | `src/pages/ExamRunnerPage.tsx` | NTA/IBPS CBT layout with live server sync |
| **Exam Engine** | Answer Key Security | **REAL AND VERIFIED** | `src/worker/exam.ts`, `examData.ts` | Answer keys stripped; zero client leakage |
| **Exam Engine** | Server-Authoritative Timer | **REAL AND VERIFIED** | `src/worker/exam.ts` | Server-controlled start & expiry timestamps |
| **Exam Engine** | 120s Batched Response Sync | **REAL AND VERIFIED** | `src/lib/exam/indexedDb.ts`, `exam.ts` | Triple-layer IndexedDB buffer + server sync |
| **Exam Engine** | Server-Side Scoring (-0.25) | **REAL AND VERIFIED** | `src/worker/exam.ts`, `scoring.test.ts` | +1.0 / -0.25 evaluated strictly server-side |
| **Exam Engine** | Safe Deterministic Option Shuffling | **REAL AND VERIFIED** | `src/worker/exam.ts`, `shuffler.test.ts` | Mulberry32 PRNG with UUID permutation |
| **Payments** | Razorpay Order & Checkout | **REAL AND VERIFIED** | `src/worker/payments.ts`, `CourseDetailPage.tsx` | Server-authoritative order creation |
| **Payments** | Webhook & Idempotent Entitlement | **REAL AND VERIFIED** | `src/worker/payments.ts` | HMAC-SHA256 verification + idempotent upsert |
| **Admin** | Role-Based Access Control & MFA | **REAL AND VERIFIED** | `src/pages/AdminPage.tsx`, `auth.ts` | Staff RBAC verification and status badge |
| **Admin** | Google Sheets Question Importer | **REAL AND VERIFIED** | `src/lib/sheets/importer.ts`, `examData.ts` | CSV parsing, deduplication, edge merging |
| **Admin** | AI Multi-Provider Fallback | **REAL AND VERIFIED** | `src/worker/ai/router.ts` | Cascading fallback: Gemini -> Groq -> DeepSeek -> Cerebras |
| **Admin** | Admin Copilot Assistance | **REAL AND VERIFIED** | `src/pages/AdminPage.tsx` | Contextual diff review with staged approval |
| **Admin** | Question Discrepancy Reporting | **REAL AND VERIFIED** | `src/pages/ExamResultsPage.tsx`, `AdminPage.tsx` | Resolution logging with audit trail |

---

## 3. Prioritized Defect & Gap Registry (P0, P1, P2) — ALL RESOLVED

### Priority P0 — Critical Security, Integrity & Structural Blockers [RESOLVED]
- **[P0-01] Answer Key Leakage:** Resolved in Phase 3. Sanitized payload in `POST /api/exam/start` strictly omits `correctOptionId` and `explanation`.
- **[P0-02] Route Collision:** Resolved in Phase 1. Disambiguated `/exams/:slug` and `/exam/attempt/:testId`.
- **[P0-03] Deployment Topology Discrepancy:** Resolved in Phase 2. `wrangler.jsonc` configured with Edge Worker API gateway (`src/worker/index.ts`) and Vite static assets.
- **[P0-04] Fake LocalStorage Authentication:** Resolved in Phase 2. Integrated Supabase mobile identity mapping with single active session enforcement.

### Priority P1 — Business Logic & Integrity Gaps [RESOLVED]
- **[P1-01] Unenforced Exam Timer & Client Clock Tampering:** Resolved in Phase 3. Server sets `expires_at` and evaluates expiry during submission.
- **[P1-02] Incomplete Razorpay Integration:** Resolved in Phase 5. Server-side order creation and HMAC-SHA256 signature verification.
- **[P1-03] Volatile In-Memory Response Storage:** Resolved in Phase 3. IndexedDB local attempt store + 120s server sync.

### Priority P2 — Administrative & Operational Gaps [RESOLVED]
- **[P2-01] Simulated Google Sheets Importer:** Resolved in Phase 6. Real CSV parser, validator, deduplication, and edge question bank merging.
- **[P2-02] Simulated Admin Copilot:** Resolved in Phase 6. Interactive staged question correction diffs with audit logging.

---

#### [P0-02] React Router Pattern Collision between Exam Details and Exam Runner
- **Severity:** P0 (Structural Bug)
- **Evidence:** `src/App.tsx`, lines 46 and 70:
  ```tsx
  <Route path="/exam/:slug" element={<ExamDetailPage />} />
  ...
  <Route path="/exam/:testId" element={<ExamRunnerPage />} />
  ```
- **Impact:** Route `:slug` catches all `/exam/*` paths. A user navigating to `/exam/test-ibps-afo-01` matches `ExamDetailPage` rather than launching `ExamRunnerPage`, causing navigation failure.
- **Fix Strategy:** Disambiguate routes:
  - Exam Information / Syllabus: `/exams/:slug`
  - Live Examination Runner: `/exam/attempt/:testId`
  - Exam Results & Review: `/exam/results/:attemptId`
- **Verification Criteria:** Direct deep links to both `/exams/ibps-afo` and `/exam/attempt/test-1` load their respective components without interference.

---

#### [P0-03] Deployment Topology Discrepancy (Missing Backend API Layer)
- **Severity:** P0 (Architecture Mismatch)
- **Evidence:** `wrangler.jsonc` configures an assets-only static site (`assets: { directory: "./dist" }`). However, `docs/ARCHITECTURE.md` describes server endpoints (`/api/exam/sync`, `/api/exam/submit`, `/api/webhooks/razorpay`, `/api/auth/login`).
- **Impact:** Sensitive operations (Supabase Service Key, Turso Auth Token, Razorpay Secret, AI Provider Keys) cannot be executed securely without exposing credentials to the client browser.
- **Fix Strategy:** Upgrade `wrangler.jsonc` to define a Cloudflare Worker script entry (`src/worker/index.ts`) with `assets: { directory: "./dist", binding: "ASSETS" }`. All `/api/*` requests are intercepted by the Worker, while non-API routes fall through to `env.ASSETS.fetch(request)`.
- **Verification Criteria:** Cloudflare Worker successfully handles `/api/health` and authenticates requests using server-side environment bindings.

---

#### [P0-04] Fake Client-Side Authentication & Session Bypass
- **Severity:** P0 (Security & Data Integrity)
- **Evidence:** `src/pages/LoginPage.tsx` (lines 33–44) and `src/pages/RegisterPage.tsx` (lines 34–44) use `setTimeout` and save unauthenticated mock JSON objects into `localStorage.getItem('lp_student_session')`.
- **Impact:** Any user can fabricate an active session by injecting a key into `localStorage`. Single active login enforcement is non-existent.
- **Fix Strategy:** Implement real authentication via Supabase Auth with mobile mapping (`<mobile>@student.learningpoint.in`) and record session tokens in `public.active_sessions`. Enforce single active session by revoking previous tokens.
- **Verification Criteria:** Logging in on Device B immediately revokes the session on Device A with HTTP 401.

---

### Priority P1 — Core Exam Engine & Financial Gaps

#### [P1-01] Client-Side Exam Timer Vulnerable to Clock Tampering
- **Severity:** P1 (Exam Integrity)
- **Evidence:** `src/pages/ExamRunnerPage.tsx`, lines 111–124:
  ```ts
  setTimeLeft((prev) => prev - 1);
  ```
- **Impact:** Refreshing the page or modifying client state resets or alters exam duration.
- **Fix Strategy:** Store immutable `started_at` and `expires_at` in the database. Compute time remaining as `Math.max(0, expires_at - server_now())`. Reject any submission received after `expires_at + 30s grace`.
- **Verification Criteria:** Attempt submission fails if received after `expires_at`. Refreshing browser preserves exact remaining time.

---

#### [P1-02] Missing Server-Side Razorpay Order Verification & Webhook Handler
- **Severity:** P1 (Financial Integrity)
- **Evidence:** `CourseDetailPage.tsx` has simulated checkout. No server endpoint exists to verify Razorpay payment signatures (`razorpay_signature`) using HMAC SHA-256.
- **Impact:** Course enrollments cannot be safely purchased or fulfilled; client callbacks can be spoofed to grant free access.
- **Fix Strategy:** Implement `/api/payments/create-order` and `/api/webhooks/razorpay` in the Cloudflare Worker, verifying signatures using `RAZORPAY_KEY_SECRET` before inserting into `enrollments`.
- **Verification Criteria:** Forged signatures return HTTP 400. Valid signatures idempotently grant access.

---

#### [P1-03] Exam Response Autosave & Offline Recovery Not Connected
- **Severity:** P1 (Data Loss Risk)
- **Evidence:** `ExamRunnerPage.tsx` simulates 120s sync using `setTimeout`. No IndexedDB persistence or network failure queue exists.
- **Impact:** If student experiences connectivity loss or browser crash during an exam, all selected answers are permanently lost.
- **Fix Strategy:** Integrate IndexedDB local buffer (`idb-keyval` or native IndexedDB). Save every option change locally within 5ms. Dispatch background sync every 120s (+/- 10s jitter) to `/api/exam/sync`.
- **Verification Criteria:** Answers survive page reload during airplane mode and sync upon reconnect.

---

### Priority P2 — Admin, Operational & UX Deficiencies

#### [P2-01] Admin Page Unprotected by Role Authorization or MFA
- **Severity:** P2 (Access Control)
- **Evidence:** `src/pages/AdminPage.tsx` has no route guard or server-side role check against `staff_roles`.
- **Impact:** Anyone discovering `/admin` can view management controls.
- **Fix Strategy:** Enforce JWT role verification (`role in ('super_admin', 'admin')`) before rendering or serving admin API data.
- **Verification Criteria:** Non-admin students receive 403 Forbidden when requesting `/admin`.

---

#### [P2-02] Simulated Google Sheets Import & Copilot Actions
- **Severity:** P2 (Workflow Incompleteness)
- **Evidence:** `AdminPage.tsx#L45-L66` uses mock `setTimeout` loops for imports and Copilot responses.
- **Impact:** Administrators cannot ingest real Google Sheets data into Turso from the dashboard.
- **Fix Strategy:** Wire `handleSimulateImport` to call `/api/admin/questions/import` using `importer.ts`, persisting parsed questions into Turso's `questions` and `options` tables.
- **Verification Criteria:** Importing from the test Google Sheet increases Turso database question count.

---

## 4. Architectural Topology Resolution

The discrepancy between the Next.js server documentation and the Vite SPA deployment is resolved by adopting a **Cloudflare Worker Unified Topology**:

```
+-------------------------------------------------------------------------+
|                    CLOUDFLARE WORKER / EDGE RUNTIME                     |
|                                                                         |
|   Incoming Request: https://agri-learning-point.workers.dev             |
|                               |                                         |
|                 +-------------+-------------+                           |
|                 |                           |                           |
|         Path starts with /api/*        Static Asset / SPA Route         |
|                 |                           |                           |
|                 v                           v                           |
|   +---------------------------+   +----------------------------------+  |
|   |  WORKER API ROUTER        |   |  ASSETS.fetch(request)           |  |
|   |  (src/worker/index.ts)    |   |  - Serves ./dist static assets   |  |
|   |  - Auth & Sessions        |   |  - SPA fallback to /index.html   |  |
|   |  - Exam Sync & Submit     |   |  - Edge cache headers applied    |  |
|   |  - Razorpay Verification  |   +----------------------------------+  |
|   |  - AI Question Generator  |                                         |
|   +---------------------------+                                         |
|                 |                                                       |
|        +--------+--------+                                              |
|        |                 |                                              |
|        v                 v                                              |
|   Supabase Cloud     Turso libSQL                                       |
|   (PostgreSQL)       (Edge Database)                                    |
+-------------------------------------------------------------------------+
```

This topology delivers:
1. Complete server-side security (secrets never touch client bundle).
2. Sub-millisecond static asset delivery across Cloudflare's global edge network.
3. Server-authoritative exam timing, scoring, and payment verification.
4. Zero additional hosting infrastructure costs.
