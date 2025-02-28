// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all effects and functionality
    setupMobileMenu();
    setupContactForm();
    setupCustomCursor();
    setupParticles();
    setupScrollReveal();
    setupTypingEffect();
    setupTiltEffect();
    setupGlitchEffect();
    
    // Log initialization
    console.log('Main.js initialization complete');
});

/**
 * Sets up the mobile menu toggle functionality
 */
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

/**
 * Sets up the contact form submission handling
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Check if there's a job parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('job');
        
        // If there's a job parameter, update the subject field
        if (jobId) {
            const subjectField = document.getElementById('subject');
            if (subjectField) {
                // Fetch job data to get the job title
                fetch('js/jobs.json')
                    .then(response => response.json())
                    .then(data => {
                        const job = data.jobs.find(j => j.id === jobId);
                        if (job) {
                            subjectField.value = `Application for ${job.title}`;
                            
                            // Add a hidden field to store the job ID
                            const hiddenJobField = document.createElement('input');
                            hiddenJobField.type = 'hidden';
                            hiddenJobField.name = 'job_id';
                            hiddenJobField.id = 'job_id';
                            hiddenJobField.value = jobId;
                            contactForm.appendChild(hiddenJobField);
                            
                            // Update the form title
                            const formTitle = document.querySelector('.contact-form-title');
                            if (formTitle) {
                                formTitle.textContent = 'Apply for this Position';
                            }
                            
                            // Update the submit button
                            const submitButton = contactForm.querySelector('button[type="submit"]');
                            if (submitButton) {
                                submitButton.textContent = 'Submit Application';
                            }
                            
                            // Add a note about attaching resume
                            const messageField = document.getElementById('message');
                            if (messageField) {
                                const noteElement = document.createElement('p');
                                noteElement.className = 'text-sm text-gray-600 mt-1';
                                noteElement.textContent = 'Please include links to your resume, portfolio, or any relevant work in your message.';
                                messageField.parentNode.insertBefore(noteElement, messageField.nextSibling);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error loading job data:', error);
                    });
            }
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation)
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

/**
 * Sets up a custom cursor effect
 */
function setupCustomCursor() {
    let cursor = document.querySelector('.custom-cursor');
    let cursorDot = document.querySelector('.custom-cursor-dot');
    
    // If cursor elements don't exist, create them
    if (!cursor || !cursorDot) {
        console.log('Cursor elements not found, they should be created by components.js');
        return;
    }
    
    // Set cursor to none on body to hide default cursor
    document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hover-card, .tilt-effect');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-dot-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-dot-hover');
        });
    });
    
    console.log('Custom cursor setup complete');
}

/**
 * Sets up particle background effect
 */
function setupParticles() {
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        // Try to load the configuration from the JSON file
        particlesJS.load('particles-js', 'js/particles.json', function() {
            console.log('Particles.js loaded successfully');
        });
        
        // Fallback configuration in case the JSON file can't be loaded
        setTimeout(() => {
            if (!window.pJSDom || !window.pJSDom.length) {
                console.log('Falling back to inline particles configuration');
                particlesJS('particles-js', {
                    particles: {
                        number: {
                            value: 80,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#000000"
                        },
                        shape: {
                            type: "circle",
                            stroke: {
                                width: 0,
                                color: "#000000"
                            }
                        },
                        opacity: {
                            value: 0.1,
                            random: false,
                            anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false
                            }
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 40,
                                size_min: 0.1,
                                sync: false
                            }
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#000000",
                            opacity: 0.1,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: false,
                            straight: false,
                            out_mode: "out",
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200
                            }
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: true,
                                mode: "grab"
                            },
                            onclick: {
                                enable: true,
                                mode: "push"
                            },
                            resize: true
                        },
                        modes: {
                            grab: {
                                distance: 140,
                                line_linked: {
                                    opacity: 0.3
                                }
                            },
                            push: {
                                particles_nb: 4
                            }
                        }
                    },
                    retina_detect: true
                });
            }
        }, 1000);
    }
}

/**
 * Sets up scroll reveal animations
 */
function setupScrollReveal() {
    // Make all reveal elements visible by default
    const allRevealElements = document.querySelectorAll('.reveal');
    allRevealElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Setup animation for elements with reveal-element class
    const revealElements = document.querySelectorAll('.gradient-border, .hover-card, h2, .btn-primary, .btn-accent');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        element.classList.add('reveal-element');
        observer.observe(element);
    });
}

/**
 * Sets up typing animation effect for headings
 */
function setupTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const speed = 50; // typing speed in milliseconds
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typing effect when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(element);
    });
}

/**
 * Sets up tilt effect on hover for cards and images
 */
function setupTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const maxTilt = 10; // maximum tilt in degrees
            const tiltX = (0.5 - yPercent) * maxTilt;
            const tiltY = (xPercent - 0.5) * maxTilt;
            
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * Sets up glitch effect for text elements
 */
function setupGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-effect');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            element.classList.add('glitching');
            
            setTimeout(() => {
                element.classList.remove('glitching');
            }, 1000);
        });
    });
}

/**
 * Smooth scroll to elements when clicking on anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for header
                    behavior: 'smooth'
                });
            }
        }
    });
}); 