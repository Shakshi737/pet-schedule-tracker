// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Breed slider functionality
    const breedSlider = document.querySelector('.breed-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (breedSlider && prevBtn && nextBtn) {
        const scrollAmount = 300;
        
        prevBtn.addEventListener('click', function() {
            breedSlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            breedSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('breed-search');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() !== '') {
                // Show success message (in real app, would send to server)
                const successMsg = document.createElement('div');
                successMsg.className = 'notification';
                successMsg.textContent = 'Thanks for subscribing!';
                successMsg.style.color = 'var(--primary-light)';
                successMsg.style.marginTop = '10px';
                
                newsletterForm.appendChild(successMsg);
                emailInput.value = '';
                
                // Remove message after 3 seconds
                setTimeout(function() {
                    successMsg.remove();
                }, 3000);
            }
        });
    }
    
    // Task completion functionality (for schedule pages)
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    
    if (taskCheckboxes.length > 0) {
        taskCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskItem = this.closest('.task-item');
                const taskText = taskItem.querySelector('.task-text');
                
                if (this.checked) {
                    taskText.classList.add('task-complete');
                    taskItem.classList.add('checked');
                    
                    // Save state to localStorage
                    saveTaskState(this.id, true);
                } else {
                    taskText.classList.remove('task-complete');
                    taskItem.classList.remove('checked');
                    
                    // Save state to localStorage
                    saveTaskState(this.id, false);
                }
            });
            
            // Load saved state
            const savedState = getTaskState(checkbox.id);
            if (savedState) {
                checkbox.checked = true;
                const taskItem = checkbox.closest('.task-item');
                const taskText = taskItem.querySelector('.task-text');
                taskText.classList.add('task-complete');
                taskItem.classList.add('checked');
            }
        });
    }
    
    // Filter functionality (for schedule pages)
    const filterSelects = document.querySelectorAll('.filter-select');
    
    if (filterSelects.length > 0) {
        filterSelects.forEach(select => {
            select.addEventListener('change', function() {
                applyFilters();
            });
        });
    }
    
    // Collapsible sections (for grooming and info pages)
    const collapsibleHeadings = document.querySelectorAll('.collapsible-heading');
    
    if (collapsibleHeadings.length > 0) {
        collapsibleHeadings.forEach(heading => {
            heading.addEventListener('click', function() {
                const content = this.nextElementSibling;
                
                this.classList.toggle('active');
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
    
    // Interactive food calculator (for food quantity page)
    const foodCalculatorForm = document.getElementById('food-calculator-form');
    
    if (foodCalculatorForm) {
        foodCalculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const weight = parseFloat(document.getElementById('pet-weight').value);
            const age = document.getElementById('pet-age').value;
            const activityLevel = document.getElementById('activity-level').value;
            
            if (!isNaN(weight)) {
                calculateFoodAmount(weight, age, activityLevel);
            }
        });
    }
    
    // Breed care guide links
    const breedLinks = document.querySelectorAll('.breed-link');
    
    if (breedLinks.length > 0) {
        breedLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const breedName = this.getAttribute('data-breed');
                navigateToBreedPage(breedName);
            });
        });
    }
});

// Helper Functions

// Search functionality
function performSearch(query) {
    query = query.trim().toLowerCase();
    
    if (query === '') return;
    
    // In a real application, this would search the actual content
    // For this demo, we'll redirect to a simulated search results page
    localStorage.setItem('searchQuery', query);
    
    // Check if we're on the home page or another page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        window.location.href = 'search-results.html';
    } else {
        window.location.href = '../search-results.html';
    }
}

// Task state persistence
function saveTaskState(taskId, isComplete) {
    localStorage.setItem('task_' + taskId, isComplete);
}

function getTaskState(taskId) {
    return localStorage.getItem('task_' + taskId) === 'true';
}

// Filter application
function applyFilters() {
    const breedFilter = document.getElementById('breed-filter');
    const ageFilter = document.getElementById('age-filter');
    const weightFilter = document.getElementById('weight-filter');
    
    const selectedBreed = breedFilter ? breedFilter.value : 'all';
    const selectedAge = ageFilter ? ageFilter.value : 'all';
    const selectedWeight = weightFilter ? weightFilter.value : 'all';
    
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    scheduleItems.forEach(item => {
        const breedMatch = selectedBreed === 'all' || item.getAttribute('data-breed') === selectedBreed;
        const ageMatch = selectedAge === 'all' || item.getAttribute('data-age') === selectedAge;
        const weightMatch = selectedWeight === 'all' || item.getAttribute('data-weight') === selectedWeight;
        
        if (breedMatch && ageMatch && weightMatch) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Food amount calculator
function calculateFoodAmount(weight, age, activityLevel) {
    let baseAmount = 0;
    
    // Basic calculation based on weight (in kg)
    if (weight < 5) {
        baseAmount = weight * 30; // grams per day
    } else if (weight < 10) {
        baseAmount = 150 + (weight - 5) * 25;
    } else if (weight < 20) {
        baseAmount = 275 + (weight - 10) * 20;
    } else if (weight < 40) {
        baseAmount = 475 + (weight - 20) * 15;
    } else {
        baseAmount = 775 + (weight - 40) * 10;
    }
    
    // Age factor
    let ageFactor = 1;
    switch (age) {
        case 'puppy':
            ageFactor = 1.6; // Puppies need more food
            break;
        case 'adult':
            ageFactor = 1;
            break;
        case 'senior':
            ageFactor = 0.8; // Seniors need less food
            break;
    }
    
    // Activity level factor
    let activityFactor = 1;
    switch (activityLevel) {
        case 'low':
            activityFactor = 0.8;
            break;
        case 'moderate':
            activityFactor = 1;
            break;
        case 'high':
            activityFactor = 1.3;
            break;
    }
    
    // Calculate final amount
    const finalAmount = Math.round(baseAmount * ageFactor * activityFactor);
    
    // Display the result
    const resultElement = document.getElementById('food-result');
    if (resultElement) {
        resultElement.textContent = `Recommended daily amount: ${finalAmount} grams`;
        resultElement.style.display = 'block';
    }
}

// Navigate to breed-specific page
function navigateToBreedPage(breedName) {
    localStorage.setItem('selectedBreed', breedName);
    
    // In a real app, we would have dedicated breed pages
    // For this demo, we'll use a generic page
    window.location.href = 'breed-care.html';
} 