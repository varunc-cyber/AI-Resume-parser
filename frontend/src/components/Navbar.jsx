import React from 'react';
import { FileSearch, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Navbar({ onScrollToDemo }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand-logo">
          <div className="brand-icon-box">
            <FileSearch size={22} />
          </div>
          <span>AI Resume Parser</span>
        </div>

        <nav>
          <ul className="nav-links">
            <li><a href="#parser" className="nav-link">Live Parser</a></li>
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
            <li><a href="#ats-systems" className="nav-link">ATS Systems</a></li>
            <li><a href="#faq" className="nav-link">FAQ</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="badge-pill badge-primary" style={{ textTransform: 'none' }}>
            <ShieldCheck size={14} color="#818cf8" />
            <span>100% Private (Client-Side)</span>
          </div>

          <button className="btn-primary" onClick={onScrollToDemo}>
            <span>Test Demo</span>
            <Sparkles size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
