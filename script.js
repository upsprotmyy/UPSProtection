// Smooth scrolling for navigation links
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

// Mobile Navigation Functions
function toggleMobileMenu() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('active');
}

function closeMobileMenu() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.remove('active');
    // Close any open dropdowns
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.target.parentElement;
    dropdown.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mobile-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMobileMenu();
    }
});



// Add animation to product cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards and service items
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card, .service-item, .feature');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Slideshow functionality
let currentSlide = 0;
let slides = [];

function initializeSlideshow() {
    slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        // Simple mobile-friendly approach
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === 0) {
                slide.classList.add('active');
            }
        });
    }
}

function showSlide(n) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeSlideshow();
        
        // Initialize mobile slideshow
        if (window.innerWidth <= 768) {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.setProperty('--mobile-bg', `url('${mobileImages[0]}')`);
            }
        }
    }, 100);
});

// Auto-advance slideshow
setInterval(() => {
    if (slides.length > 0) {
        changeSlide(1);
    }
}, 5000);

// Mobile slideshow using CSS background
let mobileSlideIndex = 0;
const mobileImages = ['photo1.png', 'photo2.png'];

function changeMobileSlide() {
    if (window.innerWidth <= 768) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            // Trigger animation
            heroContent.style.animation = 'none';
            setTimeout(() => {
                mobileSlideIndex = (mobileSlideIndex + 1) % mobileImages.length;
                heroContent.style.setProperty('--mobile-bg', `url('${mobileImages[mobileSlideIndex]}')`);
                heroContent.style.animation = 'fadeSlide 0.8s ease-in-out';
            }, 50);
        }
    }
}

// Auto-advance mobile slideshow
setInterval(() => {
    if (window.innerWidth <= 768) {
        changeMobileSlide();
    }
}, 5000);

// Desktop Dropdown menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only apply hover effects on desktop
    if (window.innerWidth > 768) {
        const dropdown = document.querySelector('.dropdown');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        if (dropdown && dropdownMenu) {
            dropdown.addEventListener('mouseenter', function() {
                dropdownMenu.style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    dropdownMenu.style.display = 'none';
                }, 100);
            });
        }
    }
});