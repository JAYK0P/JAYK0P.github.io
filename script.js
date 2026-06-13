document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE NAV MENU TOGGLE
    // ==========================================================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon bars to X
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking on any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // ==========================================================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const options = {
        root: null,
        threshold: 0.3, // 30% of the section is visible
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ==========================================================================
    // TYPEWRITER EFFECT
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ['IT sítě', 'HomeLab', 'UX/UI design', 'Python skripty'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Remove character
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 75; // Faster deletion
            } else {
                // Add character
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150; // Normal typing speed
            }

            // Word completed
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of word
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                // Move to next word
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Small pause before next word
            }

            setTimeout(type, typingSpeed);
        }

        // Initialize typewriter
        setTimeout(type, 1000);
    }
});
