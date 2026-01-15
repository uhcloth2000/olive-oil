/* ========================================
   ZAITOON PURE OLIVE OIL - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initTestimonialsSlider();
    initSmoothScroll();
    initFormValidation();
    initSizeSelector();
});

/* ===== NAVBAR ===== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking on nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
}

/* ===== TESTIMONIALS SLIDER ===== */
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (!slider || cards.length === 0) return;
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    function showSlide(index) {
        cards.forEach(function(card, i) {
            card.style.display = i === index ? 'block' : 'none';
            card.style.animation = i === index ? 'fadeIn 0.5s ease' : '';
        });
        
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % cards.length;
        showSlide(nextIndex);
    }
    
    // Initialize
    showSlide(0);
    
    // Auto slide
    autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Dot click handlers
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            clearInterval(autoSlideInterval);
            showSlide(index);
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Pause on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===== FORM VALIDATION ===== */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate phone (optional but if filled, should be valid)
        if (phone && phone.value.trim() && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            contactForm.reset();
        }
    });
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: #dc3545; font-size: 0.85rem; margin-top: 0.25rem;';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        input.style.borderColor = '#dc3545';
    }
    
    function clearErrors() {
        const errors = contactForm.querySelectorAll('.error-message');
        errors.forEach(function(error) {
            error.remove();
        });
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(function(input) {
            input.style.borderColor = '';
        });
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function isValidPhone(phone) {
        const regex = /^[\d\s\-\+\(\)]{10,}$/;
        return regex.test(phone);
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = 'background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';
        contactForm.appendChild(successDiv);
        
        setTimeout(function() {
            successDiv.remove();
        }, 5000);
    }
}

/* ===== SIZE SELECTOR ===== */
function initSizeSelector() {
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            // Remove active class from siblings
            const parent = this.closest('.product-sizes');
            const siblings = parent.querySelectorAll('.size-option');
            siblings.forEach(function(sibling) {
                sibling.classList.remove('active');
            });
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update price if data-price exists
            const price = this.dataset.price;
            if (price) {
                const productCard = this.closest('.product-card');
                const priceElement = productCard.querySelector('.product-price');
                if (priceElement) {
                    priceElement.innerHTML = 'Rs. ' + price + ' <span>PKR</span>';
                }
            }
        });
    });
}

/* ===== WHATSAPP ORDER ===== */
function orderOnWhatsApp(productName, size, price) {
    const phoneNumber = '923001234567'; // Replace with actual phone number
    const message = encodeURIComponent(
        `Hello! I would like to order:\n\n` +
        `Product: ${productName}\n` +
        `Size: ${size}\n` +
        `Price: Rs. ${price}\n\n` +
        `Please confirm availability and delivery details.`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

/* ===== GENERAL WHATSAPP CONTACT ===== */
function contactOnWhatsApp() {
    const phoneNumber = '923001234567'; // Replace with actual phone number
    const message = encodeURIComponent(
        `Hello! I'm interested in Zaitoon Pure Olive Oil products. Please share more information.`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}
