import { test, expect } from '@playwright/test';
import { ApiContext } from '../../commons/api/api-context.js';
import { envConfig } from '../../config/env.js';

test.describe('API automation suite', () => {
  let api: ApiContext;

  test.beforeEach(async ({ request }) => {
    api = ApiContext.from(request);

    if (envConfig.apiToken) {
      api.setToken(envConfig.apiToken);
    }
  });

  test('should fetch a list of posts', async () => {
    const response = await api.get('/posts');

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('should fetch a single resource', async () => {
    const response = await api.get('/posts/1');

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
  });

  test('should authenticate with token endpoint when credentials are configured', async () => {
    test.skip(!envConfig.apiUsername || !envConfig.apiPassword, 'Authentication credentials are not configured.');

    const token = await api.authenticate();
    expect(token).toBeTruthy();
    expect(api.getToken()).toBe(token);
  });
});
