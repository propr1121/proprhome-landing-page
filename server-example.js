// Server-side example for Stripe Payment Intent creation
// This is a Node.js/Express example - adapt to your backend framework

const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY_HERE'); // Replace with your Stripe secret key

const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, customerData } = req.body;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                firstName: customerData.firstName,
                surname: customerData.surname,
                email: customerData.email,
                phoneNumber: customerData.phoneNumber,
                company: customerData.company || ''
            },
            receipt_email: customerData.email,
        });

        res.json({
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Webhook to handle successful payments
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = 'whsec_YOUR_WEBHOOK_SECRET'; // Replace with your webhook secret

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const customerData = paymentIntent.metadata;

            // Save the customer and payment information to your database
            console.log('Payment succeeded:', customerData);

            // TODO: Send notification email to team
            // Send to: Miguel@proprhome.com, info@proprhome.com
            // Include: Customer name, email, phone, company, payment amount

            // TODO: Send confirmation email to customer
            // Send welcome email with next steps

            break;
        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.metadata);
            // TODO: Handle failed payment, notify team
            break;
    }

    res.json({received: true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
