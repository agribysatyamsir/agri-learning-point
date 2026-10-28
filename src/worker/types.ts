/**
 * Learning Point — Cloudflare Edge Worker Environment & Schema Definitions
 */

export interface WorkerEnv {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  SUPABASE_URL?: string;
  SUPABASE_SECRET_KEY?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
  TURSO_DATABASE_URL?: string;
  TURSO_AUTH_TOKEN?: string;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
  GEMINI_API_KEY?: string;
  DEEPSEEK_API_KEY?: string;
  CEREBRAS_API_KEY?: string;
  GROQ_API_KEY?: string;
  MISTRAL_API_KEY?: string;
  SAMBANOVA_API_KEY?: string;
  [key: string]: any;
}

export interface AuthSessionResponse {
  valid: boolean;
  user?: {
    id: string;
    phone: string;
    fullName: string;
    targetExam?: string;
    role?: string;
  };
  sessionToken?: string;
  error?: string;
  message?: string;
}
