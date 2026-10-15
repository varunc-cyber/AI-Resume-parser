/**
 * Frontend API Service for AI Resume Parser Express & MongoDB Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Check backend service and MongoDB connection health
 * @returns {Promise<{ status: string, mongoConnected: boolean }>}
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) {
      throw new Error(`Health check returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return {
      status: 'DOWN',
      mongoConnected: false,
      error: err.message
    };
  }
}

/**
 * Upload resume PDF and optional Job Description for ATS comparison
 * @param {Object} params
 * @param {File} params.file - PDF resume file
 * @param {string} [params.jobDescription] - Target JD text
 * @param {string} [params.roleId] - Target role benchmark identifier
 * @param {string} [params.jobDescriptionTitle] - Human readable role/JD title
 * @returns {Promise<Object>} Analyzed comparison result object
 */
export async function compareResumeWithBackend({
  file,
  jobDescription = '',
  roleId = 'fullstack',
  jobDescriptionTitle = ''
}) {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription && jobDescription.trim()) {
    formData.append('jobDescription', jobDescription.trim());
  }
  if (roleId) {
    formData.append('roleId', roleId);
  }
  if (jobDescriptionTitle) {
    formData.append('jobDescriptionTitle', jobDescriptionTitle);
  }

  const response = await fetch(`${API_BASE_URL}/resume/compare`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody.error || `Server responded with HTTP ${response.status}`);
  }

  const result = await response.json();
  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to analyze resume via backend.');
  }

  return result.data;
}

/**
 * Retrieve recent saved comparison history from MongoDB
 * @param {number} [limit=20]
 * @returns {Promise<Array>} List of comparison records
 */
export async function fetchComparisonHistory(limit = 20) {
  const res = await fetch(`${API_BASE_URL}/resume/history?limit=${limit}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch history (HTTP ${res.status})`);
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Retrieve a specific comparison report by MongoDB document ID
 * @param {string} id
 * @returns {Promise<Object>} Comparison record
 */
export async function fetchComparisonById(id) {
  const res = await fetch(`${API_BASE_URL}/resume/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch comparison with ID ${id}`);
  }
  const json = await res.json();
  return json.data;
}
