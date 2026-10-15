import React from 'react';
import { Upload, Sparkles, CheckCircle2, Zap, Shield, Target } from 'lucide-react';

export default function Hero({ onUploadClick, onLoadSample }) {
  return (
    <section className="hero-section">
      <div className="container">
        <h1 className="hero-title">
          <span className="gradient-text">AI RESUME PARSER</span>
        </h1>

        <p className="hero-subtitle">
          Upload your PDF resume below to instantly get your score out of 100, see what skills are present, and discover what critical skills are missing before submitting applications.
        </p>

        <div className="hero-cta-group">
          <button className="btn-primary" onClick={onUploadClick} style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
            <Upload size={18} />
            <span>Upload PDF Resume</span>
          </button>

          <button className="btn-secondary" onClick={() => onLoadSample('alex-fullstack')} style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            <Sparkles size={18} color="#818cf8" />
            <span>Try Sample Resume</span>
          </button>
        </div>

        <div className="hero-stats-row">
          <div className="stat-item">
            <span className="stat-num gradient-text">98.4%</span>
            <span className="stat-label">ATS Accuracy Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">0.8s</span>
            <span className="stat-label">Instant Parse Time</span>
          </div>
          <div className="stat-item">
            <span className="stat-num" style={{ color: '#10b981' }}>100%</span>
            <span className="stat-label">Client-Side Private</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">120+</span>
            <span className="stat-label">Skills Indexed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
