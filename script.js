// ================================
// Navigation Scroll Effect
// ================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
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

// ================================
// Floating Pioneer Pill
// ================================

const floatingPill = document.getElementById('floatingPill');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 800) {
        floatingPill.classList.add('visible');
    } else {
        floatingPill.classList.remove('visible');
    }
});

// Scroll to pioneer section when clicking pill CTA
document.querySelector('.pill-cta').addEventListener('click', () => {
    document.querySelector('.pioneer-program').scrollIntoView({
        behavior: 'smooth'
    });
});

// ================================
// Tab Switching (User Types)
// ================================

const toggleButtons = document.querySelectorAll('.toggle-btn');
const contentPanels = document.querySelectorAll('.content-panel');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');

        // Remove active class from all buttons and panels
        toggleButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        contentPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        document.getElementById(target).classList.add('active');
    });
});

// ================================
// Email Form Validation
// ================================

const heroForm = document.getElementById('heroForm');
const heroEmail = document.getElementById('heroEmail');
const heroError = document.getElementById('heroError');
const heroSuccess = document.getElementById('heroSuccess');

heroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = heroEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        showError('Please enter your email address');
        heroEmail.classList.add('error');
        return;
    }

    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        heroEmail.classList.add('error');
        return;
    }

    // Clear error
    heroError.textContent = '';
    heroEmail.classList.remove('error');

    // Send email to backend
    try {
        const response = await fetch('/subscribe-early-access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            // Success - show success message
            heroForm.style.display = 'none';
            heroSuccess.classList.add('show');
        } else {
            showError('Something went wrong. Please try again.');
        }
    } catch (error) {
        // If backend not set up yet, still show success message
        console.log('Email submitted:', email);
        heroForm.style.display = 'none';
        heroSuccess.classList.add('show');
    }
});

heroEmail.addEventListener('input', () => {
    heroEmail.classList.remove('error');
    heroError.textContent = '';
});

function showError(message) {
    heroError.textContent = message;
}

// ================================
// CTA Button Handlers
// ================================

// All "Join Pioneer Program" and "Claim Pioneer Access" buttons scroll to pricing
const pioneerButtons = document.querySelectorAll('.nav-cta, .btn-primary');

pioneerButtons.forEach(button => {
    if (button.textContent.includes('Pioneer') || button.textContent.includes('€99')) {
        button.addEventListener('click', (e) => {
            // Don't prevent default if it's a link or form submit button
            if (button.tagName !== 'A' && button.type !== 'submit') {
                e.preventDefault();
                document.querySelector('.pioneer-program').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});

// ================================
// Smooth Scroll for Navigation Links
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const targetId = href.substring(1); // Remove the #

        // If it's one of the user type sections, activate the corresponding tab
        if (targetId === 'agents' || targetId === 'agencies' || targetId === 'buyers') {
            const targetButton = document.querySelector(`.toggle-btn[data-target="${targetId}"]`);
            if (targetButton) {
                targetButton.click();
            }

            // Scroll to the user types section
            const userTypesSection = document.querySelector('.user-types');
            if (userTypesSection) {
                userTypesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // For other hash links, scroll to the target
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
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
const animateElements = document.querySelectorAll('.feature-card, .col-item, .step-item, .pricing-card, .trust-item');
animateElements.forEach(el => observer.observe(el));

// ================================
// Keyboard Accessibility
// ================================

// Ensure tab navigation works properly
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ================================
// Feature Card Hover Effects
// ================================

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ================================
// Pricing Card Click to Scroll
// ================================

const featuredPricingCard = document.querySelector('.pricing-card.featured .btn');

if (featuredPricingCard) {
    featuredPricingCard.addEventListener('click', () => {
        // In a real app, this would redirect to a signup/payment page
        alert('Welcome to the Pioneer Program! 🚀\n\nYou\'re about to join an exclusive group of forward-thinking real estate professionals.\n\nRedirecting to signup...');
    });
}

// ================================
// Dynamic Year in Footer
// ================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText && currentYear > 2025) {
    footerText.textContent = `© ${currentYear} ProprHome. All rights reserved.`;
}

// ================================
// Performance: Reduce Motion
// ================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ================================
// Video Controls
// ================================

const heroVideo = document.getElementById('heroVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');

if (heroVideo && playPauseBtn && muteBtn) {
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const muteIcon = muteBtn.querySelector('.mute-icon');
    const unmuteIcon = muteBtn.querySelector('.unmute-icon');

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            heroVideo.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    // Mute/Unmute functionality
    muteBtn.addEventListener('click', () => {
        if (heroVideo.muted) {
            heroVideo.muted = false;
            muteIcon.style.display = 'block';
            unmuteIcon.style.display = 'none';
        } else {
            heroVideo.muted = true;
            muteIcon.style.display = 'none';
            unmuteIcon.style.display = 'block';
        }
    });
}

// ================================
// Console Welcome Message
// ================================

console.log('%c🏠 ProprHome', 'font-size: 24px; font-weight: bold; color: #00D188;');
console.log('%cWelcome to the future of real estate in Portugal!', 'font-size: 14px; color: #4B5563;');
console.log('%cInterested in joining our team? Check out our careers page!', 'font-size: 12px; color: #6B7280;');

// ================================
// Analytics Event Tracking (Placeholder)
// ================================

function trackEvent(category, action, label) {
    // In a real app, this would send to Google Analytics, Mixpanel, etc.
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'Click', btn.textContent.trim());
    });
});

// Track tab switches
toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Navigation', 'Tab Switch', btn.textContent.trim());
    });
});

// ================================
// Video Controls
// ================================

const heroVideo = document.getElementById('heroVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const soundBtn = document.getElementById('soundBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const soundIcon = document.getElementById('soundIcon');
const mutedIcon = document.getElementById('mutedIcon');

if (heroVideo) {
    // Play/Pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (heroVideo.paused) {
                heroVideo.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                heroVideo.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });
    }

    // Sound button
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            if (heroVideo.muted) {
                heroVideo.muted = false;
                mutedIcon.style.display = 'none';
                soundIcon.style.display = 'block';
            } else {
                heroVideo.muted = true;
                mutedIcon.style.display = 'block';
                soundIcon.style.display = 'none';
            }
        });
    }
}
