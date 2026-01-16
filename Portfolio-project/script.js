// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
body.setAttribute('data-theme', currentTheme);

// Toggle theme function with ripple effect
function toggleTheme(event) {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 126, 179, 0.5)';
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.top = `${event.clientY}px`;
    ripple.style.left = `${event.clientX}px`;
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.zIndex = '9999';
    ripple.style.pointerEvents = 'none';
    document.body.appendChild(ripple);

    // Animate ripple
    const startTime = Date.now();
    const duration = 600;

    function animateRipple() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const scale = progress * 3;
        const opacity = 1 - progress;

        ripple.style.width = `${scale * 100}px`;
        ripple.style.height = `${scale * 100}px`;
        ripple.style.opacity = opacity.toString();

        if (progress < 1) {
            requestAnimationFrame(animateRipple);
        } else {
            document.body.removeChild(ripple);
        }
    }

    requestAnimationFrame(animateRipple);

    // Change theme after ripple starts
    setTimeout(() => {
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }, 100);
}

// Event listener for theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Event listener for mobile menu toggle
hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Add active class to clicked link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showError('Please fill in all fields.');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // In a real application, you would send this data to a server
            console.log({ name, email, subject, message });

            // Show success message
            showSuccess('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();

            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Helper functions for form feedback
function showError(message) {
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(errorDiv);

    // Remove after delay
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 3000);
}

function showSuccess(message) {
    // Create success element
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(successDiv);

    // Remove after delay
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Trigger secondary animations
            setTimeout(() => {
                if (entry.target.classList.contains('project-card')) {
                    const img = entry.target.querySelector('.project-image');
                    if (img) {
                        img.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            img.style.transform = 'scale(1)';
                        }, 300);
                    }
                }
            }, 300);
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        observer.observe(card);
    });

    // Observe other elements
    const otherElements = document.querySelectorAll('.section-title, .hero-content, .contact-content');
    otherElements.forEach(element => {
        observer.observe(element);
    });
});

// Add CSS for animations if not already present
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Add the style to the head
document.head.appendChild(style);

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;

    // Add scrolled class to navbar for different styling
    if (scrolled > 50) {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.padding = 'var(--spacing-sm) 0';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.padding = 'var(--spacing-md) 0';
    }
});