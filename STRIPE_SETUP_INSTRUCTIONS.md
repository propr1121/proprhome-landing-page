# Stripe Payment Integration Setup

This guide will help you set up the Stripe payment integration for the Pioneer Program.

## What's Been Added

1. **Payment flow**: Form → Payment Step → Success
2. **Stripe Elements**: Embedded payment form with card, Apple Pay, Google Pay support
3. **€99 charge**: Configured for EUR currency

## Setup Steps

### 1. Get Stripe API Keys

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create a Stripe account (or log in)
3. Get your API keys from [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
   - **Publishable key**: Starts with `pk_test_...`
   - **Secret key**: Starts with `sk_test_...`

### 2. Update Frontend Code

In `pioneer.js`, replace line 4:
```javascript
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```
With your actual publishable key:
```javascript
const stripe = Stripe('pk_test_51abcdef...');
```

### 3. Set Up Backend

You need a server to create payment intents. Choose one option:

#### Option A: Node.js/Express (Recommended)

1. Install dependencies:
```bash
npm init -y
npm install express stripe cors
```

2. Use the provided `server-example.js` and update:
   - Line 2: Replace `sk_test_YOUR_SECRET_KEY_HERE` with your Stripe secret key
   - Line 40: Replace `whsec_YOUR_WEBHOOK_SECRET` with your webhook secret (see step 4)

3. Run the server:
```bash
node server-example.js
```

#### Option B: Other Frameworks

See Stripe documentation for:
- [Python/Flask](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#python)
- [PHP](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#php)
- [Ruby/Rails](https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#ruby)

### 4. Update API Endpoint

In `pioneer.js`, line 31, update the endpoint URL:
```javascript
const response = await fetch('http://localhost:3000/create-payment-intent', {
```
Or use your production server URL:
```javascript
const response = await fetch('https://yourdomain.com/create-payment-intent', {
```

### 5. Set Up Webhooks (Important!)

1. Go to [https://dashboard.stripe.com/test/webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter your endpoint URL: `https://yourdomain.com/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the signing secret (starts with `whsec_...`)
6. Add it to your server code (line 40 in `server-example.js`)

### 6. Test the Integration

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`
- Any future expiry date, any CVC, any postal code

### 7. Go Live

When ready for production:
1. Switch from test keys to live keys
2. Update both frontend and backend with live keys
3. Test with real cards (consider starting with a small amount)
4. Update webhook endpoint to production URL

## Flow Overview

1. User fills out the form
2. Form submits → Shows payment section
3. Frontend calls your server `/create-payment-intent`
4. Server creates Stripe PaymentIntent, returns `clientSecret`
5. Stripe Elements displays payment form
6. User enters payment details
7. Frontend confirms payment with Stripe
8. On success → Show success message
9. Stripe webhook notifies your server → Save customer data

## What to Do Next

- [ ] Get Stripe API keys
- [ ] Update `pioneer.js` with publishable key
- [ ] Set up backend server
- [ ] Update API endpoint URL in `pioneer.js`
- [ ] Test with Stripe test cards
- [ ] Set up webhooks
- [ ] Implement database storage for customers
- [ ] Send confirmation emails
- [ ] Switch to live mode when ready

## Need Help?

- [Stripe Documentation](https://stripe.com/docs/payments/payment-intents)
- [Stripe Elements](https://stripe.com/docs/payments/elements)
- [Testing](https://stripe.com/docs/testing)
