# Email Confirmation Setup Instructions

This guide explains how to set up email confirmations for both the homepage early access form and the Pioneer Program payments.

## What's Been Implemented

### 1. Homepage Early Access Form
- ✅ Success message displays after form submission
- ✅ Email API endpoint ready (`/subscribe-early-access`)
- ✅ Sends to: `Miguel@proprhome.com` and `info@proprhome.com`

### 2. Pioneer Program Payments
- ✅ Payment flow with Stripe
- ✅ Webhook handlers for payment events
- ✅ Email notifications configured for: `Miguel@proprhome.com` and `info@proprhome.com`

## Setup Instructions

### Option 1: Using Nodemailer (Recommended for Simple Setup)

#### Step 1: Install Dependencies
```bash
npm install express nodemailer
```

#### Step 2: Configure Email Provider

**For Gmail:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use this password in the code

**For Outlook/Office 365:**
```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'your-email@outlook.com',
        pass: 'your-password'
    }
});
```

#### Step 3: Run the Email Server
```bash
node email-server-example.js
```

### Option 2: Using SendGrid (Recommended for Production)

#### Step 1: Get SendGrid API Key
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Go to Settings → API Keys
3. Create an API key

#### Step 2: Install SendGrid
```bash
npm install @sendgrid/mail
```

#### Step 3: Modify Email Server
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/subscribe-early-access', async (req, res) => {
    const { email } = req.body;

    // Email to user
    await sgMail.send({
        to: email,
        from: 'noreply@proprhome.com',
        subject: 'Welcome to ProprHome Early Access!',
        html: '...' // Use the template from email-server-example.js
    });

    // Email to team
    await sgMail.send({
        to: ['Miguel@proprhome.com', 'info@proprhome.com'],
        from: 'noreply@proprhome.com',
        subject: 'New Early Access Signup',
        html: `...`
    });
});
```

### Option 3: Using Mailgun

```bash
npm install mailgun.js form-data
```

```javascript
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
});

mg.messages.create('proprhome.com', {
    from: 'ProprHome <noreply@proprhome.com>',
    to: ['Miguel@proprhome.com', 'info@proprhome.com'],
    subject: 'New Early Access Signup',
    html: '...'
});
```

## Email Templates

### 1. Early Access Confirmation (to User)
See `email-server-example.js` lines 51-125 for the full HTML template.

### 2. Team Notification (Early Access)
```html
<h2>New Early Access Signup</h2>
<p><strong>Email:</strong> user@example.com</p>
<p><strong>Date:</strong> Jan 15, 2025 10:30 AM</p>
<p><strong>Source:</strong> Homepage Hero Form</p>
```

### 3. Pioneer Payment Success (to User)
```html
<h1>Welcome to the Pioneer Program! 🚀</h1>
<p>Thank you for becoming a ProprHome Pioneer!</p>
<p>Your lifetime membership is now active.</p>
<h3>What's Next?</h3>
<ul>
    <li>You'll receive exclusive updates on our progress</li>
    <li>Priority access to beta features</li>
    <li>Direct line to the product team</li>
</ul>
```

### 4. Team Notification (Pioneer Payment)
```html
<h2>New Pioneer Member! 🎉</h2>
<p><strong>Name:</strong> John Doe</p>
<p><strong>Email:</strong> john@example.com</p>
<p><strong>Phone:</strong> +351 123 456 789</p>
<p><strong>Company:</strong> Real Estate Co.</p>
<p><strong>Amount Paid:</strong> €99.00</p>
<p><strong>Date:</strong> Jan 15, 2025 10:30 AM</p>
```

## Environment Variables

Create a `.env` file:
```
# Email Provider
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Or SendGrid
SENDGRID_API_KEY=SG.xxxxx

# Or Mailgun
MAILGUN_API_KEY=xxxxx
MAILGUN_DOMAIN=proprhome.com

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Server
PORT=3000
```

## Testing

### Test Early Access Form
1. Go to your homepage
2. Enter email in "Get Early Access" form
3. Submit
4. Check:
   - ✅ Success message displays
   - ✅ User receives confirmation email
   - ✅ Miguel and info emails receive notification

### Test Pioneer Payment
1. Go to `pioneer.html`
2. Fill out the form
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Check:
   - ✅ Success message displays
   - ✅ User receives welcome email
   - ✅ Miguel and info emails receive payment notification

## Production Checklist

- [ ] Switch to production email service (SendGrid/Mailgun)
- [ ] Verify sender domain (SPF, DKIM, DMARC records)
- [ ] Set up email templates with proper branding
- [ ] Test all email flows
- [ ] Set up email tracking/analytics
- [ ] Configure bounce handling
- [ ] Add unsubscribe links (for marketing emails)
- [ ] Store emails in database
- [ ] Set up backup email provider
- [ ] Monitor email delivery rates

## Files Overview

- **`email-server-example.js`**: Complete email server with early access endpoint
- **`server-example.js`**: Stripe payment server (includes webhook for payments)
- **`script.js`**: Frontend code for early access form
- **`pioneer.js`**: Frontend code for Pioneer Program payment flow

## Team Email Recipients

All notifications go to:
- **Miguel@proprhome.com**
- **info@proprhome.com**

## Support

For email delivery issues:
- Check spam folders
- Verify DNS records
- Check email service logs
- Test with different email providers

For SendGrid: [SendGrid Support](https://sendgrid.com/docs/)
For Mailgun: [Mailgun Support](https://documentation.mailgun.com/)
