# Learning Point — System Architecture

## 1. Architectural Overview

Learning Point utilizes a hybrid edge-serverless and managed-database topology designed for sub-second latency across India, resilience during peak exam submissions, and strict financial and examination integrity.

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT TIER                                        |
|  - Next.js 14+ / React App (Responsive: 320px - 1920px+)                              |
|  - Tailwind CSS + Custom 3D Interaction Tokens                                        |
|  - IndexedDB Local Attempt Buffer (offline resilience & rapid state recovery)         |
+---------------------------------------------------------------------------------------+
                                            |
                                            v (HTTPS / TLS 1.3)
+---------------------------------------------------------------------------------------+
|                                  EDGE & ROUTING TIER                                  |
|  - Cloudflare Pages / Workers Edge CDN                                                |
|  - Content Security Policy, DDoS Mitigation, Rate Limiting (Turnstile optional)       |
|  - Static Generation & Edge Cache for public courses/tests                            |
+---------------------------------------------------------------------------------------+
                                            |
         +----------------------------------+----------------------------------+
         |                                                                     |
         v                                                                     v
+----------------------------------+                 +----------------------------------+
|      SUPABASE CORE CLOUD         |                 |       TURSO / libSQL CLUSTER     |
|  - Auth & Single Active Session  |                 |  - Master Question Bank          |
|  - Student Profiles & Entitlements|                |  - Live Test Attempt Snapshots   |
|  - Courses, Batches, Pricing     |                 |  - Autosaved Batched Responses   |
|  - Razorpay Orders & Receipts    |                 |  - Attempt Audit Events          |
|  - Staff RBAC & MFA (TOTP)       |                 |  - AI Generation Jobs & Cache    |
|  - Row Level Security (RLS)      |                 |  - Fast Edge Replicas (Mumbai)   |
+----------------------------------+                 +----------------------------------+
         |                                                                     |
         +----------------------------------+----------------------------------+
                                            |
                                            v
+---------------------------------------------------------------------------------------+
|                               INTEGRATIONS & BACKGROUND SERVICES                      |
|  - Razorpay Webhooks (HMAC SHA-256 signature verification)                            |
|  - AI Multi-Model Router (Google Gemini, Groq, OpenAI with automated fallback)       |
|  - Google Sheets API / CSV Engine (Idempotent import & deduplication)                |
|  - Automated Backup Daemon (Weekly AES-256-GCM encrypted snapshot to Google Drive)    |
+---------------------------------------------------------------------------------------+
```

---

## 2. Component Decoupling & Responsibilities

### 2.1 Supabase vs. Turso Separation of Concerns
1. **Supabase (PostgreSQL 15+):**
   - Authoritative System of Record for Identity, Permissions, Financial Transactions, and Course Entitlements.
   - Enforces relational referential integrity on billing and student profiles.
   - Row-Level Security (RLS) acts as the primary data defense boundary.
2. **Turso (libSQL):**
   - Edge-distributed SQLite architecture optimized for read-heavy question delivery and write-heavy answer synchronization.
   - Handles the 120-second batched response flushes from 1,000 concurrent students without saturating relational connection pools.
   - Stores question embeddings, duplicate hashes, and AI worker job queues.

---

## 3. Data Flow & Security Boundaries

### 3.1 Authentication & Session Tracking
- Login uses **Mobile Number + Password**.
- The server maps the mobile identity to Supabase Auth (`<mobile>@student.learningpoint.in`) transparently without exposing dummy emails in the UI.
- On successful login, the server writes a session token with client fingerprint into `active_sessions`.
- Any existing active session for that student is immediately invalidated, delivering the required **Single Active Login** rule.

### 3.2 Examination Timer & Scoring Lifecycle
1. **Start:** Server creates the `attempts` record in Turso with an immutable `started_at` and `expires_at`.
2. **Autosave:** Client writes every option selection to IndexedDB instantly.
3. **Sync:** Every 120 seconds (+/- 10s random jitter), or upon manual save, client pushes a batch to `/api/exam/sync`.
4. **Expiry:** Client timer counts down from `expires_at - now()`. If network disconnects or browser refreshes, timer recalculates strictly against the server's `expires_at`.
5. **Submission:** Upon final submission or timer expiry, `/api/exam/submit` locks the attempt, calculates positive and negative marks (-0.25), checks ranking eligibility, and persists the result. Correct answers are never sent to the client until after submission.

### 3.3 Payments & Entitlement Activation
1. Server generates Razorpay `order_id` for authenticated user and verifies amount.
2. Client opens Razorpay modal.
3. Webhook listener (`/api/webhooks/razorpay`) receives raw payload, verifies `x-razorpay-signature` using HMAC SHA-256 secret.
4. Entitlement is granted idempotently in a single database transaction.

---

## 4. Scalability Strategy (1,000 Concurrent Students)
- Edge-cached static assets and public course previews.
- Zero live AI calls during exam sessions.
- Batched sync reduces concurrent database requests during a 1,000-user exam from 1,000 req/sec to ~8.3 req/sec average.
- Shuffled option keys are deterministic per attempt and stored once at attempt generation.
