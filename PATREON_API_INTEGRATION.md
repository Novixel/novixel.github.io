# Patreon API Integration Guide

**Connect Patreon data to Novixel Command Center**

---

## 📋 Overview

Patreon provides:
- OAuth 2.0 API
- Real-time webhooks
- Member/tier data
- Pledge amounts
- Post analytics

---

## 🔑 Getting API Access

### 1. Create Patreon Client

1. Go to: https://www.patreon.com/portal/registration/register-clients
2. Click "Create Client"
3. Fill in:
   - **App Name:** Novixel Command Center
   - **Description:** Personal dashboard for tracking Patreon data
   - **App Category:** Analytics
   - **Author/Company:** Your name
   - **Privacy Policy URL:** https://novixel.ca/privacy
   - **Terms of Service URL:** https://novixel.ca/terms
   - **Redirect URIs:** https://novixel.ca/api/patreon/callback

4. Save and copy:
   - **Client ID**
   - **Client Secret**
   - **Creator Access Token** (for your own data)

---

## 🔌 API Endpoints

### Base URL
```
https://www.patreon.com/api/oauth2/v2/
```

### Authentication

**Option 1: Creator Access Token** (simplest for your own data)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://www.patreon.com/api/oauth2/v2/campaigns
```

**Option 2: OAuth Flow** (for other creators)
- Redirect user to authorize
- Get access token
- Use token in API calls

---

## 📊 Key Endpoints

### Get Your Campaign

```bash
GET /campaigns
```

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://www.patreon.com/api/oauth2/v2/campaigns"
```

**Response:**
```json
{
  "data": [
    {
      "id": "123456",
      "type": "campaign",
      "attributes": {
        "patron_count": 42,
        "creation_name": "Novixel",
        "is_monthly": true,
        "summary": "AI tools and automation"
      }
    }
  ]
}
```

### Get Members (Patrons)

```bash
GET /campaigns/{campaign_id}/members
```

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://www.patreon.com/api/oauth2/v2/campaigns/123456/members?include=currently_entitled_tiers&fields[member]=full_name,patron_status,currently_entitled_amount_cents,pledge_relationship_start"
```

**Response:**
```json
{
  "data": [
    {
      "id": "member-1",
      "type": "member",
      "attributes": {
        "full_name": "John Doe",
        "patron_status": "active_patron",
        "currently_entitled_amount_cents": 500,
        "pledge_relationship_start": "2026-01-15T00:00:00Z"
      }
    }
  ]
}
```

### Get Posts

```bash
GET /campaigns/{campaign_id}/posts
```

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://www.patreon.com/api/oauth2/v2/campaigns/123456/posts?fields[post]=title,content,published_at,like_count,comment_count"
```

---

## 🔔 Webhooks

### Setup

1. Go to: https://www.patreon.com/portal/registration/register-webhooks
2. Add webhook:
   - **Webhook URI:** `https://novixel.ca/api/patreon-webhook`
   - **Triggers:** members:create, members:update, members:delete, members:pledge:create, members:pledge:update, members:pledge:delete
3. Copy **Webhook Secret** (for verification)

### Webhook Events

**New Patron:**
```json
{
  "event": "members:pledge:create",
  "data": {
    "id": "pledge-123",
    "type": "pledge",
    "attributes": {
      "amount_cents": 500,
      "patron_status": "active_patron",
      "pledge_cap_cents": null
    },
    "relationships": {
      "patron": {
        "data": {
          "id": "user-456",
          "type": "user"
        }
      }
    }
  }
}
```

**Patron Updated:**
```json
{
  "event": "members:pledge:update",
  "data": {
    "id": "pledge-123",
    "attributes": {
      "amount_cents": 1000,
      "patron_status": "active_patron"
    }
  }
}
```

**Patron Deleted:**
```json
{
  "event": "members:pledge:delete",
  "data": {
    "id": "pledge-123",
    "attributes": {
      "patron_status": "former_patron"
    }
  }
}
```

### Verify Webhook

Patreon signs webhooks with HMAC SHA256:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

// Usage
const signature = req.headers['x-patreon-signature'];
const isValid = verifyWebhook(
  JSON.stringify(req.body),
  signature,
  process.env.PATREON_WEBHOOK_SECRET
);
```

---

## 💻 Integration Code

### Node.js Express Example

```javascript
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const PATREON_TOKEN = process.env.PATREON_TOKEN;
const PATREON_WEBHOOK_SECRET = process.env.PATREON_WEBHOOK_SECRET;

// Get campaign data
app.get('/api/patreon/campaign', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.patreon.com/api/oauth2/v2/campaigns',
      {
        headers: {
          'Authorization': `Bearer ${PATREON_TOKEN}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get members (patrons)
app.get('/api/patreon/members', async (req, res) => {
  try {
    const campaignId = req.query.campaign_id;
    const response = await axios.get(
      `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/members`,
      {
        headers: {
          'Authorization': `Bearer ${PATREON_TOKEN}`
        },
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

// Webhook endpoint
app.post('/api/patreon-webhook', (req, res) => {
  // Verify signature
  const signature = req.headers['x-patreon-signature'];
  const payload = JSON.stringify(req.body);
  
  const hmac = crypto.createHmac('sha256', PATREON_WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest('hex');
  
  if (signature !== digest) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = req.body;
  
  console.log('Patreon event:', {
    type: event.event,
    patron: event.data.attributes.full_name,
    amount: event.data.attributes.currently_entitled_amount_cents / 100
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
import hmac
import hashlib
import os

app = Flask(__name__)

PATREON_TOKEN = os.getenv('PATREON_TOKEN')
PATREON_WEBHOOK_SECRET = os.getenv('PATREON_WEBHOOK_SECRET')

@app.route('/api/patreon/campaign')
def get_campaign():
    response = requests.get(
        'https://www.patreon.com/api/oauth2/v2/campaigns',
        headers={'Authorization': f'Bearer {PATREON_TOKEN}'}
    )
    return jsonify(response.json())

@app.route('/api/patreon/members')
def get_members():
    campaign_id = request.args.get('campaign_id')
    response = requests.get(
        f'https://www.patreon.com/api/oauth2/v2/campaigns/{campaign_id}/members',
        headers={'Authorization': f'Bearer {PATREON_TOKEN}'},
        params={
            'include': 'currently_entitled_tiers',
            'fields[member]': 'full_name,patron_status,currently_entitled_amount_cents'
        }
    )
    return jsonify(response.json())

@app.route('/api/patreon-webhook', methods=['POST'])
def webhook():
    # Verify signature
    signature = request.headers.get('X-Patreon-Signature')
    payload = request.get_data()
    
    digest = hmac.new(
        PATREON_WEBHOOK_SECRET.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    if signature != digest:
        return 'Invalid signature', 401
    
    event = request.json
    
    print(f"Patreon event: {event['event']}")
    
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

Add Patreon data fetching:

```javascript
async function fetchPatreonData() {
    const token = localStorage.getItem('patreon_token');
    if (!token) return;
    
    try {
        // Fetch campaign
        const campaignRes = await fetch('/api/patreon/campaign', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const campaignData = await campaignRes.json();
        const campaignId = campaignData.data[0].id;
        
        // Fetch members
        const membersRes = await fetch(`/api/patreon/members?campaign_id=${campaignId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const membersData = await membersRes.json();
        
        // Update dashboard
        updatePatreonStats(campaignData, membersData);
    } catch (error) {
        console.error('Failed to fetch Patreon data:', error);
    }
}

function updatePatreonStats(campaign, members) {
    const patronCount = campaign.data[0].attributes.patron_count;
    
    let totalRevenue = 0;
    members.data.forEach(member => {
        if (member.attributes.patron_status === 'active_patron') {
            totalRevenue += member.attributes.currently_entitled_amount_cents;
        }
    });
    
    // Update stat cards
    document.querySelector('[data-stat="patreon-count"]').textContent = patronCount;
    document.querySelector('[data-stat="patreon-revenue"]').textContent = 
        `$${(totalRevenue / 100).toFixed(2)}/month`;
}

// Auto-refresh every 5 minutes
setInterval(fetchPatreonData, 300000);
fetchPatreonData(); // Initial fetch
```

---

## 📊 Dashboard Stats to Track

### Patron Metrics
- Total patron count
- Active vs former patrons
- New patrons this month
- Churn rate

### Revenue Metrics
- Monthly recurring revenue (MRR)
- Revenue by tier
- Average pledge amount
- Lifetime value (LTV)

### Engagement Metrics
- Post views
- Post likes
- Comments
- Most popular content

---

## 🔒 Security

### Store Tokens Securely

**Never expose in frontend!**

```javascript
// Backend only
const PATREON_TOKEN = process.env.PATREON_TOKEN;
const PATREON_WEBHOOK_SECRET = process.env.PATREON_WEBHOOK_SECRET;
```

### Verify Webhooks

```javascript
function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return signature === digest;
}
```

### Rate Limits

Patreon API limits:
- **10 requests per second**
- **5000 requests per hour**

Implement caching to stay under limits.

---

## 🚀 Quick Setup

### 1. Create Client
```
https://www.patreon.com/portal/registration/register-clients
```

### 2. Get Token
```
Creator Access Token (for your own data)
```

### 3. Test API
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://www.patreon.com/api/oauth2/v2/campaigns
```

### 4. Add Webhook
```
URL: https://novixel.ca/api/patreon-webhook
Events: members:pledge:create, members:pledge:update, members:pledge:delete
```

### 5. Verify Signature
```javascript
const isValid = verifyWebhook(payload, signature, secret);
```

---

## 📚 Resources

- **Patreon API Docs**: https://docs.patreon.com/
- **Webhook Guide**: https://docs.patreon.com/#webhooks
- **OAuth Guide**: https://docs.patreon.com/#oauth
- **API Portal**: https://www.patreon.com/portal

---

## 🐛 Troubleshooting

### "Invalid access token"
→ Regenerate Creator Access Token in portal

### "Missing campaign_id"
→ Fetch campaigns first to get ID

### "Webhook signature mismatch"
→ Verify webhook secret matches
→ Use raw body for HMAC (not parsed JSON)

### "Rate limit exceeded"
→ Add caching (5 min expiry)
→ Reduce polling frequency

---

## 💡 Advanced Features

### Patron Tiers

```javascript
// Get all tiers
const tiers = await fetch(
  `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/tiers`,
  { headers: { 'Authorization': `Bearer ${token}` } }
);

// Track revenue by tier
const tierRevenue = {};
members.data.forEach(member => {
  const tier = member.relationships.currently_entitled_tiers.data[0];
  tierRevenue[tier.id] = (tierRevenue[tier.id] || 0) + 
    member.attributes.currently_entitled_amount_cents;
});
```

### Post Analytics

```javascript
// Get recent posts
const posts = await fetch(
  `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/posts?fields[post]=title,like_count,comment_count`,
  { headers: { 'Authorization': `Bearer ${token}` } }
);

// Track engagement
posts.data.forEach(post => {
  console.log(`${post.attributes.title}: ${post.attributes.like_count} likes`);
});
```

### Churn Detection

```javascript
// Track former patrons
const churnedPatrons = members.data.filter(
  m => m.attributes.patron_status === 'former_patron'
);

const churnRate = (churnedPatrons.length / members.data.length) * 100;
console.log(`Churn rate: ${churnRate.toFixed(1)}%`);
```

---

## ✅ Next Steps

1. Create Patreon client
2. Get Creator Access Token
3. Test API endpoints
4. Set up webhooks
5. Add to command center
6. Enable auto-refresh
7. Track patron growth!

**Your command center will show live Patreon data!** 🎉
