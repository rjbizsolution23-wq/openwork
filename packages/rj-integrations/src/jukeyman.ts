/**
 * JUKEYMAN v1.8.2 — Cloudflare Workers API client for RJ Business Solutions
 */

const JUKEYMAN_BASE = 'https://jukeyman-agents.rjbusiness.workers.dev';

export interface JukeymanTask {
  type: 'email' | 'landing-page' | 'copy' | 'social' | 'deploy' | 'research';
  prompt: string;
  /** Deliver result to this email address */
  replyTo?: string;
  /** Optional Cloudflare Worker name to deploy code to */
  deployTarget?: string;
  /** Additional context documents */
  context?: string[];
  metadata?: Record<string, unknown>;
}

export interface JukeymanResult {
  taskId: string;
  status: 'queued' | 'processing' | 'complete' | 'failed';
  output?: string;
  deployUrl?: string;
  error?: string;
}

export class JukeymanClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor(baseUrl = JUKEYMAN_BASE, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private headers(): HeadersInit {
    const h: HeadersInit = { 'Content-Type': 'application/json' };
    if (this.apiKey) h['Authorization'] = `Bearer ${this.apiKey}`;
    return h;
  }

  async submitTask(task: JukeymanTask): Promise<JukeymanResult> {
    const res = await fetch(`${this.baseUrl}/api/task`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error(`JUKEYMAN submitTask failed: ${res.status} ${await res.text()}`);
    return res.json() as Promise<JukeymanResult>;
  }

  async getTaskStatus(taskId: string): Promise<JukeymanResult> {
    const res = await fetch(`${this.baseUrl}/api/task/${taskId}`, {
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`JUKEYMAN getTaskStatus failed: ${res.status}`);
    return res.json() as Promise<JukeymanResult>;
  }

  async health(): Promise<{ status: 'ok'; version: string }> {
    const res = await fetch(`${this.baseUrl}/health`);
    if (!res.ok) throw new Error(`JUKEYMAN health check failed: ${res.status}`);
    return res.json() as Promise<{ status: 'ok'; version: string }>;
  }

  /**
   * Submit a content generation task and wait for completion (polling).
   */
  async generateAndWait(task: JukeymanTask, timeoutMs = 60_000): Promise<JukeymanResult> {
    const result = await this.submitTask(task);
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      if (result.status === 'complete' || result.status === 'failed') return result;
      await new Promise((r) => setTimeout(r, 2000));
      const updated = await this.getTaskStatus(result.taskId);
      if (updated.status === 'complete' || updated.status === 'failed') return updated;
    }

    throw new Error(`JUKEYMAN task ${result.taskId} timed out after ${timeoutMs}ms`);
  }
}

export function createJukeymanClient(env?: { JUKEYMAN_API_KEY?: string }): JukeymanClient {
  return new JukeymanClient(JUKEYMAN_BASE, env?.JUKEYMAN_API_KEY);
}
