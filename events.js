// STEM Academy - Events & Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            mobileSidebar.classList.add('active');
            sidebarOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    function closeSidebar() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Character Animation for Leadership Carousel
    const leadershipCarousel = document.getElementById('leadershipCarousel');
    if (leadershipCarousel) {
        leadershipCarousel.addEventListener('slid.bs.carousel', function() {
            animateLeaderInfo();
        });

        // Initial animation for first slide
        animateLeaderInfo();
    }

    function animateLeaderInfo() {
        // Remove active class from all leader info sections
        const allLeaderInfo = document.querySelectorAll('.leader-info');
        allLeaderInfo.forEach(info => {
            info.classList.remove('active');
        });

        // Add active class to visible leader info
        const activeSlide = document.querySelector('.carousel-item.active');
        if (activeSlide) {
            const activeLeaderInfo = activeSlide.querySelector('.leader-info');
            if (activeLeaderInfo) {
                setTimeout(() => {
                    activeLeaderInfo.classList.add('active');
                }, 100);
            }
        }
    }

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.btn-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Reset active class
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Initialize Magnific Popup for Gallery
    if (typeof $.fn.magnificPopup !== 'undefined') {
        $('.gallery-popup').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300
            }
        });
    }

    // Calendar Functionality
    initCalendar();
    
    // Scroll animation for elements (in addition to AOS)
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

// Function to reveal elements on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Calendar Functionality
function initCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const currentMonthText = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const selectedDateSpan = document.getElementById('selectedDate');
    const dayEventsDiv = document.getElementById('dayEvents');
    
    if (!calendarDiv || !currentMonthText) return;
    
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    // Sample events data (in a real application, this would come from a database)
    const events = [
        {
            date: new Date(2025, 4, 15), // May 15, 2025
            title: 'Annual Science Fair',
            time: '9:00 AM - 4:00 PM',
            location: 'Main Campus'
        },
        {
            date: new Date(2025, 4, 22), // May 22, 2025
            title: 'Robotics Competition',
            time: '10:00 AM - 3:00 PM',
            location: 'Tech Lab'
        },
        {
            date: new Date(2025, 4, 30), // May 30, 2025
            title: 'Parent-Teacher STEM Workshop',
            time: '5:30 PM - 7:30 PM',
            location: 'Auditorium'
        },
        {
            date: new Date(2025, 5, 5), // June 5, 2025
            title: 'End of Year Ceremony',
            time: '1:00 PM - 3:00 PM',
            location: 'School Auditorium'
        }
    ];
    
    // Initial calendar generation
    generateCalendar(currentMonth, currentYear);
    
    // Event listeners for next/previous month
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    function generateCalendar(month, year) {
        // Clear calendar
        calendarDiv.innerHTML = '';
        
        // Update month and year display
        const months = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
        currentMonthText.textContent = `${months[month]} ${year}`;
        
        // Get first day of the month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Create weekday headers
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        weekdays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day weekday';
            dayHeader.textContent = day;
            calendarDiv.appendChild(dayHeader);
        });
        
        // Create empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDiv.appendChild(emptyDay);
        }
        
        // Create cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            // Check if the day has any events
            const currentDate = new Date(year, month, day);
            const todayEvents = events.filter(event => 
                event.date.getFullYear() === currentDate.getFullYear() &&
                event.date.getMonth() === currentDate.getMonth() &&
                event.date.getDate() === currentDate.getDate()
            );
            
            // Mark days with events
            if (todayEvents.length > 0) {
                dayCell.classList.add('has-event');
                const eventDot = document.createElement('span');
                eventDot.className = 'event-indicator';
                dayCell.appendChild(eventDot);
            }
            
            // Mark today
            if (day === today.getDate() && 
                month === today.getMonth() && 
                year === today.getFullYear()) {
                dayCell.classList.add('today');
            }
            
            // Add click event to show day's events
            dayCell.addEventListener('click', function() {
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day').forEach(cell => {
                    cell.classList.remove('selected');
                });
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Update selected date display
                selectedDateSpan.textContent = `${months[month]} ${day}, ${year}`;
                
                // Show events for this day
                showDayEvents(currentDate);
            });
            
            calendarDiv.appendChild(dayCell);
        }
    }
    
    function showDayEvents(date) {
        // Clear previous events
        dayEventsDiv.innerHTML = '';
        
        // Filter events for the selected date
        const todayEvents = events.filter(event => 
            event.date.getFullYear() === date.getFullYear() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getDate() === date.getDate()
        );
        
        if (todayEvents.length === 0) {
            const noEvents = document.createElement('div');
            noEvents.className = 'no-events';
            noEvents.textContent = 'No events scheduled for this day.';
            dayEventsDiv.appendChild(noEvents);
        } else {
            // Create elements for each event
            todayEvents.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event-item';
                
                const eventTitle = document.createElement('h4');
                eventTitle.textContent = event.title;
                
                const eventTime = document.createElement('p');
                eventTime.className = 'event-time';
                eventTime.innerHTML = `<i class="fas fa-clock"></i> ${event.time}`;
                
                const eventLocation = document.createElement('p');
                eventLocation.className = 'event-location';
                eventLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${event.location}`;
                
                eventDiv.appendChild(eventTitle);
                eventDiv.appendChild(eventTime);
                eventDiv.appendChild(eventLocation);
                dayEventsDiv.appendChild(eventDiv);
            });
        }
    }
    
    // Show current day's events on load
    if (selectedDateSpan) {
        selectedDateSpan.textContent = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    }
    
    if (dayEventsDiv) {
        showDayEvents(today);
    }
}

// Testimonial Carousel Animation
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    if (testimonialsCarousel) {
        const carousel = new bootstrap.Carousel(testimonialsCarousel, {
            interval: 5000,
            wrap: true
        });
        
        // Add fade animation to testimonials
        testimonialsCarousel.addEventListener('slide.bs.carousel', function(e) {
            const activeItem = this.querySelector('.carousel-item.active');
            const nextItem = this.querySelector('.carousel-item:nth-child(' + (e.to + 1) + ')');
            
            if (activeItem) {
                activeItem.classList.add('fade-out');
            }
            
            if (nextItem) {
                nextItem.classList.add('fade-in');
            }
            
            setTimeout(() => {
                if (activeItem) {
                    activeItem.classList.remove('fade-out');
                }
                if (nextItem) {
                    nextItem.classList.remove('fade-in');
                }
            }, 600);
        });
    }
});

// Newsletter Subscription Validation
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const formStatus = this.querySelector('.form-status');
        
        if (!emailInput || !formStatus) return;
        
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailPattern.test(email)) {
            formStatus.textContent = 'Please enter a valid email address.';
            formStatus.classList.add('error');
            formStatus.classList.remove('success');
            return;
        }
        
        // Simulate API call to subscribe
        setTimeout(() => {
            formStatus.textContent = 'Thank you for subscribing!';
            formStatus.classList.add('success');
            formStatus.classList.remove('error');
            emailInput.value = '';
            
            // Hide success message after a few seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.classList.remove('success');
            }, 5000);
        }, 1000);
    });
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', function() {
            // Toggle current item
            const answer = this.nextElementSibling;
            const isOpen = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqAnswer = faq.querySelector('.faq-answer');
                if (faqAnswer) {
                    faqAnswer.style.maxHeight = null;
                }
            });
            
            // Open current item if it was closed
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    }
});

// Countdown Timer for Next Event
function initCountdown() {
    const countdownElement = document.getElementById('eventCountdown');
    if (!countdownElement) return;
    
    // Find the next upcoming event
    const today = new Date();
    let nextEvent = null;
    
    // Sort events by date and find the next one
    const upcomingEvents = events.filter(event => event.date > today);
    if (upcomingEvents.length > 0) {
        upcomingEvents.sort((a, b) => a.date - b.date);
        nextEvent = upcomingEvents[0];
    }
    
    if (!nextEvent) {
        countdownElement.innerHTML = '<p>No upcoming events scheduled.</p>';
        return;
    }
    
    // Set event title
    const eventTitleElement = document.getElementById('nextEventTitle');
    if (eventTitleElement) {
        eventTitleElement.textContent = nextEvent.title;
    }
    
    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const eventTime = nextEvent.date.getTime();
        const timeLeft = eventTime - now;
        
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = '<p>Event has started!</p>';
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Update countdown display
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    }
    
    // Initial call
    updateCountdown();
}

// Initialize countdown if it exists
if (document.getElementById('eventCountdown')) {
    initCountdown();
}