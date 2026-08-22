/**
 * Le cocon de la Londonnerie - Site de présentation
 * JavaScript pour les animations et interactions
 */

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
    initGallery();
});

// ===== Navigation =====
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.display = 'none';
    hamburger.style.background = 'none';
    hamburger.style.border = 'none';
    hamburger.style.color = 'var(--white)';
    hamburger.style.fontSize = '24px';
    hamburger.style.cursor = 'pointer';
    hamburger.style.zIndex = '1000';
    
    // Insert hamburger before nav links
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.after(hamburger);
    }
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Scroll effect for navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
            hamburger.style.color = 'var(--text-primary)';
        } else {
            nav.classList.remove('scrolled');
            hamburger.style.color = 'var(--white)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Show/hide hamburger based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            document.querySelector('.nav-links').style.display = 'none';
        } else {
            hamburger.style.display = 'none';
            document.querySelector('.nav-links').style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', () => {
        checkScreenSize();
    });
    checkScreenSize();
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.section-header, .accommodation-card, .gallery-item, .region-card, .highlight-card, .testimonial-card, .host-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Unobserve after animation
                setTimeout(() => {
                    observer.unobserve(entry.target);
                }, 600);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== Back to Top Button =====
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Gallery Lightbox =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'gallery-modal-content';
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const modalImage = document.createElement('img');
    modalImage.className = 'gallery-modal-image';
    modalImage.style.cssText = `
        max-width: 90vw;
        max-height: 80vh;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'gallery-modal-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: -50px;
        right: -50px;
        width: 44px;
        height: 44px;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.2s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        body.style.overflow = '';
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    modalContent.appendChild(modalImage);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            body.style.overflow = '';
        }
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            body.style.overflow = '';
        }
    });
    
    // Open modal on gallery item click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            modalImage.src = img.src;
            modalImage.alt = img.alt || 'Galerie photo';
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            body.style.overflow = 'hidden';
        });
    });
    
    // Show modal
    modal.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
}

// ===== Parallax Effect (Optional) =====
function initParallax() {
    const hero = document.querySelector('.hero-header');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.backgroundPositionY = `${rate}px`;
    });
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', initParallax);

// ===== Image Loading =====
function initImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
}

// Initialize image loading
document.addEventListener('DOMContentLoaded', initImageLoading);

// ===== Form Handling (if needed) =====
function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Form submission logic here
        alert('Merci pour votre message ! Nous vous répondrons bientôt.');
    });
}

// ===== Utility Functions =====
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

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// ===== Add Loading Attribute to Images =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

// ===== Track External Links =====
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!target) return;
    
    // Check if link is external
    if (target.hostname && target.hostname !== window.location.hostname) {
        // Add tracking or analytics here
        console.log('External link clicked:', target.href);
    }
});

// ===== Console Welcome Message =====
console.log('%c🏡 Le cocon de la Londonnerie', 'font-size: 24px; color: #2C3E50; font-weight: bold;');
console.log('%cSite de présentation - Réservation sur Airbnb', 'font-size: 14px; color: #E67E22;');
