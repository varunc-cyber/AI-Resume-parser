import { Router } from 'express';
import resumeRoutes from './resumeRoutes.js';
import { ResumeController } from '../controller/resumeController.js';

const router = Router();

// Mount resume feature routes under /api/resume
router.use('/resume', resumeRoutes);

// Health check endpoint
router.get('/health', ResumeController.healthCheck);

export default router;
