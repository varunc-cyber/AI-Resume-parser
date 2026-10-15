/**
 * Gemini AI Service for Intelligent Resume Parsing & ATS Scoring
 */

const FALLBACK_MODELS = [
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash'
];

/**
 * Clean and parse JSON returned by Gemini, stripping any accidental markdown blocks
 */
function cleanAndParseJSON(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Empty response from Gemini AI');
  }

  let cleaned = rawText.trim();
  // Strip ```json ... ``` wrapper if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  }

  return JSON.parse(cleaned);
}

/**
 * Calls Google Gemini generateContent API with model fallback
 */
async function callGeminiGenerateContent(prompt, apiKey, preferredModel) {
  // Ensure preferred model comes first, followed by fallback alternatives
  const modelsToTry = [
    preferredModel,
    ...FALLBACK_MODELS.filter((m) => m !== preferredModel)
  ].filter(Boolean);

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        }),
        signal: AbortSignal.timeout(18000)
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMsg = data.error?.message || `HTTP ${response.status}`;
        console.warn(`[Gemini AI] Model ${model} returned error (${data.error?.code || response.status}): ${errorMsg}`);
        lastError = new Error(errorMsg);
        continue; // Try next model in fallback list
      }

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!generatedText) {
        console.warn(`[Gemini AI] Model ${model} returned no candidates/text.`);
        continue;
      }

      const parsedJson = cleanAndParseJSON(generatedText);
      return {
        result: parsedJson,
        modelUsed: model
      };
    } catch (err) {
      console.warn(`[Gemini AI] Attempt with ${model} failed:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini AI model attempts failed.');
}

export class GeminiService {
  /**
   * Analyzes candidate resume text against target job description or role criteria using Gemini AI
   */
  static async analyzeResume({
    resumeText,
    jobDescriptionText = '',
    roleTitle = 'Full Stack Engineer',
    targetSkills = []
  }) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('[Gemini AI] No GEMINI_API_KEY configured. Falling back to local heuristics.');
      return null;
    }

    const preferredModel = process.env.GEMINI_MODEL || 'gemini-flash-latest';

    const benchmarkSkillsList = targetSkills && targetSkills.length > 0
      ? targetSkills.map((s) => `${s.name} (${s.importance || 'Critical'})`).join(', ')
      : 'Standard industry technical competencies for this position';

    const prompt = `
You are an expert ATS (Applicant Tracking System) and Senior Technical Hiring Manager.
Analyze the following candidate Resume against the target Job Description or Role Benchmark.

RESUME CONTENT:
"""
${resumeText.slice(0, 15000)}
"""

TARGET ROLE / BENCHMARK TITLE:
"${roleTitle}"

TARGET JOB DESCRIPTION / REQUIRED CRITERIA:
"""
${jobDescriptionText && jobDescriptionText.trim().length > 10 ? jobDescriptionText.slice(0, 8000) : benchmarkSkillsList}
"""

Evaluate the candidate's technical skills, experience alignment, and keyword presence thoroughly.
Return a valid JSON object matching this exact schema:
{
  "score": <integer from 0 to 100 representing realistic ATS match percentage>,
  "verdict": "<one of: 'Interview Ready (Top 10%)', 'Competitive Candidate', 'Moderate Match (Needs Key Skills)', 'At Risk (High ATS Dropoff)'>",
  "summary": "<2-3 sentence executive ATS summary of the candidate's profile and alignment with this role>",
  "presentSkills": [
    {
      "name": "<exact skill name found in resume>",
      "category": "<Frontend | Backend | Database | DevOps | Cloud | Testing | Architecture | Tools | AI/ML | Core>",
      "confidence": <integer between 75 and 99>,
      "importance": "<Critical | Recommended | Nice-to-Have>"
    }
  ],
  "missingSkills": [
    {
      "name": "<missing skill required or recommended for this role/JD>",
      "category": "<category>",
      "importance": "<Critical | Recommended | Nice-to-Have>",
      "tip": "<actionable advice on how candidate can highlight, quantify, or add this skill to their resume>"
    }
  ],
  "breakdown": {
    "keywordMatch": <integer 0-100>,
    "technicalDepth": <integer 0-100>,
    "readabilityScore": <integer 0-100>,
    "impactMetrics": <integer 0-100>
  },
  "recommendations": [
    "<actionable suggestion 1 for candidate to improve ATS score>",
    "<actionable suggestion 2 for candidate to improve ATS score>",
    "<actionable suggestion 3 for candidate to improve ATS score>"
  ]
}

Return ONLY raw JSON, with no wrapping markdown and no explanations.
`;

    try {
      const { result, modelUsed } = await callGeminiGenerateContent(prompt, apiKey, preferredModel);

      // Validate & sanitize structure
      const score = Math.max(0, Math.min(100, Math.round(Number(result.score) || 70)));
      const verdict = result.verdict || (score >= 85 ? 'Interview Ready (Top 10%)' : score >= 70 ? 'Competitive Candidate' : score >= 55 ? 'Moderate Match (Needs Key Skills)' : 'At Risk (High ATS Dropoff)');
      const summary = result.summary || 'AI ATS analysis completed successfully.';
      const presentSkills = Array.isArray(result.presentSkills) ? result.presentSkills : [];
      const missingSkills = Array.isArray(result.missingSkills) ? result.missingSkills : [];
      const breakdown = {
        keywordMatch: Math.max(0, Math.min(100, Math.round(Number(result.breakdown?.keywordMatch) || score))),
        technicalDepth: Math.max(0, Math.min(100, Math.round(Number(result.breakdown?.technicalDepth) || score))),
        readabilityScore: Math.max(0, Math.min(100, Math.round(Number(result.breakdown?.readabilityScore) || 85))),
        impactMetrics: Math.max(0, Math.min(100, Math.round(Number(result.breakdown?.impactMetrics) || score)))
      };
      const recommendations = Array.isArray(result.recommendations) && result.recommendations.length > 0
        ? result.recommendations
        : ['Quantify technical impact with measurable metrics.', 'Align technical keywords with the target JD.'];

      return {
        score,
        verdict,
        summary,
        presentSkills,
        missingSkills,
        breakdown,
        recommendations,
        engine: `Gemini AI (${modelUsed})`
      };
    } catch (err) {
      console.warn('[Gemini AI Analysis Error]', err.message);
      return null; // Signals caller to use heuristic fallback
    }
  }
}
