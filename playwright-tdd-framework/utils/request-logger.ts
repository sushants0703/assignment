import fs from 'fs';
import path from 'path';
import type { APIResponse } from '@playwright/test';

const logFolder = path.resolve(process.cwd(), 'logs');
const logFile = path.resolve(logFolder, 'api-requests.log');

function ensureLogFolder(): void {
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder, { recursive: true });
  }
}

export function logRequest(
  method: string,
  url: string,
  headers: Record<string, string>,
  body?: string
): void {
  ensureLogFolder();
  const timestamp = new Date().toISOString();
  const message = [
    '--- API REQUEST ---',
    `Time: ${timestamp}`,
    `Method: ${method}`,
    `Url: ${url}`,
    `Headers: ${JSON.stringify(headers)}`,
    `Body: ${body ?? '<<empty>>'}`,
    '-------------------',
  ].join('\n') + '\n';

  console.log(message);
  fs.appendFileSync(logFile, message);
}

export async function logResponse(response: APIResponse): Promise<void> {
  ensureLogFolder();
  const timestamp = new Date().toISOString();
  const status = response.status();
  const statusText = response.statusText();
  const headers = JSON.stringify(response.headers());
  const body = await response.text();
  const message = [
    '--- API RESPONSE ---',
    `Time: ${timestamp}`,
    `Status: ${status} ${statusText}`,
    `Headers: ${headers}`,
    `Body: ${body || '<<empty>>'}`,
    '--------------------',
  ].join('\n') + '\n';

  console.log(message);
  fs.appendFileSync(logFile, message);
}
