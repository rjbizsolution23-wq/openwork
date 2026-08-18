# RJ Business Solutions Workspace — CLAUDE.md
## Project Context for AI Agents

**Branch:** `rj-business-solutions` (forked from `dev`)
**Repo:** `rjbizsolution23-wq/openwork`
**Owner:** Rick Jefferson — RJ Business Solutions

---

## Who Rick Is

Full-stack builder and founder. Runs RJ Business Solutions — a Cloudflare-first agency/product studio. Everything goes on Cloudflare. Stack is always TypeScript strict, Hono, Supabase, pnpm. Rick does zero manual config — you execute everything.

Contact:
- Email: rickjefferson@rickjeffersonsolutions.com
- GitHub: rjbizsolution23-wq
- Website: https://rjbusinesssolutions.org
- Address: 1342 NM 333, Tijeras, New Mexico 87059

---

## Brand

```
Primary:  #06b6d4 (cyan) → #ec4899 (pink) gradient
Dark bg:  #030712
Success:  #10b981
Urgency:  #ef4444 + #fbbf24

Fonts:
  Heading: Poppins Variable 700/800
  Body:    Inter Variable 400/500
  Mono:    Space Grotesk Variable 500/600
```

Logo: `apps/app/public/rj-logo.svg`

---

## Active Integrations

### JUKEYMAN v1.8.2
- URL: `https://jukeyman-agents.rjbusiness.workers.dev`
- MCP: `https://jukeyman-agents.rjbusiness.workers.dev/mcp`
- KV: `jukeyman-task-store` (ID: `4bfb9b2e73de4ffba823d31d56e85f87`)
- Workers fleet:
  - `jukeyman-agents` — main orchestrator
  - `rj-email-orchestrator` — email intake + dispatch
  - `dir-mktg-12` — marketing director agent
  - `dir-sales-13` — sales director agent
  - `dir-content-11` — content director agent
- Flow: email in → K3 strategy build → Workers deploy → URL returned

### GoHighLevel (GHL)
- CRM, funnels, automations, contacts, pipelines
- Adapter: `packages/rj-integrations/src/ghl.ts`
- Auth: `GHL_API_KEY` env var
- Key operations: `createContact`, `upsertContact`, `addTags`, `addToCampaign`

### Stripe
- All payments route through Stripe
- Adapter: `packages/rj-integrations/src/stripe.ts`
- Tiers: Free ($0), Pro ($97/mo), Enterprise ($297/mo)
- Webhook secret: `STRIPE_WEBHOOK_SECRET` env var
- Price IDs in env vars — never hardcoded

### Cloudflare (full stack)
- Workers, D1, KV, R2, Queues, Pages, AI Gateway, Vectorize
- Adapter: `packages/rj-integrations/src/cloudflare.ts`
- Auth: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`

### Higgsfield AI
- MCP: `https://mcp.higgsfield.ai/mcp`
- Cinematic video generation
- In: `rj-content-engine` skill

### AI Models
| Provider | Model | Use |
|---|---|---|
| Anthropic | claude-sonnet-4-6 (default) | Reasoning, code |
| Anthropic | claude-opus-5 | Complex reasoning |
| OpenRouter | moonshotai/kimi-k2 | Long copy, 128K context |
| Workers AI | llama-4-scout | Fast edge tasks |
| Workers AI | llama-3.3-70b-instruct | Edge inference |

---

## Workspace Structure

```
apps/
  app/              — React + Vite frontend
    src/app/index.css     — DLS tokens (RJ brand applied here)
    index.html            — RJ title, favicon, OG meta
    public/rj-logo.svg    — RJ mark
  desktop/          — Electron shell
  server/           — Node.js backend

packages/
  rj-integrations/  — GHL, Stripe, JUKEYMAN, Cloudflare typed adapters

.opencode/
  opencode.json     — AI providers, MCP servers, skills, system prompt
  skills/
    rj-jukeyman/    — JUKEYMAN email + content fleet
    rj-ghl/         — GoHighLevel CRM
    rj-cloudflare/  — Cloudflare full-stack
    rj-stripe/      — Stripe billing
    rj-content-engine/ — Higgsfield, Kimi K3, content generation
    rj-supreme-agi/ — SUPREME META AGI v10.2 persona
```

---

## Agent Prime Directive (for this workspace)

- Default persona: SUPREME META AGI v10.2
- Default model: claude-sonnet-4-6
- No placeholders, no TODOs, no stubs — complete code only
- Autonomy tier: Green = execute, Yellow = execute + log, Red = STOP + ask Rick
- Every build is Cloudflare-first
- pnpm only — never npm, never yarn
- TypeScript strict — no `any`

---

## Environment Variables Required

```env
# Anthropic
ANTHROPIC_API_KEY=

# OpenRouter (Kimi K3)
OPENROUTER_API_KEY=

# Cloudflare
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=

# GoHighLevel
GHL_API_KEY=
GHL_BASE_URL=https://rest.gohighlevel.com/v1

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_PRO=
STRIPE_PRICE_ENTERPRISE=

# JUKEYMAN
JUKEYMAN_BASE_URL=https://jukeyman-agents.rjbusiness.workers.dev
```

---

## Key Commands

```powershell
# Start frontend dev
pnpm dev

# Build all packages
pnpm build

# Run integrations tests
pnpm --filter @rj-business-solutions/integrations test

# Type check everything
pnpm typecheck
```

---

*Last updated: 2026-08-06 | Branch: rj-business-solutions*
