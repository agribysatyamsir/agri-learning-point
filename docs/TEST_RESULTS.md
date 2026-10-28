# Learning Point — Test Execution & Quality Report

**Date:** 2026-10-28  
**Test Framework:** Vitest v5.0.5 with jsdom environment  
**Phases Completed:** Phase 1 (Routing), Phase 2 (Backend & Security), Phase 3 (Question Bank & Exam Engine)  
**Overall Status:** **PASSED (41/41 Tests Passed across 8 Suites)**  
**Duration:** ~12.98s  

---

## 1. Test Suite Summary

| Test File | Focus Area | Tests Passed | Status | Duration |
| :--- | :--- | :---: | :---: | :---: |
| `src/tests/scoring.test.ts` | Server-Authoritative Scoring Engine (-0.25 negative marking) | 6 / 6 | **PASS** | ~1.45s |
| `src/tests/shuffler.test.ts` | Safe Deterministic Option Shuffling (UUID stability) | 4 / 4 | **PASS** | ~1.30s |
| `src/tests/blueprint.test.ts` | Exam Paper Blueprint Generator (40% Bank + 60% AI) | 4 / 4 | **PASS** | ~1.28s |
| `src/tests/importer.test.ts` | Google Sheets CSV Parser & Deduplication | 4 / 4 | **PASS** | ~1.35s |
| `src/tests/routes.test.tsx` | UI Section & Auth Component Rendering | 5 / 5 | **PASS** | ~2.45s |
| `src/tests/routing.disambiguation.test.tsx` | Route Disambiguation & Backward Compatibility | 5 / 5 | **PASS** | ~0.55s |
| `src/tests/worker.auth.test.ts` | Edge Worker Auth, Rate Limiter & Single Active Session | 8 / 8 | **PASS** | ~0.37s |
| `src/tests/exam.security.test.ts` | Answer Key Shielding, CBT Sync & Server-Side Scoring | 5 / 5 | **PASS** | ~0.42s |
| **Total** | | **41 / 41** | **100% PASS** | **12.98s** |

---

## 2. Detailed Test Inventory & Verification Gates

### 2.1 Exam Security & Answer Key Shielding (`src/tests/exam.security.test.ts`)
- `POST /api/exam/start STRICTLY OMITS correctOptionId and explanation`: Confirms candidate payload contains zero answer indicators, closing vulnerability **P0-01**.
- `POST /api/exam/submit computes server-authoritative score with -0.25 negative marking`: Tests real scoring against server keys (+1.0 for correct, -0.25 for incorrect, 0 for skipped).
- `POST /api/exam/sync accepts and saves batched student responses`: Validates 120s background sync buffer.
- `GET /api/exam/result/:attemptId retrieves score and verified explanations`: Verifies solutions are unlocked only post-submit.
- `Client local attempt buffer persists and restores responses safely`: Validates offline resilience and IndexedDB/localStorage sync.

### 2.2 Edge Worker Auth & Single Active Session (`src/tests/worker.auth.test.ts`)
- Canonicalizes 10-digit mobile numbers with country codes to synthetic identities.
- Sliding window rate limiting blocks brute-force authentication.
- Single active device session enforcement invalidates previous session tokens.

### 2.3 Route Disambiguation (`src/tests/routing.disambiguation.test.tsx`)
- Distinct `/exams/:slug` vs `/exam/attempt/:testId` path handling and 404 fallback.
