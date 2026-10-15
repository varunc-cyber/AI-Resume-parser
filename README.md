# AI Resume Parser & ATS Score Analyzer

> Full-stack ATS resume comparison engine with a **React + Vite** frontend, an **Express + MongoDB** backend API, and a standalone **Vanilla HTML/CSS/JS** demo. Upload any PDF resume alongside a target Job Description (JD) to evaluate ATS score out of 100, identify present skills, and uncover missing keywords.

---

## 🌟 Highlights & Features

- **Resume PDF & Job Description Comparison**: Compare an uploaded resume PDF directly against any target Job Description (or choose from standard role benchmarks).
- **Express + MongoDB Backend API**:
  - `POST /api/resume/compare`: Multi-part PDF upload + JD parsing, skill comparison, scoring, and persistence to MongoDB.
  - `GET /api/resume/history`: Retrieve recent saved resume comparisons.
  - `GET /api/health`: Health status & MongoDB connection check.
- **Instant ATS Scoring (0–100)**: Evaluates resumes against targeted role criteria with dynamic circular gauge visualization and category breakdowns (Keyword Match, Technical Depth, ATS Readability).
- **Dual Skill Matrix**:
  - **Skills Present**: Detected technologies categorized with confidence ratings.
  - **Skills Missing**: High-priority gap analysis with actionable tips on how to add each missing skill.
- **Resilient Hybrid Engine**: Uses Express backend and MongoDB when available; seamlessly falls back to client-side parsing if backend is offline.
- **Copy & Export Summary**: One-click export to clipboard for easy sharing.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (optional for local persistence — the Express server runs with in-memory fallback if MongoDB isn't active)

---

### 2. Run the Full Stack Application

#### Option A: Run Both Frontend & Backend Together (Recommended)
From the root directory:
```bash
# 1. Install all dependencies (root, frontend, and backend)
npm run install:all

# 2. Start both servers concurrently
npm run dev
```
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

#### Option B: Run Individually

**Start the Backend (Port 5000)**:
```bash
cd backend
npm install
npm run dev     # or 'npm start'
```

**Start the Frontend (Port 3000)**:
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser. All `/api/*` calls are automatically proxied from Vite to the Express backend at `http://localhost:5000`.

---

### 3. Standalone Vanilla HTML / CSS / JS Version

A pure HTML, CSS, and JavaScript version is also available in [`vanilla-html-version/`](file:///e:/AI-Resume%20parser/vanilla-html-version/).
You can open [`vanilla-html-version/index.html`](file:///e:/AI-Resume%20parser/vanilla-html-version/index.html) directly in any web browser without needing Node or any build tools!

---

## 📁 Project Architecture

```
├── DECISION.md                # Requirements & architectural decisions
├── README.md                  # Project overview & documentation
├── package.json               # Root scripts (unified dev, build, install)
├── .gitignore                 # Monorepo ignore rules (node_modules, dist, env)
│
├── frontend/                  # React + Vite Application
│   ├── .env.example           # Frontend environment variable template
│   ├── index.html             # HTML entry point with modern fonts
│   ├── vite.config.js         # Vite configuration with /api proxy
│   ├── package.json           # Frontend dependencies & scripts
│   └── src/
│       ├── main.jsx           # React mount root
│       ├── App.jsx            # Main layout & state
│       ├── index.css          # Vanilla CSS design system (dark theme)
│       ├── services/
│       │   └── resumeApi.js   # Encapsulated API calls (health, compare, history)
│       ├── data/
│       │   └── rolesData.js   # Role benchmarks & sample profiles
│       ├── utils/
│       │   └── pdfParser.js   # Client-side parsing fallback & utilities
│       └── components/
│           ├── Navbar.jsx     # Navigation header
│           ├── Hero.jsx       # Hero headline & quick start
│           ├── ParserSection.jsx # Core dropzone, JD input, score gauge & history
│           ├── Features.jsx   # Value proposition cards
│           ├── HowItWorks.jsx # Workflow stepper
│           ├── Comparison.jsx # ATS systems coverage table
│           ├── Faq.jsx        # FAQ accordion
│           └── Footer.jsx     # Footer
│
├── backend/                   # Express + MongoDB Backend API
│   ├── server.js              # Express app entry point & server bootstrap
│   ├── .env                   # Local environment variables (PORT, MONGODB_URI)
│   ├── .env.example           # Environment template
│   ├── config/
│   │   └── db.js              # Mongoose database connection & status
│   ├── models/
│   │   └── Comparison.js      # Mongoose schema for saved comparisons
│   ├── middleware/
│   │   ├── uploadMiddleware.js # Multer PDF upload configuration
│   │   └── errorHandler.js    # Centralized error handler
│   ├── routes/
│   │   ├── index.js           # Central API router (/api/health, /api/resume)
│   │   └── resumeRoutes.js    # Routes for /compare, /history, /:id
│   ├── controller/
│   │   └── resumeController.js # Request handlers & validation
│   ├── service/
│   │   └── resumeService.js   # PDF extraction, JD comparison & DB storage
│   └── utils.js               # PDF extraction, ATS algorithm & skills dictionary
│
└── vanilla-html-version/      # Standalone zero-build HTML/CSS/JS mock version
    ├── index.html
    ├── style.css
    └── app.js
```
