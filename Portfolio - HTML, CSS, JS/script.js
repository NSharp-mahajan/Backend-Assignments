// ============================================================================
// MINIMAL & MEANINGFUL VANILLA JAVASCRIPT
// Keeps the portfolio focused 80%+ on HTML5 & CSS3 architecture.
// ============================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. SIMPLE TYPING ANIMATION IN HERO SECTION
    const typingSpan = document.getElementById("typing-text");
    const roles = [
        "Engineering Student (AI)",
        "Machine Learning Enthusiast",
        "Full Stack Developer",
        "Hackathon Builder"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 60 : 120;
        
        // When word is completed
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1800; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 300; // Pause before new word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    if (typingSpan) {
        typeEffect();
    }
    
    
    // 2. MOBILE HAMBURGER MENU TOGGLE
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", function() {
            navLinks.classList.toggle("open");
        });
        
        // Close menu automatically when clicking any navigation link
        const links = navLinks.querySelectorAll("a");
        links.forEach(function(link) {
            link.addEventListener("click", function() {
                navLinks.classList.remove("open");
            });
        });
    }
    
    
    // 3. SCROLL-TO-TOP BUTTON
    const scrollTopBtn = document.getElementById("scroll-to-top");
    
    window.addEventListener("scroll", function() {
        if (scrollTopBtn) {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    
    
    // 4. RESUME MODAL HANDLER
    const resumeBtn = document.getElementById("resume-btn");
    const resumeModal = document.getElementById("resume-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    
    if (resumeBtn && resumeModal) {
        resumeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            resumeModal.classList.add("open");
            resumeModal.setAttribute("aria-hidden", "false");
        });
    }
    
    function closeModal() {
        if (resumeModal) {
            resumeModal.classList.remove("open");
            resumeModal.setAttribute("aria-hidden", "true");
        }
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }
    
    // Close on overlay click or Escape key
    if (resumeModal) {
        resumeModal.addEventListener("click", function(e) {
            if (e.target === resumeModal) closeModal();
        });
    }
    
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeModal();
    });
    
    
    // 5. SIMPLE CONTACT FORM SUBMISSION
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");
    
    if (contactForm && formFeedback) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById("name").value.trim();
            const emailInput = document.getElementById("email").value.trim();
            
            if (nameInput && emailInput) {
                formFeedback.textContent = `Thank you, ${nameInput}! Your message has been received successfully.`;
                formFeedback.className = "form-feedback success";
                contactForm.reset();
            }
        });
    }

});
