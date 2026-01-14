// Al inicio de server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');

const app = express();

// Configurar trust proxy para Render (esto soluciona el warning de express-rate-limit)
app.set('trust proxy', 1);

// Configurar CORS para producción
const corsOptions = {
  origin: [
    'http://localhost:5500', // Desarrollo local
    'http://localhost:3000',
    'https://livo-app.netlify.app', // Frontend en producción
    'https://*.vercel.app',
    'https://*.netlify.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet());

// Rate limiting más permisivo para producción
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP',
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🚀 WebGen AI Backend funcionando',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      generate: '/api/generate (POST)',
      lead: '/api/lead (POST)'
    }
  });
});

// API routes
app.use('/api', apiRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor WebGen AI en producción`);
  console.log(`📡 Host: ${HOST}`);
  console.log(`🔌 Puerto: ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'production'}`);
  console.log(`👉 Health check: http://${HOST}:${PORT}/`);
});