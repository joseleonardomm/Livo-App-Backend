/**
 * Construye prompts optimizados para la generación de código web
 */

class PromptBuilder {
    constructor() {
        this.templates = {
            html: {
                modern: "moderno y elegante con gradientes y efectos sutiles",
                minimalist: "minimalista con mucho espacio en blanco y tipografía clara",
                classic: "clásico y profesional con bordes redondeados",
                colorful: "colorido y vibrante con paletas de colores llamativas"
            },
            features: {
                'show-products': "incluye una sección de productos con imágenes y precios",
                'catalog': "incluye un catálogo simple con categorías",
                'whatsapp': "añade botones flotantes de WhatsApp",
                'appointments': "integra un sistema simple de agendamiento",
                'contact-form': "añade un formulario de contacto funcional",
                'hours': "muestra horarios de atención",
                'location': "integra un mapa de Google Maps"
            },
            goals: {
                'sell': "enfocado en conversiones de venta",
                'messages': "optimizado para generar contactos",
                'appointments-goal': "centrado en agendar citas",
                'information': "enfocado en presentar información clara"
            }
        };
    }

    buildPrompt(data) {
        const { businessType, features, goal, style } = data;
        
        const featureDescriptions = features.map(f => 
            this.templates.features[f] || f
        ).join(', ');
        
        const styleDescription = this.templates.html[style] || "limpio y profesional";
        
        const prompt = `
Eres un desarrollador frontend experto. Genera un sitio web COMPLETO para un negocio de ${businessType}.

REQUISITOS ESPECÍFICOS:
1. OBJETIVO PRINCIPAL: ${this.templates.goals[goal] || goal}
2. ESTILO: ${styleDescription}
3. CARACTERÍSTICAS REQUERIDAS: ${featureDescriptions}
4. RESPONSIVE: Debe verse bien en móviles, tablets y desktop

INSTRUCCIONES TÉCNICAS:
- Usa HTML5 semántico (header, main, section, footer)
- CSS moderno con Flexbox/Grid
- JavaScript básico solo para funcionalidades esenciales
- Incluye comentarios explicativos
- Usa Font Awesome para íconos (CDN incluido)
- Paleta de colores coherente con el estilo
- Fuentes de Google Fonts apropiadas

RESTRICCIONES:
- No uses frameworks (React, Vue, etc.)
- No uses librerías externas excepto Font Awesome
- Máximo 200 líneas de código en total
- Código simple pero efectivo

FORMATO DE RESPUESTA:
Devuelve EXACTAMENTE en este formato JSON:
{
  "html": "código HTML completo aquí",
  "css": "código CSS completo aquí",
  "js": "código JavaScript completo aquí"
}

El HTML debe incluir la estructura completa.
El CSS debe estar optimizado y comentado.
El JS debe manejar las interacciones básicas.

EJEMPLO DE ESTRUCTURA:
- Header con logo y navegación
- Sección hero con llamado a la acción
- Secciones según características solicitadas
- Footer con información de contacto
- Elementos interactivos según necesidades

Ahora, genera el código para un negocio de ${businessType} que necesita ${featureDescriptions}, con objetivo de ${goal} y estilo ${style}.
`;

        return prompt.trim();
    }

    getBusinessPlaceholders(businessType) {
        const placeholders = {
            'product-sales': {
                name: "Tienda Online",
                description: "Venta de productos de calidad",
                services: ["Producto 1", "Producto 2", "Producto 3"]
            },
            'services': {
                name: "Servicios Profesionales",
                description: "Soluciones profesionales a tu medida",
                services: ["Consultoría", "Implementación", "Soporte"]
            },
            'restaurant': {
                name: "Restaurante Delicias",
                description: "Cocina tradicional con toque moderno",
                services: ["Menú del día", "Catering", "Eventos"]
            },
            'hardware-store': {
                name: "Ferretería Todo en Uno",
                description: "Todo para tus proyectos de construcción",
                services: ["Materiales", "Herramientas", "Asesoría"]
            }
        };

        return placeholders[businessType] || {
            name: businessType,
            description: "Negocio profesional",
            services: ["Servicio 1", "Servicio 2", "Servicio 3"]
        };
    }
}

module.exports = {
    PromptBuilder,
    buildPrompt: (data) => new PromptBuilder().buildPrompt(data)
};