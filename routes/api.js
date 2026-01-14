const express = require('express');
const router = express.Router();
const { generateDemo } = require('../services/replicateService');
const { buildPrompt } = require('../services/promptBuilder');
const { validateGenerateRequest } = require('../utils/validators');

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'webgen-ai-api'
    });
});

// Generate demo endpoint
router.post('/generate', validateGenerateRequest, async (req, res) => {
    try {
        const { businessType, features, goal, style } = req.body;
        
        console.log('📝 Generando demo para:', { businessType, features, goal, style });
        
        // Build prompt for AI
        const prompt = buildPrompt({ businessType, features, goal, style });
        
        // Generate code using AI
        const demoCode = await generateDemo(prompt);
        
        // Add demo metadata
        demoCode.metadata = {
            generatedAt: new Date().toISOString(),
            businessType,
            features,
            goal,
            style,
            isDemo: true
        };
        
        console.log('✅ Demo generado exitosamente');
        res.json(demoCode);
        
    } catch (error) {
        console.error('❌ Error en generación:', error);
        
        // Return fallback demo on error
        res.status(500).json({
            error: 'Error en la generación',
            fallback: getFallbackDemo(req.body),
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Lead capture endpoint
router.post('/lead', (req, res) => {
    try {
        const { email, businessType, features, goal, style } = req.body;
        
        // Validate email
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Email inválido' });
        }
        
        // In production: Save to database, send to CRM, etc.
        console.log('📥 Lead capturado:', {
            email,
            businessType,
            features,
            goal,
            style,
            timestamp: new Date().toISOString(),
            ip: req.ip
        });
        
        // Here you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Add to CRM system
        
        res.json({ 
            success: true, 
            message: 'Lead registrado exitosamente' 
        });
        
    } catch (error) {
        console.error('Error capturando lead:', error);
        res.status(500).json({ error: 'Error procesando lead' });
    }
});

// Fallback demo generator
function getFallbackDemo(data) {
    const { businessType, style } = data;
    
    return {
        html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessType} - Demo Web</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">${businessType}</div>
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="inicio" class="hero">
            <h1>Bienvenido a ${businessType}</h1>
            <p>Este es un demo generado automáticamente para tu negocio.</p>
            <button class="cta-button" onclick="alert('¡Gracias por tu interés!')">
                Contáctanos
            </button>
        </section>
        
        <section id="servicios">
            <h2>Nuestros Servicios</h2>
            <div class="services-grid">
                <div class="service-card">
                    <i class="fas fa-star"></i>
                    <h3>Servicio Principal</h3>
                    <p>Descripción del servicio principal de tu negocio.</p>
                </div>
                <div class="service-card">
                    <i class="fas fa-clock"></i>
                    <h3>Horarios</h3>
                    <p>Lunes a Viernes: 9am - 6pm</p>
                </div>
            </div>
        </section>
        
        <section id="contacto">
            <h2>Contacto</h2>
            <p>Teléfono: (123) 456-7890</p>
            <p>Email: info@${businessType.toLowerCase().replace(/\s+/g, '')}.com</p>
        </section>
    </main>
    
    <footer>
        <p>Demo generado por WebGenAI - Contáctanos para la versión completa</p>
    </footer>
</body>
</html>
        `,
        css: `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

header {
    background: #4361ee;
    color: white;
    padding: 1rem;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
}

.hero {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.cta-button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 1rem;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.service-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
}

.service-card i {
    font-size: 2rem;
    color: #4361ee;
    margin-bottom: 1rem;
}

footer {
    text-align: center;
    padding: 2rem;
    background: #333;
    color: white;
    margin-top: 2rem;
}

@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    nav ul {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
        `,
        js: `
// Demo JavaScript
document.querySelector('.cta-button').addEventListener('click', function() {
    alert('¡Gracias por tu interés! Este es un demo. Contáctanos para la versión completa.');
});

// Mobile menu toggle
const nav = document.querySelector('nav ul');
if (window.innerWidth < 768) {
    nav.style.display = 'none';
    
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.style.cssText = \`
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    \`;
    
    menuButton.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    document.querySelector('nav').appendChild(menuButton);
}
        `
    };
}

module.exports = router;