# rj-content-engine — AI Content Creation Suite

Full content generation stack for RJ Business Solutions: videos, images, audio, social posts, emails, landing pages.

## Tools Available

### Higgsfield AI (Connected via MCP)
- **URL**: `https://mcp.higgsfield.ai/mcp`
- **Capabilities**: Cinematic video generation, character animation, motion control, face animation, lip sync, dubbing, outpainting
- **Best for**: Brand videos, product demos, social media reels, TikTok content

### Genspark (via JUKEYMAN)
- **Tools**: `genspark_image`, `genspark_video`, `genspark_audio`
- **Access**: Through JUKEYMAN Worker or direct Genspark API
- **Best for**: Fast image generation, product mockups, thumbnails

### Kimi K3 (via OpenRouter)
- **Model**: `moonshotai/kimi-k2`
- **Best for**: Long-form copy, email sequences, sales scripts, blog posts, ad copy
- **Context**: 128K+ tokens — can handle entire brand documents

### Claude (Primary)
- **Models**: claude-opus-5, claude-sonnet-4-6
- **Best for**: Strategy, code, analysis, complex reasoning, multi-step tasks

## Content Types RJ Creates

| Type | Tool | Volume |
|---|---|---|
| Email sequences | Kimi K3 + GHL | Weekly |
| TikTok/Reels scripts | Claude | Daily |
| Landing pages | Claude + CF Workers | Per campaign |
| Product images | Genspark | Per product |
| Brand videos | Higgsfield | Monthly |
| Blog/SEO posts | Kimi K3 | Weekly |
| Social posts (batch) | Claude | Daily |
| Email templates | Kimi K3 + JUKEYMAN | Weekly |
| Course materials | Claude | Per launch |
| Ad copy (FB/TikTok) | Kimi K3 | Per campaign |

## Content Workflow

```
1. Brief → Claude (strategy + outline)
2. Long-form copy → Kimi K3 (128K context)
3. Images → Genspark (thumbnails, OG images)
4. Video → Higgsfield (shorts, brand content)
5. Deploy → Cloudflare Pages or JUKEYMAN email
6. Distribute → GHL automation → list segments
```

## Brand Voice

All content passes the RJ Mirror Engine (PART 0.85 of SUPREME META AGI):
- No AI slop: no "leverage", "seamless", "transformative", "game changer"
- Chatty, Gen Z cadence. Short punchy lines. Builder-brained.
- CTAs imperative + specific. Hero headlines ≤12 words.
- Cyan #06b6d4 → Pink #ec4899 gradient in visuals
- Dark background: #030712
- Poppins 700/800 for headings

## Common Tasks

```
@rj-content-engine write 5 TikTok scripts for [product]
@rj-content-engine generate 30 social posts for [month] content calendar
@rj-content-engine create email sequence (7 emails) for credit repair leads
@rj-content-engine make hero image for [landing page] — cyan/pink gradient
@rj-content-engine write VSL script for [offer] — 3 minutes
@rj-content-engine generate blog post (2000 words) on [topic] — SEO optimized
@rj-content-engine batch create 10 ad headlines for [product]
```

## Niches

Credit repair, real estate investing, AI tools, online courses, business automation, JUKEYMAN agency services.
