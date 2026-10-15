import { ResumeService } from '../service/resumeService.js';
import { isDbConnected } from '../config/db.js';

export class ResumeController {
  /**
   * POST /api/resume/compare
   * Upload resume PDF and optional Job Description text
   */
  static async compareResume(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No resume file uploaded. Please upload a PDF resume using the field name "resume".'
        });
      }

      const {
        jobDescription = '',
        roleId = 'fullstack',
        jobDescriptionTitle = ''
      } = req.body;

      const fileSizeKb = `${(req.file.size / 1024).toFixed(1)} KB`;

      const result = await ResumeService.compareResumeAndJd({
        fileBuffer: req.file.buffer,
        fileName: req.file.originalname,
        fileSize: fileSizeKb,
        jobDescriptionText: jobDescription,
        roleId,
        jobDescriptionTitle
      });

      return res.status(200).json({
        success: true,
        message: 'Resume analyzed and compared successfully against Job Description.',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/resume/history
   * Retrieve previous comparisons from MongoDB
   */
  static async getHistory(req, res, next) {
    try {
      const limit = parseInt(req.query.limit, 10) || 20;
      const history = await ResumeService.getRecentComparisons(limit);

      return res.status(200).json({
        success: true,
        count: history.length,
        mongoConnected: isDbConnected(),
        data: history
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/resume/:id
   * Retrieve single comparison details by MongoDB ID
   */
  static async getComparisonById(req, res, next) {
    try {
      const record = await ResumeService.getComparisonById(req.params.id);

      if (!record) {
        return res.status(404).json({
          success: false,
          error: `Comparison record with ID ${req.params.id} not found.`
        });
      }

      return res.status(200).json({
        success: true,
        data: record
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/health
   * Health check endpoint
   */
  static async healthCheck(req, res) {
    return res.status(200).json({
      status: 'UP',
      service: 'AI Resume Parser Backend API',
      timestamp: new Date().toISOString(),
      mongoConnected: isDbConnected()
    });
  }
}
