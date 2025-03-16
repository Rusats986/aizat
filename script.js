document.addEventListener('DOMContentLoaded', function() {
    // Функционал табов
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс со всех табов
            tabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс на текущий таб
            this.classList.add('active');
            
            // Скрываем все содержимое табов
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Показываем содержимое активного таба
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Добавляем анимацию для активного содержимого
            const activeContent = document.getElementById(tabId);
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translateX(20px)';
            setTimeout(() => {
                activeContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                activeContent.style.opacity = '1';
                activeContent.style.transform = 'translateX(0)';
            }, 50);
        });
    });

    // Плавная прокрутка к секциям при клике на навигационные ссылки
    const navLinks = document.querySelectorAll('nav a, .hero a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Плавная прокрутка
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Анимация секций при скролле
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        sectionObserver.observe(section);
    });

    // Анимация карточек при скролле
    const cards = document.querySelectorAll('.card');
    
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('card-visible');
                    observer.unobserve(entry.target);
                }, index * 150); // Добавляем задержку для каскадной анимации
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        cardObserver.observe(card);
    });

    // Анимация входа для героя
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 300);
    }

    // Эффекты для формы контактов
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Анимация инпутов при фокусе
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Добавляем подсветку при фокусе
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Убираем подсветку при потере фокуса, но оставляем если есть значение
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Проверяем начальное состояние (если есть предварительно заполненные поля)
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Эффект при отправке формы
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Анимация кнопки
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Жіберілуде...';
            
            // Имитация отправки
            setTimeout(() => {
                // Анимация успешной отправки
                submitBtn.textContent = 'Жіберілді!';
                submitBtn.classList.add('success');
                
                // Сбрасываем форму
                this.reset();
                formInputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                
                // Возвращаем исходное состояние
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 2000);
            }, 1500);
        });
    }

    // Добавляем CSS для улучшения анимаций и эффектов
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .section-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .card-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .success {
            background-color: #4CAF50 !important;
            animation: pulse 0.5s;
        }
        
        .form-group {
            position: relative;
            margin-bottom: 25px;
            transition: all 0.3s ease;
        }
        
        .form-group label {
            position: absolute;
            left: 15px;
            top: 15px;
            color: #666;
            transition: all 0.3s ease;
            pointer-events: none;
            background-color: transparent;
        }
        
        .form-group.focused label {
            top: -10px;
            left: 10px;
            font-size: 12px;
            color: var(--primary-color);
            background-color: white;
            padding: 0 5px;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .form-group.focused input,
        .form-group.focused textarea {
            border-color: var(--primary-color);
            box-shadow: 0 0 5px rgba(58, 134, 255, 0.2);
        }
        
        .contact-form button.btn {
            cursor: pointer;
            width: 100%;
            padding: 15px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        #contact {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            padding: 30px;
            margin-bottom: 50px;
        }
        
        #contact .section-title::after {
            width: 80px;
        }
    `;
    document.head.appendChild(styleElement);
});