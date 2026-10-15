import { Comparison } from '../models/Comparison.js';
import { isDbConnected } from '../config/db.js';
import { 
  extractTextFromPdfBuffer, 
  extractSkillsFromJobDescription, 
  compareResumeWithSkills,
  DEFAULT_ROLES 
} from '../utils.js';

export class ResumeService {
  /**
   * Compares an uploaded resume PDF against a Job Description or role benchmark
   */
  static async compareResumeAndJd({
    fileBuffer,
    fileName = 'Resume.pdf',
    fileSize = 'N/A',
    jobDescriptionText = '',
    roleId = 'fullstack',
    jobDescriptionTitle = ''
  }) {
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
      throw new Error('A valid PDF file buffer is required for resume comparison.');
    }

    // 1. Extract raw text from the uploaded PDF
    const resumeText = await extractTextFromPdfBuffer(fileBuffer);

    // 2. Determine target skills from either Custom JD or preset role
    let targetSkills = [];
    let derivedRoleTitle = jobDescriptionTitle;

    if (jobDescriptionText && jobDescriptionText.trim().length > 15) {
      targetSkills = extractSkillsFromJobDescription(jobDescriptionText);
      if (!derivedRoleTitle) {
        derivedRoleTitle = 'Custom Job Description Benchmark';
      }
    }

    // If no custom JD skills found, or standard role selected, use role preset
    if (targetSkills.length === 0) {
      const preset = DEFAULT_ROLES[roleId] || DEFAULT_ROLES.fullstack;
      targetSkills = preset.skills;
      if (!derivedRoleTitle) {
        derivedRoleTitle = preset.name;
      }
    }

    // 3. Perform ATS keyword comparison and calculate score
    const comparisonResult = compareResumeWithSkills(resumeText, targetSkills, derivedRoleTitle);

    const fullResult = {
      ...comparisonResult,
      fileName,
      fileSize,
      jobDescriptionTitle: derivedRoleTitle,
      jobDescriptionText,
      extractedResumeText: resumeText,
      savedToDb: false
    };

    // 4. Persist to MongoDB if connected
    if (isDbConnected()) {
      try {
        const savedDoc = await Comparison.create({
          fileName,
          fileSize,
          jobDescriptionTitle: derivedRoleTitle,
          jobDescriptionText,
          score: comparisonResult.score,
          verdict: comparisonResult.verdict,
          presentSkills: comparisonResult.presentSkills,
          missingSkills: comparisonResult.missingSkills,
          breakdown: comparisonResult.breakdown,
          recommendations: comparisonResult.recommendations,
          extractedResumeLength: comparisonResult.extractedResumeLength
        });

        fullResult.id = savedDoc._id;
        fullResult.savedToDb = true;
        fullResult.createdAt = savedDoc.createdAt;
      } catch (dbErr) {
        console.warn('[MongoDB Save Error] Could not save comparison record:', dbErr.message);
      }
    }

    return fullResult;
  }

  /**
   * Retrieves recent comparison history from MongoDB
   */
  static async getRecentComparisons(limit = 20) {
    if (!isDbConnected()) {
      return [];
    }
    return Comparison.find()
      .select('-jobDescriptionText')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }

  /**
   * Retrieves a specific comparison by ID
   */
  static async getComparisonById(id) {
    if (!isDbConnected()) {
      return null;
    }
    return Comparison.findById(id).lean();
  }
}
