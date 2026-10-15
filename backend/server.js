import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Connect to MongoDB
connectDB();

const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin || 
      allowedOrigins.includes(origin) || 
      origin.endsWith('.vercel.app') ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'AI Resume Parser Backend API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      compare: 'POST /api/resume/compare (multipart: resume PDF + jobDescription)',
      history: 'GET /api/resume/history',
      health: 'GET /api/health'
    }
  });
});

// Mount central API routes under /api
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

// Start HTTP Server (Only in local development / standalone mode, not on Vercel Serverless)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`🚀 AI Resume Parser Express Server is running!`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📡 Endpoints:`);
    console.log(`   - POST /api/resume/compare (Resume PDF + JD)`);
    console.log(`   - GET  /api/resume/history`);
    console.log(`   - GET  /api/health`);
    console.log(`=============================================`);
  });
}

export default app;
