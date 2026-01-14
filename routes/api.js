const express = require('express');
const router = express.Router();
const RequestValidator = require('../utils/validators');

// Importar el servicio CORRECTAMENTE
const ReplicateService = require('../services/replicateService');

// Crear instancia del servicio
let replicateService;

try {
  replicateService = new ReplicateService();
  console.log('✅ ReplicateService inicializado correctamente');
} catch (error) {
  console.error('❌ Error al inicializar ReplicateService:', error.message);
  // Si no hay token de Replicate, usar modo local
  if (error.message.includes('REPLICATE_API_TOKEN')) {
    console.log('⚠️ Usando modo local (sin IA)');
    replicateService = {
      generateCode: async (prompt) => {
        console.log('🔄 Generando demo local sin IA...');
        return {
          html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Local - WebGen AI</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: #f8f9fa; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .demo-header { text-align: center; padding: 3rem 0; }
        .demo-header h1 { color: #4361ee; font-size: 2.5rem; margin-bottom: 1rem; }
        .demo-content { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .features-list { display: flex; flex-wrap: wrap; gap: 10px; margin: 1.5rem 0; }
        .feature-tag { background: #4cc9f0; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
        .cta-button { background: linear-gradient(135deg, #4361ee, #7209b7); color: white; border: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; cursor: pointer; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="demo-header">
            <h1>Demo Generado Localmente</h1>
            <p>Este es un demo básico generado sin IA. Configura REPLICATE_API_TOKEN para usar IA.</p>
        </div>
        <div class="demo-content">
            <h2>Sitio Web para Negocio</h2>
            <p>Prompt recibido: ${prompt.substring(0, 200)}...</p>
            
            <div class="features-list">
                <span class="feature-tag">HTML5</span>
                <span class="feature-tag">CSS3</span>
                <span class="feature-tag">Responsive</span>
                <span class="feature-tag">JavaScript</span>
            </div>
            
            <button class="cta-button" onclick="alert('¡Demo local funcionando!')">Probar Demo</button>
            
            <div style="margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 5px;">
                <p><i class="fas fa-info-circle"></i> <strong>Nota:</strong> Para usar IA, configura REPLICATE_API_TOKEN en las variables de entorno de Render.</p>
            </div>
        </div>
    </div>
</body>
</html>`,
          css: `/* Estilos CSS del demo local */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
}

.container {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.cta-button {
    transition: all 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
}

.feature-tag {
    transition: transform 0.2s;
}

.feature-tag:hover {
    transform: scale(1.05);
}`,
          js: `// JavaScript del demo local
console.log('Demo local generado por WebGen AI');

// Funcionalidades básicas
function initDemo() {
    console.log('Demo inicializado');
    
    // Año actual
    const year = new Date().getFullYear();
    const yearElement = document.createElement('div');
    yearElement.style.marginTop = '20px';
    yearElement.style.textAlign = 'center';
    yearElement.style.color = '#666';
    yearElement.innerHTML = '© ' + year + ' WebGen AI - Demo Local';
    document.querySelector('.demo-content').appendChild(yearElement);
    
    // Contador de clicks
    let clickCount = 0;
    const button = document.querySelector('.cta-button');
    if (button) {
        button.addEventListener('click', () => {
            clickCount++;
            console.log('Botón clickeado', clickCount, 'veces');
        });
    }
}

// Inicializar cuando se cargue la página
document.addEventListener('DOMContentLoaded', initDemo);`
        };
      }
    };
  }
}

/**
 * Ruta de health check
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'WebGen AI Backend',
    version: '1.0.0',
    replicateConfigured: !!process.env.REPLICATE_API_TOKEN
  });
});

/**
 * Ruta para generar código web
 */
router.post('/generate', RequestValidator.validateGenerateRequest, async (req, res) => {
  try {
    console.log('📝 Generando demo para:', req.body);
    
    const { businessType, features, goal, style } = req.body;
    
    // Crear prompt para la IA
    const prompt = `Genera un sitio web completo (HTML, CSS, JavaScript) para un negocio de tipo "${businessType}".
    
Características requeridas: ${features.join(', ')}.
Objetivo principal: ${goal}.
Estilo visual: ${style}.

El código debe ser:
1. HTML5 semántico válido
2. CSS responsive (mobile-first)
3. JavaScript básico para interactividad
4. Limpio, profesional y educativo
5. Incluir comentarios explicativos en el código
6. Usar colores modernos y atractivos

IMPORTANTE: Devuelve SOLO el código en tres secciones separadas: HTML, CSS, JavaScript.`;

    console.log('🤖 Enviando prompt a IA...');
    console.log('📄 Longitud del prompt:', prompt.length, 'caracteres');
    
    // Llamar al método CORRECTO: generateCode
    const result = await replicateService.generateCode(prompt);
    
    console.log('✅ Demo generado exitosamente');
    console.log(`📊 Estadísticas: HTML ${result.html?.length || 0} chars, CSS ${result.css?.length || 0} chars, JS ${result.js?.length || 0} chars`);
    
    res.json({
      success: true,
      html: result.html,
      css: result.css,
      js: result.js,
      metadata: {
        businessType,
        features,
        goal,
        style,
        generatedAt: new Date().toISOString(),
        model: process.env.REPLICATE_MODEL || 'local',
        hasAI: !!process.env.REPLICATE_API_TOKEN
      }
    });
    
  } catch (error) {
    console.error('❌ Error en generación:', error);
    
    // Enviar error más detallado
    res.status(500).json({
      success: false,
      error: 'Error en la generación',
      message: error.message,
      // Solo en desarrollo mostrar stack
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
      help: process.env.REPLICATE_API_TOKEN ? 
        'El token de Replicate está configurado pero hubo un error con la IA' :
        'Configura REPLICATE_API_TOKEN en Render para usar IA'
    });
  }
});

/**
 * Ruta para capturar leads
 */
router.post('/lead', RequestValidator.validateLeadRequest, (req, res) => {
  const { email } = req.body;
  
  console.log('📧 Lead capturado:', email);
  
  // Aquí normalmente guardarías en una base de datos
  // Por ahora, solo logueamos y confirmamos
  
  res.json({
    success: true,
    message: 'Lead registrado correctamente',
    email: email,
    timestamp: new Date().toISOString()
  });
});

/**
 * Ruta para log de errores (opcional)
 */
router.post('/error-log', (req, res) => {
  const errorData = req.body;
  
  console.error('🐛 Error del frontend:', errorData);
  
  res.json({
    success: true,
    message: 'Error logged'
  });
});

module.exports = router;