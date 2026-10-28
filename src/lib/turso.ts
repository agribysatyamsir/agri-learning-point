import { createClient } from '@libsql/client/web';
import { env } from './env';

const tursoUrl = env.VITE_TURSO_DATABASE_URL || 'libsql://placeholder.turso.io';

export const isTursoConfigured = Boolean(
  env.VITE_TURSO_DATABASE_URL && 
  !env.VITE_TURSO_DATABASE_URL.includes('placeholder')
);

export const turso = createClient({
  url: tursoUrl,
  authToken: (import.meta as any).env?.TURSO_AUTH_TOKEN || '',
});
