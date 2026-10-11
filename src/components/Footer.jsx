import React from 'react';
import { FileSearch, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="brand-icon-box" style={{ width: 32, height: 32 }}>
            <FileSearch size={18} />
          </div>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>AI Resume Parser</span>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>v1.0.0 (Client-Side)</span>
          </div>
        </div>

        <div className="footer-links">
          <a href="#parser" className="footer-link">Live Parser</a>
          <a href="#features" className="footer-link">Features</a>
          <a href="#how-it-works" className="footer-link">How It Works</a>
          <a href="#faq" className="footer-link">FAQ</a>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Built for modern engineers to ship interview-ready resumes.
        </div>
      </div>
    </footer>
  );
}
