import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParserSection from './components/ParserSection';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import Faq from './components/Faq';
import Footer from './components/Footer';

export default function App() {
  const [activePresetId, setActivePresetId] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const scrollToParser = () => {
    const el = document.getElementById('parser');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadSampleFromHero = (presetId) => {
    setActivePresetId(presetId);
    scrollToParser();
  };

  return (
    <div className="app-container">
      <Navbar onScrollToDemo={scrollToParser} />

      <main className="main-content">
        <Hero 
          onUploadClick={scrollToParser} 
          onLoadSample={handleLoadSampleFromHero} 
        />

        <ParserSection 
          activePresetId={activePresetId}
          onSelectPreset={setActivePresetId}
          analysisData={analysisData}
          setAnalysisData={setAnalysisData}
        />

        <Features />
        <HowItWorks />
        <Comparison />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
