// How It Works - Toggle Functionality

document.addEventListener('DOMContentLoaded', function() {
    // ================================
    // Navigation Scroll Effect
    // ================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ================================
    // Mobile Menu Toggle
    // ================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // ================================
    // User Toggle Functionality
    // ================================
    const toggleButtons = document.querySelectorAll('.toggle-option');
    const contentWrappers = document.querySelectorAll('.content-wrapper');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');

            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Hide all content wrappers
            contentWrappers.forEach(wrapper => wrapper.classList.remove('active'));

            // Show target content wrapper
            const targetWrapper = document.getElementById(target);
            if (targetWrapper) {
                targetWrapper.classList.add('active');

                // Smooth scroll to content
                setTimeout(() => {
                    targetWrapper.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });

    // ================================
    // Smooth Scroll for Anchor Links
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ================================
    // Intersection Observer for Animations
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    document.querySelectorAll('.hiw-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // ================================
    // Keyboard Accessibility
    // ================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});
