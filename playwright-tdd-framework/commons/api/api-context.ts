import type { APIRequestContext, APIResponse } from '@playwright/test';
import { envConfig } from '../../config/env.js';
import { logRequest, logResponse } from '../../utils/request-logger.js';

export type ApiRequestOptions = {
  headers?: Record<string, string>;
  data?: unknown;
  params?: Record<string, string>;
};

export class ApiContext {
  private authToken?: string;

  constructor(private readonly requestContext: APIRequestContext) {}

  static from(requestContext: APIRequestContext): ApiContext {
    return new ApiContext(requestContext);
  }

  setToken(token: string): void {
    this.authToken = token;
  }

  getToken(): string | undefined {
    return this.authToken;
  }

  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Environment': envConfig.environment,
      ...customHeaders,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    if (envConfig.apiToken && !headers.Authorization) {
      headers.Authorization = `Bearer ${envConfig.apiToken}`;
    }

    return headers;
  }

  private buildUrl(route: string, params?: Record<string, string>): string {
    if (!params || Object.keys(params).length === 0) {
      return route;
    }

    const url = new URL(route, envConfig.apiBaseUrl);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    return url.toString();
  }

  private async fetch(
    method: string,
    route: string,
    options: ApiRequestOptions = {}
  ): Promise<APIResponse> {
    const url = this.buildUrl(route, options.params);
    const headers = this.buildHeaders(options.headers);
    const body = options.data !== undefined ? JSON.stringify(options.data) : undefined;

    logRequest(method, url, headers, body);

    const response = await this.requestContext.fetch(url, {
      method,
      headers,
      data: body,
    });

    await logResponse(response);
    return response;
  }

  async get(route: string, options?: Omit<ApiRequestOptions, 'data'>): Promise<APIResponse> {
    return this.fetch('GET', route, options);
  }

  async post(route: string, data?: unknown, options?: Omit<ApiRequestOptions, 'data'>): Promise<APIResponse> {
    return this.fetch('POST', route, { ...options, data });
  }

  async put(route: string, data?: unknown, options?: Omit<ApiRequestOptions, 'data'>): Promise<APIResponse> {
    return this.fetch('PUT', route, { ...options, data });
  }

  async delete(route: string, options?: Omit<ApiRequestOptions, 'data'>): Promise<APIResponse> {
    return this.fetch('DELETE', route, options);
  }

  async authenticate(route?: string, credentials?: Record<string, unknown>): Promise<string> {
    const authRoute = route || envConfig.apiAuthEndpoint;
    const payload = credentials ?? {
      username: envConfig.apiUsername,
      password: envConfig.apiPassword,
    };

    const response = await this.post(authRoute, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();
    const token = body?.token || body?.access_token || body?.data?.token;

    if (!token) {
      throw new Error(`Authentication failed: no token returned from ${authRoute}`);
    }

    this.setToken(token);
    return token;
  }
}
