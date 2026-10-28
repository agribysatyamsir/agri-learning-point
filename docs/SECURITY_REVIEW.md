# Learning Point — Security Review & Threat Model

**Standard:** OWASP Top 10 (2021/2026), Indian DPDP Act (2023) Guidelines, ISO/IEC 27001 Controls  
**Scope:** Client Interface, Edge API Workers, Supabase PostgreSQL, Turso libSQL, Razorpay Integration, AI Pipeline

---

## 1. Threat Modeling & Mitigations

### 1.1 Insecure Direct Object References (IDOR) & Unauthorized Data Exposure
- **Risk:** Students querying test attempts, answers, receipts, or profiles belonging to other students by altering attempt IDs or profile IDs in API requests.
- **Mitigation:**
  - Supabase PostgreSQL: Strict Row-Level Security (RLS) policies checking `auth.uid() = profile_id`.
  - API Routes: Every protected endpoint extracts identity strictly from the verified session JWT/cookie. Client-submitted user IDs are rejected or ignored in favor of the authenticated session identity.
  - Turso Attempt Verification: Attempt querying verifies `profile_id == session.user.id`.

### 1.2 Examination Integrity & Answer Key Leakage
- **Risk:** Inspecting network traffic or browser memory to discover correct options before test submission; altering client clock to extend examination duration.
- **Mitigation:**
  - Answer keys (`is_correct` flags and `explanations`) are **never serialized** to the browser during an active attempt.
  - Test questions only contain `{ id, text, options: [{ id, text }] }`.
  - Timer is server-authoritative: start time and duration are locked at attempt initialization. The server rejects submissions received after `expires_at + grace_period` (15s grace for network latency).
  - Scores are calculated entirely server-side upon submission.

### 1.3 Financial Fraud & Webhook Spoofing
- **Risk:** Malicious clients faking payment success callbacks to activate course enrollments; webhook replay attacks or modified payment amounts.
- **Mitigation:**
  - Client-side callbacks **never activate access directly**.
  - Authoritative activation occurs via Razorpay Webhooks or server-verified checkout signatures using HMAC-SHA256 (`crypto.createHmac('sha256', secret)`).
  - Webhook verification parses raw request bytes before JSON decoding to guarantee cryptographic signature fidelity.
  - Transactions are processed idempotently: duplicate delivery of `order.paid` does not generate duplicate enrollments or corrupt transaction ledgers.

### 1.4 Broken Authentication & Concurrent Session Hijacking
- **Risk:** Sharing credentials across multiple students to circumvent course pricing.
- **Mitigation:**
  - **Single Active Login:** Authoritative session tracking in `active_sessions` records `session_id`, `profile_id`, and `ip_fingerprint`.
  - When a student authenticates from Device B, all previous active tokens for Device A are invalidated.
  - Subsequent requests from Device A return HTTP 401 with code `SESSION_TERMINATED_CONCURRENT_LOGIN`.

### 1.5 Admin Elevation & AI Copilot Privilege Escalation
- **Risk:** AI Copilot executing unvetted database modifications, score alterations, or payment refunds.
- **Mitigation:**
  - AI Copilot operates in read-only and draft mode by default.
  - High-impact operations (score adjustments, refund processing, answer key modifications, role assignments) require explicit 2-factor human confirmation.
  - All staff actions are recorded in immutable `audit_logs` with actor ID, timestamp, target ID, and before/after JSON diffs.

---

## 2. Secrets Management & Environment Boundary
- **Never In Browser:** Service-role keys (`SUPABASE_SERVICE_ROLE_KEY`), Turso admin tokens, Razorpay key secret, AI provider API keys, Google Drive service credentials.
- **Client Bundle Protection:** Public environment variables are restricted to `NEXT_PUBLIC_` or `VITE_` prefixed public keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`).
- **Secret Scanning:** Pre-commit hooks and CI scans block credential commits.
