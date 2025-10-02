// Pioneer Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pioneerForm');
    const successMessage = document.getElementById('successMessage');
    const confirmEmailSpan = document.getElementById('confirmEmail');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            company: document.getElementById('company').value
        };

        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);

        // Show success message
        form.style.display = 'none';
        successMessage.classList.add('show');
        confirmEmailSpan.textContent = formData.email;

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
