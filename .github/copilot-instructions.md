# Novixel Portfolio Website - AI Coding Instructions

## Project Overview
Static GitHub Pages portfolio for **Novixel** - a technology services company based in Dawson Creek, BC with multiple specialized divisions. Built with vanilla HTML/CSS/JS (legacy system) and selective Tailwind CDN pages for modern landing pages.

## Architecture & File Organization

### Two Styling Systems (Critical)
1. **Legacy system** (`style.css` + `script.js`): Used by `Novixel.html`, `about.html`, `calculator.html`, `game.html`, `tradingbots.html`
2. **Modern system** (`styleid.css` + `scriptid.js`): Used by `index.html` (main landing page)
3. **Standalone system**: `novatrade.html` uses inline Tailwind CDN with custom CSS variables

**Never mix these systems.** When editing a page, always check which stylesheet it imports in the `<head>`.

### Brand Architecture
**Parent Company**: Novixel (based in Dawson Creek, BC)

**Divisions**:
- **Novixel Computer Solutions** (`index.html`, `idte.html`) - IT support, mobile tech services
- **Novixel Software Solutions** (`tradingbots.html`) - Custom automation, trading bots
- **Novixel Trading Solutions**:
  - **NovaTrade** (`novatrade.html`) - Enterprise crypto trading platform (investor-focused)
  - **NovaLite** (`novalite.html`) - Personal crypto trading automation
- **Novixel Coffee Solutions** (`coffee.html`) - Office coffee services business plan
- **Novixel AI Solutions** (`aicom.html`) - AI companion chat interface

### Page Structure
- **`Novixel.html`**: **PRIMARY** - Main portfolio hub with tabbed navigation (use this style as template)
- **`index.html`/`idte.html`**: Novixel Computer Solutions landing (modern system)
- **`novatrade.html`**: NovaTrade enterprise platform (Tailwind + gold theme)
- **`novalite.html`**: NovaLite personal trading (Tailwind + lime theme)
- **`coffee.html`**: Coffee Solutions business plan (Tailwind + warm theme)
- **`aicom.html`**: AI companion interface (Tailwind + blue theme)
- **`tradingbots.html`**: Trading bots showcase (legacy system)
- **Utility pages**: `calculator.html`, `game.html` (endless jump game), `dev.html` (project showcase)
- **`about.html`**: Basic about page (legacy, minimal)
- **`special/index.html`**: Subdirectory landing page
- **`investor-deck.md`**: Markdown investor deck for NovaTrade (426 lines)

## Styling Conventions

### Dark Mode Implementation
Both systems support dark mode but implement it differently:

**Legacy (`script.js`)**: 
- Uses OS preference detection: `window.matchMedia('(prefers-color-scheme: dark)')`
- Icon toggle: `.fa-moon` ↔ `.fa-sun`
- Class: `body.dark-mode`

**Modern (`scriptid.js`)**:
- Checks localStorage first, then OS preference
- Persists user choice: `localStorage.setItem('theme', 'dark'/'light')`
- Same icon toggle pattern

### CSS Variables Pattern (Modern System)
```css
:root {
  --clr-green-main: #009f33;
  --primary-color: var(--clr-green-main);
  /* Light theme variables */
}

body.dark-mode {
  /* Dark theme overrides */
  --primary-color: var(--clr-green-light);
}
```

### Tailwind Usage (bots.html only)
Uses CDN: `<script src="https://cdn.tailwindcss.com"></script>`
Custom CSS variables defined inline:
```css
:root {
  --gold-primary: #D4AF37;
  --bg-main: #1a1a1a;
  /* NovaTrade color palette */
}
```

## JavaScript Patterns

### Global Configuration
`script.js` defines: `window.MAIL_SUBJECT_PREFIX = '[SITE]';` - used for all mailto form submissions.

### Contact Form Enhancement
Forms with `action="mailto:..."` are enhanced via `initContactForms()`:
- Intercepts submit to build mailto link with proper subject/body formatting
- Injects name, email, message into body
- Always includes global subject prefix

### Tabbed Navigation (Legacy)
Function `openTab(evt, tabName)` controls tab visibility in `Novixel.html`:
- Hides all `.tabcontent`
- Removes `.active` from all `.tablinks`
- Shows target tab and marks button active

### Mobile Navigation (Modern)
`setupMobileNavigation()` in `scriptid.js`:
- Toggles `.nav-open` on `.nav-links`
- Toggles `.open` on `.nav-toggle` (hamburger animation)
- Auto-closes menu when nav link clicked

## Key Assets
- **Logo variants**: `Novixel-icon-Trans1.png` (default), `Novixel-icon-Trans2.png` (alternate)
- **FavIcon**: `FavIcon.png` (used in legacy pages)
- **Hero image**: `friendly.png` (index.html)
- **Design mockup**: `Web Desing.png` [sic]

## External Dependencies
- **Font Awesome**: v5.15.3 (legacy) and v6.0.0-beta3 (modern)
- **Google Fonts**: Quicksand, Roboto (modern), Inter (bots.html)
- **Chart.js**: Used in `tradingbots.html`
- **Calendly**: Booking integration at `https://calendly.com/novixel`

## Development Workflow
1. **Local testing**: Open HTML files directly in browser (no build step)
2. **Custom domain**: Managed via `CNAME` → `novixel.ca`
3. **Deployment**: Push to main branch (GitHub Pages)

## Critical Patterns

### Adding New Pages
1. **Choose styling system** based on surrounding pages
2. **Include dark mode button**: `<button class="fas fa-moon" onclick="toggleDarkMode(event)"></button>`
3. **Add navigation header** with consistent links structure
4. **Import correct CSS/JS**: `style.css` + `script.js` OR `styleid.css` + `scriptid.js`
5. **Add separator**: `<hr class="separator">` after header sections

### Unified Footer Pattern (All Legacy Pages)
ALL legacy system pages (`Novixel.html`, `calculator.html`, `game.html`, `tradingbots.html`, `about.html`, `dev.html`) use a unified footer with:
- **Division links**: Buttons linking to all Novixel divisions with themed colors
- **Social media icons**: Instagram, Twitter/X, YouTube
- **Contact info**: Email and phone number
- **Copyright**: "© 2025 Novixel. All rights reserved."

The footer uses inline styles for the division buttons with color-coded backgrounds:
- Computer Solutions: `#009f33` (green)
- Trading Solutions: `#009f33` (green)
- NovaTrade: `#D4AF37` (gold)
- NovaLite: `#7FFF00` (lime green)
- Coffee Solutions: `#8B4513` (brown)
- AI Solutions: `#4A5568` (slate)

### Color Consistency
- **Green theme** (Computer Solutions): `#009f33`, `#005c30`, `#28b80e`
- **Gold theme** (NovaTrade): `#D4AF37`, `#E8C547`, `#B8941F`
- **Lime theme** (NovaLite): `#7FFF00`, `#90FF10`, `#6FEF00`
- **Brown theme** (Coffee): `#8B4513`, `#CD853F`
- **Slate theme** (AI): `#4A5568`, `#64748b`

## Copy & UX Style Guide

### Trading Platform Brand Voice (NovaLite & NovaTrade)

**Core Principles**:
- **Confident, not arrogant** - Assert capabilities without overpromising
- **Technical, not complex** - Use industry terms but stay accessible
- **Minimal, not sparse** - Every word earns its place
- **Professional, not corporate** - Authoritative without stuffiness

**Writing Rules**:
1. **Avoid hype language**: No "revolutionary", "game-changing", "explosive growth"
2. **Remove emoji from body copy**: Checkmarks (✓) acceptable in feature lists only
3. **Use active voice**: "Deploy strategies" not "Strategies can be deployed"
4. **Quantify when possible**: "24/7" not "around the clock", "$100" not "small amount"
5. **Front-load value**: Lead with benefit, follow with feature

**Typography Standards**:
- **Font family**: Inter (preferred), DM Sans, Space Grotesk (alternatives)
- **Headings**: Short, declarative statements (max 8 words)
  - Good: "Trade Smarter. Sleep Better."
  - Bad: "Revolutionary Platform That Will Transform Your Trading Journey"
- **Body text**: 14-16px base size, 1.6 line-height for readability
- **Button labels**: Action-first verbs ("Start Free Trial", "Download Deck", "See NovaTrade")

**Color Application**:
- **NovaLite**: Lime green (`#7FFF00`) on dark backgrounds (`#0a0a0a`, `#1a1a1a`)
- **NovaTrade**: Gold (`#D4AF37`) on dark backgrounds with subtle gradients
- **Text hierarchy**: `#ffffff` (primary), `#b0b0b0` (secondary), `#808080` (muted)

**Button Design Standards**:
```css
/* Primary CTA */
background: var(--lime-primary); /* or var(--gold-primary) */
border-radius: 8px;
padding: 8px 24px;
font-weight: 600;
transition: all 0.2s ease;

/* Hover state */
transform: translateY(-1px);
box-shadow: 0 4px 20px rgba(127, 255, 0, 0.4); /* glow effect */
```

### Messaging Framework

**Problem → Solution → Action Pattern**:
1. **Identify pain point** (emotional trading, missed opportunities, complexity)
2. **Present solution feature** (automation, proven strategies, real-time data)
3. **Show outcome** (italic subtext explaining how it solves the pain)

**Example from NovaLite**:
```
24/7 Automation
Execute trades around the clock without monitoring screens or setting alarms.
[italic] Capture overnight opportunities while you sleep.
```

**Taglines by Division**:
- **NovaLite**: "Automation that trades while you rest."
- **NovaTrade**: "Enterprise automation for professional portfolios."
- **Computer Solutions**: "Technology that works as hard as you do."

### Content Patterns

**Feature Descriptions** (3-part structure):
1. **Heading** (benefit-focused, 2-4 words)
2. **Description** (specific implementation, 10-15 words)
3. **Outcome** (italic, emotional/practical result, 6-10 words)

**Pricing Tier Copy**:
- Avoid "popular" or "best value" unless data-backed
- Use tier names that show progression: Starter → Pro → Elite
- Include one aspirational feature per tier ("Advanced Analytics", "Priority Support")

**CTA Hierarchy**:
- **Primary**: Green/gold button, direct action ("Start Free Trial")
- **Secondary**: Ghost button with border, exploratory ("Learn More", "See How It Works")
- **Tertiary**: Text link with arrow, cross-sell ("Explore NovaTrade →")

### LLM Prompt Templates (for future copy edits)

**Prompt A – Tone Matching**:
```
Rewrite this section to match NovaLite's brand voice: concise, technical, confident. 
Remove marketing fluff, emojis, and hype language. Emphasize security, automation, 
and data-driven intelligence. Use active voice and front-load benefits.

[paste section here]
```

**Prompt B – Consistency Audit**:
```
Review this webpage for tone, readability, and message consistency. Check that:
1. Each section follows Problem → Solution → Action pattern
2. No hype language ("revolutionary", "explosive", "game-changing")
3. Technical terms are accessible to semi-professional traders
4. CTAs use action verbs and clear outcomes
5. Color coding matches brand guidelines (lime for NovaLite, gold for NovaTrade)

[paste full page or section]
```

**Prompt C – UX Copy Optimization**:
```
Improve UI/UX copy for conversion while maintaining crypto automation SaaS tone:
1. Buttons: Use action verbs, show outcome ("Start Free Trial" not "Get Started")
2. Forms: Minimize friction, explain value before asking for info
3. Error states: Be specific and helpful, not generic
4. Success states: Confirm action and suggest next step

Focus on: [specific element - button, form, error message, etc.]
```

**Prompt D – Feature Explanation Rewrite**:
```
Rewrite this feature description using the 3-part structure:
1. Heading: Benefit-focused (2-4 words)
2. Description: Specific implementation (10-15 words)
3. Outcome: Italic subtext showing how it solves user pain (6-10 words)

Current text: [paste feature description]
Pain point it solves: [describe user problem]
```

### Form Pattern
```html
<form action="mailto:novixel@hotmail.com" method="POST" enctype="text/plain">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <input type="submit" value="Send">
</form>
```
Forms are auto-enhanced by `initContactForms()` to inject subject prefix and format body.

## Common Pitfalls
- **Don't use Tailwind classes** outside of `bots.html`
- **Don't mix CSS variable patterns** between systems
- **Logo toggle function** (`CoolThing()`) swaps between Trans1/Trans2 pngs - only used in `Novixel.html`
- **Calculator function** (`calculator.html`) uses global functions: `calcInput()`, `calcEquals()`, `calcClear()`
- **Empty html/ directory** exists but contains no files
