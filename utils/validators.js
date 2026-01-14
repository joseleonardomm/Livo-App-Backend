/**
 * Validadores para las solicitudes de la API
 */

const validator = require('validator');

class RequestValidator {
    static validateGenerateRequest(req, res, next) {
        const { businessType, features, goal, style } = req.body;
        
        const errors = [];
        
        // Validar businessType
        const validBusinessTypes = [
            'product-sales', 'services', 'appointments', 
            'restaurant', 'hardware-store', 'digital', 'other'
        ];
        
        if (!businessType || !validBusinessTypes.includes(businessType)) {
            errors.push('Tipo de negocio inválido');
        }
        
        // Validar features (array)
        if (!Array.isArray(features) || features.length === 0) {
            errors.push('Debes seleccionar al menos una característica');
        } else {
            const validFeatures = [
                'show-products', 'catalog', 'whatsapp', 'appointments',
                'contact-form', 'hours', 'location'
            ];
            
            features.forEach(feature => {
                if (!validFeatures.includes(feature)) {
                    errors.push(`Característica inválida: ${feature}`);
                }
            });
            
            // Limitar número de features para control de tokens
            if (features.length > 5) {
                errors.push('Máximo 5 características permitidas');
            }
        }
        
        // Validar goal
        const validGoals = ['sell', 'messages', 'appointments-goal', 'information'];
        if (!goal || !validGoals.includes(goal)) {
            errors.push('Objetivo inválido');
        }
        
        // Validar style
        const validStyles = ['modern', 'minimalist', 'classic', 'colorful'];
        if (!style || !validStyles.includes(style)) {
            errors.push('Estilo visual inválido');
        }
        
        if (errors.length > 0) {
            return res.status(400).json({
                error: 'Validación fallida',
                details: errors
            });
        }
        
        // Añadir timestamp y ID de sesión
        req.body.timestamp = new Date().toISOString();
        req.body.sessionId = req.headers['x-session-id'] || 
                            `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        next();
    }
    
    static validateLeadRequest(req, res, next) {
        const { email } = req.body;
        
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                error: 'Email inválido'
            });
        }
        
        // Validar que no sea un email temporal o desechable
        const disposableDomains = ['tempmail.com', 'guerrillamail.com', 'mailinator.com'];
        const domain = email.split('@')[1];
        
        if (disposableDomains.some(d => domain.includes(d))) {
            return res.status(400).json({
                error: 'Por favor usa un email permanente'
            });
        }
        
        next();
    }
    
    static sanitizeInput(input) {
        if (typeof input === 'string') {
            // Remover scripts y tags peligrosos
            return input
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/on\w+="[^"]*"/g, '')
                .replace(/on\w+='[^']*'/g, '')
                .replace(/javascript:/gi, '')
                .trim();
        }
        
        if (Array.isArray(input)) {
            return input.map(item => this.sanitizeInput(item));
        }
        
        if (typeof input === 'object' && input !== null) {
            const sanitized = {};
            for (const key in input) {
                sanitized[key] = this.sanitizeInput(input[key]);
            }
            return sanitized;
        }
        
        return input;
    }
}

module.exports = RequestValidator;