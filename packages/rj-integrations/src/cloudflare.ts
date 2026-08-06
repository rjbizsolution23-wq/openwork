/**
 * Cloudflare API helpers for RJ Business Solutions
 * Wrangler handles most operations — this covers programmatic needs.
 */

const CF_BASE = 'https://api.cloudflare.com/client/v4';

export interface CFEnv {
  CLOUDFLARE_API_TOKEN: string;
  CF_ACCOUNT_ID: string;
}

export class CloudflareClient {
  private readonly token: string;
  private readonly accountId: string;

  constructor(env: CFEnv) {
    this.token = env.CLOUDFLARE_API_TOKEN;
    this.accountId = env.CF_ACCOUNT_ID;
  }

  private headers(): HeadersInit {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${CF_BASE}${path}`, {
      ...init,
      headers: { ...this.headers(), ...(init?.headers ?? {}) },
    });
    const json = await res.json() as { success: boolean; result: T; errors: unknown[] };
    if (!json.success) throw new Error(`CF API error: ${JSON.stringify(json.errors)}`);
    return json.result;
  }

  /** Read a KV value */
  async kvGet(namespaceId: string, key: string): Promise<string | null> {
    try {
      const res = await fetch(
        `${CF_BASE}/accounts/${this.accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`,
        { headers: this.headers() },
      );
      if (res.status === 404) return null;
      return res.text();
    } catch {
      return null;
    }
  }

  /** Write a KV value */
  async kvPut(namespaceId: string, key: string, value: string, ttlSeconds?: number): Promise<void> {
    const url = new URL(
      `${CF_BASE}/accounts/${this.accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`,
    );
    if (ttlSeconds) url.searchParams.set('expiration_ttl', String(ttlSeconds));

    const res = await fetch(url.toString(), {
      method: 'PUT',
      headers: { Authorization: `Bearer ${this.token}` },
      body: value,
    });
    if (!res.ok) throw new Error(`KV put failed: ${res.status} ${await res.text()}`);
  }

  /** List Workers deployments */
  async listWorkers(): Promise<Array<{ id: string; created_on: string }>> {
    return this.request(`/accounts/${this.accountId}/workers/scripts`);
  }

  /** Get D1 database info */
  async getD1Database(databaseId: string): Promise<{ uuid: string; name: string; version: string }> {
    return this.request(`/accounts/${this.accountId}/d1/database/${databaseId}`);
  }

  /** Execute a D1 SQL query */
  async d1Query(databaseId: string, sql: string, params: unknown[] = []): Promise<unknown[]> {
    const result = await this.request<Array<{ results: unknown[] }>>(
      `/accounts/${this.accountId}/d1/database/${databaseId}/query`,
      {
        method: 'POST',
        body: JSON.stringify({ sql, params }),
      },
    );
    return result[0]?.results ?? [];
  }
}

export function createCFClient(env: CFEnv): CloudflareClient {
  return new CloudflareClient(env);
}
