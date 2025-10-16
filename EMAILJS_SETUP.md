# EmailJS Setup for GitHub Pages

This guide will help you set up EmailJS to send emails directly from your GitHub Pages site without needing a backend server.

## Why EmailJS?

- ✅ Works with GitHub Pages (static hosting)
- ✅ No server required
- ✅ Free tier: 200 emails/month
- ✅ Easy setup
- ✅ Professional email templates

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook** 
   - **Yahoo**
   - **Custom SMTP**

### For Gmail:
1. Select **Gmail**
2. Connect your Gmail account
3. Authorize EmailJS to send emails on your behalf

## Step 3: Create Email Templates

### Template 1: User Confirmation Email
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:** `Welcome to ProprHome Early Access! 🏠`

**Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066FF 0%, #00D188 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #ddd; border-top: none; }
        .cta-button { display: inline-block; background: #0066FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 Welcome to ProprHome!</h1>
        </div>
        <div class="content">
            <h2>You're on the early access list!</h2>
            <p>Hi {{to_name}},</p>
            <p>Thank you for your interest in ProprHome - Portugal's next-generation real estate platform where agents, agencies, and clients win together.</p>
            
            <h3>🎯 What happens next?</h3>
            <ul>
                <li><strong>Exclusive updates</strong> on our progress and launch timeline</li>
                <li><strong>Priority early access</strong> when we go live</li>
                <li><strong>Special Pioneer pricing</strong> - €99 lifetime access (normally €59/month)</li>
                <li><strong>Direct influence</strong> on features and product development</li>
            </ul>
            
            <p><strong>Want to secure your lifetime membership now?</strong></p>
            <p>Join our Pioneer Program and lock in lifetime access for just €99:</p>
            
            <center>
                <a href="https://proprhome.com/pioneer.html" class="cta-button">
                    Join Pioneer Program - €99
                </a>
            </center>
            
            <p>We're building something special, and we're excited to have you with us from the beginning.</p>
            
            <p>Best regards,<br><strong>The ProprHome Team</strong></p>
        </div>
        <div class="footer">
            <p>© 2025 ProprHome. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

4. Save as template ID: `template_user_confirmation`

### Template 2: Team Notification Email
1. Create another template
2. Use this template:

**Subject:** `🎉 New Early Access Signup`

**Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .card { background: #f8f9fa; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .label { color: #666; font-size: 14px; font-weight: bold; margin-bottom: 5px; }
        .value { color: #333; font-size: 16px; margin-bottom: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>🎉 New Early Access Signup</h2>
        <div class="card">
            <div class="label">Email Address</div>
            <div class="value">{{user_email}}</div>
            
            <div class="label">Date & Time</div>
            <div class="value">{{signup_date}} (Lisbon Time)</div>
            
            <div class="label">Source</div>
            <div class="value">{{source}}</div>
        </div>
    </div>
</body>
</html>
```

4. Save as template ID: `template_team_notification`

## Step 4: Get Your Credentials

1. Go to **Account** → **General**
2. Copy your **Public Key**
3. Go to **Email Services** and copy your **Service ID**

## Step 5: Update Your Code

Replace these placeholders in `script.js`:

```javascript
// Replace these with your actual values:
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");  // Your public key
await emailjs.send('YOUR_SERVICE_ID', 'template_user_confirmation', { ... });
await emailjs.send('YOUR_SERVICE_ID', 'template_team_notification', { ... });
```

## Step 6: Test Your Setup

1. Open your website
2. Submit the email form
3. Check your email inbox
4. Check Miguel@proprhome.com and info@proprhome.com

## Step 7: Deploy to GitHub Pages

1. Push your changes to GitHub
2. GitHub Pages will automatically deploy
3. Test the live site

## Troubleshooting

### Emails not sending?
- Check browser console for errors
- Verify your EmailJS credentials
- Check EmailJS dashboard for delivery logs

### Templates not working?
- Make sure template IDs match exactly
- Check that all variables are properly formatted: `{{variable_name}}`

### Rate limits?
- Free tier: 200 emails/month
- Upgrade to paid plan for more emails

## Alternative: Formspree

If you prefer a simpler solution:

1. Go to [Formspree.io](https://formspree.io/)
2. Create a form endpoint
3. Update your form action to point to Formspree
4. No JavaScript required!

## Production Checklist

- [ ] Set up EmailJS account
- [ ] Create email templates
- [ ] Update JavaScript with real credentials
- [ ] Test email sending
- [ ] Deploy to GitHub Pages
- [ ] Test live site
- [ ] Monitor email delivery

## Support

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
