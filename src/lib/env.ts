import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_URL: z.string().default('http://localhost:3000'),
  VITE_APP_NAME: z.string().default('Learning Point'),
  VITE_SUPABASE_URL: z.string().optional(),
  VITE_SUPABASE_ANON_KEY: z.string().optional(),
  VITE_TURSO_DATABASE_URL: z.string().optional(),
  VITE_RAZORPAY_KEY_ID: z.string().optional(),
});

export const env = envSchema.parse({
  VITE_APP_URL: import.meta.env.VITE_APP_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_TURSO_DATABASE_URL: import.meta.env.VITE_TURSO_DATABASE_URL,
  VITE_RAZORPAY_KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID,
});
