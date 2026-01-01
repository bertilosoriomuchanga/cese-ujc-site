// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Remove a tela de loading após 1.5 segundos
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            
            // Remove completamente do DOM após a animação
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Menu mobile toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Fecha o menu ao clicar em um link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Back to top button visibility
            const backToTop = document.getElementById('backToTop');
            if (backToTop) {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Se for apenas #, não faz nada
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler - Compatível com Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Validação básica antes de enviar
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            if (!nameInput.value.trim() || !emailInput.value.trim()) {
                e.preventDefault();
                alert('Por favor, preencha pelo menos o nome e email.');
                return;
            }
            
            // Validação de email simples
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                e.preventDefault();
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Feedback visual de envio
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Se o Formspree redirecionar, essa parte não será executada
                // Mas se houver erro, resetamos o botão após 5 segundos
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
        
        // Resetar o botão se o usuário voltar à página após envio
        window.addEventListener('pageshow', function(event) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn && submitBtn.disabled) {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Inscrição';
                submitBtn.disabled = false;
            }
        });
    }
    
    // Animação de entrada para elementos ao scroll
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
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.objetivo-card, .org-card, .atividade-card, .timeline-item, .payment-option');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Adicionar ano atual ao footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p:first-child');
    yearElements.forEach(element => {
        if (element.textContent.includes('2026')) {
            element.innerHTML = element.innerHTML.replace('2026', currentYear);
        }
    });
    
    // Verificar se há parâmetro de sucesso na URL (para feedback pós-envio)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success') && urlParams.get('success') === 'true') {
        setTimeout(() => {
            alert('✅ Inscrição enviada com sucesso! Entraremos em contacto em breve.');
            
            // Limpar o parâmetro da URL sem recarregar
            const newUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, document.title, newUrl);
        }, 500);
    }
    
    // Animações CSS adicionais via JS
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Delay para animações em sequência */
        .objetivo-card:nth-child(1) { animation-delay: 0.1s; }
        .objetivo-card:nth-child(2) { animation-delay: 0.2s; }
        .objetivo-card:nth-child(3) { animation-delay: 0.3s; }
        .objetivo-card:nth-child(4) { animation-delay: 0.4s; }
        
        .atividade-card:nth-child(1) { animation-delay: 0.1s; }
        .atividade-card:nth-child(2) { animation-delay: 0.2s; }
        .atividade-card:nth-child(3) { animation-delay: 0.3s; }
        .atividade-card:nth-child(4) { animation-delay: 0.4s; }
        .atividade-card:nth-child(5) { animation-delay: 0.5s; }
        .atividade-card:nth-child(6) { animation-delay: 0.6s; }
        
        /* Estilo para o botão de loading */
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Feedback para preenchimento automático do formulário
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formInputs.forEach(input => {
        // Limpar mensagens de erro ao começar a digitar
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
        
        // Validação em tempo real para email
        if (input.type === 'email' || input.id === 'email') {
            input.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value.trim() && !emailRegex.test(this.value.trim())) {
                    this.classList.add('error');
                    // Criar mensagem de erro se não existir
                    if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('small');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        errorMsg.textContent = 'Por favor, insira um email válido.';
                        this.parentNode.appendChild(errorMsg);
                    }
                } else {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
        }
    });
});