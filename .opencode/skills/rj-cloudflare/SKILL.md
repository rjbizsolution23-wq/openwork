# rj-cloudflare — Cloudflare Full-Stack Deployment

Everything runs on Cloudflare for RJ Business Solutions. This skill covers deploying, managing, and debugging the full Cloudflare infrastructure.

## Active Resources

| Resource | Name | Type |
|---|---|---|
| Workers | jukeyman-agents | Email orchestration fleet |
| Workers | dir-mktg-12 | Marketing agent |
| Workers | dir-sales-13 | Sales agent |
| Workers | dir-content-11 | Content agent |
| KV | jukeyman-task-store | `4bfb9b2e73de4ffba823d31d56e85f87` |
| Pages | rj-workspace | This app (OpenWork fork) |
| D1 | Per-project | SQLite at the edge |
| R2 | Per-project | Object storage |
| Queues | Per-project | Async job processing |

## Stack

- Runtime: Cloudflare Workers (TypeScript strict)
- Framework: Hono 4.12.x
- CLI: Wrangler 4.x
- AI: Workers AI + Cloudflare AI Gateway
- DB: D1 (SQLite) + Supabase PostgreSQL 17
- Cache: KV namespaces
- Storage: R2 buckets
- Agents: Cloudflare Agents SDK v0.8+ (Durable Objects)
- Browser: Browser Run (CDP + Live View)
- Sandboxes: Cloudflare Sandboxes (GA)

## Deploy Commands

```powershell
# Deploy a Worker (from repo root)
wrangler deploy

# Deploy from specific app
cd apps/api && wrangler deploy

# Tail live logs
wrangler tail [worker-name]

# Create D1 database
wrangler d1 create [project]-db

# Create KV namespace
wrangler kv namespace create [project]-cache

# Create R2 bucket
wrangler r2 bucket create [project]-assets

# Run D1 migration
wrangler d1 migrations apply [db-name] --remote

# Set a secret
wrangler secret put SECRET_NAME
```

## Wrangler.toml Template (every project)

```toml
name = "[project-name]"
main = "src/index.ts"
compatibility_date = "2026-08-01"
compatibility_flags = ["nodejs_compat"]

[observability]
enabled = true
[observability.logs]
head_sampling_rate = 1
[observability.traces]
enabled = true

[[d1_databases]]
binding = "DB"
database_name = "[project]-db"
database_id = "<from wrangler d1 create>"

[[kv_namespaces]]
binding = "KV"
id = "<from wrangler kv namespace create>"

[[r2_buckets]]
binding = "R2"
bucket_name = "[project]-assets"
```

## Common Tasks

```
@rj-cloudflare deploy [worker-name] to production
@rj-cloudflare tail logs for [worker-name]
@rj-cloudflare create D1 database for [project]
@rj-cloudflare check KV usage on jukeyman-task-store
@rj-cloudflare set up Cloudflare Pages for [repo]
@rj-cloudflare wire email routing to [worker]
@rj-cloudflare create Queue for [project] async jobs
```

## Rick's Account

- GitHub: rjbizsolution23-wq
- CF Account ID: stored in `$env:CF_ACCOUNT_ID`
- Wrangler token: stored in `$env:CLOUDFLARE_API_TOKEN`
