# Learning Point — Known Limitations & Risk Register

## 1. External Service Credentials & Test Mode Boundaries
- **Razorpay:** Routine automated CI tests must operate strictly against Razorpay Test Mode keys (`rzp_test_...`). Live payments require formal business KYC, GSTIN verification, and merchant onboarding.
- **SMS OTP Providers:** Indian DLT registration is legally mandatory for commercial SMS OTP in India. Until DLT approval is active, identity authentication relies on the robust mobile-number + password pattern with internal identity mapping.
- **AI Model Rate Limits:** Free-tier AI endpoints (Gemini, Groq) may encounter TPM/RPM throttling during bulk question generation. The AI Question Factory incorporates bounded exponential backoff with jitter and checkpointing to pause and resume without loss of progress.

---

## 2. Browser & Device Boundaries
- **IndexedDB in Private Browsing:** Certain aggressive mobile private-browsing modes restrict persistent storage quotas. The test engine gracefully falls back to memory and forces synchronous network sync on every answered question if IndexedDB quota is restricted.
- **Hardware Acceleration:** High-end 3D CSS perspective effects are capped to <= 6 degrees with graceful reduction on lower-tier mobile chipsets and strict bypass when `prefers-reduced-motion` is detected.
- **Screen Resizing During Live Exam:** Window blur or tab changes are recorded as informational events (`attempt_events`) rather than punitive auto-submissions to prevent false cheating accusations caused by incoming phone calls or mobile notifications.
