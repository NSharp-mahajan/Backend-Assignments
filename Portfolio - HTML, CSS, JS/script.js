document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================================
       1. SCROLL PROGRESS INDICATOR
       ======================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressPercentage = (scrollTop / scrollHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${progressPercentage}%`;
        }
    }, { passive: true });


    /* ========================================================================
       2. TYPING ANIMATION IN HERO SECTION
       ======================================================================== */
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Engineering Student",
        "AI & ML Enthusiast",
        "Full Stack Developer",
        "Problem Solver",
        "Continuous Learner"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function typeEffect() {
        if (!typingElement) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 40; /* Delete faster than type */
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        /* Pause at end of word or start of word */
        if (!isDeleting && charIndex === currentRole.length) {
            typingDelay = 2000; /* Pause at full word */
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500; /* Pause before starting new word */
        }
        
        setTimeout(typeEffect, typingDelay);
    }
    
    /* Initialize typing loop */
    typeEffect();


    /* ========================================================================
       3. SCROLL REVEAL (INTERSECTION OBSERVER)
       ======================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                /* Unobserve once revealed for smooth performance */
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ========================================================================
       4. ANIMATED SKILL PROGRESS BARS
       ======================================================================== */
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const skillsCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetWidth = fill.getAttribute('data-progress') || '0%';
                
                /* Set width to animate from 0 to percentage */
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 200);
                
                observer.unobserve(fill);
            }
        });
    };
    
    const skillsObserver = new IntersectionObserver(skillsCallback, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });
    
    progressFills.forEach(fill => {
        skillsObserver.observe(fill);
    });


    /* ========================================================================
       5. STICKY NAVBAR ACTIVE LINK HIGHLIGHTING
       ======================================================================== */
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavOnScroll() {
        let scrollPos = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });


    /* ========================================================================
       6. MOBILE HAMBURGER MENU & SMOOTH SCROLLING
       ======================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
            
            const isOpen = mobileMenuBtn.classList.contains('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        });

        /* Close mobile menu when a navigation link is clicked */
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('open');
                navLinksContainer.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', false);
            });
        });

        /* Close mobile menu when clicking outside */
        document.addEventListener('click', (event) => {
            if (!navLinksContainer.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenuBtn.classList.remove('open');
                navLinksContainer.classList.remove('open');
            }
        });
    }


    /* ========================================================================
       7. SCROLL TO TOP FLOATING BUTTON
       ======================================================================== */
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }, { passive: true });
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ========================================================================
       8. RESUME MODAL HANDLER
       ======================================================================== */
    const resumeBtn = document.getElementById('resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    function openModal(e) {
        e.preventDefault();
        if (resumeModal) {
            resumeModal.classList.add('open');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; /* Prevent scrolling behind modal */
        }
    }

    function closeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('open');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; /* Restore body scroll */
        }
    }

    if (resumeBtn && resumeModal) {
        resumeBtn.addEventListener('click', openModal);
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        /* Close modal on background overlay click */
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });

        /* Close on Escape key press */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
                closeModal();
            }
        });
    }


    /* ========================================================================
       9. CONTACT FORM CLIENT-SIDE VALIDATION & SIMULATION
       ======================================================================== */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formFeedback = document.getElementById('form-feedback');
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function clearErrors() {
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        if (formFeedback) {
            formFeedback.classList.remove('success', 'error');
            formFeedback.style.display = 'none';
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); /* Prevent actual page reload */
            clearErrors();
            
            let isValid = true;

            /* Validate Name */
            if (!nameInput || nameInput.value.trim().length < 2) {
                const nameErr = document.getElementById('name-error');
                if (nameErr) nameErr.textContent = 'Please enter your valid name (at least 2 characters).';
                isValid = false;
            }

            /* Validate Email */
            if (!emailInput || !validateEmail(emailInput.value.trim())) {
                const emailErr = document.getElementById('email-error');
                if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            /* Validate Message */
            if (!messageInput || messageInput.value.trim().length < 10) {
                const messageErr = document.getElementById('message-error');
                if (messageErr) messageErr.textContent = 'Please enter a message with at least 10 characters.';
                isValid = false;
            }

            if (isValid) {
                /* Simulate successful transmission */
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                    /* Show success feedback */
                    if (formFeedback) {
                        formFeedback.textContent = '✅ Thank you! Your message has been sent successfully. I will get back to you soon.';
                        formFeedback.classList.add('success');
                        formFeedback.style.display = 'block';
                    }

                    /* Reset form fields */
                    contactForm.reset();
                }, 1200);
            }
        });
    }

});
