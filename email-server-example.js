// Email Server Example with Nodemailer
// This handles early access signups and sends confirmation emails

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Email configuration - Use your email provider settings
// For Gmail, you'll need to create an "App Password" in Google Account settings
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password' // Replace with your app password
    }
});

// Alternatively, use a service like SendGrid, Mailgun, or Postmark:
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Handle early access email subscriptions
app.post('/subscribe-early-access', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Save to database (example - implement your own database logic)
        // await saveToDatabase(email);

        // Send confirmation email to user
        const userEmailOptions = {
            from: 'ProprHome <noreply@proprhome.com>',
            to: email,
            subject: 'Welcome to ProprHome Early Access!',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                            line-height: 1.6;
                            color: #1a1a1a;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background: linear-gradient(135deg, #0066FF 0%, #00D188 100%);
                            padding: 40px 20px;
                            text-align: center;
                            border-radius: 8px 8px 0 0;
                        }
                        .header h1 {
                            color: white;
                            margin: 0;
                            font-size: 28px;
                        }
                        .content {
                            background: white;
                            padding: 40px 30px;
                            border: 1px solid #e5e7eb;
                            border-top: none;
                        }
                        .cta-button {
                            display: inline-block;
                            background: #0066FF;
                            color: white;
                            padding: 14px 32px;
                            text-decoration: none;
                            border-radius: 8px;
                            margin: 20px 0;
                            font-weight: 600;
                        }
                        .footer {
                            text-align: center;
                            padding: 20px;
                            color: #6B7280;
                            font-size: 14px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>🏠 Welcome to ProprHome!</h1>
                    </div>
                    <div class="content">
                        <h2>You're on the early access list!</h2>
                        <p>Thank you for your interest in ProprHome - Portugal's next-generation real estate platform where agents, agencies, and clients win together.</p>

                        <p><strong>What happens next?</strong></p>
                        <ul>
                            <li>We'll keep you updated on our progress</li>
                            <li>You'll get exclusive early access when we launch</li>
                            <li>Special Pioneer Program pricing (€99 lifetime access)</li>
                            <li>Direct input on features and product development</li>
                        </ul>

                        <p>Want to secure your lifetime membership now?</p>
                        <a href="https://proprhome.com/pioneer.html" class="cta-button">Join Pioneer Program - €99</a>

                        <p>We're building something special, and we're excited to have you with us from the beginning.</p>

                        <p>Best regards,<br>
                        <strong>The ProprHome Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© 2025 ProprHome. All rights reserved.</p>
                        <p>We have it all.</p>
                    </div>
                </body>
                </html>
            `
        };

        // Send notification to ProprHome team
        const teamEmailOptions = {
            from: 'ProprHome System <noreply@proprhome.com>',
            to: 'Miguel@proprhome.com, info@proprhome.com',
            subject: 'New Early Access Signup',
            html: `
                <h2>New Early Access Signup</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Source:</strong> Homepage Hero Form</p>
            `
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(userEmailOptions),
            transporter.sendMail(teamEmailOptions)
        ]);

        console.log('Early access signup:', email);
        res.json({ success: true, message: 'Subscription successful' });

    } catch (error) {
        console.error('Error processing subscription:', error);
        res.status(500).json({ error: 'Failed to process subscription' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Email server running on port ${PORT}`);
});

// ============================================
// Setup Instructions:
// ============================================
//
// 1. Install dependencies:
//    npm install express nodemailer
//
// 2. Configure email settings above (lines 9-14)
//
//    For Gmail:
//    - Go to Google Account → Security → 2-Step Verification → App Passwords
//    - Generate an app password for "Mail"
//    - Use that password in the config
//
//    Or use a service like SendGrid/Mailgun for production
//
// 3. Update the domain in email templates (replace proprhome.com)
//
// 4. Implement database storage (optional but recommended)
//
// 5. Run the server:
//    node email-server-example.js
