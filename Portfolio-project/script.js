// Theme Toggle Functionality with enhanced animations
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
body.setAttribute('data-theme', currentTheme);

// Toggle theme function with ripple effect
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'var(--accent-primary)';
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

// Mobile Menu Toggle Functionality with enhanced animations
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Add animation to menu items
    const menuLinks = navMenu.querySelectorAll('.nav-link');
    menuLinks.forEach((link, index) => {
        if (navMenu.classList.contains('active')) {
            link.style.animation = `slideInRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s both`;
        } else {
            link.style.animation = '';
        }
    });
}

// Event listener for mobile menu toggle
hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        // Remove animations
        const menuLinks = navMenu.querySelectorAll('.nav-link');
        menuLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Form Submission Handling with enhanced animations
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

            // Show success message with animation
            showSuccess('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();

            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Add input focus effects
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-5px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add multiple animation classes for different effects
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.index * 0.1}s`;
            }

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
    // Add index to skill cards for staggered animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.dataset.index = index;
        observer.observe(card);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.dataset.index = index;
        observer.observe(card);
    });

    // Observe other elements
    const otherElements = document.querySelectorAll('.section-title, .hero-content, .about-content, .contact-content');
    otherElements.forEach(element => {
        observer.observe(element);
    });
});

// Enhanced smooth scrolling for anchor links with parallax effect
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

            // Scroll with enhanced smooth behavior
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header

            // Animate scroll manually for better control
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 1000;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// Parallax effect for background elements
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;

    // Add scrolled class to navbar for different styling
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect for hero section
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        const homeRect = homeSection.getBoundingClientRect();
        const homeTop = homeRect.top;
        const parallax = scrolled * 0.5;

        // Apply subtle parallax to background
        homeSection.style.backgroundPosition = `center ${parallax}px`;
    }

    lastScrollY = scrolled;
});

// Enhanced skills loading with fade-in animation
async function loadSkillsFromMarkdown() {
    try {
        // In a real implementation, this would fetch the markdown files from the server
        // For this example, I'll simulate loading the skills data

        const skillsContainer = document.getElementById('skills-container');

        // Clear existing content with fade out
        skillsContainer.style.opacity = '0';
        skillsContainer.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            // Define skills based on the markdown files we saw
            const skillsData = [
                {
                    name: "UI/UX Designer",
                    description: "Help design beautiful UI components with attention to aesthetics, usability, and consistency. Following accessibility standards and responsive design principles."
                },
                {
                    name: "Playwright Testing",
                    description: "Test website visually to ensure proper functionality, responsiveness, and UI consistency across different devices and screen sizes."
                },
                {
                    name: "SEO Optimization",
                    description: "Optimize web content and technical elements to improve search engine rankings and organic visibility."
                },
                {
                    name: "Skill Creator",
                    description: "Help create skill files for the portfolio website in markdown format, making them clear and structured."
                }
            ];

            // Clear container
            skillsContainer.innerHTML = '';

            // Populate the skills container with enhanced animations
            skillsData.forEach((skill, index) => {
                const skillCard = document.createElement('div');
                skillCard.className = 'skill-card';
                skillCard.style.opacity = '0';
                skillCard.style.transform = 'translateY(30px)';
                skillCard.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

                // Add staggered delay
                skillCard.style.transitionDelay = `${index * 0.1}s`;

                skillCard.innerHTML = `
                    <h3>${skill.name}</h3>
                    <p>${skill.description}</p>
                `;

                skillsContainer.appendChild(skillCard);

                // Trigger reflow and then apply final state
                setTimeout(() => {
                    skillCard.style.opacity = '1';
                    skillCard.style.transform = 'translateY(0)';
                }, 10);
            });

            // Fade in container
            skillsContainer.style.opacity = '1';
        }, 300);

    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

// Initialize skills loading when DOM is ready
document.addEventListener('DOMContentLoaded', loadSkillsFromMarkdown);

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
        background: var(--accent-tertiary);
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

    .navbar.scrolled {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        padding: var(--spacing-sm) 0;
    }

    .nav-link.active {
        color: var(--text-secondary);
    }

    .nav-link.active::before {
        width: 100%;
    }

    /* Enhanced hover effects for all interactive elements */
    .project-card:hover .project-image {
        transform: scale(1.05);
    }

    .skill-card:hover h3::after,
    .project-title::after {
        width: 60px;
        transition: width 0.3s ease;
    }
`;

// Add the style to the head
document.head.appendChild(style);

// Particle background effect for extra visual interest
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = \`rgba(\${Math.random() > 0.5 ? '255, 126, 179' : '161, 140, 209'}, \${Math.random() * 0.2 + 0.05})\`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticlesArray() {
        particles = [];
        const particleCount = window.innerWidth * window.innerHeight / 10000;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    initParticlesArray();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections between nearby particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = \`rgba(161, 140, 209, \${0.2 * (1 - distance/100)})\`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', initParticles);