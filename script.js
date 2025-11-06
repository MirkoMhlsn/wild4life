// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize button event listeners
    initializeEventListeners();
    
    // Add scroll effect to hero section
    addScrollEffect();
});

// Initialize all event listeners
function initializeEventListeners() {
    const donateBtn = document.getElementById('donateBtn');
    const volunteerBtn = document.getElementById('volunteerBtn');
    const actionBtn = document.getElementById('actionBtn');
    
    donateBtn.addEventListener('click', function() {
        showModal(
            'Make a Donation', 
            'Your contribution helps us protect natural habitats and wildlife. Every dollar makes a difference in our fight against climate change.'
        );
    });
    
    volunteerBtn.addEventListener('click', function() {
        showModal(
            'Become a Volunteer', 
            'Join our team of dedicated volunteers. Help with community outreach, events, and conservation projects in your area.'
        );
    });
    
    actionBtn.addEventListener('click', function() {
        showModal(
            'Take Action Now', 
            'Sign our petitions, contact your representatives, and spread awareness about the climate emergency. Together we can create change.'
        );
    });
}

// Show modal with specific content
function showModal(title, content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('actionModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'actionModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${title}</h3>
                <p>${content}</p>
                <button class="close-modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close event listener
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        // Update existing modal content
        modal.querySelector('h3').textContent = title;
        modal.querySelector('p').textContent = content;
    }
    
    // Show modal
    modal.style.display = 'flex';
}

// Add scroll effect to hero section
function addScrollEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation for future forms
function validateForm(formData) {
    const errors = [];
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.name) {
        errors.push('Please enter your name');
    }
    
    return errors;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        isValidEmail,
        showModal
    };
}