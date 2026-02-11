// ============================================
// BLYU - Advanced JavaScript
// Scroll-Based Vanta.js Backgrounds
// ============================================

// ============================================
// VANTA.JS EFFECTS CONFIGURATION
// ============================================

let vantaEffects = {
    hero: null,
    services: null,
    projects: null,
    testimonials: null,
    contact: null
};

let currentSection = 'hero';

// Initialize all Vanta effects
function initializeVantaEffects() {
    // HERO - NET Effect (Pink network lines)
    vantaEffects.hero = VANTA.NET({
        el: "#vanta-hero",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff3f81,              // Pink
        backgroundColor: 0x0a0a0f,     // Dark background
        points: 10.00,
        maxDistance: 20.00,
        spacing: 15.00,
        showDots: true
    });

    // SERVICES - RINGS Effect (Colorful rings)
    vantaEffects.services = VANTA.RINGS({
        el: "#vanta-services",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x202428,
        color: 0x98465f
    });

    // PROJECTS - TRUNK Effect (Circular trunk pattern)
    vantaEffects.projects = VANTA.TRUNK({
        el: "#vanta-projects",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x222425,
        color: 0x98465f,
        spacing: 0,
        chaos: 1
    });

    // TESTIMONIALS - HALO Effect (Purple halo)
    vantaEffects.testimonials = VANTA.HALO({
        el: "#vanta-testimonials",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: 0x0,
        baseColor: 0x984b5f,
        amplitudeFactor: 2.00,
        xOffset: 0.26,
        yOffset: 0.05,
        size: 1.50
    });

    // CONTACT - FOG Effect (Ethereal fog)
    vantaEffects.contact = VANTA.FOG({
        el: "#vanta-contact",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0xff3f81,
        midtoneColor: 0x3b4760,
        lowlightColor: 0x2d2e3f,
        baseColor: 0x0f0f19,
        blurFactor: 0.6,
        speed: 1.50,
        zoom: 1.00
    });

    console.log('✅ All Vanta effects initialized');
}

// Switch active Vanta background
function switchVantaBackground(sectionName) {
    if (currentSection === sectionName) return;
    
    console.log(`🔄 Switching background: ${currentSection} → ${sectionName}`);
    
    // Remove active class from all containers
    document.querySelectorAll('.vanta-container').forEach(container => {
        container.classList.remove('active');
    });
    
    // Add active class to target container
    const targetContainer = document.getElementById(`vanta-${sectionName}`);
    if (targetContainer) {
        targetContainer.classList.add('active');
    }
    
    currentSection = sectionName;
}

// ============================================
// INTERSECTION OBSERVER - Detect Scroll Position
// ============================================

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-vanta');
            if (sectionName) {
                switchVantaBackground(sectionName);
            }
        }
    });
}, {
    threshold: 0.3,  // Trigger when 30% of section is visible
    rootMargin: '-100px 0px -100px 0px'
});

// Observe all sections with data-vanta attribute
function observeSections() {
    document.querySelectorAll('[data-vanta]').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Also observe hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    switchVantaBackground('hero');
                }
            });
        }, { threshold: 0.3 });
        
        heroObserver.observe(heroSection);
    }
}

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = window.scrollY;
}, { passive: true });

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            closeMobileMenu();
        }
    });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        
        // Get submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await simulateFormSubmission(data);
            
            // Show success message
            showNotification('✅ Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            // Show error message
            showNotification('❌ Failed to send message. Please try again or email us directly at contact@blyu.tech', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Simulate form submission
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('📧 Form Data:', data);
        
        // TODO: Replace with actual API call
        // Example:
        // fetch('YOUR_API_ENDPOINT', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        
        setTimeout(resolve, 1500);
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(239, 68, 68, 0.95)',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        backdropFilter: 'blur(10px)',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }
    
    .notification-message {
        font-size: 0.95rem;
        line-height: 1.5;
    }
    
    /* Mobile Menu Styles */
    @media (max-width: 1024px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 30px;
            gap: 20px;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize handler
const handleResize = debounce(() => {
    // Resize all Vanta effects
    Object.values(vantaEffects).forEach(effect => {
        if (effect && effect.resize) {
            effect.resize();
        }
    });
}, 250);

window.addEventListener('resize', handleResize, { passive: true });

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 BLYU Website Loading...');
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .testimonial-card, .stat-item'
    );
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
    
    console.log('✅ Animations initialized');
});

// Initialize when page fully loaded
window.addEventListener('load', () => {
    console.log('🎨 Initializing Vanta.js effects...');
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        initializeVantaEffects();
        observeSections();
        document.body.classList.add('loaded');
        console.log('🎉 Website fully loaded!');
    }, 100);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    Object.values(vantaEffects).forEach(effect => {
        if (effect && effect.destroy) {
            effect.destroy();
        }
    });
});

// ============================================
// ANALYTICS (Optional)
// ============================================

function trackEvent(eventName, eventData = {}) {
    console.log('📊 Event tracked:', eventName, eventData);
    
    // TODO: Add your analytics here
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_href: e.target.href || 'none'
        });
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log(
    '%c👋 Welcome to BLYU!',
    'font-size: 24px; font-weight: bold; color: #ff3f81;'
);
console.log(
    '%cTransforming businesses through AI & Technology',
    'font-size: 14px; color: #a8a8b8;'
);
console.log(
    '%c📧 Contact: contact@blyu.tech',
    'font-size: 12px; color: #6b7280;'
);

// ============================================
// EXPORT (if needed)
// ============================================

window.BLYU = {
    showNotification,
    trackEvent,
    switchVantaBackground
};
