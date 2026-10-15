import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the AI Resume Parser calculate my ATS score out of 100?',
      a: 'The scoring engine compares your extracted resume text against an industry-standard skill dictionary for your target role. Skills marked "Critical" carry higher weights than "Recommended" or "Nice-to-Have" skills. The algorithm also factors in readability, formatting markers, and technical keyword density.'
    },
    {
      q: 'Is my resume data sent to an external server or saved in a database?',
      a: 'No! The application runs 100% locally in your browser. All text decoding, regex tokenization, and scoring logic execute directly on your machine. Your personal identifiable information never leaves your device.'
    },
    {
      q: 'Why are missing skills so critical for getting interviews?',
      a: 'Most ATS software (such as Workday or Greenhouse) parses resumes by querying specific keyword tags required by hiring managers. If a critical keyword like "TypeScript" or "Docker" is missing from your text, your resume may be discarded before a human recruiter ever sees it.'
    },
    {
      q: 'Can I test the parser without uploading my own PDF?',
      a: 'Yes! Click any of the preloaded sample resume chips (e.g. Alex Rivera or Maya Patel) in the live parser header to instantly experience how the parser works with real data.'
    },
    {
      q: 'What should I do if my score is below 75?',
      a: 'Review the "Skills Missing" panel and the "Actionable Recommendations" checklist. Incorporate the critical missing keywords into your experience bullet points, ensuring you describe measurable results and outcomes.'
    }
  ];

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-head">
          <span className="badge-pill badge-primary" style={{ marginBottom: '1rem' }}>
            Got Questions?
          </span>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-desc">
            Everything you need to know about ATS scoring and the AI Resume Parser.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }} 
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
