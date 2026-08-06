# rj-jukeyman — Email Orchestration Agent Fleet

JUKEYMAN v1.8.2 is Rick Jefferson's live Cloudflare Workers fleet for AI-powered email automation, content generation, and funnel delivery.

## Live Endpoints

- **Email Agent**: `https://jukeyman-agents.rjbusiness.workers.dev`
- **MCP Server**: `https://jukeyman-agents.rjbusiness.workers.dev/mcp`
- **Marketing Agent** (DIR-MKTG-12): `https://dir-mktg-12.rjbusiness.workers.dev`
- **Sales Agent** (DIR-SALES-13): `https://dir-sales-13.rjbusiness.workers.dev`
- **Content Agent** (DIR-CONTENT-11): `https://dir-content-11.rjbusiness.workers.dev`
- **KV Store**: `jukeyman-task-store` (`4bfb9b2e73de4ffba823d31d56e85f87`)

## What It Does

When an email arrives at `jukeyman@rjbusinesssolutions.org`:
1. Email Worker receives it via Cloudflare Email Routing
2. Parses the request (subject + body = the task)
3. Routes to Kimi K3 (via OpenRouter) to build the deliverable
4. Deploys any code/pages to Cloudflare Workers
5. Emails the result URL back to Rick

## How to Use (in this workspace)

```
@jukeyman build a landing page for [product]
@jukeyman write a GoHighLevel email sequence for [audience]
@jukeyman generate 5 social posts about [topic]
@jukeyman deploy [component] to Cloudflare Workers
```

Or email: `jukeyman@rjbusinesssolutions.org` with your task as the subject.

## Agent Roster

| Agent | Route | Model | Specialty |
|---|---|---|---|
| Email Orchestrator | jukeyman-agents | Kimi K3 | Receives, routes, delivers |
| DIR-MKTG-12 | dir-mktg-12 | Kimi K3 | Funnels, copy, campaigns |
| DIR-SALES-13 | dir-sales-13 | Kimi K3 | Outreach, objections, CRM |
| DIR-CONTENT-11 | dir-content-11 | Kimi K3 | Blog, video scripts, SEO |

## Stack

- Runtime: Cloudflare Workers
- Framework: Hono 4.12.x
- AI: Kimi K3 via OpenRouter (`moonshotai/kimi-k2`)
- KV: `jukeyman-task-store`
- Email: Cloudflare Email Routing → Workers
- Image gen: Genspark tools (genspark_image, genspark_video, genspark_audio)

## Repo

`C:\Users\ricky\jukeyman-agents\` — monorepo, deployed to Cloudflare
