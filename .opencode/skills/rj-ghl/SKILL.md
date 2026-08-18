# rj-ghl — GoHighLevel CRM Intelligence

GoHighLevel (GHL) is RJ Business Solutions' primary CRM, funnel builder, and marketing automation platform.

## Rick's GHL Setup

- **Platform**: GoHighLevel (white-labeled)
- **Use cases**: Credit repair leads, real estate funnels, course sales, email automation, SMS campaigns
- **Contacts**: Full CRM with segmented lists per niche
- **Funnels**: Landing pages → lead capture → nurture sequences
- **Automations**: Trigger-based email/SMS workflows

## What This Skill Covers

Use this when working with:
- Contact management (add, update, tag, segment contacts)
- Funnel creation and optimization
- Email campaign building and scheduling
- SMS automation sequences
- Pipeline management (leads → opportunities → closed)
- Reporting and analytics
- Webhook integrations (GHL → Cloudflare Workers)
- GHL → Stripe payment link integration

## GHL API Patterns

```typescript
// Base URL
const GHL_BASE = 'https://rest.gohighlevel.com/v1';

// Auth: Bearer token from env
headers: { 'Authorization': `Bearer ${env.GHL_API_KEY}` }

// Create contact
POST /contacts/
{ "firstName": "...", "email": "...", "tags": ["credit-repair"] }

// Add to campaign  
POST /contacts/{id}/campaigns/{campaignId}/

// Fire webhook trigger
POST /hooks/ with custom payload
```

## Integration with JUKEYMAN

JUKEYMAN workers can push GHL events. Wire a webhook in GHL that POSTs to:
`https://jukeyman-agents.rjbusiness.workers.dev/webhook/ghl`

This triggers the email agent to respond with AI-generated follow-up content.

## Common Tasks

```
@rj-ghl sync new leads from [funnel] to credit-repair segment
@rj-ghl build nurture sequence for real estate leads (7 emails)
@rj-ghl create pipeline stage for [product] with automation
@rj-ghl export contacts tagged [tag] as CSV
@rj-ghl update all contacts with [condition] → add tag [tag]
```

## Niches Rick Uses GHL For

- Credit repair (primary)
- Real estate investor leads
- 900+ Business Courses Bundle sales
- JUKEYMAN agency client onboarding
- AI tools education
