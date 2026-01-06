// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-level');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const timelineItems = document.querySelectorAll('.timeline-item');
const skillCards = document.querySelectorAll('.skill-card');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Scroll Event Listener
window.addEventListener('scroll', () => {
    // Navbar styling on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Check for elements to animate
    animateOnScroll();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for navbar height
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding link
            document.querySelector(`.nav-item[href="#${sectionId}"]`).classList.add('active');
        }
    });
}

// Animate elements when they enter the viewport
function animateOnScroll() {
    // Animate skill bars when skills section is visible
    const skillsSection = document.getElementById('skills');
    if (isElementInViewport(skillsSection)) {
        skillCards.forEach(card => {
            card.classList.add('skill-visible');
        });
    }
    
    // Animate timeline items
    timelineItems.forEach(item => {
        if (isElementInViewport(item)) {
            item.classList.add('visible');
        }
    });
}

// Check if element is in viewport
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0 &&
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Form validation and submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form inputs
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Basic validation
    if (name.value.trim() === '' || 
        email.value.trim() === '' || 
        subject.value.trim() === '' || 
        message.value.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        alert('Please enter a valid email address');
        return;
    }
    
    // If validation passes, send the form (this is a simulation)
    alert('Message sent successfully!');
    contactForm.reset();
});

// Implement floating labels for form inputs
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Check initial state
    if (input.value !== '') {
        input.nextElementSibling.classList.add('active');
    }
    
    // Focus and blur events
    input.addEventListener('focus', () => {
        input.nextElementSibling.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.nextElementSibling.classList.remove('active');
        }
    });
});

// Intersection Observer for better animation triggers
if ('IntersectionObserver' in window) {
    // For skill cards
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skill-visible');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillCards.forEach(card => {
        skillObserver.observe(card);
    });
    
    // For timeline items with staggered animation
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Add subtle parallax effect to splash elements
window.addEventListener('mousemove', (e) => {
    const splashElements = document.querySelectorAll('.splash-element');
    
    splashElements.forEach(element => {
        const speed = 0.05;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Add typing effect for home tagline on first load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    animateOnScroll();
    updateActiveNavLink();
    
    // Add smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.classList.add('scroll-top');
    document.body.appendChild(scrollTopBtn);
    
    // Add styles for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--accent-color);
            color: var(--bg-primary);
            border: none;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 99;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-top.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-top:hover {
            background-color: var(--accent-hover);
            transform: translateY(-5px);
        }
        
        @media (max-width: 768px) {
            .scroll-top {
                width: 40px;
                height: 40px;
                font-size: 16px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Project hover effect enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});


// Create network constellation animation
function createNetworkAnimation() {
    // Create container and add to body
    const networkContainer = document.createElement('div');
    networkContainer.className = 'network-animation';
    document.body.prepend(networkContainer);
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    networkContainer.appendChild(canvas);
    
    // Get context and set canvas size
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Configuration
    const config = {
        particleCount: 70,
        particleColor: '#56ccf2',
        lineColor: 'rgba(86, 204, 242, 0.2)',
        particleRadius: 2,
        lineWidth: 1,
        lineLength: 150,
        particleSpeed: 0.3
    };
    
    // Resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = createParticles();
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = Math.random() * config.particleSpeed * 2 - config.particleSpeed;
            this.vy = Math.random() * config.particleSpeed * 2 - config.particleSpeed;
            this.radius = Math.random() * config.particleRadius + 1;
        }
        
        update() {
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
            this.x += this.vx;
            this.y += this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = config.particleColor;
            ctx.fill();
        }
    }
    
    // Create particles
    let particles = [];
    function createParticles() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
        return particles;
    }
    
    particles = createParticles();
    
    // Calculate distance between particles
    function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    
    // Draw connecting lines between particles
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const distance = getDistance(particles[i], particles[j]);
                
                if (distance < config.lineLength) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = config.lineColor;
                    ctx.lineWidth = config.lineWidth;
                    ctx.stroke();
                    
                    // Add glow effect for closer particles
                    if (distance < config.lineLength / 2) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(86, 204, 242, ${0.4 - distance/config.lineLength})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }
    }
    
    // Mouse interaction
    let mouse = { x: null, y: null, radius: 150 };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Optional background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(10, 14, 23, 1)');
        gradient.addColorStop(1, 'rgba(13, 21, 32, 1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
            
            // Mouse interaction
            if (mouse.x && mouse.y) {
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    particle.x += dx / 10;
                    particle.y += dy / 10;
                }
            }
        });
        
        drawLines();
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}

// Add this function call to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Create network animation
    createNetworkAnimation();
    
    // Your existing DOMContentLoaded code here...
    animateOnScroll();
    updateActiveNavLink();
    
    // Rest of your existing code...
});
