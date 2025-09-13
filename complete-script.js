// Enhanced JavaScript for complete Mark I website

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect with enhanced backdrop blur
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.backdropFilter = 'blur(25px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Parallax effect for multiple sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // CTA section parallax
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        const ctaOffset = ctaSection.offsetTop;
        const ctaSpeed = (scrolled - ctaOffset) * 0.2;
        if (scrolled > ctaOffset - window.innerHeight) {
            ctaSection.style.transform = `translateY(${ctaSpeed}px)`;
        }
    }
});

// Advanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-active');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe multiple elements for fade-in animations
const elementsToObserve = [
    '.feature-card',
    '.process-card',
    '.cta-content',
    '.footer-content'
];

elementsToObserve.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(element);
    });
});

// Enhanced typing animation for hero title
function typeWriter(element, phrases, speed = 100) {
    let phraseIndex = 0;
    let charIndex = 0;
    element.innerHTML = '';
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (charIndex < currentPhrase.length) {
            element.innerHTML += currentPhrase.charAt(charIndex);
            charIndex++;
            setTimeout(type, speed);
        } else {
            // Pause before next phrase or restart
            setTimeout(() => {
                charIndex = 0;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                if (phraseIndex === 0) {
                    element.innerHTML = '';
                }
                type();
            }, 2000);
        }
    }
    
    type();
}

// Initialize enhanced animations when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const ctaTitle = document.querySelector('.cta-title');
    
    // Animate hero title
    if (heroTitle) {
        const phrases = ['Find bugs. Earn crypto. Repeat.'];
        setTimeout(() => {
            typeWriter(heroTitle, phrases, 50);
        }, 500);
    }
    
    // Animate process cards with staggered delay
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
});

// Enhanced button interactions
const interactiveButtons = [
    '.btn-primary',
    '.btn-secondary',
    '.cta-btn',
    '.feature-btn',
    '.cta-button',
    '.newsletter-btn'
];

interactiveButtons.forEach(selector => {
    document.querySelectorAll(selector).forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            
            if (this.classList.contains('cta-button')) {
                this.style.transform = 'translateY(-5px) scale(1.03)';
                this.style.boxShadow = '0 15px 35px rgba(220, 38, 38, 0.6)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Click ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Code animation with enhanced effects
function animateCode() {
    const codeLines = document.querySelectorAll('.code-line');
    const keywords = document.querySelectorAll('.keyword');
    
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
            
            // Add glow effect to keywords
            const keywordInLine = line.querySelector('.keyword');
            if (keywordInLine) {
                setTimeout(() => {
                    keywordInLine.style.textShadow = '0 0 10px #ff6b6b';
                    setTimeout(() => {
                        keywordInLine.style.textShadow = 'none';
                    }, 500);
                }, 200);
            }
        }, index * 150 + 1000);
    });
}

// Start enhanced code animation
window.addEventListener('load', () => {
    setTimeout(animateCode, 1500);
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.newsletter-input').value;
        
        if (validateEmail(email)) {
            // Show success message
            showNotification('Successfully subscribed!', 'success');
            this.querySelector('.newsletter-input').value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('notification-hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('notification-hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Process card hover effects with 3D transform
document.querySelectorAll('.process-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) rotateX(5deg) rotateY(2deg)';
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// CTA images hover effects
document.querySelectorAll('.cta-image').forEach(image => {
    image.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(0deg) scale(1.08)';
        this.style.borderColor = 'rgba(220, 38, 38, 0.8)';
        this.style.boxShadow = '0 15px 40px rgba(220, 38, 38, 0.3)';
    });
    
    image.addEventListener('mouseleave', function() {
        const originalRotation = this.classList.contains('left') ? '-5deg' : '5deg';
        this.style.transform = `rotate(${originalRotation}) scale(1)`;
        this.style.borderColor = 'rgba(220, 38, 38, 0.3)';
        this.style.boxShadow = 'none';
    });
});

// Social icons hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Loading animation with enhanced effects
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .process-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});

// Dynamic cursor trail (enhanced)
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
    });
    
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
});

function renderTrail() {
    // Clean up old trail elements
    document.querySelectorAll('.cursor-trail').forEach(trail => {
        const age = Date.now() - parseInt(trail.dataset.timestamp);
        if (age > 1000) {
            trail.remove();
        }
    });
    
    requestAnimationFrame(renderTrail);
}

renderTrail();

// Add enhanced styles dynamically
const enhancedStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
        z-index: 1;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(220, 38, 38, 0.9);
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification-success {
        background: rgba(34, 197, 94, 0.9);
    }
    
    .notification-error {
        background: rgba(239, 68, 68, 0.9);
    }
    
    .notification-hide {
        animation: slideOut 0.3s ease-in;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'MARK I';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #dc2626;
        font-size: 3rem;
        font-weight: 700;
        z-index: 10001;
        animation: loadingPulse 2s infinite;
    }
    
    @keyframes loadingPulse {
        0%, 100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1);
        }
        50% { 
            opacity: 0.5; 
            transform: translate(-50%, -50%) scale(1.05);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);

// Performance monitoring
const performanceMetrics = {
    startTime: performance.now(),
    
    logMetric: function(name, value) {
        console.log(`[Mark II Performance] ${name}: ${value}ms`);
    }
};

window.addEventListener('load', () => {
    const loadTime = performance.now() - performanceMetrics.startTime;
    performanceMetrics.logMetric('Page Load Time', loadTime.toFixed(2));
});

// Advanced scroll-triggered animations
const scrollTriggers = [
    {
        element: '.section-title',
        triggerPoint: 0.8,
        animation: 'slideInUp'
    },
    {
        element: '.process-card',
        triggerPoint: 0.7,
        animation: 'fadeInScale'
    }
];

function handleScrollTriggers() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    scrollTriggers.forEach(trigger => {
        const elements = document.querySelectorAll(trigger.element);
        
        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const triggerPosition = scrollTop + (windowHeight * trigger.triggerPoint);
            
            if (triggerPosition > elementTop && !element.classList.contains('animated')) {
                element.classList.add('animated', trigger.animation);
            }
        });
    });
}

window.addEventListener('scroll', handleScrollTriggers);

console.log('ðŸš€ Mark II Bug Bounty Platform - Enhanced JavaScript Loaded Successfully!');