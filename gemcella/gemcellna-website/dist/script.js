// 젬셀라 SPA 섹션 전환 스크립트

(function () {
    'use strict';

    // DOM Elements
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    const navArrowUp = document.querySelector('.nav-arrow-up');
    const navArrowDown = document.querySelector('.nav-arrow-down');

    // State
    let currentSection = 0;
    let isAnimating = false;
    const totalSections = sections.length;

    // Initialize
    function init() {
        updateNavigation();
        bindEvents();
    }

    // Bind Events
    function bindEvents() {
        // Navigation dots
        navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetSection = parseInt(dot.dataset.section);
                goToSection(targetSection);
            });
        });

        // Arrow navigation
        navArrowUp.addEventListener('click', () => goToPrevSection());
        navArrowDown.addEventListener('click', () => goToNextSection());

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);

        // Wheel navigation
        document.addEventListener('wheel', handleWheel, { passive: false });

        // Touch navigation
        let touchStartY = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToNextSection();
                } else {
                    goToPrevSection();
                }
            }
        }, { passive: true });

        // Language Selector
        const langSelector = document.querySelector('.language-selector');
        const currentLangBtn = document.querySelector('.current-lang');
        const langOptions = document.querySelectorAll('.lang-menu button');
        const currentLangText = document.querySelector('.lang-text');

        if (langSelector && currentLangBtn) {
            currentLangBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langSelector.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (langSelector.classList.contains('open') && !langSelector.contains(e.target)) {
                    langSelector.classList.remove('open');
                }
            });

            langOptions.forEach(btn => {
                btn.addEventListener('click', () => {
                    langOptions.forEach(opt => opt.classList.remove('active'));
                    btn.classList.add('active');

                    const langMap = {
                        'ko': 'KR', 'en': 'EN', 'zh-CN': 'CN', 'zh-HK': 'HK',
                        'es': 'ES', 'ja': 'JP', 'fr': 'FR', 'de': 'DE'
                    };
                    const langCode = btn.dataset.lang;
                    if (langMap[langCode]) currentLangText.textContent = langMap[langCode];

                    langSelector.classList.remove('open');
                });
            });
        }

        // Inquiry Modal
        const modal = document.getElementById('inquiry-modal');
        const openBtn = document.getElementById('open-inquiry');
        const closeBtn = document.querySelector('.modal-close');
        const inquiryForm = document.getElementById('inquiry-form');

        if (modal && openBtn && closeBtn) {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });

            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });

            if (inquiryForm) {
                inquiryForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
                    inquiryForm.reset();
                    modal.classList.remove('active');
                });
            }
        }
    }

    // Handle Keyboard
    function handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                goToPrevSection();
                break;
            case 'ArrowDown':
            case 'PageDown':
            case ' ':
                e.preventDefault();
                goToNextSection();
                break;
            case 'Home':
                e.preventDefault();
                goToSection(0);
                break;
            case 'End':
                e.preventDefault();
                goToSection(totalSections - 1);
                break;
        }
    }

    // Handle Wheel
    function handleWheel(e) {
        e.preventDefault();

        if (isAnimating) return;

        if (e.deltaY > 0) {
            goToNextSection();
        } else if (e.deltaY < 0) {
            goToPrevSection();
        }
    }

    // Go to specific section
    function goToSection(index) {
        if (isAnimating || index === currentSection) return;
        if (index < 0 || index >= totalSections) return;

        isAnimating = true;

        // Remove active from current
        sections[currentSection].classList.remove('active');
        navDots[currentSection].classList.remove('active');

        // Set new current
        currentSection = index;

        // Add active to new section
        sections[currentSection].classList.add('active');
        navDots[currentSection].classList.add('active');

        // Update navigation
        updateNavigation();

        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    // Go to previous section
    function goToPrevSection() {
        if (currentSection > 0) {
            goToSection(currentSection - 1);
        }
    }

    // Go to next section
    function goToNextSection() {
        if (currentSection < totalSections - 1) {
            goToSection(currentSection + 1);
        }
    }

    // Update navigation state
    function updateNavigation() {
        // Update arrow buttons
        navArrowUp.disabled = currentSection === 0;
        navArrowDown.disabled = currentSection === totalSections - 1;

        // Update dots
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSection);
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
