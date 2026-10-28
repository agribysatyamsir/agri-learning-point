# Learning Point — Master Implementation Plan

**Product Name:** Learning Point  
**Platform Scope:** Full-Stack Competitive Exam Preparation Platform (Web, API, AI Examination Engine)  
**Primary Market:** Indian Competitive Exam Aspirants (Agriculture: IBPS AFO, NABARD, ICAR JRF/SRF, UPSSSC AGTA, State Agriculture; plus broader competitive exam categories)  
**Scale Target:** 1,000 concurrent students  
**Architecture:** Next.js / React TypeScript, Tailwind CSS, Supabase (Auth, Core PostgreSQL), Turso / libSQL (High-throughput test attempts, question bank, AI jobs), Cloudflare Pages/Workers, Razorpay (Payments), Google Drive (Encrypted Backups)  
**Date:** October 2026  
**Status:** In Progress (Phase 0 Baseline Established)

---

## 1. Executive Summary & Audit Baseline

Learning Point is engineered as an enterprise-grade competitive exam preparation system. Following an exhaustive repository and environmental audit of the workspace:
- **Baseline Assets:** Discovered official branding assets (`logo.png`, `watermark_logo.png`), bilingual exam syllabus configurations, Turso 12-table production schema (`run-turso-schema.ps1`), and pipeline content processors in the environment.
- **Unified Workspace:** Initialized git repository, structured folders (`docs/`, `public/assets/branding`, `src/`), mapped environmental boundaries, and integrated design tokens.
- **Objective:** Build out the full-stack web application, student examination interface, AI question factory, admin portal with AI Copilot, Razorpay payment processing, and rigorous security/compliance guards.

---

## 2. Phased Implementation Roadmap

### Phase 0: Discovery, Audit, Baseline & Planning (Current)
- [x] Repository discovery and file-system inspection.
- [x] Extraction and preservation of brand assets and existing Turso database schema.
- [x] Creation of comprehensive governance documentation (`docs/` audit suite).
- [x] Environment matrix and configuration specification.

### Phase 1: Architecture, Core Engine & Design Foundation
- [ ] Next.js 14+ / React TypeScript setup with Tailwind CSS, Lucide icons, and design tokens.
- [ ] Database client layer:
  - Supabase client (PostgreSQL, Auth, RLS).
  - Turso client (@libsql/client) for high-frequency test attempts, responses, and questions.
- [ ] Environment validation (`src/lib/env.ts`) using Zod.
- [ ] Shared layout, navigation, footer, and core UI component primitives.

### Phase 2: Design System & Complete Public Website
- [ ] Palette implementation: Deep navy/slate background (`#0B1329`, `#0F172A`), emerald green primary (`#10B981`, `#059669`), restrained gold accents (`#F59E0B`, `#D97706`).
- [ ] 3D hover/depth effects, micro-interactions, responsive behavior (320px to 1920px+).
- [ ] All public routes:
  - `/` (Hero, Exam Categories, Featured Courses, Test Series Preview, How it Works, Benefits, Free Tests, FAQ, Footer)
  - `/exams` and `/exam/[slug]`
  - `/courses` and `/course/[slug]`
  - `/test-series` and `/test-series/[slug]`
  - `/free-tests`
  - `/about`, `/contact`, `/faq`, `/updates`
  - `/terms`, `/privacy`, `/refund-policy`, `/payment-policy`, `/disclaimer`

### Phase 3: Authentication, Session Security & Access Control
- [ ] Mobile number + password authentication flow (with secure email/identity mapping in Supabase Auth).
- [ ] Session management with **single active login** server-side tracking and automatic prior session revocation.
- [ ] Role-Based Access Control (RBAC) and Row-Level Security (RLS) enforcement.
- [ ] Password reset, verification, and rate-limiting middleware.

### Phase 4: Courses, Batches, Entitlements & Student Dashboard
- [ ] Course catalog, syllabus breakdown, batch validity management (duration-based and fixed-date).
- [ ] Authoritative server-side entitlement checks.
- [ ] Multi-course purchase support.
- [ ] Student dashboard: enrolled courses, validity timers, test attempts, analytics summary, study materials, receipts.

### Phase 5: Master Agriculture Question Bank & Google Sheets Importer
- [ ] Question bank schema with stable IDs, bilingual text (English & Hindi), options, explanations, source tracing.
- [ ] Repeatable Google Sheets / CSV import pipeline with column mapping and schema validation.
- [ ] Duplicate detection (exact hash and semantic text matching).
- [ ] Review staging and approval workflow.

### Phase 6: AI Question Factory & Content Validation
- [ ] Modular AI provider adapter architecture (Gemini, Groq, OpenAI, Anthropic).
- [ ] Blueprint generation conforming to exam rules:
  - Agriculture: 40% master bank + 60% AI generated.
  - Non-Agriculture: 100% syllabus/PYQ-grounded AI generated.
- [ ] Independent multi-stage validation: distractor sanity check, answer consistency, explanation verification.
- [ ] Asynchronous persistent AI job queue with pause/resume and checkpointing.
- [ ] Strict ban on direct student AI chat and live AI calls during examination.

### Phase 7: Real-Time Test Engine, Autosave & Scoring
- [ ] Test runner interface (desktop full-view and mobile touch drawer).
- [ ] Server-authoritative countdown timer with drift compensation and automatic submission on expiry.
- [ ] Local IndexedDB autosave + 120s server batch sync with retry and jitter.
- [ ] Server-side authoritative scoring with negative marking (-0.25).
- [ ] Safe option shuffling (stable option IDs decoupled from render indices).
- [ ] Enforce 1st ranked attempt + 5 practice reattempts.
- [ ] Detailed result breakdown, leaderboard snapshot, and question report mechanism.

### Phase 8: Razorpay Payments & Financial Safety
- [ ] Razorpay Order creation API with server-side price and coupon verification.
- [ ] Client SDK integration with signature verification.
- [ ] Webhook handler with raw payload signature validation, replay attack protection, and idempotent activation.
- [ ] Invoice/receipt generation and audit log persistence.

### Phase 9: Admin Portal, AI Control Center & Copilot
- [ ] Admin authentication with TOTP MFA support.
- [ ] Modules: Courses, Test Series, Question Bank, Importers, Reports, Users, Orders, Audit Logs.
- [ ] AI Control Center: provider status, job queues, token usage, quality scores.
- [ ] Admin AI Copilot: read-only analysis, report generation, and staged approval workflows.

### Phase 10: Performance, Observability, Backups & Launch Readiness
- [ ] Load testing simulation scripts (100 -> 300 -> 500 -> 1,000 concurrent students).
- [ ] Weekly encrypted backup pipeline (AES-256-GCM + Google Drive archive).
- [ ] Sentry / error monitoring and structured Cloudflare logs.
- [ ] Complete automated test suites (unit, integration, e2e, a11y, security).
- [ ] Final launch verification against release gates.
