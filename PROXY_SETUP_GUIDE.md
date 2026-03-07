# Backend Proxy Setup Guide

**Why you need a proxy + 3 easy ways to set it up**

---

## 🔐 The Problem: CORS (Cross-Origin Resource Security)

When you try to call Gumroad/Patreon APIs directly from browser JavaScript, you get blocked:

```javascript
// This FAILS in browser:
fetch('https://api.gumroad.com/v2/sales?access_token=YOUR_TOKEN')
// ❌ Error: CORS policy blocked
```

**Why?** Browser security prevents websites from calling APIs on different domains (to stop malicious sites from stealing your data).

---

## 🛡️ The Solution: Your Backend as a Middleman

Instead of:
```
Browser → Gumroad API (BLOCKED ❌)
```

Do this:
```
Browser → Your Server → Gumroad API (WORKS ✅)
```

Your server acts as a **proxy** (middleman) that:
1. Receives requests from your browser
2. Adds your API token (securely stored on server)
3. Forwards request to Gumroad/Patreon
4. Returns data back to browser

---

## 💻 Option 1: Vercel Serverless (RECOMMENDED - 5 min)

**Best for:** Personal use, free tier, auto-deploys

### Setup Steps

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Create Project Structure
```bash
mkdir novixel-api-proxy
cd novixel-api-proxy
```

Create these files:

**`api/gumroad-sales.js`:**
```javascript
export default async function handler(req, res) {
  const token = process.env.GUMROAD_TOKEN;
  
  try {
    const response = await fetch(
      `https://api.gumroad.com/v2/sales?access_token=${token}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**`api/gumroad-products.js`:**
```javascript
export default async function handler(req, res) {
  const token = process.env.GUMROAD_TOKEN;
  
  try {
    const response = await fetch(
      `https://api.gumroad.com/v2/products?access_token=${token}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**`api/patreon-campaign.js`:**
```javascript
export default async function handler(req, res) {
  const token = process.env.PATREON_TOKEN;
  
  try {
    const response = await fetch(
      'https://www.patreon.com/api/oauth2/v2/campaigns',
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**`api/patreon-members.js`:**
```javascript
export default async function handler(req, res) {
  const token = process.env.PATREON_TOKEN;
  const campaignId = req.query.campaign_id;
  
  if (!campaignId) {
    return res.status(400).json({ error: 'campaign_id required' });
  }
  
  try {
    const response = await fetch(
      `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/members?include=currently_entitled_tiers&fields[member]=full_name,patron_status,currently_entitled_amount_cents`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**`vercel.json`:**
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
      ]
    }
  ]
}
```

**`package.json`:**
```json
{
  "name": "novixel-api-proxy",
  "version": "1.0.0",
  "description": "API proxy for Gumroad and Patreon"
}
```

#### 3. Deploy
```bash
vercel
# Follow prompts:
# - Login with GitHub/email
# - Create new project
# - Add environment variables:
#   GUMROAD_TOKEN=your_gumroad_token
#   PATREON_TOKEN=your_patreon_token
```

#### 4. Get Your URLs
```
https://your-app.vercel.app/api/gumroad-sales
https://your-app.vercel.app/api/gumroad-products
https://your-app.vercel.app/api/patreon-campaign
https://your-app.vercel.app/api/patreon-members
```

#### 5. Update Command Center

In `command-center.html`, add after `<script>`:

```javascript
const API_BASE = 'https://your-app.vercel.app/api';

async function fetchGumroadData() {
  try {
    // Fetch sales
    const salesRes = await fetch(`${API_BASE}/gumroad-sales`);
    const salesData = await salesRes.json();
    
    // Fetch products
    const productsRes = await fetch(`${API_BASE}/gumroad-products`);
    const productsData = await productsRes.json();
    
    // Update dashboard
    updateGumroadStats(salesData, productsData);
  } catch (error) {
    console.error('Gumroad fetch failed:', error);
  }
}

async function fetchPatreonData() {
  try {
    // Fetch campaign
    const campaignRes = await fetch(`${API_BASE}/patreon-campaign`);
    const campaignData = await campaignRes.json();
    
    if (!campaignData.data || !campaignData.data[0]) return;
    
    const campaignId = campaignData.data[0].id;
    
    // Fetch members
    const membersRes = await fetch(`${API_BASE}/patreon-members?campaign_id=${campaignId}`);
    const membersData = await membersRes.json();
    
    // Update dashboard
    updatePatreonStats(campaignData, membersData);
  } catch (error) {
    console.error('Patreon fetch failed:', error);
  }
}

function updateGumroadStats(sales, products) {
  // Calculate totals
  let totalRevenue = 0;
  let today = new Date().toDateString();
  let todaySales = 0;
  let todayRevenue = 0;
  
  if (sales.sales) {
    sales.sales.forEach(sale => {
      totalRevenue += sale.price;
      let saleDate = new Date(sale.purchase_date).toDateString();
      if (saleDate === today) {
        todaySales++;
        todayRevenue += sale.price;
      }
    });
  }
  
  // Update stat cards
  document.querySelector('[data-stat="total-revenue"]').textContent = 
    `$${(totalRevenue / 100).toFixed(2)}`;
  document.querySelector('[data-stat="today-revenue"]').textContent = 
    `+$${(todayRevenue / 100).toFixed(2)} today`;
  document.querySelector('[data-stat="sales-count"]').textContent = 
    todaySales;
  
  // Update product cards (match by product name)
  if (products.products) {
    products.products.forEach(product => {
      // Find matching card by product name
      const cards = document.querySelectorAll('.product-card h4');
      cards.forEach(card => {
        if (card.textContent.includes(product.name)) {
          const container = card.closest('.product-card');
          container.querySelector('[data-stat="sales"]').textContent = 
            product.sales_count || 0;
          container.querySelector('[data-stat="revenue"]').textContent = 
            `$${((product.sales_usd_cents || 0) / 100).toFixed(2)}`;
        }
      });
    });
  }
}

function updatePatreonStats(campaign, members) {
  const patronCount = campaign.data[0].attributes.patron_count || 0;
  
  let totalRevenue = 0;
  if (members.data) {
    members.data.forEach(member => {
      if (member.attributes.patron_status === 'active_patron') {
        totalRevenue += member.attributes.currently_entitled_amount_cents || 0;
      }
    });
  }
  
  // Update Patreon stat card
  document.querySelector('[data-stat="patreon-revenue"]').textContent = 
    `$${(totalRevenue / 100).toFixed(2)}/mo`;
  document.querySelector('[data-stat="patreon-count"]').textContent = 
    `${patronCount} patrons`;
}

// Auto-refresh every 5 minutes
setInterval(() => {
  fetchGumroadData();
  fetchPatreonData();
}, 300000);

// Initial fetch
fetchGumroadData();
fetchPatreonData();
```

---

## 💻 Option 2: Express Server (10 min)

**Best for:** More control, custom logic, existing Node.js backend

### Setup

**`server.js`:**
```javascript
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const GUMROAD_TOKEN = process.env.GUMROAD_TOKEN;
const PATREON_TOKEN = process.env.PATREON_TOKEN;

// Gumroad endpoints
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

app.get('/api/gumroad/products', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.gumroad.com/v2/products?access_token=${GUMROAD_TOKEN}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Patreon endpoints
app.get('/api/patreon/campaign', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.patreon.com/api/oauth2/v2/campaigns',
      { headers: { 'Authorization': `Bearer ${PATREON_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/patreon/members', async (req, res) => {
  try {
    const campaignId = req.query.campaign_id;
    const response = await axios.get(
      `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/members`,
      {
        headers: { 'Authorization': `Bearer ${PATREON_TOKEN}` },
        params: {
          'include': 'currently_entitled_tiers',
          'fields[member]': 'full_name,patron_status,currently_entitled_amount_cents'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
```

**`.env`:**
```
GUMROAD_TOKEN=your_gumroad_token
PATREON_TOKEN=your_patreon_token
PORT=3000
```

**`package.json`:**
```json
{
  "name": "novixel-api-proxy",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

### Install & Run
```bash
npm install
npm start
```

### Deploy
- Railway: `railway up`
- Render: Connect GitHub repo
- DigitalOcean App Platform: Deploy from GitHub

---

## 💻 Option 3: PHP Proxy (If You Have Hosting)

**Best for:** Existing shared hosting, cPanel, PHP sites

### Setup

**`api/gumroad-sales.php`:**
```php
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$token = getenv('GUMROAD_TOKEN');
$url = "https://api.gumroad.com/v2/sales?access_token=$token";

$data = file_get_contents($url);
echo $data;
?>
```

**`api/gumroad-products.php`:**
```php
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$token = getenv('GUMROAD_TOKEN');
$url = "https://api.gumroad.com/v2/products?access_token=$token";

$data = file_get_contents($url);
echo $data;
?>
```

**`api/patreon-campaign.php`:**
```php
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$token = getenv('PATREON_TOKEN');
$url = "https://www.patreon.com/api/oauth2/v2/campaigns";

$options = [
    'http' => [
        'header' => "Authorization: Bearer $token\r\n"
    ]
];
$context = stream_context_create($options);
$data = file_get_contents($url, false, $context);
echo $data;
?>
```

### Upload & Configure
1. Upload to your hosting
2. Set environment variables in cPanel
3. Call: `https://novixel.ca/api/gumroad-sales.php`

---

## 📊 Visual Flow

```
User opens command-center.html
         ↓
JavaScript calls your proxy endpoint
         ↓
Proxy reads API tokens from environment
         ↓
Proxy calls Gumroad/Patreon API
         ↓
API returns sales/patron data
         ↓
Proxy returns data to browser
         ↓
Dashboard updates with live stats! ✅
```

---

## 🔒 Security Benefits

**Why proxy is BETTER than direct API calls:**

1. **Tokens stay secret** - Never exposed in browser
2. **Rate limiting** - Control request frequency
3. **Caching** - Reduce API calls, save quota
4. **Error handling** - Better error messages
5. **Logging** - Track usage, debug issues

---

## 🎯 Comparison

| Feature | Vercel | Express | PHP |
|---------|--------|---------|-----|
| Setup Time | 5 min | 10 min | 5 min |
| Cost | Free | Free tier | Included |
| Scaling | Auto | Manual | Manual |
| Maintenance | None | Some | Some |
| Best For | Personal | Custom logic | Existing hosting |

**Recommendation: Use Vercel for simplicity and zero maintenance.**

---

## 💡 Quick Start Checklist

### Step 1: Get API Tokens
- [ ] Gumroad: https://app.gumroad.com/settings/advanced
- [ ] Patreon: https://www.patreon.com/portal/registration/register-clients

### Step 2: Choose Proxy Method
- [ ] Vercel (recommended)
- [ ] Express server
- [ ] PHP proxy

### Step 3: Deploy Proxy
- [ ] Create API endpoints
- [ ] Add environment variables
- [ ] Test endpoints

### Step 4: Update Command Center
- [ ] Add API_BASE URL
- [ ] Add fetch functions
- [ ] Add update functions
- [ ] Enable auto-refresh

### Step 5: Test
- [ ] Open command-center.html
- [ ] Check browser console for errors
- [ ] Verify stats update
- [ ] Test auto-refresh

---

## 🐛 Troubleshooting

### "Invalid access token"
→ Check environment variables are set correctly
→ Regenerate tokens in Gumroad/Patreon

### "CORS error"
→ Add CORS headers to proxy responses
→ Verify vercel.json config

### "No data showing"
→ Check browser console for errors
→ Verify API endpoints return data (test in browser)
→ Check data-stat attributes match in HTML

### "Webhook not working"
→ Ensure webhook URL is publicly accessible
→ HTTPS required (Vercel provides this)
→ Check webhook secret matches

---

## 📚 Related Docs

- GUMROAD_API_INTEGRATION.md - Gumroad API details
- PATREON_API_INTEGRATION.md - Patreon API details
- COMMAND_CENTER_SUMMARY.md - Dashboard overview

---

**TL;DR:** Use Vercel serverless functions (5-min setup, free, zero maintenance). Your tokens stay secure on the server, browser calls your proxy, proxy calls Gumroad/Patreon. Done! ✅
