document.addEventListener('DOMContentLoaded', function() {
    // Slider automático
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        if (index >= totalSlides) currentSlide = 0;
        if (index < 0) currentSlide = totalSlides - 1;
        
        document.querySelector('.hero-slider').style.transform = `translateX(-${currentSlide * 33.333}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide cada 5 segundos
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Actualizar navegación activa
                document.querySelectorAll('.nav-profesional a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mapa de ubicación - Cambiado a Caracas, Venezuela
    const map = L.map('map').setView([10.4806, -66.9036], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([10.4806, -66.9036]).addTo(map)
        .bindPopup('<b>Tienda Ejemplo</b><br>Av. Principal 1234, Caracas')
        .openPopup();
    
    // Detectar scroll para cambiar navegación activa
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-profesional a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Demo de agregar al carrito
    window.addToCartDemo = function(productId) {
        const products = [
            { id: 1, name: 'Cámara DSLR Profesional' },
            { id: 2, name: 'Smartwatch Deportivo' },
            { id: 3, name: 'Zapatos Deportivos Premium' }
        ];
        
        const product = products.find(p => p.id === productId);
        
        if (product) {
            showNotification(`[DEMO] ${product.name} agregado al carrito. En la versión completa, esto iría al carrito real.`, 'info');
        }
    };
    
    function showNotification(message, type = 'info') {
        // Obtener la altura del header para posicionar correctamente la notificación
        const header = document.querySelector('.header-profesional');
        let headerHeight = 80; // altura por defecto
        if (header) {
            headerHeight = header.offsetHeight;
        }
        
        // Calcular posición top considerando la altura del header
        const topPosition = headerHeight + 20;
        
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: ${topPosition}px;
            right: 20px;
            background-color: ${type === 'info' ? '#3498db' : type === 'success' ? '#2ecc71' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // Ajustar altura del hero-section dinámicamente
    function adjustHeroMargin() {
        const header = document.querySelector('.header-profesional');
        const heroSection = document.querySelector('.hero-section');
        
        if (header && heroSection) {
            const headerHeight = header.offsetHeight;
            heroSection.style.marginTop = `${headerHeight}px`;
        }
    }
    
    // Ajustar en carga y en redimensionamiento
    adjustHeroMargin();
    window.addEventListener('resize', adjustHeroMargin);
});