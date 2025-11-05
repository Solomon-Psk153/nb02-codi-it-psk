import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';

const envFile = path.resolve(__dirname, `../../envs/.env.test`);

// Load .env.* corresponding to NODE_ENV (e.g. .env.test)
dotenvExpand.expand(dotenv.config({ path: envFile }));
console.info(`[test setup] loaded env file: ${envFile}`);
