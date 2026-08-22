/**
 * Le cocon de la Londonnerie - Airbnb Clone
 * JavaScript for interactive functionality with Unsplash images
 */

// ===== DOM Elements =====
const galleryModal = document.getElementById('gallery-modal');
const calendarModal = document.getElementById('calendar-modal');
const guestModal = document.getElementById('guest-modal');
const mainImage = document.querySelector('.gallery-main-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const modalThumbnails = document.querySelectorAll('.modal-thumbnail');
const closeModals = document.querySelectorAll('.close-modal');
const galleryFullscreen = document.querySelector('.gallery-fullscreen');
const checkinInput = document.getElementById('checkin-date');
const checkoutInput = document.getElementById('checkout-date');
const guestInput = document.getElementById('guest-count');

// ===== Gallery Functionality =====
let currentImageIndex = 0;
const galleryImages = [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582582494705-f8ce0b04046a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
];

const galleryDescriptions = [
    'Appartement cosy avec décor britannique - Salon et cuisine',
    'Chambre confortable avec lit double',
    'Salle de bain moderne avec douche',
    'Espace extérieur privé avec barbecue électrique',
    'Vue sur le jardin verdoyant'
];

// Initialize gallery
function initGallery() {
    // Set main image
    if (mainImage && galleryImages[0]) {
        mainImage.src = galleryImages[0];
        mainImage.alt = galleryDescriptions[0];
    }
    
    // Thumbnail click handlers
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage();
            updateActiveThumbnail();
        });
    });
    
    // Modal thumbnail click handlers
    modalThumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateModalImage();
            updateActiveModalThumbnail();
        });
    });
    
    // Gallery navigation
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            navigateGallery(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            navigateGallery(1);
        });
    }
    
    // Modal navigation
    const modalPrevBtn = document.querySelector('.modal-prev');
    const modalNextBtn = document.querySelector('.modal-next');
    
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => {
            navigateModalGallery(-1);
        });
    }
    
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            navigateModalGallery(1);
        });
    }
    
    // Fullscreen gallery
    if (galleryFullscreen) {
        galleryFullscreen.addEventListener('click', openGalleryModal);
    }
    
    // Keyboard navigation for gallery
    document.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeGalleryModal();
        } else if (e.key === 'ArrowLeft') {
            navigateModalGallery(-1);
        } else if (e.key === 'ArrowRight') {
            navigateModalGallery(1);
        }
    });
}

function navigateGallery(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    updateMainImage();
    updateActiveThumbnail();
}

function navigateModalGallery(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    updateModalImage();
    updateActiveModalThumbnail();
}

function updateMainImage() {
    if (mainImage && galleryImages[currentImageIndex]) {
        mainImage.src = galleryImages[currentImageIndex];
        mainImage.alt = galleryDescriptions[currentImageIndex];
    }
}

function updateActiveThumbnail() {
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function updateModalImage() {
    const modalImage = document.getElementById('modal-image');
    if (modalImage && galleryImages[currentImageIndex]) {
        modalImage.src = galleryImages[currentImageIndex];
        modalImage.alt = galleryDescriptions[currentImageIndex];
    }
}

function updateActiveModalThumbnail() {
    modalThumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function openGalleryModal() {
    galleryModal.classList.add('active');
    updateModalImage();
    updateActiveModalThumbnail();
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Calendar Functionality =====
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedCheckin = null;
let selectedCheckout = null;

// Booked dates (example data)
const bookedDates = [
    { start: new Date(2025, 6, 9), end: new Date(2025, 6, 10) },
    { start: new Date(2025, 6, 15), end: new Date(2025, 6, 18) },
    { start: new Date(2025, 6, 22), end: new Date(2025, 6, 25) }
];

function initCalendar() {
    // Open calendar modal on input click
    if (checkinInput) {
        checkinInput.addEventListener('click', () => openCalendarModal('checkin'));
    }
    
    if (checkoutInput) {
        checkoutInput.addEventListener('click', () => openCalendarModal('checkout'));
    }
    
    // Close modal on outside click
    calendarModal.addEventListener('click', (e) => {
        if (e.target === calendarModal) {
            closeCalendarModal();
        }
    });
}

function openCalendarModal(type) {
    calendarModal.classList.add('active');
    renderCalendar();
    document.body.style.overflow = 'hidden';
    
    // Set modal title based on type
    const title = calendarModal.querySelector('h3');
    if (title) {
        title.textContent = type === 'checkin' ? 'Sélectionnez la date d\'arrivée' : 'Sélectionnez la date de départ';
    }
}

function closeCalendarModal() {
    calendarModal.classList.remove('active');
    document.body.style.overflow = '';
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    if (!calendarDays) return;
    
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    // Update month display
    const monthDisplay = document.getElementById('calendar-month');
    if (monthDisplay) {
        monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let html = '';
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        html += `<div class="calendar-day-full other-month disabled">${day}</div>`;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const isPast = date < today;
        const isToday = date.getTime() === today.getTime();
        const isBooked = isDateBooked(date);
        const isSelected = (selectedCheckin && date.getTime() === selectedCheckin.getTime()) || 
                          (selectedCheckout && date.getTime() === selectedCheckout.getTime());
        
        let classes = 'calendar-day-full';
        if (isPast) classes += ' disabled';
        if (isToday) classes += ' today';
        if (isBooked) classes += ' booked';
        if (isSelected) classes += ' selected';
        
        html += `<div class="${classes}" data-date="${date.toISOString()}">${day}</div>`;
    }
    
    // Next month days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        html += `<div class="calendar-day-full other-month disabled">${day}</div>`;
    }
    
    calendarDays.innerHTML = html;
    
    // Add click handlers
    calendarDays.querySelectorAll('.calendar-day-full:not(.disabled):not(.booked)').forEach(dayEl => {
        dayEl.addEventListener('click', () => {
            const dateStr = dayEl.getAttribute('data-date');
            const date = new Date(dateStr);
            
            // If we're selecting checkin
            if (!selectedCheckin || (selectedCheckin && selectedCheckout)) {
                selectedCheckin = date;
                selectedCheckout = null;
            } else if (selectedCheckin && !selectedCheckout && date > selectedCheckin) {
                selectedCheckout = date;
            } else if (selectedCheckin && !selectedCheckout && date <= selectedCheckin) {
                // Select new checkin date
                selectedCheckin = date;
                selectedCheckout = null;
            }
            
            renderCalendar();
            updateDateInputs();
        });
    });
    
    // Add navigation handlers
    const prevBtn = calendarModal.querySelector('.calendar-nav:first-child');
    const nextBtn = calendarModal.querySelector('.calendar-nav:last-child');
    
    if (prevBtn) {
        prevBtn.onclick = () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        };
    }
}

function isDateBooked(date) {
    for (const booking of bookedDates) {
        const start = new Date(booking.start);
        const end = new Date(booking.end);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        
        if (date >= start && date <= end) {
            return true;
        }
    }
    return false;
}

function updateDateInputs() {
    if (checkinInput) {
        checkinInput.value = selectedCheckin ? formatDate(selectedCheckin) : '';
    }
    if (checkoutInput) {
        checkoutInput.value = selectedCheckout ? formatDate(selectedCheckout) : '';
    }
    
    // Update guest selector if dates are selected
    if (selectedCheckin && selectedCheckout) {
        calculateTotalPrice();
    }
}

function formatDate(date) {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName} ${day} ${monthName} ${year}`;
}

// ===== Guest Selector Functionality =====
let adults = 1;
let children = 0;
let babies = 0;
const maxGuests = 2;

function initGuestSelector() {
    if (guestInput) {
        guestInput.addEventListener('click', openGuestModal);
    }
    
    // Close modal on outside click
    guestModal.addEventListener('click', (e) => {
        if (e.target === guestModal) {
            closeGuestModal();
        }
    });
}

function openGuestModal() {
    guestModal.classList.add('active');
    updateGuestCounterDisplay();
    document.body.style.overflow = 'hidden';
}

function closeGuestModal() {
    guestModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateGuestCounterDisplay() {
    const adultCounter = guestModal.querySelector('.guest-counter:first-child .counter-value');
    const childCounter = guestModal.querySelector('.guest-counter:nth-child(2) .counter-value');
    const babyCounter = guestModal.querySelector('.guest-counter:last-child .counter-value');
    
    if (adultCounter) adultCounter.textContent = adults;
    if (childCounter) childCounter.textContent = children;
    if (babyCounter) babyCounter.textContent = babies;
    
    updateGuestInput();
    updateCounterButtons();
}

function updateGuestInput() {
    const total = adults + children + babies;
    if (guestInput) {
        guestInput.value = `${total} ${total === 1 ? 'voyageur' : 'voyageurs'}`;
    }
    calculateTotalPrice();
}

function updateCounterButtons() {
    const adultMinus = guestModal.querySelector('.guest-counter:first-child .minus');
    const adultPlus = guestModal.querySelector('.guest-counter:first-child .plus');
    const childMinus = guestModal.querySelector('.guest-counter:nth-child(2) .minus');
    const childPlus = guestModal.querySelector('.guest-counter:nth-child(2) .plus');
    const babyMinus = guestModal.querySelector('.guest-counter:last-child .minus');
    const babyPlus = guestModal.querySelector('.guest-counter:last-child .plus');
    
    const total = adults + children + babies;
    
    // Adults
    if (adultMinus) adultMinus.classList.toggle('disabled', adults <= 1);
    if (adultPlus) adultPlus.classList.toggle('disabled', total >= maxGuests);
    
    // Children
    if (childMinus) childMinus.classList.toggle('disabled', children <= 0);
    if (childPlus) childPlus.classList.toggle('disabled', total >= maxGuests);
    
    // Babies
    if (babyMinus) babyMinus.classList.toggle('disabled', babies <= 0);
    if (babyPlus) babyPlus.classList.toggle('disabled', total >= maxGuests);
}

function initGuestCounters() {
    // Adult counter
    const adultMinus = guestModal.querySelector('.guest-counter:first-child .minus');
    const adultPlus = guestModal.querySelector('.guest-counter:first-child .plus');
    
    if (adultMinus) {
        adultMinus.addEventListener('click', () => {
            if (adults > 1) {
                adults--;
                updateGuestCounterDisplay();
            }
        });
    }
    
    if (adultPlus) {
        adultPlus.addEventListener('click', () => {
            const total = adults + children + babies;
            if (total < maxGuests) {
                adults++;
                updateGuestCounterDisplay();
            }
        });
    }
    
    // Child counter
    const childMinus = guestModal.querySelector('.guest-counter:nth-child(2) .minus');
    const childPlus = guestModal.querySelector('.guest-counter:nth-child(2) .plus');
    
    if (childMinus) {
        childMinus.addEventListener('click', () => {
            if (children > 0) {
                children--;
                updateGuestCounterDisplay();
            }
        });
    }
    
    if (childPlus) {
        childPlus.addEventListener('click', () => {
            const total = adults + children + babies;
            if (total < maxGuests) {
                children++;
                updateGuestCounterDisplay();
            }
        });
    }
    
    // Baby counter
    const babyMinus = guestModal.querySelector('.guest-counter:last-child .minus');
    const babyPlus = guestModal.querySelector('.guest-counter:last-child .plus');
    
    if (babyMinus) {
        babyMinus.addEventListener('click', () => {
            if (babies > 0) {
                babies--;
                updateGuestCounterDisplay();
            }
        });
    }
    
    if (babyPlus) {
        babyPlus.addEventListener('click', () => {
            const total = adults + children + babies;
            if (total < maxGuests) {
                babies++;
                updateGuestCounterDisplay();
            }
        });
    }
}

// ===== Price Calculation =====
const basePrice = 65;
const cleaningFee = 0; // Included
const serviceFee = 0; // Included

function calculateTotalPrice() {
    let totalNights = 0;
    let totalPrice = basePrice; // Default to 1 night
    
    if (selectedCheckin && selectedCheckout) {
        const timeDiff = selectedCheckout.getTime() - selectedCheckin.getTime();
        totalNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        totalPrice = basePrice * totalNights;
    }
    
    // Update price display
    const priceElements = document.querySelectorAll('.price-amount strong');
    priceElements.forEach(el => {
        el.textContent = `€${basePrice}`;
    });
    
    // Update total price breakdown
    const priceBreakdown = document.querySelector('.price-breakdown.total span:last-child');
    if (priceBreakdown) {
        priceBreakdown.innerHTML = `<strong>€${totalPrice || basePrice}</strong>`;
    }
    
    // Update first price breakdown line
    const firstBreakdown = document.querySelector('.price-breakdown:first-child');
    if (firstBreakdown) {
        firstBreakdown.innerHTML = `
            <span>€${basePrice} x ${totalNights || 1} nuit${totalNights > 1 ? 's' : ''}</span>
            <span>€${basePrice * (totalNights || 1)}</span>
        `;
    }
}

// ===== Booking Functionality =====
function initBooking() {
    const bookBtn = document.querySelector('.btn-book');
    
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            if (!selectedCheckin || !selectedCheckout) {
                alert('Veuillez sélectionner les dates d\'arrivée et de départ');
                return;
            }
            
            const total = adults + children + babies;
            if (total === 0) {
                alert('Veuillez indiquer le nombre de voyageurs');
                return;
            }
            
            // In a real app, this would submit to the server
            const checkinDate = formatDate(selectedCheckin);
            const checkoutDate = formatDate(selectedCheckout);
            alert(`Réservation pour ${checkinDate} au ${checkoutDate} pour ${total} voyageur(s)\nPrix total: €${basePrice * Math.ceil((selectedCheckout - selectedCheckin) / (1000 * 60 * 60 * 24))}`);
        });
    }
}

// ===== Close Modal Handlers =====
function initCloseModals() {
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            // Close all modals
            galleryModal.classList.remove('active');
            calendarModal.classList.remove('active');
            guestModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            galleryModal.classList.remove('active');
            calendarModal.classList.remove('active');
            guestModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== Like Button Functionality =====
function initLikeButton() {
    const likeBtn = document.querySelector('.btn-like');
    const likeIcon = likeBtn ? likeBtn.querySelector('i') : null;
    let isLiked = false;
    
    if (likeBtn && likeIcon) {
        likeBtn.addEventListener('click', () => {
            isLiked = !isLiked;
            likeIcon.className = isLiked ? 'fas fa-heart' : 'far fa-heart';
            likeBtn.style.color = isLiked ? '#FF5A5F' : '';
            likeBtn.style.borderColor = isLiked ? '#FF5A5F' : '';
            
            // Show feedback
            const feedback = document.createElement('div');
            feedback.className = 'like-feedback';
            feedback.textContent = isLiked ? 'Ajouté à vos favoris' : 'Retiré des favoris';
            feedback.style.position = 'absolute';
            feedback.style.top = '-40px';
            feedback.style.left = '0';
            feedback.style.backgroundColor = '#000';
            feedback.style.color = '#fff';
            feedback.style.padding = '8px 12px';
            feedback.style.borderRadius = '4px';
            feedback.style.fontSize = '12px';
            feedback.style.whiteSpace = 'nowrap';
            feedback.style.zIndex = '10';
            
            likeBtn.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 2000);
        });
    }
}

// ===== Share Button Functionality =====
function initShareButton() {
    const shareBtn = document.querySelector('.btn-share');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            // Copy URL to clipboard
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                const originalText = shareBtn.innerHTML;
                shareBtn.innerHTML = '<i class="fas fa-check"></i><span>Copié !</span>';
                
                setTimeout(() => {
                    shareBtn.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy URL: ', err);
                alert('Impossible de copier le lien. Veuillez essayer manuellement.');
            });
        });
    }
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '20px';
    scrollBtn.style.right = '20px';
    scrollBtn.style.width = '48px';
    scrollBtn.style.height = '48px';
    scrollBtn.style.backgroundColor = '#FF5A5F';
    scrollBtn.style.color = '#fff';
    scrollBtn.style.border = 'none';
    scrollBtn.style.borderRadius = '50%';
    scrollBtn.style.cursor = 'pointer';
    scrollBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    scrollBtn.style.display = 'none';
    scrollBtn.style.alignItems = 'center';
    scrollBtn.style.justifyContent = 'center';
    scrollBtn.style.fontSize = '20px';
    scrollBtn.style.zIndex = '1000';
    scrollBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Region Cards Interaction =====
function initRegionCards() {
    const regionCards = document.querySelectorAll('.region-card');
    
    regionCards.forEach(card => {
        card.addEventListener('click', () => {
            const overlay = card.querySelector('.region-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)';
                setTimeout(() => {
                    overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)';
                }, 200);
            }
        });
    });
}

// ===== Lazy Loading Images =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initGallery();
    initCalendar();
    initGuestSelector();
    initGuestCounters();
    initCloseModals();
    initLikeButton();
    initShareButton();
    initBooking();
    initScrollToTop();
    initRegionCards();
    initLazyLoading();
    
    // Update date inputs on load
    updateDateInputs();
    updateGuestCounterDisplay();
    calculateTotalPrice();
    
    console.log('Le cocon de la Londonnerie - Site initialized with Unsplash images');
});

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

// ===== Smooth Scroll for Anchor Links =====
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

// ===== Responsive Navigation =====
function initResponsiveNav() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.main-nav');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.display = 'none';
    hamburger.style.background = 'none';
    hamburger.style.border = 'none';
    hamburger.style.fontSize = '20px';
    hamburger.style.color = 'var(--text-primary)';
    hamburger.style.cursor = 'pointer';
    
    // Add hamburger to header
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        headerActions.prepend(hamburger);
    }
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Show/hide hamburger based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            nav.style.display = 'none';
        } else {
            hamburger.style.display = 'none';
            nav.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', debounce(checkScreenSize, 100));
    checkScreenSize();
}

document.addEventListener('DOMContentLoaded', initResponsiveNav);

// ===== Accessibility Enhancements =====
function initAccessibility() {
    // Add ARIA attributes
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label') && btn.textContent.trim()) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
    
    // Add keyboard navigation for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
    });
}

document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== Analytics Tracking (Placeholder) =====
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // In a real app, this would send data to analytics service
}

// Track important user actions
document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Track like button
    if (target.closest('.btn-like')) {
        trackEvent('like_toggle');
    }
    
    // Track share button
    if (target.closest('.btn-share')) {
        trackEvent('share_click');
    }
    
    // Track booking button
    if (target.closest('.btn-book')) {
        trackEvent('book_click');
    }
    
    // Track gallery interaction
    if (target.closest('.thumbnail') || target.closest('.gallery-prev') || target.closest('.gallery-next')) {
        trackEvent('gallery_interaction');
    }
    
    // Track calendar interaction
    if (target.closest('.date-picker') || target.closest('.calendar-day-full')) {
        trackEvent('calendar_interaction');
    }
    
    // Track region cards
    if (target.closest('.region-card')) {
        trackEvent('region_card_click');
    }
});

// ===== Export for testing =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateGallery,
        formatDate,
        calculateTotalPrice,
        isDateBooked
    };
}
