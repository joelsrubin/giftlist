import type { Config } from 'drizzle-kit';
import { loadEnv } from 'vite';
const env = loadEnv('', process.cwd(), '');

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: env.VITE_TURSO_DB_URL,
    authToken: env.VITE_TURSO_DB_AUTH_TOKEN,
  },
} satisfies Config;
