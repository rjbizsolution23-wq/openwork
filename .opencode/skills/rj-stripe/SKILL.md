# rj-stripe — Payments & Subscription Engine

Stripe handles all payments for RJ Business Solutions. This skill covers building, managing, and debugging Stripe integrations.

## Rick's Stripe Setup

- **Products**: 900+ Business Courses Bundle, Credit Repair services, AI tool subscriptions, JUKEYMAN agency plans
- **SDK**: stripe@22.x (API version 2026-03-25.dahlia)
- **Tiers**: Free / Pro / Enterprise (default pattern)
- **Webhooks**: All events handled, signature verified, idempotent

## Stripe Integration Pattern

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
});

// Create checkout session
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  payment_method_types: ['card'],
  line_items: [{ price: env.STRIPE_PRICE_ID_PRO, quantity: 1 }],
  success_url: `${env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${env.APP_URL}/pricing`,
  idempotency_key: crypto.randomUUID(),
});
```

## Webhook Handler (Hono Worker)

```typescript
app.post('/webhook/stripe', async (c) => {
  const sig = c.req.header('stripe-signature')!;
  const body = await c.req.text();
  
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return c.json({ error: 'Webhook signature verification failed' }, 400);
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'invoice.payment_succeeded':
    case 'invoice.payment_failed':
    case 'payment_intent.succeeded':
    case 'payment_intent.payment_failed':
      await handleStripeEvent(event, c.env);
      break;
  }
  
  return c.json({ received: true });
});
```

## Env Vars Required

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_ENTERPRISE=price_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Common Tasks

```
@rj-stripe create checkout for [product] at [$price]/month
@rj-stripe add customer portal to [project]
@rj-stripe handle failed payment → send GHL automation
@rj-stripe wire webhook to Cloudflare Worker at [url]
@rj-stripe show me all active subscriptions
@rj-stripe generate MRR report for this month
@rj-stripe set up usage-based billing for [API calls]
```

## Pricing Tiers (Default)

| Tier | Price | Features |
|---|---|---|
| Free | $0 | Limited access |
| Pro | $97/mo | Full access |
| Enterprise | $297/mo | White-label + API |

Always use `idempotency_key` on all mutating Stripe API calls.
Never hardcode price IDs — use env vars.
