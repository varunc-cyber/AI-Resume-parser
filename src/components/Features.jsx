import React from 'react';
import { 
  Zap, ShieldCheck, Target, CheckSquare, Search, Award 
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Sub-Second Local Analysis',
      desc: 'No waiting in cloud queues. The AI parser extracts text, processes tokens, and outputs scores in less than 1.5 seconds.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: '100% Client-Side Privacy',
      desc: 'Your resume contains phone numbers, emails, and employment history. Our parser runs entirely in your browser—zero data is sent to external servers.'
    },
    {
      icon: <Target size={24} />,
      title: 'Target Role Benchmark',
      desc: 'Compare your resume against concrete industry requirements for Full Stack, Frontend, Backend, AI/ML, and DevOps positions.'
    },
    {
      icon: <CheckSquare size={24} />,
      title: 'Present vs Missing Matrix',
      desc: 'Immediately see recognized technologies highlighted in emerald green alongside critical missing keywords in amber and rose.'
    },
    {
      icon: <Search size={24} />,
      title: 'Actionable Keyword Tips',
      desc: 'Hover over any missing skill to receive custom wording advice on how to integrate that technology into your experience bullets.'
    },
    {
      icon: <Award size={24} />,
      title: 'Beat Real ATS Gatekeepers',
      desc: 'Modeled after algorithms used by Workday, Greenhouse, Taleo, and Lever to eliminate automated application rejections.'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-head">
          <span className="badge-pill badge-primary" style={{ marginBottom: '1rem' }}>
            Built for Job Seekers & Developers
          </span>
          <h2 className="section-title">
            Everything You Need to <span className="gradient-text">Ship Winning Resumes</span>
          </h2>
          <p className="section-desc">
            Engineered to remove the guesswork from resume optimization with surgical precision.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-box">
                {feat.icon}
              </div>
              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
