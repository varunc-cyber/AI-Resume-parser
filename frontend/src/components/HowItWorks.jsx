import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Select Role & Drop PDF',
      desc: 'Pick your dream role benchmark or test instantly using our preloaded sample profiles. Drag & drop any PDF resume.'
    },
    {
      num: '02',
      title: 'In-Browser Text Extraction',
      desc: 'Our client-side engine strips text streams, parses structural sections, and isolates candidate technical competencies.'
    },
    {
      num: '03',
      title: 'ATS Algorithm Scoring',
      desc: 'Skills are weighted by priority (Critical vs Recommended) to generate an accurate 0–100 ATS compatibility grade.'
    },
    {
      num: '04',
      title: 'Plug Missing Keywords & Ship',
      desc: 'Review the missing skills checklist, inject high-value keywords into your projects, and re-test until you hit 85+ score!'
    }
  ];

  return (
    <section id="how-it-works" className="how-section">
      <div className="container">
        <div className="section-head">
          <span className="badge-pill badge-primary" style={{ marginBottom: '1rem' }}>
            Zero Friction Workflow
          </span>
          <h2 className="section-title">
            How <span className="gradient-text">AI Resume Parser</span> Works
          </h2>
          <p className="section-desc">
            Four simple steps from unoptimized draft to ATS-ready resume.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
