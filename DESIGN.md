# Novixel Labs Design Reference

This document captures the current visual system used by `novixel.ca`.
Use it when creating new pages, product sections, screenshots, pitch assets, or companion interfaces that should feel like Novixel Labs.

Primary source of truth: `style.css`

## Brand Position

**Name:** Novixel Labs

**Positioning:** Automation Engineering & AI Systems

**Message:** Build smarter systems. Automate repetitive work.

The design should feel technical, capable, focused, and practical. It can carry a dark terminal-inspired lab feeling, but it should still be readable, organized, and business-ready.

## Design Principles

- Lead with systems, automation, AI, dashboards, APIs, and operational software.
- Prefer clean utility over decorative marketing gloss.
- Use dark mode as the signature look.
- Keep light mode calm, gray, and high contrast.
- Use green as the primary brand signal, with teal and amber for supporting statuses.
- Cards should feel like functional panels, not floating gimmicks.
- Keep radius modest and consistent.
- Avoid oversized decoration unless it directly supports the page.

## Theme Tokens

### Light Mode

Light mode uses a soft gray canvas instead of pure white. The green is intentionally darker so it remains readable on pale surfaces.

| Purpose | Token | Value |
| --- | --- | --- |
| Page background | `--bg` | `#e9eee9` |
| Main panel | `--panel` | `#f8faf8` |
| Nested panel | `--panel2` | `#eef4ef` |
| Border | `--border` | `#c7d3ca` |
| Main text | `--text` | `#17231b` |
| Muted text | `--muted` | `#4f5e55` |
| Brand green | `--accent` | `#007a35` |
| Brand green hover | `--accent-light` | `#0a8f42` |
| Deep green | `--accent-dark` | `#005f2a` |
| Amber status | `--accent-amber` | `#8a5a00` |
| Teal status | `--accent-teal` | `#007a78` |
| Shadow | `--shadow` | `0 12px 28px rgba(8,24,14,.09)` |

### Dark Mode

Dark mode keeps the terminal-lab identity. The neon green is acceptable here because the background is nearly black.

| Purpose | Token | Value |
| --- | --- | --- |
| Page background | `--bg-dark` | `#0a0a0a` |
| Main panel | `--panel-dark` | `#111111` |
| Nested panel | `--panel2-dark` | `#0d0d0d` |
| Border | `--border-dark` | `#1e1e1e` |
| Main text | `--text-dark` | `#00ff00` |
| Muted text | `--muted-dark` | `#b0b0b0` |
| Brand green | `--accent` | `#00ff66` |
| Brand green hover | `--accent-light` | `#00ff66` |
| Deep green | `--accent-dark` | `#00cc55` |
| Amber status | `--accent-amber` | `#fbbf24` |
| Teal status | `--accent-teal` | `#2dd4bf` |
| Shadow | `--shadow-dark` | `0 10px 30px rgba(0,0,0,.6)` |

### Useful RGBA Values

| Use | Light value | Dark value |
| --- | --- | --- |
| Hero glow | `rgba(0,122,53,.12)` | `rgba(0,255,102,.12)` |
| Proof row background | `rgba(0,122,53,.055)` | `rgba(0,255,102,.025)` |
| Proof row border | `rgba(0,95,42,.16)` | `rgba(57,255,136,.1)` |
| Card shadow | `rgba(8,24,14,.08)` | `rgba(0,0,0,.6)` |
| Focus ring | `rgba(0,122,53,.12)` | `rgba(57,255,136,.08)` |
| Default status fill | `rgba(0,122,53,.08)` | `rgba(57,255,136,.08)` |

## Typography

Use the system font stack:

```css
font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
```

### Base Text

- Body line height: `1.55`
- Paragraph line height: `1.6`
- Paragraph color: `--muted` in light mode, `--muted-dark` in dark mode
- Main headings use `--text` in light mode and bright green or light gray in dark mode

### Heading Scale

| Element | Size | Notes |
| --- | --- | --- |
| `h1` | `34px` desktop, `26px` mobile | Used for the site name in the header |
| `h2` | `22px` | Standard section heading |
| `h3` | `16px` | Card heading |
| `.heroTitle` | `clamp(2.1rem, 5vw, 3.4rem)` | Primary hero headline |
| `.lead` | `1.08rem` | Hero and intro paragraph |
| `.eyebrow` | `12px`, `700`, `letter-spacing: .16em` | Uppercase-style label |
| `.status` | `11px`, `700`, `letter-spacing: .07em` | Status chips |

## Layout

### Page Container

```css
.container {
    max-width: 980px;
    margin: 0 auto;
    padding: 28px 18px 36px;
}
```

For wider experiences, pages can override `--max`, as `game.html` does with `--max: 1120px`.

### Panel Stack

Use `.panelStack` for vertical page rhythm.

```css
.panelStack {
    display: grid;
    gap: 18px;
}
```

### Grids

Use these existing grid patterns:

| Class | Use |
| --- | --- |
| `.grid2` | Two-column content, stacks on mobile |
| `.grid3` | Three compact cards, stacks below `860px` |
| `.serviceGrid` | Three service/product cards |
| `.serviceGridFour` | Two-column service section |
| `.contactLayout` | Main contact form plus aside |
| `.offerCard` | Main offer copy plus action panel |

## Core Components

### Header

Header structure:

- Left: logo button with `.mainlogo`
- Center: `.headline`
- Right: theme toggle `.iconBtn`

Use the location badge for short context only.

```html
<span class="location">Remote-first | Dawson Creek, BC</span>
```

Light badge border: `rgba(0, 95, 42, .32)`

Dark badge border: `rgba(57,255,136,.3)`

### Tabs

Tabs are pill buttons inside `.tab`.

```css
.tablinks {
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--panel);
    color: var(--text);
}
```

Active light mode:

- Background: `--accent`
- Border: `--accent`
- Text: `white`
- Shadow: `0 5px 16px rgba(0, 95, 42, 0.24)`

Active dark mode:

- Background: `rgba(57, 255, 136, 0.1)`
- Border: `rgba(57, 255, 136, 0.45)`
- Text: `--text-dark`

### Cards

Use `.card` and `.heroCard` for major panels.

```css
.card,
.heroCard {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    box-shadow: var(--shadow);
    text-align: left;
}
```

Dark cards:

```css
background: linear-gradient(180deg, rgba(0,0,0,.92), rgba(10,10,10,.92));
border-color: rgba(255,255,255,.08);
```

### Mini Cards and Service Cards

Use `.miniCard` for compact proof/problem cards.
Use `.serviceCard` for services, products, and project previews.

```css
background: var(--panel2);
border: 1px solid var(--border);
border-radius: 12px;
```

Light mode adds a soft shadow:

```css
box-shadow: 0 6px 18px rgba(8, 24, 14, .05);
```

Dark mode uses:

```css
background: rgba(0,0,0,.35);
border-color: rgba(255,255,255,.06);
```

### Hero Intro

Use `.heroIntro` for the main first panel.

Light mode:

```css
background:
    radial-gradient(circle at 86% 12%, rgba(0,122,53,.12), transparent 34%),
    linear-gradient(180deg, #f8faf8, #edf4ee);
border-color: rgba(0, 95, 42, .18);
```

Dark mode:

```css
background:
    radial-gradient(circle at 86% 12%, rgba(0,255,102,.12), transparent 33%),
    linear-gradient(180deg, rgba(0,0,0,.96), rgba(8,12,10,.96));
border-color: rgba(57,255,136,.12);
```

### Buttons

Base button:

```css
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--panel);
    color: var(--text);
    min-width: 140px;
    font-size: 14px;
    font-weight: 500;
}
```

Primary button:

```css
.btn.primary {
    border-color: var(--accent);
    background: linear-gradient(135deg, var(--accent), var(--accent-dark));
    color: white;
}
```

Dark primary button:

```css
background: linear-gradient(180deg, rgba(57,255,136,.22), rgba(0,0,0,.9));
color: var(--accent);
```

Use icons inside buttons when helpful:

```html
<button class="btn primary" type="button">
    <i class="fas fa-play"></i>Start Run
</button>
```

### Pills

Use `.pill` for capabilities, filters, and short categories.

Light mode:

```css
border-color: rgba(0, 95, 42, .18);
background: rgba(0, 122, 53, .055);
color: var(--accent-dark);
```

Dark mode:

```css
border-color: rgba(57,255,136,.15);
background: rgba(57,255,136,.06);
color: rgba(57,255,136,.9);
```

Active filters:

- Light: `rgba(0,122,53,.12)`
- Dark: `rgba(57,255,136,.15)`

### Status Chips

Use `.status` for operational state labels.

| Class | Meaning | Light color | Dark color |
| --- | --- | --- | --- |
| `.status.active` | Active workflow system | `#007a35` | `#00ff66` |
| `.status.available` | Available product | `#007a35` | `#00ff66` |
| `.status.live` | Live SaaS or remote status | `#007a78` | `#2dd4bf` |
| `.status.remote` | Remote-first status | `#007a78` | `#2dd4bf` |
| `.status.premium` | Selective local or premium | `#8a5a00` | `#fbbf24` |
| `.status.lab` | Experimental lab | `#4f5e55` | `#b0b0b0` |
| `.status.internal` | Internal tooling | `#4f5e55` | `#b0b0b0` |
| `.status.archive` | Archived work | `#4f5e55` | `#b0b0b0` |

### Proof Row

Use `.metricsRow.proofRow` for short proof signals.

Light:

```css
background: rgba(0,122,53,.055);
border: 1px solid rgba(0,95,42,.16);
```

Dark:

```css
background: rgba(0,255,102,.025);
border-color: rgba(57,255,136,.1);
```

### Offer Panel

Use `.offerCard` for a split CTA block.

```css
.offerCard {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(250px, .9fr);
    gap: 22px;
    align-items: center;
}
```

The action panel uses `.offerAction`.

Light:

```css
border: 1px solid rgba(0,95,42,.16);
background: rgba(0,122,53,.045);
```

Dark:

```css
border-color: rgba(57,255,136,.16);
background: rgba(57,255,136,.035);
```

### Forms

Forms use `.contactForm`.

Inputs and textareas:

```css
padding: 12px 14px;
border-radius: 12px;
border: 1px solid var(--border);
background: var(--panel);
color: var(--text);
font-size: 14px;
```

Light mode form fields:

```css
background: #ffffff;
border-color: #bccac0;
```

Focus ring:

```css
box-shadow: 0 0 0 3px rgba(0, 122, 53, .12);
```

Dark focus ring:

```css
box-shadow: 0 0 0 3px rgba(57,255,136,.08);
```

## Responsive Rules

At `860px` and below:

- `.serviceGrid` stacks to one column
- `.grid2` stacks to one column
- `.grid3`, `.caseGrid`, `.serviceGridFour`, `.offerCard`, and `.contactLayout` stack to one column
- Header wraps with centered headline

At `500px` and below:

- Cards and hero panels use `width: calc(100vw - 28px)`
- Tabs become a three-column grid
- Hero title uses `1.9rem`
- Proof rows stack vertically

## Accessibility and Contrast

Recent light-mode contrast checks:

| Pair | Contrast |
| --- | --- |
| Main text on panel | `15.49` |
| Muted text on panel | `6.53` |
| Accent text on panel | `5.22` |
| White text on green button | `5.48` |
| Teal text on panel | `4.94` |
| Amber text on panel | `5.65` |

Targets:

- Body text should stay above `4.5:1`
- Large text should stay above `3:1`
- Do not use dark-mode neon green on light backgrounds
- Use `--accent` in light mode and allow dark mode to override it

## Copy Style

Preferred phrases:

- Automation Engineering & AI Systems
- Build smarter systems
- Automate repetitive work
- Workflow automation
- AI systems
- Custom software
- API integrations
- Operational dashboards
- Remote-first
- Workflow Automation Audit
- Free workflow call
- Paid workflow audit

Avoid making older product/category framing lead the main site. The active brand direction is Novixel Labs as an automation and AI systems studio.

## Common Page Pattern

```html
<div class="panelStack">
    <div class="heroCard heroIntro">
        <p class="eyebrow">AUTOMATION ENGINEERING &amp; AI SYSTEMS</p>
        <h2 class="heroTitle">Build Smarter Systems.</h2>
        <p class="lead">Short positioning copy goes here.</p>
        <div class="pillRow">
            <span class="pill">Workflow Automation</span>
            <span class="pill">AI Systems</span>
            <span class="pill">API Integrations</span>
        </div>
        <div class="ctaRow">
            <a class="btn primary" href="/?tab=Contact">Start the Conversation</a>
            <a class="btn ghost" href="/?tab=Projects">View Real Systems</a>
        </div>
    </div>

    <div class="card">
        <div class="sectionHeading">
            <p class="eyebrow">SECTION LABEL</p>
            <h2>Section headline.</h2>
        </div>
        <div class="grid3">
            <article class="miniCard">
                <h3><i class="fas fa-cogs"></i> Card Title</h3>
                <p>Card copy.</p>
            </article>
        </div>
    </div>
</div>
```

## Implementation Notes

- Keep shared styling in `style.css`.
- Update the `style.css?v=` cache key on active pages when making visible CSS changes.
- Use `body.dark-mode` overrides for dark-specific styling.
- Use `body:not(.dark-mode)` only when light mode needs an explicit fix.
- Keep cards, buttons, inputs, and badges on the existing `12px` radius unless there is a strong reason to change it.
- Use Font Awesome icons already included by the site when adding icon labels.
- Avoid adding new color values unless they become reusable tokens.
