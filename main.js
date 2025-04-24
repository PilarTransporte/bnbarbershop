// Script principal para o site da BN Barbershop

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Animação de scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de revelação ao rolar
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Inicializar a galeria lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                
                const img = document.createElement('img');
                img.setAttribute('src', imgSrc);
                
                const closeBtn = document.createElement('span');
                closeBtn.classList.add('lightbox-close');
                closeBtn.innerHTML = '&times;';
                
                lightbox.appendChild(img);
                lightbox.appendChild(closeBtn);
                document.body.appendChild(lightbox);
                
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                    }
                });
            });
        });
    }
    
    // Validação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            let isValid = true;
            
            if (!name.trim()) {
                isValid = false;
                showError('name', 'Por favor, insira seu nome');
            } else {
                clearError('name');
            }
            
            if (!email.trim()) {
                isValid = false;
                showError('email', 'Por favor, insira seu email');
            } else if (!isValidEmail(email)) {
                isValid = false;
                showError('email', 'Por favor, insira um email válido');
            } else {
                clearError('email');
            }
            
            if (!message.trim()) {
                isValid = false;
                showError('message', 'Por favor, insira sua mensagem');
            } else {
                clearError('message');
            }
            
            if (isValid) {
                // Aqui seria a lógica para enviar o formulário
                // Como é apenas uma demonstração, vamos simular o envio
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = 'Mensagem enviada com sucesso!';
                    
                    contactForm.appendChild(successMessage);
                    
                    setTimeout(() => {
                        contactForm.removeChild(successMessage);
                    }, 5000);
                }, 2000);
            }
        });
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = field.nextElementSibling;
        
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        } else {
            const error = document.createElement('div');
            error.classList.add('error-message');
            error.textContent = message;
            field.parentNode.insertBefore(error, field.nextSibling);
        }
        
        field.classList.add('error');
    }
    
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = field.nextElementSibling;
        
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
        
        field.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
