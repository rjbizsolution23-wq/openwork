/**
 * Stripe adapter for RJ Business Solutions
 * All payments route through Stripe. API version: 2026-03-25.dahlia
 */

export const STRIPE_API_VERSION = '2026-03-25.dahlia';

export interface CreateCheckoutParams {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  mode?: 'payment' | 'subscription' | 'setup';
  trialDays?: number;
  metadata?: Record<string, string>;
}

export interface StripeWebhookEvent {
  type: string;
  data: { object: Record<string, unknown> };
}

/**
 * Verify a Stripe webhook signature.
 * Call this on every incoming webhook request BEFORE processing.
 */
export async function verifyStripeWebhook(
  payload: string,
  signature: string,
  webhookSecret: string,
): Promise<boolean> {
  const parts = signature.split(',');
  const t = parts.find((p) => p.startsWith('t='))?.slice(2) ?? '';
  const v1 = parts.find((p) => p.startsWith('v1='))?.slice(3) ?? '';

  const signedPayload = `${t}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(webhookSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const computed = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return timingSafeEqualHex(computed, v1);
}

/**
 * Constant-time string comparison (portable — works in Workers, Node, and browsers
 * without relying on runtime-specific APIs like node:crypto.timingSafeEqual).
 */
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Supported Stripe webhook events for RJ Business Solutions.
 */
export const RJ_STRIPE_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
] as const;

export type RJStripeEvent = (typeof RJ_STRIPE_EVENTS)[number];

/**
 * Standard idempotency key generator for Stripe mutations.
 */
export function stripeIdempotencyKey(prefix: string, ...parts: string[]): string {
  return `rj-${prefix}-${parts.join('-')}-${Date.now()}`;
}
