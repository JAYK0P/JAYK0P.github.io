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
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');

    const options = {
        root: null,
        threshold: 0.3,
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
        const names = ['Jakub', 'JAYK0P'];
        let nameIndex = 0;
        let charIndexName = 0;
        let isDeletingName = false;
        let typingSpeedName = 150;

        function typeName() {
            const currentName = names[nameIndex];

            if (isDeletingName) {
                typewriterNameElement.textContent = currentName.substring(0, charIndexName - 1);
                charIndexName--;
                typingSpeedName = 75;
            } else {
                typewriterNameElement.textContent = currentName.substring(0, charIndexName + 1);
                charIndexName++;
                typingSpeedName = 150;
            }

            if (!isDeletingName && charIndexName === currentName.length) {
                typingSpeedName = 3000;
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
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 75;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }

    // ==========================================================================
    // CERTIFICATE LIGHTBOX MODAL
    // ==========================================================================
    const certCards = document.querySelectorAll('.cert-card');
    const certModal = document.getElementById('certModal');
    const certModalImg = document.getElementById('certModalImg');
    const certModalClose = document.getElementById('certModalClose');

    if (certCards.length > 0 && certModal && certModalImg) {
        certCards.forEach(card => {
            card.addEventListener('click', () => {
                const externalLink = card.getAttribute('data-link');
                const highResImgPath = card.getAttribute('data-cert');

                if (externalLink) {
                    window.open(externalLink, '_blank');
                } else if (highResImgPath) {
                    certModalImg.src = highResImgPath;
                    certModal.classList.add('open');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeModal = () => {
            certModal.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => {
                certModalImg.src = '';
            }, 350);
        };

        if (certModalClose) {
            certModalClose.addEventListener('click', closeModal);
        }
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('open')) {
                closeModal();
            }
        });
    }
});
