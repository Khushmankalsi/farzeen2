// function bookAppointment() {
//     alert('Booking system would open here. Contact: +91-9873032179');
// }

// function getAppointment() {
//     alert('Appointment booking form would open here.');
// }

// function watchVideo() {
//     alert('Video player would open here showing salon services.');
// }

function openSocial(platform) {
    const urls = {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        pinterest: 'https://pinterest.com',
        twitter: 'https://twitter.com'
    };
    window.open(urls[platform], '_blank');
}

// Enhanced responsive behavior
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add scroll effect to social icons
window.addEventListener('scroll', function() {
    const socialSidebar = document.querySelector('.social-sidebar');
    if (socialSidebar && window.scrollY > 100) {
        socialSidebar.style.opacity = '0.8';
    } else if (socialSidebar) {
        socialSidebar.style.opacity = '1';
    }
});



// Gallery Slider Functionality
function initGallerySlider() {
    const cardStack = document.getElementById('cardStack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    const cards = cardStack.querySelectorAll('.highland-card');
    const dots = dotsContainer.querySelectorAll('.highland-dot');
    
    let currentIndex = 1; // Start with center card (index 1)
    let autoPlayInterval;
    let isAutoPlaying = true;
    
    // Function to update slider position
    function updateSlider() {
        // Remove active class from all cards and dots
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current card and dot
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        
        // Update card positions for the overlapping effect
        cards.forEach((card, index) => {
            const offset = index - currentIndex;
            
            if (offset === 0) {
                // Center card
                card.style.transform = 'translateX(0px) translateZ(50px) rotateY(0deg)';
                card.style.opacity = '1';
                card.style.zIndex = '100';
            } else if (offset === -1 || offset === cards.length - 1) {
                // Left card
                card.style.transform = 'translateX(-180px) translateZ(0px) rotateY(15deg)';
                card.style.opacity = '0.7';
                card.style.zIndex = '1';
            } else if (offset === 1 || offset === -(cards.length - 1)) {
                // Right card
                card.style.transform = 'translateX(180px) translateZ(0px) rotateY(-15deg)';
                card.style.opacity = '0.7';
                card.style.zIndex = '1';
            } else {
                // Hidden cards
                card.style.transform = 'translateX(0px) translateZ(-50px)';
                card.style.opacity = '0';
                card.style.zIndex = '0';
            }
        });
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider();
    }
    
    // Function to go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        if (isAutoPlaying) {
            setTimeout(startAutoPlay, 5000); // Restart auto-play after 5 seconds
        }
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        if (isAutoPlaying) {
            setTimeout(startAutoPlay, 5000); // Restart auto-play after 5 seconds
        }
    });
    
    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            if (isAutoPlaying) {
                setTimeout(startAutoPlay, 5000); // Restart auto-play after 5 seconds
            }
        });
    });
    
    // Pause auto-play on hover
    cardStack.addEventListener('mouseenter', stopAutoPlay);
    cardStack.addEventListener('mouseleave', () => {
        if (isAutoPlaying) {
            startAutoPlay();
        }
    });
    
    // Initialize slider
    updateSlider();
    startAutoPlay();
}

// Initialize gallery slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Existing scroll effect for social icons
    window.addEventListener('scroll', function() {
        const socialSidebar = document.querySelector('.social-sidebar');
        if (socialSidebar && window.scrollY > 100) {
            socialSidebar.style.opacity = '0.8';
        } else if (socialSidebar) {
            socialSidebar.style.opacity = '1';
        }
    });
    
    // Initialize gallery slider
    if (document.getElementById('cardStack')) {
        initGallerySlider();
    }
});

// Section 1

