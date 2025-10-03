// ProprHome Email Server using Resend
// Clean, modern email API - perfect for production

const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Resend with your API key
const resend = new Resend('re_ieQAuZb5_23vuQNBzsgikdqwJHhQ7qzat');

// ============================================
// Early Access Email Subscription
// ============================================
app.post('/subscribe-early-access', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Send confirmation email to user
        const userEmail = await resend.emails.send({
            from: 'ProprHome <noreply@proprhome.com>',
            to: email,
            subject: 'Welcome to ProprHome Early Access! 🏠',
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
                            margin: 0;
                            padding: 0;
                            background-color: #f5f5f5;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: white;
                        }
                        .header {
                            background: linear-gradient(135deg, #0066FF 0%, #00D188 100%);
                            padding: 40px 20px;
                            text-align: center;
                        }
                        .header h1 {
                            color: white;
                            margin: 0;
                            font-size: 28px;
                            font-weight: 700;
                        }
                        .content {
                            padding: 40px 30px;
                        }
                        .content h2 {
                            color: #1a1a1a;
                            font-size: 24px;
                            margin-top: 0;
                        }
                        .content p {
                            color: #4B5563;
                            margin: 16px 0;
                        }
                        .content ul {
                            color: #4B5563;
                            padding-left: 20px;
                        }
                        .content li {
                            margin: 8px 0;
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
                            padding: 30px 20px;
                            background: #f8f9fa;
                            color: #6B7280;
                            font-size: 14px;
                        }
                        .highlight {
                            background: #F0FDF4;
                            border-left: 4px solid #10B981;
                            padding: 16px;
                            margin: 20px 0;
                            border-radius: 4px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🏠 Welcome to ProprHome!</h1>
                        </div>
                        <div class="content">
                            <h2>You're on the early access list!</h2>
                            <p>Thank you for your interest in ProprHome - Portugal's next-generation real estate platform where agents, agencies, and clients win together.</p>

                            <div class="highlight">
                                <p style="margin: 0;"><strong>🎯 What happens next?</strong></p>
                            </div>

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

                            <p style="margin-top: 30px;">We're building something special, and we're excited to have you with us from the beginning.</p>

                            <p>Best regards,<br>
                            <strong>The ProprHome Team</strong></p>
                        </div>
                        <div class="footer">
                            <p style="margin: 0 0 8px 0;">© 2025 ProprHome. All rights reserved.</p>
                            <p style="margin: 0;">We have it all.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        // Send notification to team
        const teamEmail = await resend.emails.send({
            from: 'ProprHome System <noreply@proprhome.com>',
            to: ['Miguel@proprhome.com', 'info@proprhome.com'],
            subject: '🎉 New Early Access Signup',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                            line-height: 1.6;
                            color: #1a1a1a;
                        }
                        .card {
                            background: white;
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
                            padding: 24px;
                            margin: 20px 0;
                        }
                        .label {
                            color: #6B7280;
                            font-size: 14px;
                            font-weight: 600;
                            margin-bottom: 4px;
                        }
                        .value {
                            color: #1a1a1a;
                            font-size: 16px;
                            margin-bottom: 16px;
                        }
                    </style>
                </head>
                <body>
                    <h2>🎉 New Early Access Signup</h2>
                    <div class="card">
                        <div class="label">Email Address</div>
                        <div class="value">${email}</div>

                        <div class="label">Date & Time</div>
                        <div class="value">${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Lisbon' })} (Lisbon Time)</div>

                        <div class="label">Source</div>
                        <div class="value">Homepage Hero Form</div>
                    </div>
                </body>
                </html>
            `
        });

        console.log('✅ Early access emails sent:', { userEmail: userEmail.id, teamEmail: teamEmail.id });
        res.json({ success: true, message: 'Subscription successful' });

    } catch (error) {
        console.error('❌ Error sending emails:', error);
        res.status(500).json({ error: 'Failed to send confirmation email' });
    }
});

// ============================================
// Pioneer Payment Success Notification
// ============================================
app.post('/notify-pioneer-payment', async (req, res) => {
    try {
        const { customerData, paymentAmount } = req.body;

        // Send welcome email to new pioneer
        const userEmail = await resend.emails.send({
            from: 'ProprHome <noreply@proprhome.com>',
            to: customerData.email,
            subject: 'Welcome to the Pioneer Program! 🚀',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Inter', -apple-system, sans-serif;
                            line-height: 1.6;
                            color: #1a1a1a;
                            margin: 0;
                            padding: 0;
                        }
                        .container { max-width: 600px; margin: 0 auto; background: white; }
                        .header {
                            background: linear-gradient(135deg, #0066FF 0%, #00D188 100%);
                            padding: 50px 20px;
                            text-align: center;
                        }
                        .header h1 { color: white; margin: 0; font-size: 32px; }
                        .badge {
                            display: inline-block;
                            background: white;
                            color: #0066FF;
                            padding: 8px 16px;
                            border-radius: 20px;
                            font-weight: 700;
                            margin-top: 16px;
                        }
                        .content { padding: 40px 30px; }
                        .content h2 { color: #1a1a1a; font-size: 24px; }
                        .highlight-box {
                            background: #F0FDF4;
                            border: 2px solid #10B981;
                            border-radius: 8px;
                            padding: 20px;
                            margin: 24px 0;
                        }
                        .footer {
                            text-align: center;
                            padding: 30px;
                            background: #f8f9fa;
                            color: #6B7280;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🚀 Welcome to the Pioneer Program!</h1>
                            <div class="badge">PIONEER MEMBER</div>
                        </div>
                        <div class="content">
                            <h2>Hi ${customerData.firstName}! 👋</h2>
                            <p>Thank you for becoming a ProprHome Pioneer! Your lifetime membership is now active.</p>

                            <div class="highlight-box">
                                <h3 style="margin-top: 0;">✅ Payment Confirmed</h3>
                                <p style="margin: 8px 0;"><strong>Amount:</strong> €${(paymentAmount / 100).toFixed(2)}</p>
                                <p style="margin: 8px 0;"><strong>Status:</strong> Lifetime Access Activated</p>
                            </div>

                            <h3>🎯 What's Next?</h3>
                            <ul>
                                <li>You'll receive <strong>exclusive updates</strong> on our progress</li>
                                <li><strong>Priority access</strong> to all beta features</li>
                                <li><strong>Direct line</strong> to the product team for feedback</li>
                                <li><strong>All Pro features</strong> forever - no monthly fees</li>
                                <li><strong>Pioneer badge</strong> on your profile</li>
                            </ul>

                            <p>We'll be in touch soon with your onboarding details and next steps.</p>

                            <p style="margin-top: 40px;">Welcome aboard!<br>
                            <strong>The ProprHome Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>© 2025 ProprHome. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        // Notify team
        const teamEmail = await resend.emails.send({
            from: 'ProprHome System <noreply@proprhome.com>',
            to: ['Miguel@proprhome.com', 'info@proprhome.com'],
            subject: '💰 New Pioneer Member - €99 Payment Received',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                            line-height: 1.6;
                            color: #1a1a1a;
                        }
                        .card {
                            background: white;
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
                            padding: 24px;
                            margin: 20px 0;
                        }
                        .success-badge {
                            display: inline-block;
                            background: #10B981;
                            color: white;
                            padding: 6px 12px;
                            border-radius: 6px;
                            font-weight: 600;
                            font-size: 14px;
                        }
                        .info-row {
                            margin: 12px 0;
                            padding: 12px;
                            background: #f8f9fa;
                            border-radius: 4px;
                        }
                        .label {
                            color: #6B7280;
                            font-size: 12px;
                            font-weight: 600;
                            text-transform: uppercase;
                        }
                        .value {
                            color: #1a1a1a;
                            font-size: 16px;
                            font-weight: 600;
                        }
                    </style>
                </head>
                <body>
                    <h2>🎉 New Pioneer Member!</h2>
                    <p><span class="success-badge">€${(paymentAmount / 100).toFixed(2)} PAID</span></p>

                    <div class="card">
                        <div class="info-row">
                            <div class="label">Full Name</div>
                            <div class="value">${customerData.firstName} ${customerData.surname}</div>
                        </div>

                        <div class="info-row">
                            <div class="label">Email</div>
                            <div class="value">${customerData.email}</div>
                        </div>

                        <div class="info-row">
                            <div class="label">Phone</div>
                            <div class="value">${customerData.phoneNumber}</div>
                        </div>

                        ${customerData.company ? `
                        <div class="info-row">
                            <div class="label">Company</div>
                            <div class="value">${customerData.company}</div>
                        </div>
                        ` : ''}

                        <div class="info-row">
                            <div class="label">Date & Time</div>
                            <div class="value">${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Lisbon' })} (Lisbon Time)</div>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        console.log('✅ Pioneer payment emails sent:', { userEmail: userEmail.id, teamEmail: teamEmail.id });
        res.json({ success: true });

    } catch (error) {
        console.error('❌ Error sending payment emails:', error);
        res.status(500).json({ error: 'Failed to send emails' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ ProprHome email server running on port ${PORT}`);
    console.log(`📧 Using Resend for email delivery`);
});
