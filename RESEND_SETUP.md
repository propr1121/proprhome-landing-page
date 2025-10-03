# Resend Email Setup - ProprHome

Your Resend integration is ready to go! Here's how to get it running.

## ✅ API Key Configured
Your Resend API key is already in the code: `re_ieQAuZb5_23vuQNBzsgikdqwJHhQ7qzat`

## Quick Start

### 1. Install Dependencies
```bash
npm install express resend cors
```

### 2. Start the Email Server
```bash
node resend-server.js
```

The server will run on port 3000 and handle:
- Early access email subscriptions
- Pioneer payment confirmations
- Team notifications

## Email Endpoints

### `/subscribe-early-access` (POST)
Handles homepage email form submissions.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Sends:**
- ✅ Confirmation email to user
- ✅ Notification to Miguel@proprhome.com and info@proprhome.com

### `/notify-pioneer-payment` (POST)
Handles Pioneer Program payment notifications.

**Request:**
```json
{
  "customerData": {
    "firstName": "John",
    "surname": "Doe",
    "email": "john@example.com",
    "phoneNumber": "+351 123 456 789",
    "company": "Real Estate Co."
  },
  "paymentAmount": 9900
}
```

**Sends:**
- ✅ Welcome email to new Pioneer member
- ✅ Payment notification to Miguel@proprhome.com and info@proprhome.com

## Email Templates

All emails are professionally designed with:
- ProprHome branding (gradient header)
- Responsive HTML
- Clear call-to-actions
- Mobile-friendly design

## Team Notifications

All notifications automatically go to:
- **Miguel@proprhome.com**
- **info@proprhome.com**

## Important: Domain Verification

Before sending emails in production, you need to verify your domain with Resend:

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `proprhome.com`
4. Add the DNS records shown (DKIM, SPF, etc.)
5. Wait for verification (usually 5-10 minutes)

Once verified, update the `from` addresses in `resend-server.js`:
```javascript
from: 'ProprHome <noreply@proprhome.com>'
```

## Testing

### Test Early Access Form
```bash
# Start the server
node resend-server.js

# In another terminal, test the endpoint
curl -X POST http://localhost:3000/subscribe-early-access \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test with Frontend
1. Make sure `resend-server.js` is running
2. Update `script.js` line 122 to use the correct URL:
   ```javascript
   const response = await fetch('http://localhost:3000/subscribe-early-access', {
   ```
3. Open your website and submit the email form
4. Check your inbox!

## Production Deployment

When deploying to production:

1. **Environment Variables** (recommended):
   ```bash
   export RESEND_API_KEY=re_ieQAuZb5_23vuQNBzsgikdqwJHhQ7qzat
   ```

   Update code:
   ```javascript
   const resend = new Resend(process.env.RESEND_API_KEY);
   ```

2. **Verify Domain** (see above)

3. **Deploy Server** to:
   - Vercel
   - Railway
   - Render
   - Your own server

4. **Update Frontend URLs** in:
   - `script.js` (line 122)
   - `pioneer.js` (line 31)

## Email Deliverability

Resend provides excellent deliverability, but to maximize it:

✅ Verify your domain (DKIM, SPF, DMARC)
✅ Use a real email address for `from` (not noreply@ initially)
✅ Warm up your domain by sending gradually increasing volumes
✅ Monitor your Resend dashboard for bounce rates

## Support

- [Resend Documentation](https://resend.com/docs)
- [Resend Dashboard](https://resend.com/overview)
- [Email Logs](https://resend.com/emails)

## Files Overview

- **`resend-server.js`**: Main email server (✅ Resend API key configured)
- **`script.js`**: Homepage early access form
- **`pioneer.js`**: Pioneer payment form
- **`server-example.js`**: Stripe webhook integration

## Next Steps

- [ ] Install dependencies: `npm install express resend cors`
- [ ] Start server: `node resend-server.js`
- [ ] Test early access form
- [ ] Verify domain in Resend dashboard
- [ ] Deploy to production
- [ ] Update frontend URLs
- [ ] Test end-to-end flow
