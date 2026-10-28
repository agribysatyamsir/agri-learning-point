# Learning Point — Architectural Decision Log (ADR)

## ADR-001: Hybrid Database Architecture (Supabase + Turso)
- **Date:** 2026-10-28
- **Status:** Approved
- **Context:** Platform expects up to 1,000 concurrent students submitting answers every 120 seconds, while requiring relational integrity for transactions, course validity, and RBAC.
- **Decision:** Use Supabase PostgreSQL as the primary system of record for user profiles, courses, batches, payment orders, and staff permissions. Use Turso (libSQL edge cluster) for the Master Question Bank, AI worker jobs, live attempt tracking, and high-frequency autosaved response events.
- **Consequences:** Eliminates connection pool exhaustion on PostgreSQL during exams while maintaining ACID compliance for payments.

---

## ADR-002: Authentication Identity Mapping for Mobile Numbers
- **Date:** 2026-10-28
- **Status:** Approved
- **Context:** PRD requests mobile number + password login, but Supabase Auth requires an email format unless Twilio/SMS OTP is configured with paid gateway credits.
- **Decision:** Map student mobile numbers to internal synthetic identities: `<mobile_10_digits>@student.learningpoint.in`. The UI prompts purely for 10-digit Indian Mobile Number and Password. The client/server mapping handles synthetic email transformation invisibly. Account recovery is supported via verified contact or secondary email.
- **Consequences:** Provides exact mobile-first student UX without external SMS gateway costs or OTP latency barriers.

---

## ADR-003: Single Active Session Enforcement
- **Date:** 2026-10-28
- **Status:** Approved
- **Context:** Prevent account sharing across competitive exam aspirants.
- **Decision:** Maintain an `active_sessions` table in Supabase. On every login, generate a cryptographically random `session_token`. The server replaces any existing active token for that user. Middleware checks incoming session tokens; revoked sessions receive HTTP 401 with `SESSION_TERMINATED_CONCURRENT_LOGIN`.
- **Consequences:** Guarantees strict single-device usage without relying on vulnerable client-side localStorage flags.

---

## ADR-004: Safe Option Shuffling & Answer Decoupling
- **Date:** 2026-10-28
- **Status:** Approved
- **Context:** Practice reattempts require option shuffling to prevent mechanical rote memorization.
- **Decision:** Options carry immutable UUIDs. The attempt stores a deterministic option permutation per question. The client renders options in the shuffled sequence, but submits the option UUID. Scoring evaluates the option UUID against the master key, rendering the display position irrelevant to scoring accuracy.
- **Consequences:** Completely prevents option shuffle scoring bugs and works reliably across page refreshes.

---

## ADR-005: Zero Live AI Calls During Active Exams
- **Date:** 2026-10-28
- **Status:** Approved
- **Context:** AI generation must not cause latency spikes or non-deterministic test experiences for students.
- **Decision:** AI Question Factory generates, verifies, and stores questions and detailed explanations in the database prior to publishing. During an active exam, the test runner reads exclusively from static database records.
- **Consequences:** 100% deterministic exam performance, zero third-party API latency impact on live attempts, and adherence to cost quotas.


---

## ADR-006: Cloudflare Worker API & Vite Static Assets Deployment Topology
- **Date:** 2026-10-28
- **Status:** Approved
- **Context:** Historical documentation referenced Next.js server runtime, while the repository was deployed as a client-side Vite SPA on Cloudflare Workers static assets without an API layer. Sensitive operations (Supabase Service Key, Turso Auth, Razorpay webhook validation, and AI provider calls) cannot safely run on the client.
- **Decision:** Unify the stack using Cloudflare Workers with Assets: `wrangler.jsonc` defines `main: "src/worker/index.ts"` alongside `assets: { directory: "./dist", binding: "ASSETS" }`. All `/api/*` endpoints execute securely within the edge worker script where environment secrets are shielded from client bundles. Non-API requests fall through to `env.ASSETS.fetch(request)` with SPA client-side routing fallback.
- **Consequences:** Provides a single, unified deployment target on Cloudflare (`https://agri-learning-point.agribysatyamsir.workers.dev`), eliminates architecture ambiguity, keeps client bundles lightweight, and ensures absolute server-side credential isolation.

---

## ADR-007: Unambiguous Routing Hierarchy for Exams and Live Attempts
- **Date:** 2026-10-28
- **Status:** Approved
- **Context:** `App.tsx` contained overlapping patterns `/exam/:slug` (ExamDetailPage) and `/exam/:testId` (ExamRunnerPage), creating route resolution collision in React Router.
- **Decision:** Establish clear, distinct path namespaces:
  1. `/exams`: All exam categories list.
  2. `/exams/:slug`: Specific exam information, syllabus, and available test series (`ExamDetailPage`).
  3. `/exam/attempt/:testId`: Full-screen Computer-Based Test (CBT) examination runner (`ExamRunnerPage`).
  4. `/exam/results/:attemptId`: Score report, analytics, and solution explanations (`ExamResultsPage`).
- **Consequences:** Eliminates routing ambiguity, enables reliable deep linking, and ensures browser history (back/forward) functions correctly.
