# Novixel Labs Website - AI Coding Instructions

## Project Overview

This is the static GitHub Pages site for **Novixel Labs**, an automation engineering and AI systems business. The site is built with vanilla HTML, CSS, and JavaScript. There is no build step.

Primary positioning:

- Automation Engineering & AI Systems
- Workflow automation, AI workflow systems, custom software, dashboards, API integrations, and premium technical support
- Company voice uses "we"
- First buyer focus is remote AI/SaaS and automation clients; local technical support is kept as a premium specialty

## Current Public Structure

The main site keeps a tabbed layout in `index.html`:

- Home
- Services
- Projects
- Products
- About
- Contact

Legacy route files such as `about.html`, `products.html`, and `Novixel.html` should remain lightweight redirects into the tabbed homepage.

Important active pages:

- `index.html`: primary tabbed site
- `style.css`: shared site styling
- `script.js`: tab handling, theme handling, forms, and product filters
- `computer-solutions.html`: premium local technical support page
- `locallarry/index.html`: LocalLarry product page
- `atomic/index.html`: Atomic Diff product page
- `products/ai-starter-kit.html`: AI Starter Kit product page
- `checkout-success/index.html`: product checkout/download handoff
- `products/products-data.js`: product metadata used by product/checkout flows

## Brand And Copy Rules

Use **Novixel Labs** for public identity.

Preferred hero message:

> Build Smarter Systems. Automate Repetitive Work.

Preferred short description:

> Novixel Labs designs custom automation, AI workflow systems, dashboards, and internal tools that help businesses save time, reduce errors, and operate more efficiently.

Service language should prioritize:

- Workflow Automation
- AI Systems
- Custom Software
- API Integrations
- Operational Dashboards
- Premium Technical Support

Avoid making "trading" a primary service. NovaLite belongs under Projects/Products as proof of SaaS and automation capability.

## Audit Offer

Use this three-step model:

- **Free Workflow Call**: a quick intro call to understand the problem and see if there is a real automation opportunity.
- **Paid Workflow Audit**: a deeper review where we map the process, identify automation opportunities, and deliver a written roadmap.
- **Build Phase**: only after the audit, quote the actual software or automation work.

Preferred site wording:

> Start with a free workflow call. If there is a strong fit, we can move into a paid workflow audit that maps the process, identifies automation opportunities, and creates a practical build plan.

## Proof Projects

Strong proof pieces to feature:

- GlassTracker: real operational workflow software for a glass shop; better tracking, time savings, faster quote preparation
- NovaLite: live SaaS for customizable Coinbase API trading bots; security is a priority
- LocalLarry: available local-first AI product
- Command Center: internal operations dashboard; describe generically unless screenshots are intentionally blurred
- Back Seat Gamer: accessibility origin, then ML/RL/AI agent experiment
- AI Memory Platform / Internal Agent Infrastructure: do not publish the name Karl

## Development Workflow

Use direct browser testing or a local static server. There is no package install or bundler required.

Suggested checks after edits:

```powershell
git diff --check
node --check script.js
node --check products/products-data.js
```

For link checks, focus on active public pages first. Archived product pages may intentionally retain older wording until they are either refreshed or retired.

## File Cleanup Guidance

The repo has older experiments and product pages. Be conservative with anything tied to Stripe or downloads.

Safe cleanup patterns:

- Move outdated planning docs and unused root assets into `archive/`.
- Keep the verification file `9nq6lcsfatmhwo88nljxyzex811oci.html`.
- Keep `CNAME`, icons, current logos, and active product assets.
- Replace stale public pages with redirect stubs when the content conflicts with the current brand.
- Do not delete or redirect product/payment pages unless the product flow has been checked.

## Common Pitfalls

- Do not reintroduce the old "Divisions" navigation.
- Do not link to `try.novalite.app`; use `https://novalite.app` unless there is a specific reason.
- Do not make old AI companion or trading pages primary nav destinations.
- Do not expose internal Command Center details as a live public page.
- Do not present rough prototypes as polished client products; use status labels like Available, Prototype, Internal R&D, Coming Soon, or Archive.
