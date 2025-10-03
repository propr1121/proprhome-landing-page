// Pioneer Form Handler with Stripe Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe - REPLACE WITH YOUR PUBLISHABLE KEY
    const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');

    let elements;
    let clientSecret;
    let customerData = {};

    const form = document.getElementById('pioneerForm');
    const paymentSection = document.getElementById('paymentSection');
    const successMessage = document.getElementById('successMessage');
    const confirmEmailSpan = document.getElementById('confirmEmail');

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        customerData = {
            firstName: document.getElementById('firstName').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            company: document.getElementById('company').value
        };

        // Create payment intent on the server
        // REPLACE THIS WITH YOUR ACTUAL ENDPOINT
        try {
            const response = await fetch('/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 9900, // €99.00 in cents
                    currency: 'eur',
                    customerData: customerData
                })
            });

            const data = await response.json();
            clientSecret = data.clientSecret;

            // Initialize Stripe Elements
            const appearance = {
                theme: 'stripe',
                variables: {
                    colorPrimary: '#0066FF',
                    colorBackground: '#ffffff',
                    colorText: '#1a1a1a',
                    colorDanger: '#df1b41',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    spacingUnit: '4px',
                    borderRadius: '8px',
                }
            };

            elements = stripe.elements({ clientSecret, appearance });
            const paymentElement = elements.create('payment');
            paymentElement.mount('#payment-element');

            // Show payment section, hide form
            form.style.display = 'none';
            paymentSection.style.display = 'block';
            paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Error:', error);
            showMessage('Unable to initialize payment. Please try again.');
        }
    });

    // Handle payment submission
    document.getElementById('submit-payment').addEventListener('click', handleSubmit);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/payment-success.html',
            },
            redirect: 'if_required'
        });

        if (error) {
            // Payment failed
            showMessage(error.message);
            setLoading(false);
        } else {
            // Payment succeeded
            paymentSection.style.display = 'none';
            successMessage.classList.add('show');
            confirmEmailSpan.textContent = customerData.email;
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function showMessage(messageText) {
        const messageContainer = document.getElementById('payment-message');
        messageContainer.textContent = messageText;
        setTimeout(() => {
            messageContainer.textContent = '';
        }, 5000);
    }

    function setLoading(isLoading) {
        const submitButton = document.getElementById('submit-payment');
        const buttonText = document.getElementById('button-text');
        const spinner = document.getElementById('spinner');

        if (isLoading) {
            submitButton.disabled = true;
            buttonText.style.display = 'none';
            spinner.style.display = 'inline-block';
        } else {
            submitButton.disabled = false;
            buttonText.style.display = 'inline';
            spinner.style.display = 'none';
        }
    }
});
