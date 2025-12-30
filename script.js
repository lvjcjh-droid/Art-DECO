// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Enforce a minimum display time for the brand moment
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            // Allow scrolling again (if we hid it, though we didn't explicitly hide overflow in CSS for body, 
            // but the preloader covers everything)

            setTimeout(() => {
                preloader.remove(); // Remove from DOM
            }, 800);
        }, 1800);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Gallery Image Loader
    const galleryGrid = document.getElementById('gallery-grid');
    const imageFilenames = [
        "WhatsApp Image 2025-12-26 at 13.30.40.jpeg",
        "WhatsApp Image 2025-12-26 at 13.30.49.jpeg",
        "WhatsApp Image 2025-12-26 at 13.30.57.jpeg",
        "WhatsApp Image 2025-12-26 at 13.31.19.jpeg",
        "WhatsApp Image 2025-12-26 at 13.31.43.jpeg",
        "WhatsApp Image 2025-12-26 at 13.31.56.jpeg",
        "WhatsApp Image 2025-12-26 at 13.32.37.jpeg",
        "WhatsApp Image 2025-12-26 at 13.32.47.jpeg",
        "WhatsApp Image 2025-12-26 at 13.33.00.jpeg",
        "WhatsApp Image 2025-12-26 at 13.33.53.jpeg",
        "WhatsApp Image 2025-12-26 at 13.35.47.jpeg",
        "WhatsApp Image 2025-12-26 at 13.35.57.jpeg",
        "WhatsApp Image 2025-12-26 at 13.36.06.jpeg",
        "WhatsApp Image 2025-12-26 at 13.36.13.jpeg",
        "WhatsApp Image 2025-12-26 at 13.36.21.jpeg"
    ];

    // Scroll Reveal Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    imageFilenames.forEach((filename, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        // Stagger delay for distinct "appearing" effect
        item.style.transitionDelay = `${index * 50}ms`;

        const img = document.createElement('img');
        img.src = `imagenes/Trabajos/${filename}`;
        img.alt = "Trabajo de carpintería";
        img.loading = "lazy";

        item.appendChild(img);
        galleryGrid.appendChild(item);

        // Observe the item
        observer.observe(item);

        item.addEventListener('click', () => {
            openLightbox(img.src);
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    function openLightbox(src) {
        lightbox.style.display = "block";
        // Small delay to allow display block to render before adding active class for transition
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    closeBtn.onclick = function () {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = "none";
        }, 500); // Wait for transition
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    lightbox.onclick = function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.style.display === "block") {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });

    // Sticky Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('main-nav');

    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Simple animation or class toggle for hamburger icon could be added here
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    /*
      ========================================
      MAGIC: TOUCH RIPPLE EFFECT
      ========================================
    */
    const interactiveElements = document.querySelectorAll('.btn-gold, #main-nav a, .gallery-item, .service-card');

    interactiveElements.forEach(el => {
        // Ensure relative positioning for ripple containment
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
            el.style.overflow = 'hidden';
        }

        el.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(el.clientWidth, el.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - el.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - el.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');

            const ripple = el.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }

            el.appendChild(circle);
        });
    });

    /* 
       ========================================
       MAGIC: UNIVERSAL SCROLL REVEAL 
       ========================================
    */
    const revealElements = document.querySelectorAll('.section-title, .service-card, .step-card, .hero-text-block, .material-item');

    // Add initial class to hide them
    revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* 
       ========================================
       MAGIC: ACTIVE NAVIGATION HIGHLIGHT 
       ========================================
    */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav ul li a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => navObserver.observe(section));

    /* 
       ========================================
       MAGIC: TYPEWRITER EFFECT 
       ========================================
    */
    const typewriterElement = document.getElementById('typewriter-target');
    if (typewriterElement) {
        const textToType = typewriterElement.innerText;
        typewriterElement.innerText = ''; // Clear initial text
        typewriterElement.classList.add('typewriter-cursor');

        let charIndex = 0;

        function typeWriter() {
            if (charIndex < textToType.length) {
                typewriterElement.innerText += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); // Typing speed
            } else {
                // Remove cursor after finished
                setTimeout(() => {
                    typewriterElement.classList.remove('typewriter-cursor');
                }, 2000);
            }
        }

        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    typewriterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        typewriterObserver.observe(typewriterElement);
    }

    /* 
       ========================================
       MAGIC: TRANSITION CURTAIN
       ========================================
    */
    const curtain = document.getElementById('transition-curtain');

    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (curtain && targetSection) {
                // Wipe Up
                curtain.style.transformOrigin = 'bottom';
                curtain.classList.add('curtain-active');

                setTimeout(() => {
                    // Scroll behind curtain
                    targetSection.scrollIntoView({ behavior: 'auto' });

                    // Wipe Away (upwards reveal)
                    curtain.style.transformOrigin = 'top';
                    curtain.style.transform = 'scaleY(0)';

                    // Reset class after animation
                    setTimeout(() => {
                        curtain.classList.remove('curtain-active');
                        curtain.style.transform = ''; // Clear inline transform to revert to CSS state
                    }, 600);
                }, 600); // Wait for cover up
            } else {
                // Fallback if no curtain logic
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* 
       ========================================
       MAGIC: ALIVE WHATSAPP BUTTON 
       ========================================
    */
    const whatsappTooltip = document.querySelector('.whatsapp-tooltip');

    // Show tooltip after 5 seconds automatically
    setTimeout(() => {
        if (whatsappTooltip) {
            whatsappTooltip.classList.add('show-tooltip');
            // Hide again after 4 seconds
            setTimeout(() => {
                whatsappTooltip.classList.remove('show-tooltip');
            }, 4000);
        }
    }, 5000);


    /* 
       ========================================
       MAGIC: GOLD DUST PARTICLES 
       ========================================
    */
    const canvas = document.getElementById('gold-dust');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Handle Resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2; // Tiny particles
                this.speedX = (Math.random() * 0.5) - 0.25; // Slow horizontal drift
                this.speedY = (Math.random() * 0.5) - 0.25; // Slow vertical drift
                this.color = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`; // Transparent Gold
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around screen
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = Math.min((canvas.width * canvas.height) / 9000, 150); // Density based on screen size

            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }
});
