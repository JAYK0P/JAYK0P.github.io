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
    // TYPEWRITER EFFECT FOR NAME
    // ==========================================================================
    const typewriterNameElement = document.getElementById('typewriter-name');
    if (typewriterNameElement) {
        const names = ['Jakub Ježek', 'JAYK0P'];
        let nameIndex = 0;
        let charIndexName = 0;
        let isDeletingName = false;
        let typingSpeedName = 150;

        function typeName() {
            const currentName = names[nameIndex];
            
            if (isDeletingName) {
                typewriterNameElement.textContent = currentName.substring(0, charIndexName - 1);
                charIndexName--;
                typingSpeedName = 75; // Rychlejší mazání
            } else {
                typewriterNameElement.textContent = currentName.substring(0, charIndexName + 1);
                charIndexName++;
                typingSpeedName = 150; // Rychlost psaní
            }

            // Dokončení slova
            if (!isDeletingName && charIndexName === currentName.length) {
                typingSpeedName = 3000; // Pauza na zobrazení celého jména
                isDeletingName = true;
            } else if (isDeletingName && charIndexName === 0) {
                isDeletingName = false;
                nameIndex = (nameIndex + 1) % names.length;
                typingSpeedName = 500;
            }

            setTimeout(typeName, typingSpeedName);
        }

        setTimeout(typeName, 1000);
    }

    // ==========================================================================
    // TYPEWRITER EFFECT FOR SKILLS
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
