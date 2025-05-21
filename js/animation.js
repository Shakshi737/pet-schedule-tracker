// Animation and visual effects for the site
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements with class 'animate-in' when they enter viewport
    const animatedElements = document.querySelectorAll('.animate-in');
    
    if (animatedElements.length > 0) {
        // Add delay to each element based on position
        animatedElements.forEach((element, index) => {
            element.style.animationDelay = (0.1 + (index * 0.1)) + 's';
        });
        
        // Set up intersection observer to trigger animations when elements come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Floating effect for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('float');
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Pulse effect for CTA buttons
    const ctaButtons = document.querySelectorAll('.primary-btn');
    
    if (ctaButtons.length > 0) {
        ctaButtons.forEach(button => {
            button.classList.add('pulse');
        });
    }
    
    // Hover grow effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.classList.add('hover-grow');
        });
    }
    
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('button, .btn');
    
    if (buttons.length > 0) {
        buttons.forEach(button => {
            button.classList.add('btn-click');
        });
    }
    
    // Animated checkboxes for task completion
    const taskCheckboxLabels = document.querySelectorAll('.task-checkbox-label');
    
    if (taskCheckboxLabels.length > 0) {
        taskCheckboxLabels.forEach(label => {
            label.classList.add('animated-checkbox');
            
            const span = document.createElement('span');
            span.className = 'checkmark';
            label.appendChild(span);
        });
    }
    
    // Animate progress bars (if present)
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (progressBars.length > 0) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.getAttribute('data-progress') + '%';
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 300);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    // Animated counters (if present)
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 1500;
                    const step = Math.max(1, Math.floor(target / (duration / 16)));
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        entry.target.textContent = current;
                        
                        if (current >= target) {
                            entry.target.textContent = target;
                            clearInterval(timer);
                        }
                    }, 16);
                    
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Parallax scrolling effect for background images (if present)
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }
    
    // Fade-in effect for page load
    document.body.classList.add('page-loaded');
    
    // Hover shadow effect for cards
    const cards = document.querySelectorAll('.breed-card, .info-card');
    
    if (cards.length > 0) {
        cards.forEach(card => {
            card.classList.add('hover-shadow');
        });
    }
}); 