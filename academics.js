// academics.js - Scripts for the Academics page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navbarNav = document.getElementById('navbarNav');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }
    
    // Animation for department cards on scroll
    const departmentCards = document.querySelectorAll('.department-card');
    
    // Initialize cards as invisible
    departmentCards.forEach(card => {
        card.style.opacity = '0';
    });
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        departmentCards.forEach((card, index) => {
            if (isInViewport(card)) {
                // Add a small delay based on the index for staggered animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    // Initial check and scroll event listener
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Modal video handling - pause videos when modal is closed
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('hidden.bs.modal', function() {
            // Find all iframes within this modal
            const iframes = this.querySelectorAll('iframe');
            
            // For each iframe, reset its src to pause the video
            iframes.forEach(iframe => {
                const src = iframe.src;
                iframe.src = '';
                setTimeout(() => {
                    iframe.src = src;
                }, 100);
            });
        });
    });
    
    // Enhance department cards with hover effects
    departmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 12px 30px rgba(46, 125, 50, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset to original shadow
            this.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Department filter functionality (if search is implemented)
    const searchInput = document.getElementById('departmentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            departmentCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Modal content enhancement - dynamically load additional content
    const modalsWithDynamicContent = document.querySelectorAll('[data-dynamic-content="true"]');
    modalsWithDynamicContent.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            const contentContainer = this.querySelector('.dynamic-content');
            const departmentId = this.id.replace('Modal', '');
            
            if (contentContainer) {
                // Here you could fetch additional content from an API
                // For demo purposes, we'll just add some dummy content with a loading effect
                contentContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Loading additional information...</p></div>';
                
                // Simulate API fetch delay
                setTimeout(() => {
                    contentContainer.innerHTML = `
                        <div class="alert alert-success">
                            <h5><i class="fas fa-calendar-alt me-2"></i>Upcoming Events</h5>
                            <p>Workshop: Advanced techniques in ${departmentId} - June 15, 2025</p>
                            <p>Guest Lecture: Industry applications of ${departmentId} - June 22, 2025</p>
                        </div>
                    `;
                }, 1000);
            }
        });
    });
    
    // Initialize tooltips if Bootstrap's tooltip is used
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (typeof bootstrap !== 'undefined') {
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Handle contact form in department modals (if implemented)
    const departmentContactForms = document.querySelectorAll('.department-contact-form');
    departmentContactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Show submission confirmation
            this.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i>
                    Thank you for your interest! A department representative will contact you soon.
                </div>
            `;
            
            // In a real application, you would send this data to your server
            console.log('Form submission:', formDataObj);
        });
    });
});