// Animate elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all animated elements
    document.querySelectorAll('.animated').forEach((element) => {
        observer.observe(element);
    });

    // Animate skill bars when they come into view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all skill progress bars
    document.querySelectorAll('.skill-progress').forEach((element) => {
        skillObserver.observe(element);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation and enhancement
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            form.querySelectorAll('input, textarea').forEach(field => {
                if (field.value.trim() === '') {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Add success message
                const message = document.createElement('div');
                message.className = 'success-message';
                message.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                form.appendChild(message);

                // Clear form
                form.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    message.remove();
                }, 5000);
            }
        });
    }

    // Typing animation for the intro section
    const introText = document.querySelector('#intro h1');
    if (introText) {
        const text = introText.textContent;
        introText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                introText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Project hover effect enhancement
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(isDark) {
        document.body.classList.toggle('light-theme', !isDark);
        themeToggle.textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(prefersDarkScheme.matches);
    }
    
    themeToggle.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('light-theme'));
    });

    // Particle background
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.3
        };
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(30, 144, 255, ${particle.opacity})`;
            ctx.fill();
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    resizeCanvas();
    initParticles();
    drawParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Scroll Progress Indicator
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Button Ripple Effect
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Interactive Nav Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Project Card 3D Tilt Effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }

    // Smooth section transitions
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    });

    // Enhanced form interaction
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        const label = document.createElement('span');
        label.className = 'floating-label';
        label.textContent = input.placeholder;
        input.parentNode.insertBefore(label, input);

        input.addEventListener('focus', () => {
            label.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
            }
        });
    });
});
