// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Download button functionality
    const downloadButtons = document.querySelectorAll('.download-button');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.querySelector('.download-text').textContent;
            const originalArrow = this.querySelector('.download-arrow').textContent;
            
            // Animate button
            this.querySelector('.download-text').textContent = 'Скачивание...';
            this.querySelector('.download-arrow').textContent = '⏳';
            this.style.background = 'linear-gradient(135deg, #0099cc, #007799)';
            
            setTimeout(() => {
                this.querySelector('.download-text').textContent = 'Скачано!';
                this.querySelector('.download-arrow').textContent = '✅';
                this.style.background = 'linear-gradient(135deg, #00d4ff, #0099cc)';
                
                setTimeout(() => {
                    this.querySelector('.download-text').textContent = originalText;
                    this.querySelector('.download-arrow').textContent = originalArrow;
                }, 2000);
            }, 1500);
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.download-item, .feature-item, .usecase-item, .stat-bar').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Add CSS for animations
    const animationStyles = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .download-item:nth-child(1) { transition-delay: 0.1s; }
        .download-item:nth-child(2) { transition-delay: 0.2s; }
        .feature-item:nth-child(1) { transition-delay: 0.1s; }
        .feature-item:nth-child(2) { transition-delay: 0.2s; }
        .feature-item:nth-child(3) { transition-delay: 0.3s; }
        .feature-item:nth-child(4) { transition-delay: 0.4s; }
        .feature-item:nth-child(5) { transition-delay: 0.5s; }
        .feature-item:nth-child(6) { transition-delay: 0.6s; }
        .usecase-item:nth-child(1) { transition-delay: 0.1s; }
        .usecase-item:nth-child(2) { transition-delay: 0.2s; }
        .usecase-item:nth-child(3) { transition-delay: 0.3s; }
        .usecase-item:nth-child(4) { transition-delay: 0.4s; }
        .usecase-item:nth-child(5) { transition-delay: 0.5s; }
        .usecase-item:nth-child(6) { transition-delay: 0.6s; }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroParticles = document.querySelector('.hero-particles');
        
        if (hero && heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.title-line');
        
        lines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        line.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                };
                typeWriter();
            }, index * 1000);
        });
    }

    // Animate stats on scroll
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statBars = entry.target.querySelectorAll('.stat-fill');
                statBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsCard = document.querySelector('.stats-card');
    if (statsCard) {
        statsObserver.observe(statsCard);
    }

    // Hover effects for cards
    document.querySelectorAll('.download-item, .feature-item, .usecase-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate numbers in stats
    const animateNumbers = () => {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }, 30);
        });
    };

    // Trigger number animation when about section is visible
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            mobileBtn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: block;
            `;
            
            mobileBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
            
            navbar.querySelector('.nav-container').appendChild(mobileBtn);
            
            navLinks.style.cssText = `
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.95);
                flex-direction: column;
                padding: 1rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            `;
        }
    };

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Custom cursor effect (optional)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Show cursor on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
    }

    // Add hover effect to interactive elements
    document.querySelectorAll('a, button, .download-item, .feature-item, .usecase-item').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
});

// Add CSS for additional effects
const additionalStyles = `
    .nav-links a.active {
        color: #60a5fa;
        background: rgba(96, 165, 250, 0.1);
    }
    
    .section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card {
        transition: all 0.3s ease;
    }
    
    .step-number {
        transition: all 0.3s ease;
    }
    
    .download-btn {
        transition: all 0.3s ease;
    }
    
    .hero {
        transition: transform 0.1s ease;
    }
    
    /* Pulse animation for download buttons */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .download-btn:hover {
        animation: pulse 1s infinite;
    }
    
    /* Glow effect for feature icons */
    .feature-icon {
        transition: all 0.3s ease;
    }
    
    .feature-card:hover .feature-icon {
        filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.5));
        transform: scale(1.1);
    }
    
    /* Gradient text animation */
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .hero-title {
        background-size: 200% 200%;
        animation: gradientShift 3s ease infinite;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 