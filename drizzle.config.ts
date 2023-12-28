import type { Config } from 'drizzle-kit';
import { loadEnv } from 'vite';
const env = loadEnv('dev', process.cwd(), '');

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: JSON.stringify(env.VITE_TURSO_DB_URL),
    authToken: JSON.stringify(env.VITE_TURSO_DB_AUTH_TOKEN),
  },
} satisfies Config;
