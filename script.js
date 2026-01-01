// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
  
  // Remove a tela de loading após 1.5 segundos
  setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('loaded');
    
    // Remove completamente do DOM após a animação
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
  
  // Menu mobile toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle) {
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
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
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
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
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
  
  // Form submission handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coletar dados do formulário
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData);
      
      // Validação simples
      if (!formValues.name || !formValues.email) {
        alert('Por favor, preencha pelo menos o nome e email.');
        return;
      }
      
      // Simular envio (em produção, enviaria para um servidor)
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Obrigado pelo seu interesse no CESE-UJC! Entraremos em contacto em breve.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  // Adicionar ano atual ao footer
  const currentYear = new Date().getFullYear();
  const yearElement = document.querySelector('.footer-bottom p:first-child');
  if (yearElement) {
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
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
    `;
  document.head.appendChild(style);
});