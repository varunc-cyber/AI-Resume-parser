import { Router } from 'express';
import resumeRoutes from './resumeRoutes.js';
import { ResumeController } from '../controller/resumeController.js';

const router = Router();

// Mount resume feature routes under /api/resume
router.use('/resume', resumeRoutes);

// Root API status endpoint: GET /api
router.get('/', (req, res) => {
  res.json({
    name: 'AI Resume Parser Backend API',
    status: 'ONLINE',
    documentation: '/api/health',
    endpoints: {
      compare: 'POST /api/resume/compare (Resume PDF + JD)',
      history: 'GET /api/resume/history',
      health: 'GET /api/health'
    }
  });
});

// Health check endpoint
router.get('/health', ResumeController.healthCheck);

export default router;
