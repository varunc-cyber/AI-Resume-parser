# AI Resume Parser & ATS Score Analyzer

> Next-gen, client-side ATS resume analyzer built with **React + Vite** and **Vanilla CSS**. Upload any PDF resume to instantly evaluate ATS compatibility, extract recognized skills, and identify missing keywords—with 100% in-browser privacy and zero backend servers needed.

---

## 🌟 Highlights & Features

- **Instant ATS Scoring (0–100)**: Evaluates resumes against targeted role criteria with dynamic circular gauge visualization and category breakdowns (Keyword Match, Technical Depth, ATS Readability).
- **Dual Skill Matrix**:
  - **Skills Present**: Detected technologies categorized with confidence ratings.
  - **Skills Missing**: High-priority gap analysis with actionable tips on how to add each missing skill.
- **Client-Side Privacy (Zero Backend)**: All PDF parsing and regex keyword tokenization runs 100% locally in your browser. No personal identifiable information ever leaves your device.
- **Multi-Role Benchmarks**: Choose target profiles including:
  - Full Stack Engineer
  - Frontend React Specialist
  - Backend & Cloud Engineer
  - AI & Machine Learning Engineer
  - DevOps & SRE Specialist
- **Quick-Test Presets**: Instant sample resumes preloaded to test different score brackets:
  - **Alex Rivera**: Senior Full Stack (Score: 89, 15 skills present, 1 missing)
  - **Maya Patel**: Frontend UI Developer (Score: 76, 11 skills present, 5 missing)
  - **Liam Chen**: Junior Developer (Score: 52, 4 skills present, 9 missing)
- **Actionable Optimization Checklist**: Specific bullet-point recommendations tailored to your score and missing keywords.
- **Parsed Text Inspector**: Modal viewer to inspect raw text extracted from uploaded documents.

---

## 🚀 Getting Started

### 1. Modern React Project (Vite)

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

To create an optimized production build:
```bash
npm run build
```

---

### 2. Standalone Vanilla HTML / CSS / JS Version

A pure HTML, CSS, and JavaScript version is also included in [`vanilla-html-version/`](file:///e:/AI-Resume%20parser/vanilla-html-version/).
You can open [`vanilla-html-version/index.html`](file:///e:/AI-Resume%20parser/vanilla-html-version/index.html) directly in any web browser without needing Node or any build tools!

---

## 📁 Project Structure

```
├── DECISION.md                # User prompt & requirements
├── index.html                 # React Vite entry HTML with modern Google Fonts
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── src/
│   ├── main.jsx               # React mount root
│   ├── App.jsx                # Main layout & state management
│   ├── index.css              # Vanilla CSS design system (Obsidian dark theme, glassmorphism)
│   ├── data/
│   │   └── rolesData.js       # Target roles, skill dictionaries & mock preset data
│   ├── utils/
│   │   └── pdfParser.js       # Client-side PDF text extraction & scoring engine
│   └── components/
│       ├── Navbar.jsx         # Navigation header & live demo CTA
│       ├── Hero.jsx           # High-impact hero section & stats
│       ├── ParserSection.jsx  # Core dropzone, ATS gauge, skills matrix & recommendations
│       ├── Features.jsx       # Value proposition cards
│       ├── HowItWorks.jsx     # 4-step workflow stepper
│       ├── Comparison.jsx     # Enterprise ATS systems coverage table
│       ├── Faq.jsx            # Interactive FAQ accordion
│       └── Footer.jsx         # Footer & links
└── vanilla-html-version/      # Standalone zero-build HTML/CSS/JS version
    ├── index.html
    ├── style.css
    └── app.js
```
