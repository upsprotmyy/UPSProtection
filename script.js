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

// Professional Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add scroll animations to elements
    document.addEventListener('DOMContentLoaded', function() {
        // Add fade-in class to sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index > 0) { // Skip hero section
                section.classList.add('fade-in');
                scrollObserver.observe(section);
            }
        });

        // Add slide-in effects to cards
        const cards = document.querySelectorAll('.product-card, .service-item, .feature, [style*="background: white; padding: 2rem"]');
        cards.forEach((card, index) => {
            card.classList.add('scale-in');
            card.style.transitionDelay = `${index * 0.1}s`;
            scrollObserver.observe(card);
        });

        // Add hover effects to interactive elements
        const hoverElements = document.querySelectorAll('.product-card, .feature, [style*="box-shadow"]');
        hoverElements.forEach(element => {
            element.classList.add('hover-lift');
        });

        // Animate statistics on scroll
        const stats = document.querySelectorAll('[style*="font-size: 2.5rem"]');
        stats.forEach(stat => {
            stat.classList.add('scale-in');
            scrollObserver.observe(stat);
        });
    });
}

// Initialize scroll effects
initScrollEffects();

// Smooth scroll to top functionality
function addScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1e40af;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);
    `;

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(scrollBtn);

    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Add scroll to top button
addScrollToTop();

// Professional page loading animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Mobile image loading fix
    if (window.innerWidth <= 768) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Force image display on mobile
            img.style.display = 'block';
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            
            // Handle image loading errors
            img.onerror = function() {
                console.log('Image failed to load on mobile:', this.src);
                // Try reloading after a delay
                setTimeout(() => {
                    this.src = this.src.split('?')[0] + '?mobile=' + Date.now();
                }, 500);
            };
            
            // Ensure image is loaded
            if (!img.complete) {
                img.onload = function() {
                    this.style.opacity = '1';
                    this.style.visibility = 'visible';
                };
            }
        });
    }
});

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