# Novixel Portfolio Design System v3

**Last Updated:** January 9, 2026  
**Applies to:** `Novixel.html` (portfolio page) using `style.css` + `script.js`

---

## Design Philosophy

- **Dark "console/hacker" vibe** with professional polish
- **Security-first, reliability-focused** messaging
- **Clean typography and spacing** — no template feel
- **Subtle green accent** (`#009f33` light / `#39ff88` dark mode)

---

## Color Palette

### Light Mode
```css
--bg: #f0f0f0;
--panel: #ffffff;
--panel2: #f8f8f8;
--border: #ddd;
--text: #333;
--muted: #666;
--accent: #009f33;
```

### Dark Mode
```css
--bg-dark: #0b0d10;
--panel-dark: #10151c;
--panel2-dark: #0f1319;
--border-dark: #253043;
--text-dark: #e8eef7;
--muted-dark: #a9b5c6;
--accent-light: #39ff88;
```

### Background Gradient (Dark Mode)
```css
background: radial-gradient(1200px 600px at 50% 0%, rgba(57,255,136,.08), transparent 55%), var(--bg-dark);
```

---

## Typography

- **Font Stack:** `system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`
- **Line Height:** `1.55`
- **H1:** 34px (26px mobile)
- **H2:** 22px
- **H3:** 16px
- **Body:** 1em (16px base)
- **Small/Muted:** 13px
- **Tiny:** 12px

---

## Component Patterns

### Header Layout
```html
<header class="header">
    <button class="logoBtn">
        <img class="mainlogo" src="Novixel-icon-Trans1.png" alt="Novixel logo">
    </button>
    <div class="headline">
        <h1>Find Your Solution</h1>
        <p class="subhead">
            Tagline here.
            <span class="location">Dawson Creek, BC</span>
        </p>
    </div>
    <button class="iconBtn fas fa-moon" onclick="toggleDarkMode(event)"></button>
</header>
```

### Tab Navigation
```html
<nav class="tab" role="tablist">
    <button class="tablinks" role="tab" aria-selected="true" aria-controls="Home" id="tab-Home" onclick="openTab(event, 'Home')">Home</button>
    <!-- More tabs... -->
</nav>
```

### Cards
```html
<!-- Hero card (main content) -->
<div class="heroCard">...</div>

<!-- Standard card -->
<div class="card">...</div>

<!-- Mini card (grid items) -->
<div class="miniCard">...</div>

<!-- Service card (3-column grid) -->
<article class="serviceCard">...</article>
```

### Pills/Tags
```html
<div class="pillRow">
    <span class="pill">Automation & APIs</span>
    <span class="pill">Web Apps</span>
</div>
```

### Trust Block
```html
<div class="trustBlock">
    <span><i class="fas fa-map-marker-alt"></i> Local in Dawson Creek</span>
    <span><i class="fas fa-bolt"></i> Fast Turnaround</span>
    <span><i class="fas fa-tag"></i> Clear Pricing</span>
    <span><i class="fas fa-comments"></i> No Jargon</span>
</div>
```

### CTA Buttons
```html
<div class="ctaRow">
    <a class="btn primary" href="#contact">Get a Quote</a>
    <a class="btn ghost" href="https://example.com">Secondary Action</a>
</div>
```

### Process Steps
```html
<div class="processSection">
    <h3>How It Works</h3>
    <div class="processSteps">
        <div class="processStep">
            <span class="stepNumber">1</span>
            <strong>Message</strong>
            <p class="muted">Send details about what you need</p>
        </div>
        <!-- Steps 2, 3... -->
    </div>
</div>
```

### Service List
```html
<ul class="serviceList">
    <li><strong>Service Name</strong> — brief description</li>
</ul>
```

### Contact Form
```html
<form id="contactForm" class="contactForm" action="mailto:novixel@hotmail.com" method="POST" enctype="text/plain">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" autocomplete="name" required>
    <!-- More fields... -->
    <div class="ctaRow">
        <input class="btn primary" type="submit" value="Send Message">
        <a class="btn ghost" href="https://calendly.com/novixel">Book a Call</a>
    </div>
</form>
```

### Footer
```html
<footer class="footer">
    <hr class="separator">
    <div class="footerLinks">
        <a href="Novixel.html">Portfolio</a>
        <a href="tradingbots.html">Trading Solutions</a>
        <a href="https://try.novalite.app" target="_blank" rel="noopener">NovaLite</a>
        <a href="aicom.html">AI Solutions</a>
    </div>
    <p class="tiny muted">&copy; 2026 Novixel. All rights reserved.</p>
</footer>
```

---

## Grid Layouts

### 2-Column Grid (Skills)
```css
.grid2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}
```

### 3-Column Grid (Services)
```css
.serviceGrid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
}
```

### Responsive Breakpoint
At `860px`, both grids collapse to single column.

---

## JavaScript Functions

| Function | Purpose |
|----------|---------|
| `toggleDarkMode(event)` | Toggle dark mode class on body |
| `openTab(evt, tabName)` | Switch between tab panels |
| `jumpToContact(e)` | Scroll to contact section |
| `scrollToTop()` | Smooth scroll to page top |
| `CoolThing()` | Easter egg: swap logo images |
| `initContactForms()` | Enhance mailto forms with subject prefix |

---

## Copy Guidelines

### Voice
- **Confident, not arrogant**
- **Technical, not complex**
- **Minimal, not sparse**
- **Professional, not corporate**

### Avoid
- Hype language ("revolutionary", "game-changing")
- Emoji in body copy (checkmarks ✓ OK in lists)
- Passive voice
- Vague timelines

### Good Examples
- "Clear communication. Fast troubleshooting. Clean solutions that don't fall apart later."
- "Typical turnaround: same day to 3 days depending on scope."
- "If you can explain the outcome you want, I can map the steps and build the solution."

---

## File Dependencies

```
Novixel.html
├── style.css?v=3
├── script.js?v=2
├── FavIcon.png
├── Novixel-icon-Trans1.png
├── Novixel-icon-Trans2.png
└── Font Awesome 5.15.3 (CDN)
```

---

## Hidden Pages (Not in Navigation)

- `coffee.html` — Coffee Solutions business plan
- `novatrade.html` — Enterprise trading platform
- `bots.html` — Trading bots detail page

---

## Future Improvements

1. Replace mailto form with Formspree/Netlify Forms
2. Add mini portfolio section (2-3 project screenshots)
3. Add testimonials block
4. Consider adding subtle animations (intersection observer)
