import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Upload, FileText, CheckCircle2, XCircle, AlertTriangle, 
  Sparkles, RefreshCw, Eye, ArrowUpRight, Check, AlertCircle, FileCheck,
  Briefcase
} from 'lucide-react';
import { TARGET_ROLES, SAMPLE_RESUMES } from '../data/rolesData';
import { 
  extractTextFromPDF, 
  analyzeResume, 
  createCustomRoleFromJD, 
  extractSkillsFromJobDescription, 
  SAMPLE_CUSTOM_JD 
} from '../utils/pdfParser';

export default function ParserSection({ 
  activePresetId, 
  onSelectPreset,
  analysisData, 
  setAnalysisData 
}) {
  const [selectedRole, setSelectedRole] = useState('fullstack');
  const [isCustomJdOpen, setIsCustomJdOpen] = useState(false);
  const [customJdText, setCustomJdText] = useState('');
  const [customRoleObj, setCustomRoleObj] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsingStep, setParsingStep] = useState(0);
  const [showTextModal, setShowTextModal] = useState(false);
  const [extractedRawText, setExtractedRawText] = useState('');
  const [currentFileMeta, setCurrentFileMeta] = useState(null);

  const fileInputRef = useRef(null);
  const timerRef = useRef(null);
  const parsingSteps = [
    'Parsing PDF text streams...',
    'Extracting candidate competencies & experience...',
    'Matching against target role ATS dictionary...',
    'Calculating score & keyword gap analysis...'
  ];

  const detectedJdSkills = customJdText ? extractSkillsFromJobDescription(customJdText) : [];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleApplyCustomJd = (text = customJdText) => {
    if (!text || text.trim().length === 0) return;
    const customRole = createCustomRoleFromJD(text, 'Custom Job Description');
    setCustomRoleObj(customRole);
    setSelectedRole('custom');

    if (extractedRawText) {
      const result = analyzeResume(
        extractedRawText,
        'custom',
        customRole,
        currentFileMeta?.name || 'Resume.pdf'
      );
      setAnalysisData(result);
      if (result.score >= 80) {
        triggerConfetti();
      }
    }
  };

  const loadSamplePreset = (presetId) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === presetId);
    if (!sample) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsParsing(true);
    setParsingStep(0);

    let step = 0;
    timerRef.current = setInterval(() => {
      step++;
      if (step < parsingSteps.length) {
        setParsingStep(step);
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsParsing(false);

        const roleToUse = selectedRole === 'custom' && customRoleObj ? customRoleObj : null;
        const targetRoleId = roleToUse ? 'custom' : sample.roleId;

        if (!roleToUse) {
          setSelectedRole(sample.roleId);
        }

        setCurrentFileMeta({
          name: sample.fileLabel,
          size: sample.fileSize,
          pages: sample.pages
        });
        setExtractedRawText(sample.mockExtractedText);

        if (roleToUse) {
          const customResult = analyzeResume(sample.mockExtractedText, 'custom', roleToUse, sample.fileLabel);
          setAnalysisData(customResult);
          if (customResult.score >= 80) triggerConfetti();
        } else {
          setAnalysisData({
            score: sample.presetScore,
            verdict: sample.verdict,
            fileName: sample.fileLabel,
            roleTitle: TARGET_ROLES.find((r) => r.id === sample.roleId)?.name || 'Full Stack Engineer',
            presentSkills: sample.presentSkills,
            missingSkills: sample.missingSkills,
            breakdown: sample.breakdown,
            recommendations: sample.recommendations,
            extractedLength: sample.mockExtractedText.length
          });

          if (sample.presetScore >= 80) {
            triggerConfetti();
          }
        }
      }
    }, 220);
  };

  // If activePresetId changed externally
  useEffect(() => {
    if (activePresetId) {
      loadSamplePreset(activePresetId);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activePresetId]);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsParsing(true);
    setParsingStep(0);
    setCurrentFileMeta({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      pages: file.size > 200000 ? 2 : 1
    });

    const stepInterval = setInterval(() => {
      setParsingStep((prev) => (prev < parsingSteps.length - 1 ? prev + 1 : prev));
    }, 320);

    try {
      const text = await extractTextFromPDF(file);
      setExtractedRawText(text);

      setTimeout(() => {
        clearInterval(stepInterval);
        setIsParsing(false);

        const targetRoleToUse = selectedRole === 'custom' && customRoleObj ? customRoleObj : null;
        const result = analyzeResume(text, selectedRole, targetRoleToUse, file.name);
        setAnalysisData(result);

        if (result.score >= 80) {
          triggerConfetti();
        }
      }, 1300);
    } catch (err) {
      console.error(err);
      clearInterval(stepInterval);
      setIsParsing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRoleChange = (e) => {
    const newRoleId = e.target.value;
    setSelectedRole(newRoleId);
    if (newRoleId === 'custom') {
      setIsCustomJdOpen(true);
      if (customRoleObj && extractedRawText) {
        const result = analyzeResume(extractedRawText, 'custom', customRoleObj, currentFileMeta?.name || 'Resume.pdf');
        setAnalysisData(result);
      }
    } else {
      setIsCustomJdOpen(false);
      // Standard role selected
      if (analysisData && extractedRawText) {
        const result = analyzeResume(
          extractedRawText, 
          newRoleId, 
          null, 
          currentFileMeta?.name || 'Resume.pdf'
        );
        setAnalysisData(result);
      }
    }
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setCurrentFileMeta(null);
    setExtractedRawText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Helper for score gauge color
  const getScoreColor = (score) => {
    if (score >= 85) return '#10b981'; // Emerald
    if (score >= 70) return '#6366f1'; // Indigo
    if (score >= 55) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose
  };

  const scoreRadius = 78;
  const circumference = 2 * Math.PI * scoreRadius;
  const scorePercent = analysisData ? Math.min(100, Math.max(0, analysisData.score)) : 0;
  const strokeDashoffset = circumference - (scorePercent / 100) * circumference;

  return (
    <section id="parser" className="parser-section">
      <div className="container">
        <div className="parser-card">
          {/* Parser Header Controls */}
          <div className="parser-header">
            <div className="role-selector-wrap">
              <label htmlFor="role-select" className="role-selector-label">Target Role Benchmark:</label>
              <select 
                id="role-select"
                className="role-select-input"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                {TARGET_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.category})
                  </option>
                ))}
                <option value="custom">📝 Custom Job Description</option>
              </select>

              <button
                type="button"
                className="btn-secondary"
                style={{
                  fontSize: '0.85rem',
                  padding: '0.5rem 0.95rem',
                  borderColor: (selectedRole === 'custom' || isCustomJdOpen) ? 'var(--accent-primary)' : 'var(--border-subtle)',
                  background: (selectedRole === 'custom' || isCustomJdOpen) ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.04)'
                }}
                onClick={() => {
                  const nextOpen = !isCustomJdOpen;
                  setIsCustomJdOpen(nextOpen);
                  if (nextOpen && selectedRole !== 'custom') {
                    setSelectedRole('custom');
                  }
                }}
              >
                <Briefcase size={14} color="#818cf8" />
                <span>{selectedRole === 'custom' ? 'Custom JD Active' : 'Enter Custom JD'}</span>
              </button>
            </div>

            {/* Quick Sample Presets */}
            <div className="presets-bar">
              <span className="presets-label">Quick Test Presets:</span>
              {SAMPLE_RESUMES.map((sample) => {
                const isActive = activePresetId === sample.id || (analysisData && analysisData.fileName === sample.fileLabel);
                return (
                  <button
                    key={sample.id}
                    className={`preset-chip ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectPreset(sample.id);
                      loadSamplePreset(sample.id);
                    }}
                  >
                    <Sparkles size={12} />
                    <span>{sample.name.split('—')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Job Description Expandable Panel */}
          {isCustomJdOpen && (
            <div className="custom-jd-card">
              <div className="custom-jd-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <Briefcase size={18} color="#818cf8" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Custom Job Description Benchmark</h4>
                  <span className="badge-pill badge-primary">
                    {detectedJdSkills.length} Required Skills Extracted
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.8rem' }}
                    onClick={() => {
                      setCustomJdText(SAMPLE_CUSTOM_JD);
                      handleApplyCustomJd(SAMPLE_CUSTOM_JD);
                    }}
                  >
                    <Sparkles size={13} color="#818cf8" />
                    <span>Load Sample JD</span>
                  </button>

                  {customJdText && (
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                      onClick={() => {
                        setCustomJdText('');
                        setCustomRoleObj(null);
                        setSelectedRole('fullstack');
                        if (extractedRawText) {
                          const res = analyzeResume(extractedRawText, 'fullstack', null, currentFileMeta?.name || 'Resume.pdf');
                          setAnalysisData(res);
                        }
                      }}
                    >
                      Clear
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsCustomJdOpen(false)}
                    style={{ color: 'var(--text-muted)', fontSize: '1rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                    title="Close panel"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <textarea
                className="custom-jd-textarea"
                placeholder="Paste the target job description here (e.g. from LinkedIn, Indeed, or careers page: requirements, tech stack, responsibilities)..."
                value={customJdText}
                onChange={(e) => {
                  setCustomJdText(e.target.value);
                  if (e.target.value.trim().length > 15) {
                    handleApplyCustomJd(e.target.value);
                  }
                }}
                rows={5}
              />

              {detectedJdSkills.length > 0 && (
                <div className="custom-jd-skills-preview">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Extracted Target Keywords ({detectedJdSkills.length}):
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                    {detectedJdSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className={`badge-pill ${s.importance === 'Critical' ? 'badge-danger' : 'badge-primary'}`}
                        style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.85rem' }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.55rem 1.35rem' }}
                  onClick={() => handleApplyCustomJd(customJdText)}
                >
                  <Sparkles size={14} />
                  <span>Analyze Resume Against This JD</span>
                </button>
              </div>
            </div>
          )}

          {/* Parser Content */}
          <div className="parser-body">
            {isParsing ? (
              <div className="parsing-loader-wrap">
                <div className="loading-spinner" />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Analyzing Resume with AI Engine
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  {parsingSteps[parsingStep]}
                </p>

                <div className="stepper-list">
                  {parsingSteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`stepper-step ${idx < parsingStep ? 'completed' : idx === parsingStep ? 'active' : ''}`}
                    >
                      {idx < parsingStep ? <Check size={16} /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: idx === parsingStep ? 'var(--accent-primary)' : 'var(--text-muted)' }} />}
                      <span>Step {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : !analysisData ? (
              /* Dropzone */
              <div 
                className={`dropzone-container ${isDragging ? 'is-dragover' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="file-input-hidden" 
                  accept=".pdf,application/pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />

                <div className="dropzone-icon-circle">
                  <Upload size={32} />
                </div>

                <h3 className="dropzone-title">
                  Drop your PDF resume here, or <span className="gradient-text">browse files</span>
                </h3>
                <p className="dropzone-hint">
                  Supports PDF format. 100% evaluated client-side — your personal data never leaves your browser.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ margin: '0 auto' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <FileText size={16} />
                    <span>Choose PDF File</span>
                  </button>

                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.6rem', 
                      flexWrap: 'wrap',
                      marginTop: '0.5rem',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-subtle)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or test live sample:</span>
                    {SAMPLE_RESUMES.map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        className="preset-chip"
                        style={{ fontSize: '0.78rem', padding: '0.25rem 0.75rem' }}
                        onClick={() => {
                          onSelectPreset(sample.id);
                          loadSamplePreset(sample.id);
                        }}
                      >
                        <Sparkles size={11} color="#818cf8" />
                        <span>{sample.name.split('—')[0].trim()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Results Dashboard */
              <div className="results-wrapper">
                <div className="results-dashboard">
                  {/* Left Column: ATS Score & Metrics */}
                  <div className="score-summary-card">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                      Overall ATS Match Score
                    </span>

                    <div className="score-gauge-box">
                      <svg className="gauge-svg" viewBox="0 0 190 190">
                        <circle
                          className="gauge-bg-circle"
                          cx="95"
                          cy="95"
                          r={scoreRadius}
                        />
                        <circle
                          className="gauge-progress-circle"
                          cx="95"
                          cy="95"
                          r={scoreRadius}
                          style={{
                            stroke: getScoreColor(analysisData.score),
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset
                          }}
                        />
                      </svg>
                      <div className="score-center-text">
                        <span className="score-number" style={{ color: getScoreColor(analysisData.score) }}>
                          {analysisData.score}
                        </span>
                        <span className="score-max">OUT OF 100</span>
                      </div>
                    </div>

                    <div 
                      className="verdict-badge"
                      style={{
                        backgroundColor: `${getScoreColor(analysisData.score)}20`,
                        color: getScoreColor(analysisData.score),
                        border: `1px solid ${getScoreColor(analysisData.score)}45`
                      }}
                    >
                      {analysisData.verdict}
                    </div>

                    {/* Breakdown bars */}
                    <div className="breakdown-bars">
                      <div className="bar-row">
                        <div className="bar-label-wrap">
                          <span>Keyword Match</span>
                          <span style={{ fontWeight: 600 }}>{analysisData.breakdown?.keywordMatch || 80}%</span>
                        </div>
                        <div className="bar-track">
                          <div 
                            className="bar-fill" 
                            style={{ 
                              width: `${analysisData.breakdown?.keywordMatch || 80}%`,
                              background: 'var(--grad-primary)'
                            }} 
                          />
                        </div>
                      </div>

                      <div className="bar-row">
                        <div className="bar-label-wrap">
                          <span>Technical Depth</span>
                          <span style={{ fontWeight: 600 }}>{analysisData.breakdown?.technicalDepth || 75}%</span>
                        </div>
                        <div className="bar-track">
                          <div 
                            className="bar-fill" 
                            style={{ 
                              width: `${analysisData.breakdown?.technicalDepth || 75}%`,
                              background: '#8b5cf6'
                            }} 
                          />
                        </div>
                      </div>

                      <div className="bar-row">
                        <div className="bar-label-wrap">
                          <span>ATS Readability</span>
                          <span style={{ fontWeight: 600 }}>{analysisData.breakdown?.readabilityScore || 85}%</span>
                        </div>
                        <div className="bar-track">
                          <div 
                            className="bar-fill" 
                            style={{ 
                              width: `${analysisData.breakdown?.readabilityScore || 85}%`,
                              background: '#06b6d4'
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Skills Present vs Missing */}
                  <div className="skills-main-col">
                    <div className="skills-analysis-grid">
                      {/* Skills Present */}
                      <div className="analysis-panel">
                        <div className="analysis-panel-header">
                          <div className="panel-title" style={{ color: '#6ee7b7' }}>
                            <CheckCircle2 size={18} color="#10b981" />
                            <span>Skills Present ({analysisData.presentSkills?.length || 0})</span>
                          </div>
                          <span className="badge-pill badge-success">Detected</span>
                        </div>

                        <div className="skills-chip-container">
                          {analysisData.presentSkills && analysisData.presentSkills.length > 0 ? (
                            analysisData.presentSkills.map((skill, index) => (
                              <span key={index} className="skill-tag-present">
                                <Check size={13} color="#10b981" />
                                <span>{skill.name}</span>
                              </span>
                            ))
                          ) : (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                              No matching role keywords detected.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Skills Missing */}
                      <div className="analysis-panel">
                        <div className="analysis-panel-header">
                          <div className="panel-title" style={{ color: '#fda4af' }}>
                            <XCircle size={18} color="#f43f5e" />
                            <span>Skills Missing ({analysisData.missingSkills?.length || 0})</span>
                          </div>
                          <span className="badge-pill badge-danger">Action Required</span>
                        </div>

                        <div className="skills-chip-container">
                          {analysisData.missingSkills && analysisData.missingSkills.length > 0 ? (
                            analysisData.missingSkills.map((skill, index) => (
                              <span 
                                key={index} 
                                className={`skill-tag-missing ${skill.importance === 'Recommended' ? 'recommended' : ''}`}
                                title={skill.tip || `Missing ${skill.name}`}
                              >
                                <AlertTriangle size={13} color={skill.importance === 'Critical' ? '#f43f5e' : '#f59e0b'} />
                                <span>{skill.name}</span>
                              </span>
                            ))
                          ) : (
                            <p style={{ color: '#6ee7b7', fontSize: '0.85rem' }}>
                              🎉 Perfect keyword alignment! No missing skills for this role.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Recommendations Box */}
                    <div className="recommendations-box">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                        <Sparkles size={18} color="#818cf8" />
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
                          Actionable ATS Optimization Checklist
                        </h4>
                      </div>

                      {analysisData.recommendations?.map((rec, i) => (
                        <div key={i} className="rec-item">
                          <ArrowUpRight size={16} className="rec-icon" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="results-action-bar">
                  <div className="uploaded-file-info">
                    <FileCheck size={18} color="#818cf8" />
                    <span>Analyzing: <strong>{analysisData.fileName}</strong></span>
                    {currentFileMeta?.size && <span style={{ color: 'var(--text-muted)' }}>({currentFileMeta.size})</span>}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      className="btn-secondary" 
                      onClick={() => {
                        setIsCustomJdOpen(true);
                        setSelectedRole('custom');
                      }}
                      style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                    >
                      <Briefcase size={15} color="#818cf8" />
                      <span>{selectedRole === 'custom' ? 'Edit Custom JD' : 'Test With Custom JD'}</span>
                    </button>

                    {extractedRawText && (
                      <button 
                        className="btn-secondary" 
                        onClick={() => setShowTextModal(true)}
                        style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                      >
                        <Eye size={15} />
                        <span>View Parsed Text</span>
                      </button>
                    )}

                    <button 
                      className="btn-primary" 
                      onClick={resetAnalysis}
                      style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
                    >
                      <RefreshCw size={15} />
                      <span>Upload Another Resume</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extracted Text Modal */}
      {showTextModal && (
        <div className="modal-overlay" onClick={() => setShowTextModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                Extracted Text from {currentFileMeta?.name || 'Resume'}
              </h4>
              <button 
                onClick={() => setShowTextModal(false)}
                style={{ color: 'var(--text-secondary)', padding: '0.25rem' }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              {extractedRawText || 'No text content available.'}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
