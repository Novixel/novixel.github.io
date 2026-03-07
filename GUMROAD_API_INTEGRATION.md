# Gumroad API Integration Guide

**Connect Gumroad sales data to Novixel Command Center**

---

## 📋 Overview

Gumroad provides:
- REST API for sales/product data
- Webhooks for real-time events
- Ping notifications for sales

---

## 🔑 Getting Your API Key

1. Go to: https://app.gumroad.com/settings/advanced
2. Scroll to "Application Form"
3. Create application (if needed)
4. Copy your **Access Token**

**Keep this secret!**

---

## 🔌 API Endpoints

### Base URL
```
https://api.gumroad.com/v2/
```

### Get Sales
```bash
GET /sales
```

**Example:**
```bash
curl https://api.gumroad.com/v2/sales?access_token=YOUR_TOKEN
```

**Response:**
```json
{
  "success": true,
  "sales": [
    {
      "id": "abc123",
      "product_name": "Turbo",
      "price": 900,
      "formatted_display_price": "$9.00",
      "purchase_date": "2026-02-21T17:00:00Z",
      "email": "buyer@example.com"
    }
  ]
}
```

### Get Products
```bash
GET /products
```

**Example:**
```bash
curl https://api.gumroad.com/v2/products?access_token=YOUR_TOKEN
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "turbo123",
      "name": "Turbo",
      "url": "https://gumroad.com/l/turbo",
      "price": 900,
      "sales_count": 5,
      "sales_usd_cents": 4500
    }
  ]
}
```

---

## 🔔 Webhooks

### Setup

1. Go to: https://app.gumroad.com/settings/webhooks
2. Add webhook URL: `https://novixel.ca/api/gumroad-webhook`
3. Select events: `sale`, `refund`, `dispute`

### Webhook Payload (Sale)

```json
{
  "seller_id": "your_seller_id",
  "product_id": "turbo123",
  "product_name": "Turbo",
  "permalink": "turbo",
  "price": 900,
  "formatted_display_price": "$9.00",
  "gumroad_fee": 43,
  "currency": "usd",
  "quantity": 1,
  "discover_fee_charged": false,
  "can_contact": true,
  "referrer": "direct",
  "email": "buyer@example.com",
  "ip_country": "United States",
  "is_gift_sender_purchase": false,
  "is_gift_receiver_purchase": false,
  "sale_id": "abc123",
  "sale_timestamp": "2026-02-21T17:00:00Z"
}
```

### Verify Webhook

Gumroad doesn't sign webhooks. Verify by:
1. Checking IP (from Gumroad IPs)
2. Calling API to verify sale_id exists

---

## 💻 Integration Code

### Node.js Express Example

```javascript
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const GUMROAD_TOKEN = process.env.GUMROAD_TOKEN;

// Get sales data
app.get('/api/gumroad/sales', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.gumroad.com/v2/sales?access_token=${GUMROAD_TOKEN}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint
app.post('/api/gumroad-webhook', (req, res) => {
  const sale = req.body;
  
  console.log('New sale!', {
    product: sale.product_name,
    price: sale.formatted_display_price,
    email: sale.email,
    timestamp: sale.sale_timestamp
  });
  
  // Store in database
  // Send notification
  // Update dashboard
  
  res.status(200).send('OK');
});

app.listen(3000);
```

### Python Flask Example

```python
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

GUMROAD_TOKEN = os.getenv('GUMROAD_TOKEN')

@app.route('/api/gumroad/sales')
def get_sales():
    response = requests.get(
        f'https://api.gumroad.com/v2/sales?access_token={GUMROAD_TOKEN}'
    )
    return jsonify(response.json())

@app.route('/api/gumroad-webhook', methods=['POST'])
def webhook():
    sale = request.json
    
    print(f"New sale! {sale['product_name']} - {sale['formatted_display_price']}")
    
    # Store in database
    # Send notification
    # Update dashboard
    
    return 'OK', 200

if __name__ == '__main__':
    app.run(port=3000)
```

---

## 🎯 Command Center Integration

### Update command-center.html

Add this to fetch real data:

```javascript
async function fetchGumroadData() {
    const token = localStorage.getItem('gumroad_token');
    if (!token) return;
    
    try {
        // Fetch sales
        const salesRes = await fetch(`https://api.gumroad.com/v2/sales?access_token=${token}`);
        const salesData = await salesRes.json();
        
        // Fetch products
        const productsRes = await fetch(`https://api.gumroad.com/v2/products?access_token=${token}`);
        const productsData = await productsRes.json();
        
        // Update UI
        updateDashboard(salesData, productsData);
    } catch (error) {
        console.error('Failed to fetch Gumroad data:', error);
    }
}

function updateDashboard(sales, products) {
    // Calculate totals
    let totalRevenue = 0;
    let today = new Date().toDateString();
    let todaySales = 0;
    
    sales.sales.forEach(sale => {
        totalRevenue += sale.price;
        let saleDate = new Date(sale.purchase_date).toDateString();
        if (saleDate === today) {
            todaySales += sale.price;
        }
    });
    
    // Update stat cards
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = 
        `$${(totalRevenue / 100).toFixed(2)}`;
    document.querySelector('.stat-card:nth-child(1) .stat-change').textContent = 
        `+$${(todaySales / 100).toFixed(2)} today`;
    
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = 
        sales.sales.length;
    
    // Update product cards
    products.products.forEach(product => {
        let card = document.querySelector(`[data-product-id="${product.id}"]`);
        if (card) {
            card.querySelector('[data-stat="sales"]').textContent = product.sales_count;
            card.querySelector('[data-stat="revenue"]').textContent = 
                `$${(product.sales_usd_cents / 100).toFixed(2)}`;
        }
    });
}

// Auto-refresh every 5 minutes
setInterval(fetchGumroadData, 300000);
fetchGumroadData(); // Initial fetch
```

---

## 🔒 Security

### Store Token Securely

**Don't hardcode in frontend!**

Options:
1. **Backend proxy** (recommended)
   - Store token on server
   - Frontend calls your API
   - Your API calls Gumroad

2. **Environment variables** (server-side)
   ```bash
   export GUMROAD_TOKEN="your_token_here"
   ```

3. **Local storage** (quick test only)
   ```javascript
   localStorage.setItem('gumroad_token', 'your_token');
   ```

### CORS

Gumroad API doesn't support CORS. You need a backend proxy.

---

## 📊 Dashboard Features to Add

### Real-time Stats
- ✅ Total revenue
- ✅ Sales count
- ✅ Today's sales
- Revenue by product
- Sales chart (last 30 days)

### Product Management
- Edit product details
- Update pricing
- View refunds
- Export sales data

### Notifications
- Email on new sale
- Discord webhook
- SMS alerts
- Desktop notifications

---

## 🚀 Quick Setup

### 1. Get Token
```bash
# Store securely
export GUMROAD_TOKEN="your_token_here"
```

### 2. Test API
```bash
curl "https://api.gumroad.com/v2/sales?access_token=$GUMROAD_TOKEN"
```

### 3. Add Webhook
- URL: `https://novixel.ca/api/gumroad-webhook`
- Events: sale, refund

### 4. Update Command Center
- Add token to settings
- Enable auto-refresh
- Test live data

---

## 📚 Resources

- **Gumroad API Docs**: https://app.gumroad.com/api
- **Webhook Guide**: https://help.gumroad.com/article/134-webhooks
- **Ping Setup**: https://help.gumroad.com/article/167-ping

---

## 🐛 Troubleshooting

### "Invalid access token"
→ Regenerate token in Gumroad settings

### "CORS error"
→ Need backend proxy (can't call from browser directly)

### "Webhook not firing"
→ Check webhook URL is publicly accessible
→ Verify SSL certificate (HTTPS required)

### "No sales data"
→ Make sure you have sales in Gumroad
→ Check API token has correct permissions

---

## ✅ Next Steps

1. Get Gumroad API token
2. Set up backend proxy
3. Test API calls
4. Add webhooks
5. Update command center
6. Enable auto-refresh
7. Add notifications

**Your command center will be live with real sales data!** 🎉
