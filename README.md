# RJ Business Solutions Workspace

> Full-stack AI workspace built on OpenWork — branded, wired, and deployed for Rick Jefferson's operation.

[![Built by RJ Business Solutions](https://img.shields.io/badge/Built%20by-RJ%20Business%20Solutions-06b6d4?style=for-the-badge)](https://rjbusinesssolutions.org)
[![Powered by Claude](https://img.shields.io/badge/AI-Claude%20%2B%20Kimi%20K3-ec4899?style=for-the-badge)](https://anthropic.com)
[![Cloudflare Workers](https://img.shields.io/badge/Backend-Cloudflare%20Workers-f38020?style=for-the-badge)](https://workers.cloudflare.com)

---

## What This Is

This is Rick Jefferson's personal AI workspace — a fork of [OpenWork](https://github.com/different-ai/openwork) customized with:

- **Full RJ Business Solutions branding** — Cyan #06b6d4 → Pink #ec4899, #030712 dark, Poppins/Inter/Space Grotesk
- **SUPREME META AGI v10.2** system prompt — pre-loaded as the default agent persona
- **JUKEYMAN v1.8.2** integration — the live Cloudflare Workers email + content fleet
- **GoHighLevel CRM** skill — contact management, funnels, automations
- **Stripe** adapter — subscriptions, webhooks, customer portal
- **Cloudflare full-stack** skill — D1, KV, R2, Workers, Queues, Pages
- **Kimi K3** (moonshotai/kimi-k2) via OpenRouter — primary long-context model
- **Claude** (claude-sonnet-4-6 / claude-opus-5) — primary reasoning model
- **Higgsfield AI** — cinematic video generation
- **`packages/rj-integrations`** — typed adapters for GHL, Stripe, JUKEYMAN, Cloudflare

---

## Quick Start

```powershell
# Install dependencies
pnpm install

# Start the workspace (web mode)
pnpm dev

# Start the desktop Electron app
pnpm dev:app
```

---

## AI Providers Configured

| Provider | Models | Use case |
|---|---|---|
| Anthropic (Claude) | claude-opus-5, claude-sonnet-4-6 | Primary reasoning, code |
| OpenRouter (Kimi K3) | moonshotai/kimi-k2 | Long-form copy, email, 128K context |
| Cloudflare Workers AI | llama-4-scout, llama-3.3-70b | Edge inference, fast tasks |

---

## MCP Servers Bundled

| Server | Endpoint | Purpose |
|---|---|---|
| rj-jukeyman | Workers URL | Email fleet + content generation |
| rj-cloudflare | npx @cloudflare/mcp | Full infra control |
| rj-github | npx MCP server | rjbizsolution23-wq repos |
| rj-stripe | npx @stripe/mcp | Payments + billing |
| rj-filesystem | npx MCP server | Local file access |
| rj-memory | npx MCP server | Persistent knowledge graph |
| higgsfield | HTTP MCP | Video generation |

---

## Skills Pre-Installed

| Skill | What it does |
|---|---|
| `rj-jukeyman` | JUKEYMAN email orchestration — email in → K3 builds → deploys → sends URL |
| `rj-ghl` | GoHighLevel CRM — contacts, funnels, campaigns, pipelines |
| `rj-cloudflare` | Cloudflare deployment — Workers, D1, KV, R2, Queues |
| `rj-stripe` | Stripe billing — subscriptions, webhooks, customer portal |
| `rj-content-engine` | AI content suite — video, images, copy, emails, social |
| `rj-supreme-agi` | SUPREME META AGI v10.2 — full autonomy persona and prime directive |

---

## Brand

```
Company:  RJ Business Solutions
Website:  https://rjbusinesssolutions.org
Email:    rickjefferson@rickjeffersonsolutions.com
GitHub:   rjbizsolution23-wq
Address:  1342 NM 333, Tijeras, New Mexico 87059

Colors:
  Primary:  #06b6d4 (cyan) → #ec4899 (pink)
  Dark bg:  #030712
  Success:  #10b981

Fonts:
  Heading: Poppins 700/800
  Body:    Inter 400/500
  Mono:    Space Grotesk 500/600
```

---

## Branch Strategy

- `dev` — upstream OpenWork (pull updates here)
- `rj-business-solutions` — Rick's branded fork (this branch)

To pull upstream improvements: `git merge upstream/dev` from the `rj-business-solutions` branch.

---

## Architecture

```
rjbizsolution23-wq/openwork (rj-business-solutions branch)
├── apps/
│   ├── app/          — React + Vite frontend (RJ branded)
│   ├── desktop/      — Electron shell
│   └── server/       — Node.js backend
├── packages/
│   ├── rj-integrations/  — GHL, Stripe, JUKEYMAN, Cloudflare adapters
│   └── [openwork packages]
└── .opencode/
    ├── opencode.json     — AI providers + MCP servers + RJ system prompt
    ├── skills/
    │   ├── rj-jukeyman/
    │   ├── rj-ghl/
    │   ├── rj-cloudflare/
    │   ├── rj-stripe/
    │   ├── rj-content-engine/
    │   └── rj-supreme-agi/
    └── agents/
```

---

*Built for Rick Jefferson — RJ Business Solutions | August 6, 2026*
