# Learning Point — Test Execution & Quality Report

**Date:** 2026-10-28  
**Test Framework:** Vitest v5.0.5 with jsdom environment  
**Baseline Commit:** `95ebcd2`  
**Overall Status:** **PASSED (23/23 Tests Passed)**  
**Duration:** ~8.83s  

---

## 1. Test Suite Summary

| Test File | Focus Area | Tests Passed | Status | Duration |
| :--- | :--- | :---: | :---: | :---: |
| `src/tests/scoring.test.ts` | Server-Authoritative Scoring Engine (-0.25 negative marking) | 6 / 6 | **PASS** | ~1.45s |
| `src/tests/shuffler.test.ts` | Safe Deterministic Option Shuffling (UUID stability) | 4 / 4 | **PASS** | ~1.30s |
| `src/tests/blueprint.test.ts` | Exam Paper Blueprint Generator (40% Bank + 60% AI) | 4 / 4 | **PASS** | ~1.28s |
| `src/tests/importer.test.ts` | Google Sheets CSV Parser & Deduplication | 4 / 4 | **PASS** | ~1.35s |
| `src/tests/routes.test.tsx` | UI Section & Component Rendering (Home, Courses, CBT, Admin) | 5 / 5 | **PASS** | ~2.45s |
| **Total** | | **23 / 23** | **100% PASS** | **8.83s** |

---

## 2. Detailed Test Inventory & Verification Gates

### 2.1 Exam Scoring Engine (`src/tests/scoring.test.ts`)
- `calculates perfect score correctly`: Validates that answering all questions correctly yields full positive marks with 0 penalties.
- `applies -0.25 negative marking on incorrect options`: Validates that wrong answers incur the exact negative penalty (-0.25 per wrong answer).
- `unattempted questions receive zero penalty`: Confirms skipped questions do not decrement the candidate's score.
- `handles mixed responses with positive, negative, and unattempted`: Tests real-world exam attempt permutations with decimal marks.
- `calculates percentage and accuracy metrics`: Validates candidate analytics calculations.
- `floating point precision guard`: Guarantees scores are rounded cleanly without IEEE-754 precision artifacts.

### 2.2 Safe Deterministic Option Shuffler (`src/tests/shuffler.test.ts`)
- `deterministic shuffle per seed`: Same attempt ID and question ID produces identical option order across browser reloads.
- `preserves option identity`: Option IDs and text content remain linked regardless of position.
- `different seeds produce varied permutations`: Ensures candidates receive different visual orders for anti-cheating protection.
- `scoring uses option UUID not visual index`: Guarantees shuffling does not alter score calculation correctness.

### 2.3 Paper Blueprint Generator (`src/tests/blueprint.test.ts`)
- `agriculture exams enforce 40% master bank + 60% AI composition`: Verifies 60-question IBPS AFO mock contains 24 bank + 36 AI questions.
- `non-agri sections use 100% AI generation`: Verifies general awareness sections allocate 100% AI questions.
- `blueprint preserves difficulty tier distribution`: 30% Easy, 50% Medium, 20% Hard.
- `validates question count constraints`: Rejects invalid question paper configurations.

### 2.4 Google Sheets Importer & Deduplication (`src/tests/importer.test.ts`)
- `parses valid CSV text into structured question rows`: Tests multi-column CSV parsing with quoted commas.
- `validates required columns and minimum 4 options`: Discards corrupted or incomplete rows.
- `detects exact and normalized duplicates`: Filters duplicate question statements.
- `normalizes answer keys`: Translates 'A', '1', 'B', '2' into standard option indexes.

### 2.5 Route & Section Rendering (`src/tests/routes.test.tsx`)
- `HomePage renders Hero, Exam Categories, Featured Courses, Test Series, and FAQs`: Verifies landing page content and CTA buttons.
- `ExamsPage renders all streams and blueprints`: Verifies exam category cards.
- `CoursesPage renders course listings and search controls`: Verifies catalog search and filters.
- `ExamRunnerPage renders CBT layout`: Verifies full-screen test runner layout, timer badge, and option selectors.
- `AdminPage renders control tabs and navigation`: Verifies admin control panel layout.

---

## 3. Planned New Test Suites (Upcoming Implementation Phases)

| Phase | Planned Test Suite | Test Objective |
| :--- | :--- | :--- |
| **Phase 1** | `src/tests/routing.disambiguation.test.tsx` | Verify `/exams/:slug` vs `/exam/attempt/:testId` route independence |
| **Phase 2** | `src/tests/worker.auth.test.ts` | Test Supabase identity mapping and single-active-session revocation |
| **Phase 3** | `src/tests/exam.integrity.test.ts` | Verify questions payload contains no `correct_option_id` before submit |
| **Phase 3** | `src/tests/exam.timer.test.ts` | Verify server-authoritative timer rejects expired submissions |
| **Phase 5** | `src/tests/payments.webhook.test.ts` | Test Razorpay HMAC SHA-256 signature verification & idempotency |
| **Phase 6** | `src/tests/admin.rbac.test.ts` | Test `/admin` access control and staff role enforcement |
