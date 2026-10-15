import { Router } from 'express';
import { ResumeController } from '../controller/resumeController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

// POST /api/resume/compare - Upload resume PDF + Job Description
router.post('/compare', upload.single('resume'), ResumeController.compareResume);

// GET /api/resume/history - Retrieve saved comparisons from MongoDB
router.get('/history', ResumeController.getHistory);

// GET /api/resume/:id - Get details of specific comparison
router.get('/:id', ResumeController.getComparisonById);

export default router;
