# Stripe & Products Setup Guide

## Modular Architecture

The products system is now centralized:

```
products/
├── products-data.js      # All product data in one place
├── product-styles.css    # Shared CSS for all product pages
├── PRODUCT_TEMPLATE.html # Copy this for new products
├── ai-starter-kit.html
├── ai-fundamentals.html
├── landing-page-bundle.html
└── ...
```

## Adding a New Product

### Step 1: Add to products-data.js

```javascript
'your-product-id': {
    id: 'your-product-id',
    name: 'Your Product Name',
    tagline: 'Short description',
    description: 'Longer description for meta tags',
    category: 'ai',  // ai, courses, templates, creative, enterprise
    accent: 'cyan',  // cyan, green, blue, pink, purple, amber
    icon: '🚀',
    
    pricing: {
        price: 29,
        originalPrice: 49,      // optional, shows strikethrough
        currency: 'CAD',
        type: 'one-time',       // one-time, pwyw, free
        badge: 'NEW'            // shown on hero
    },
    
    stripeLink: 'https://buy.stripe.com/YOUR_LINK',
    
    downloads: {
        main: {
            url: 'https://...',
            label: 'Download (ZIP)'
        },
        additional: [
            { url: '#', label: 'PDF Guide', icon: 'fa-file-pdf' }
        ]
    },
    
    features: [
        'Feature 1',
        'Feature 2'
    ],
    
    page: 'products/your-product-id.html'
}
```

### Step 2: Create the HTML page

```bash
# Copy the template
cp products/PRODUCT_TEMPLATE.html products/your-product-id.html
```

Edit the file and change:
```html
<script>const PRODUCT_ID = 'your-product-id';</script>
```

That's it! The page auto-populates from products-data.js.

### Step 3: Create Stripe Payment Link

1. Go to **Stripe Dashboard > Products** → Create product
2. Go to **Payment Links** → Create link for the product
3. Set redirect: `https://novixel.ca/checkout-success.html?product=your-product-id`
4. Copy the Payment Link URL
5. Update `stripeLink` in products-data.js

### Step 4: Add to Gallery (optional)

Add a card to `products.html` if you want it on the main gallery.

## Stripe Configuration

### Keys

- **Public Key**: `pk_live_51T5tiLCWpjA379Sen9E68Jomuxb5281aHSYaLauKugWgJE9Ca82CbfgtP8DfZ9xPbGK2YlSdcZYiKLIS8Sjvxvrg00qiDp9N4k`
- **Secret Key**: Environment variable `STRIPE_NOVIXEL_PRIV`

### Success URL Format

```
https://novixel.ca/checkout-success.html?product={PRODUCT_ID}&session_id={CHECKOUT_SESSION_ID}
```

## Product Categories & Accents

| Category | Accent Color | Icon |
|----------|-------------|------|
| `ai` | cyan | fa-microchip |
| `courses` | blue | fa-graduation-cap |
| `templates` | pink | fa-palette |
| `creative` | purple | fa-book |
| `enterprise` | amber | fa-building |

## CSS Classes

Use these accent classes on `<body>`:
- `accent-cyan`
- `accent-green`
- `accent-blue`
- `accent-pink`
- `accent-purple`
- `accent-amber`

## Files Reference

| File | Purpose |
|------|---------|
| `products/products-data.js` | Central product database |
| `products/product-styles.css` | Shared CSS |
| `products/PRODUCT_TEMPLATE.html` | Copy for new products |
| `products.html` | Main product gallery |
| `checkout-success.html` | Post-purchase downloads |

## Testing

1. Use Stripe test mode first
2. Test each payment link
3. Verify success page shows correct product
4. Test download links
5. Check GTM events fire (begin_checkout, purchase)

## Checklist for Each Product

- [ ] Added to `products-data.js`
- [ ] Created HTML page (or using template)
- [ ] Created Stripe product
- [ ] Created Payment Link with correct redirect
- [ ] Updated `stripeLink` in products-data.js
- [ ] Set up download hosting
- [ ] Added to products.html gallery (if desired)
- [ ] Tested purchase flow
