document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });

    // Mobile Navigation Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Add scroll event for sticky header
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Enhanced scrolling animation for news cards
    const newsCards = document.querySelectorAll('.news-card');
    
    // Create intersection observer for additional animations
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: "0px"
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stagger child elements animation
                const childElements = entry.target.querySelectorAll('.card-title, .card-text, .btn');
                childElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animate-in');
                    }, 100 * (index + 1));
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    newsCards.forEach(card => {
        observer.observe(card);
        
        // Add hover effect with sound feedback
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add CSS classes for smooth animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .news-card {
                opacity: 0.7;
                transition: all 0.5s ease;
            }
            
            .news-card.is-visible {
                opacity: 1;
            }
            
            .card-title, .card-text, .btn {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.4s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .navbar-scrolled {
                padding: 10px 0;
                background-color: rgba(46, 125, 50, 0.95);
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .news-tag {
                animation: pulse 2s infinite;
            }
        </style>
    `);
    
    // Filter button functionality (if added later)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter the news cards
                newsCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('is-visible');
                        }, 100);
                    } else {
                        card.classList.remove('is-visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Search functionality (can be implemented if needed)
    const searchInput = document.querySelector('.search-news');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            newsCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const content = card.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, 100);
                } else {
                    card.classList.remove('is-visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
});