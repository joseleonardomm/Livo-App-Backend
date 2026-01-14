require('dotenv').config();
const Replicate = require('replicate');

/**
 * Servicio optimizado para integración con Replicate API
 */
class ReplicateService {
    constructor() {
        // Validar que el token existe
        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error('REPLICATE_API_TOKEN no configurado en .env');
        }

        // Inicializar cliente de Replicate
        this.replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
            userAgent: 'webgen-ai/1.0.0'
        });

        // Configuración del modelo
        this.model = process.env.REPLICATE_MODEL || "meta/codellama-13b-instruct";
        this.maxTokens = parseInt(process.env.MAX_TOKENS_PER_REQUEST) || 3000;
        this.temperature = 0.7;
        this.topP = 0.95;
        
        // Control de costos y límites
        this.maxRetries = 2;
        this.timeout = 30000; // 30 segundos
        
        console.log(`🤖 Modelo configurado: ${this.model}`);
    }

    /**
     * Genera código HTML/CSS/JS usando Replicate
     */
    async generateCode(prompt) {
        console.log('🚀 Iniciando generación con IA...');
        console.log(`📝 Longitud del prompt: ${prompt.length} caracteres`);
        
        try {
            // Preparar el input para el modelo
            const input = {
                prompt: this.optimizePrompt(prompt),
                system_prompt: this.getSystemPrompt(),
                max_new_tokens: this.maxTokens,
                temperature: this.temperature,
                top_p: this.topP,
                repetition_penalty: 1.15,
                stop: ["\`\`\`", "</response>", "===="]
            };

            // Ejecutar con timeout
            const output = await Promise.race([
                this.runModelWithRetry(input),
                this.timeoutPromise(this.timeout)
            ]);

            // Procesar la respuesta
            const code = this.processModelOutput(output);
            
            console.log('✅ Generación completada exitosamente');
            console.log(`📊 Estadísticas: HTML ${code.html.length} chars, CSS ${code.css.length} chars, JS ${code.js.length} chars`);
            
            return code;

        } catch (error) {
            console.error('❌ Error en generación:', error.message);
            
            // Intentar con modelo alternativo si falla
            if (error.message.includes('model') || error.message.includes('not found')) {
                console.log('🔄 Intentando con modelo alternativo...');
                return this.generateWithFallbackModel(prompt);
            }
            
            throw new Error(`Error en generación de IA: ${error.message}`);
        }
    }

    /**
     * Ejecuta el modelo con reintentos
     */
    async runModelWithRetry(input, retryCount = 0) {
        try {
            console.log(`🔄 Ejecutando modelo (intento ${retryCount + 1}/${this.maxRetries + 1})...`);
            
            const output = await this.replicate.run(this.model, { input });
            
            // Recolectar toda la salida del stream
            let fullOutput = '';
            for await (const chunk of output) {
                fullOutput += chunk;
            }
            
            return fullOutput;
            
        } catch (error) {
            if (retryCount < this.maxRetries) {
                console.log(`⏳ Reintento en 2 segundos... (${error.message})`);
                await this.sleep(2000);
                return this.runModelWithRetry(input, retryCount + 1);
            }
            throw error;
        }
    }

    /**
     * Procesa la salida del modelo para extraer código
     */
    processModelOutput(output) {
        console.log('🔍 Procesando respuesta del modelo...');
        
        // Intentar extraer JSON primero
        try {
            const jsonMatch = output.match(/\{[\s\S]*"html"[\s\S]*"css"[\s\S]*"js"[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                if (parsed.html && parsed.css && parsed.js) {
                    return {
                        html: this.sanitizeHTML(parsed.html),
                        css: this.sanitizeCSS(parsed.css),
                        js: this.sanitizeJS(parsed.js)
                    };
                }
            }
        } catch (e) {
            console.log('⚠️ No se pudo parsear como JSON, intentando extraer código...');
        }

        // Extraer código de bloques markdown
        return this.extractCodeFromMarkdown(output);
    }

    /**
     * Extrae código de bloques markdown
     */
    extractCodeFromMarkdown(text) {
        const result = {
            html: '',
            css: '',
            js: ''
        };

        // Patrones para extraer código
        const patterns = {
            html: [
                /```html\n([\s\S]*?)\n```/i,
                /```html\n([\s\S]*?)(?=\n```|$)/i,
                /<html[\s\S]*?>([\s\S]*?)<\/html>/i,
                /<body[\s\S]*?>([\s\S]*?)<\/body>/i
            ],
            css: [
                /```css\n([\s\S]*?)\n```/i,
                /<style[^>]*>([\s\S]*?)<\/style>/i,
                /```scss\n([\s\S]*?)\n```/i,
                /```sass\n([\s\S]*?)\n```/i
            ],
            js: [
                /```javascript\n([\s\S]*?)\n```/i,
                /```js\n([\s\S]*?)\n```/i,
                /<script[^>]*>([\s\S]*?)<\/script>/i
            ]
        };

        // Buscar HTML
        for (const pattern of patterns.html) {
            const match = text.match(pattern);
            if (match && match[1]) {
                result.html = match[1].trim();
                break;
            }
        }

        // Buscar CSS
        for (const pattern of patterns.css) {
            const match = text.match(pattern);
            if (match && match[1]) {
                result.css = match[1].trim();
                break;
            }
        }

        // Buscar JavaScript
        for (const pattern of patterns.js) {
            const match = text.match(pattern);
            if (match && match[1]) {
                result.js = match[1].trim();
                break;
            }
        }

        // Si no se encontró código, usar valores por defecto
        if (!result.html) result.html = this.getFallbackHTML();
        if (!result.css) result.css = this.getFallbackCSS();
        if (!result.js) result.js = this.getFallbackJS();

        return result;
    }

    /**
     * Optimiza el prompt para mejor generación
     */
    optimizePrompt(prompt) {
        return `${prompt}

IMPORTANTE: Tu respuesta DEBE contener EXACTAMENTE tres bloques de código en este orden:
1. Bloque HTML (entre \`\`\`html y \`\`\`)
2. Bloque CSS (entre \`\`\`css y \`\`\`)
3. Bloque JavaScript (entre \`\`\`javascript y \`\`\`)

Ejemplo de formato:
\`\`\`html
<!DOCTYPE html>...
\`\`\`

\`\`\`css
body { margin: 0; }...
\`\`\`

\`\`\`javascript
console.log('Hola mundo');...
\`\`\`

Ahora genera el código para el sitio web solicitado:`;
    }

    /**
     * System prompt para guiar al modelo
     */
    getSystemPrompt() {
        return `Eres un asistente de IA especializado en generar código web limpio y funcional.
        
TUS RESPONSABILIDADES:
1. Generar HTML5 semántico válido
2. Crear CSS responsive con Flexbox/Grid
3. Escribir JavaScript básico para interacciones
4. Incluir comentarios explicativos
5. Asegurar compatibilidad con navegadores modernos

RESTRICCIONES:
- NO uses frameworks (React, Vue, Angular)
- NO uses librerías externas (excepto Font Awesome via CDN)
- NO incluyas código peligroso (eval, innerHTML inseguro)
- MANTÉN el código simple y educativo

PALETA DE COLORES SUGERIDA:
- Primario: #4361ee
- Secundario: #7209b7
- Éxito: #4cc9f0
- Peligro: #f72585
- Fondo: #f8f9fa

Ahora, genera código web profesional.`;
    }

    /**
     * Usa modelo alternativo si falla el principal
     */
    async generateWithFallbackModel(prompt) {
        const fallbackModels = [
            "replicate/codellama-7b-instruct",
            "meta/llama-2-13b-chat"
        ];
        
        for (const fallbackModel of fallbackModels) {
            try {
                console.log(`🔄 Probando modelo alternativo: ${fallbackModel}`);
                this.model = fallbackModel;
                return await this.generateCode(prompt);
            } catch (error) {
                console.log(`❌ Fallback ${fallbackModel} también falló: ${error.message}`);
                continue;
            }
        }
        
        throw new Error('Todos los modelos fallaron');
    }

    /**
     * Timeout para evitar esperas infinitas
     */
    timeoutPromise(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout excedido')), ms);
        });
    }

    /**
     * Pausa entre reintentos
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Métodos de sanitización (seguridad)
     */
    sanitizeHTML(html) {
        if (!html) return this.getFallbackHTML();
        
        // Remover etiquetas peligrosas
        const dangerousTags = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
            /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
            /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
            /on\w+="[^"]*"/gi,
            /on\w+='[^']*'/gi,
            /javascript:/gi
        ];
        
        let safeHTML = html;
        dangerousTags.forEach(pattern => {
            safeHTML = safeHTML.replace(pattern, '');
        });
        
        return safeHTML;
    }

    sanitizeCSS(css) {
        if (!css) return this.getFallbackCSS();
        return css;
    }

    sanitizeJS(js) {
        if (!js) return this.getFallbackJS();
        
        const dangerousPatterns = [
            /eval\s*\(/g,
            /document\.write/g,
            /localStorage\.setItem/g,
            /sessionStorage\.setItem/g,
            /cookie\s*=/gi,
            /window\.location\s*=/g,
            /XMLHttpRequest/g,
            /fetch\s*\(/g
        ];
        
        let safeJS = js;
        dangerousPatterns.forEach(pattern => {
            safeJS = safeJS.replace(pattern, '// Seguridad: $& deshabilitado');
        });
        
        return safeJS;
    }

    /**
     * Fallbacks por si todo falla
     */
    getFallbackHTML() {
        return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Generado por WebGenAI</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <i class="fas fa-rocket"></i>
                <span>Mi Negocio</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="inicio" class="hero">
            <div class="hero-content">
                <h1>Bienvenido a tu Sitio Web</h1>
                <p>Este demo fue generado automáticamente por IA</p>
                <button class="cta-button" onclick="contactar()">
                    <i class="fas fa-phone-alt"></i> Contáctanos
                </button>
            </div>
        </section>

        <section id="servicios" class="services">
            <h2>Nuestros Servicios</h2>
            <div class="services-grid">
                <div class="service-card">
                    <i class="fas fa-star"></i>
                    <h3>Servicio Principal</h3>
                    <p>Descripción detallada del servicio que ofreces.</p>
                </div>
                <div class="service-card">
                    <i class="fas fa-clock"></i>
                    <h3>Horarios</h3>
                    <p>Lunes a Viernes: 9:00 - 18:00</p>
                </div>
                <div class="service-card">
                    <i class="fas fa-map-marker-alt"></i>
                    <h3>Ubicación</h3>
                    <p>Estamos ubicados en el centro de la ciudad</p>
                </div>
            </div>
        </section>

        <section id="contacto" class="contact">
            <h2>Contáctanos</h2>
            <div class="contact-info">
                <p><i class="fas fa-phone"></i> Teléfono: (123) 456-7890</p>
                <p><i class="fas fa-envelope"></i> Email: info@minegocio.com</p>
                <p><i class="fas fa-map-marker-alt"></i> Dirección: Calle Principal 123</p>
            </div>
        </section>
    </main>

    <footer>
        <p>Demo generado por <strong>WebGenAI</strong> • Contáctanos para la versión completa</p>
    </footer>
</body>
</html>`;
    }

    getFallbackCSS() {
        return `/* Estilos base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
}

/* Header */
header {
    background: linear-gradient(135deg, #4361ee 0%, #3a56d4 100%);
    color: white;
    padding: 1rem 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: bold;
}

.logo i {
    font-size: 1.8rem;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;
    padding: 0.5rem 0;
    position: relative;
}

.nav-menu a:hover {
    opacity: 0.9;
}

.nav-menu a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s;
}

.nav-menu a:hover::after {
    width: 100%;
}

/* Hero Section */
.hero {
    padding: 6rem 2rem;
    background: linear-gradient(rgba(67, 97, 238, 0.05), rgba(114, 9, 183, 0.05));
    text-align: center;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #333;
    font-weight: 700;
}

.hero p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.cta-button {
    background: linear-gradient(135deg, #4361ee 0%, #7209b7 100%);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(67, 97, 238, 0.4);
}

.cta-button:active {
    transform: translateY(-1px);
}

/* Services */
.services {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 2rem;
}

.services h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
    font-weight: 700;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.service-card {
    background: white;
    padding: 2.5rem 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(0,0,0,0.05);
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.service-card i {
    font-size: 3rem;
    color: #4361ee;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #4361ee, #7209b7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.service-card p {
    color: #666;
    line-height: 1.7;
}

/* Contact */
.contact {
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 2rem;
    text-align: center;
}

.contact h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
}

.contact-info {
    background: white;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    max-width: 600px;
    margin: 0 auto;
}

.contact-info p {
    font-size: 1.1rem;
    margin: 1.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    color: #555;
}

.contact-info i {
    color: #4361ee;
    font-size: 1.3rem;
    width: 24px;
}

/* Footer */
footer {
    text-align: center;
    padding: 3rem 2rem;
    background: #333;
    color: white;
    margin-top: 4rem;
}

footer p {
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1.5rem;
        padding: 1rem;
    }
    
    .nav-menu {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
        width: 100%;
    }
    
    .hero h1 {
        font-size: 2.2rem;
    }
    
    .hero p {
        font-size: 1.1rem;
        padding: 0 1rem;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
        padding: 0 1rem;
    }
    
    .contact-info {
        padding: 2rem 1rem;
    }
    
    .contact-info p {
        flex-direction: column;
        gap: 5px;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .hero {
        padding: 4rem 1rem;
    }
    
    .hero h1 {
        font-size: 1.8rem;
    }
    
    .services h2,
    .contact h2 {
        font-size: 2rem;
    }
    
    .service-card {
        padding: 2rem 1.5rem;
    }
}`;
    }

    getFallbackJS() {
        return `// Funcionalidades del demo
console.log('Demo generado por WebGenAI');

// Contactar
function contactar() {
    const mensaje = "Hola, vi el demo de mi página web y quiero la versión completa";
    const telefono = "+1234567890";
    const url = \`https://wa.me/\${telefono}?text=\${encodeURIComponent(mensaje)}\`;
    
    if (confirm('¿Deseas contactarnos por WhatsApp para obtener tu sitio web completo?')) {
        window.open(url, '_blank');
    }
}

// Navegación suave
document.addEventListener('DOMContentLoaded', function() {
    // Navegación smooth
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Menú responsive
    const nav = document.querySelector('.nav-menu');
    if (nav && window.innerWidth <= 768) {
        // Crear botón de menú
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.className = 'menu-toggle';
        menuButton.setAttribute('aria-label', 'Abrir menú');
        
        // Estilos del botón
        menuButton.style.cssText = \`
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background 0.3s;
        \`;
        
        menuButton.addEventListener('mouseenter', () => {
            menuButton.style.background = 'rgba(255,255,255,0.1)';
        });
        
        menuButton.addEventListener('mouseleave', () => {
            menuButton.style.background = 'none';
        });
        
        // Insertar botón
        document.querySelector('nav').insertBefore(menuButton, nav);
        
        // Ocultar menú inicialmente
        nav.style.display = 'none';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)';
        nav.style.padding = '1rem';
        nav.style.zIndex = '1000';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        nav.style.borderRadius = '0 0 10px 10px';
        
        // Toggle menu
        menuButton.addEventListener('click', () => {
            const isVisible = nav.style.display === 'flex';
            nav.style.display = isVisible ? 'none' : 'flex';
            menuButton.innerHTML = isVisible ? 
                '<i class="fas fa-bars"></i>' : 
                '<i class="fas fa-times"></i>';
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
                nav.style.display = 'none';
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Efecto hover en tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Actualizar año en footer (opcional)
    const footer = document.querySelector('footer p');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2024', year);
    }
    
    // Añadir clase activa al enlace actual
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === \`#\${current}\`) {
                link.classList.add('active');
            }
        });
    }
    
    // Escuchar scroll
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Llamar inicialmente
    
    // Añadir estilos para active
    const style = document.createElement('style');
    style.textContent = \`
        .nav-menu a.active {
            font-weight: 600;
        }
        .nav-menu a.active::after {
            width: 100% !important;
        }
    \`;
    document.head.appendChild(style);
});

// Manejar redimensionamiento
window.addEventListener('resize', function() {
    const nav = document.querySelector('.nav-menu');
    if (nav) {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
            nav.style.position = 'static';
            nav.style.background = 'none';
            nav.style.padding = '0';
            nav.style.boxShadow = 'none';
            nav.style.borderRadius = '0';
        } else {
            // Ya se maneja en DOMContentLoaded
        }
    }
});`;
    }
}

module.exports = ReplicateService;