# Stripe Payment Links - Galactic Empire Series

## Quick Setup Guide

Go to https://dashboard.stripe.com/payment-links and create these 7 links:

### Individual Stories (PWYW - Pay What You Want)

For PWYW products, enable "Let customers adjust quantity" or use minimum price.

| # | Product Name | Price | Success URL |
|---|--------------|-------|-------------|
| 1 | Galactic Empire: The Rubble | $1+ CAD | `https://novixel.ca/checkout-success/?product=galactic-empire-01` |
| 2 | Galactic Empire: Ore and Blood | $2+ CAD | `https://novixel.ca/checkout-success/?product=galactic-empire-02` |
| 3 | Galactic Empire: The Broken Sky | $2+ CAD | `https://novixel.ca/checkout-success/?product=galactic-empire-03` |
| 4 | Galactic Empire: Echoes of War | $2+ CAD | `https://novixel.ca/checkout-success/?product=galactic-empire-04` |
| 5 | Galactic Empire: The Pirate's Shadow | $3+ CAD | `https://novixel.ca/checkout-success/?product=galactic-empire-05` |

### Bundles (Fixed Price)

| # | Product Name | Price | Success URL |
|---|--------------|-------|-------------|
| 6 | Galactic Empire: 5-Story Bundle | $5 CAD | `https://novixel.ca/checkout-success/?product=galactic-empire-bundle` |
| 7 | Galactic Empire: Origins (Complete Book) | $20 CAD | `https://novixel.ca/checkout-success/?product=galactic-empire-book` |

## Settings for Each Link

1. **Product**: Create new or select existing
2. **Price**: As listed above (CAD)
3. **After payment → Confirmation page**: Custom URL (use the Success URL above)
4. **Collect customer information**: Email only (we need it for download access)

## After Creating

Copy each payment link URL and update `products-data.js`:

```javascript
'galactic-empire-01': {
    stripeLink: 'https://buy.stripe.com/YOUR_LINK_HERE',
    // ...
},
```

Then update the product pages:
- `products/galactic-empire-01.html` 
- `products/galactic-empire-02.html`
- etc.

Find the `onclick="buyBook(event)"` or similar and replace with direct link:
```html
<a class="btn primary" href="STRIPE_LINK_HERE">Buy Now</a>
```
