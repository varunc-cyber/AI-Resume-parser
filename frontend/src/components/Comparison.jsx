import React from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';
import { ATS_SYSTEMS } from '../data/rolesData';

export default function Comparison() {
  return (
    <section id="ats-systems" className="ats-section">
      <div className="container">
        <div className="section-head">
          <span className="badge-pill badge-primary" style={{ marginBottom: '1rem' }}>
            Enterprise ATS Landscape
          </span>
          <h2 className="section-title">
            How Top Applicant Tracking Systems <span className="gradient-text">Filter Resumes</span>
          </h2>
          <p className="section-desc">
            Over 95% of Fortune 500 corporations use automated screeners. Here is what they look for.
          </p>
        </div>

        <div className="comparison-card">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>ATS Platform</th>
                <th>Market Penetration</th>
                <th>Parsing Mechanism</th>
                <th>AI Parser Coverage</th>
              </tr>
            </thead>
            <tbody>
              {ATS_SYSTEMS.map((ats, index) => (
                <tr key={index}>
                  <td><strong>{ats.name}</strong></td>
                  <td style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{ats.marketShare}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{ats.filterType}</td>
                  <td>
                    <span className="badge-pill badge-success">
                      <Check size={12} />
                      <span>Optimized</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
