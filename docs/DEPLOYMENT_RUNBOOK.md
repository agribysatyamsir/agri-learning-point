# Learning Point — Deployment Runbook & Environment Setup

## 1. Prerequisites & Tooling
- Node.js 18+ / 20+ / 22+ (verified working on Node v24.22.1)
- npm 10+ / 11+
- Git 2.40+
- Supabase Account & Project
- Turso Database Instance (libSQL)
- Razorpay Merchant / Test Account
- Cloudflare Pages / Workers CLI (`wrangler`)

---

## 2. Environment Variables Specification

Create `.env.local` for development and configure edge secrets in Cloudflare Pages dashboard:

```bash
# ==============================================================================
# LEARNING POINT — PRODUCTION / STAGING ENVIRONMENT CONFIGURATION
# ==============================================================================

# Core Application
NEXT_PUBLIC_APP_URL="https://learningpoint.in"
NEXT_PUBLIC_APP_NAME="Learning Point"
NODE_ENV="production"

# Supabase Identity & Core Database
NEXT_PUBLIC_SUPABASE_URL="https://xyzcompany.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..." # SERVER ONLY

# Turso Database (Exam Attempts, Questions, AI Queue)
TURSO_DATABASE_URL="libsql://learning-point-xyz.turso.io"
TURSO_AUTH_TOKEN="ey..." # SERVER ONLY

# Razorpay Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="server_secret_..." # SERVER ONLY
RAZORPAY_WEBHOOK_SECRET="whsec_..." # SERVER ONLY

# AI Provider Pipeline (Server Only)
GEMINI_API_KEY=""
GROQ_API_KEY=""
OPENAI_API_KEY=""

# Backup & Storage Integration (Server Only)
GOOGLE_DRIVE_BACKUP_FOLDER_ID=""
GOOGLE_SERVICE_ACCOUNT_JSON=""
BACKUP_ENCRYPTION_KEY="32_byte_hex_key_here"

# Security & Anti-Abuse
TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""
```

---

## 3. Database Initialization & Migration Runbook

### Step 3.1: Turso Schema Execution
Execute the Turso schema containing all 12 tables (`questions`, `options`, `explanations`, `question_sources`, `paper_blueprints`, `ai_jobs`, `attempts`, `responses`, `attempt_events`, `question_usage`, `rankings`):
```powershell
# Using the embedded automated runner
powershell -ExecutionPolicy Bypass -File ../turso-setup/run-turso-schema.ps1
```
Or via Turso CLI:
```bash
turso db shell <db-name> < schema/turso_schema.sql
```

### Step 3.2: Supabase Schema Execution
Run the migrations for:
- `profiles`, `active_sessions`, `staff_roles`
- `courses`, `batches`, `enrollments`
- `payment_orders`, `receipts`, `coupons`
- `question_reports`, `audit_logs`
- Enable Row-Level Security on all tables.

---

## 4. Build & Cloudflare Deployment Steps

### Local Verification
```bash
npm run lint
npm run test
npm run build
```

### Edge Deployment via Cloudflare Pages
```bash
npx wrangler pages deploy dist --project-name=learning-point
```
Or connect the GitHub repository directly to Cloudflare Pages with build command `npm run build` and output directory `.next` / `out` / `dist`.
