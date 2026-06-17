import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envFile = path.resolve(process.cwd(), '.env');

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

export const envConfig = {
  environment: process.env.ENVIRONMENT || 'local',
  apiBaseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  apiToken: process.env.API_TOKEN || '',
  apiUsername: process.env.API_USERNAME || '',
  apiPassword: process.env.API_PASSWORD || '',
  apiAuthEndpoint: process.env.API_AUTH_ENDPOINT || '/auth/login',
};
