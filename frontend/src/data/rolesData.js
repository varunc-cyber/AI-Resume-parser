export const TARGET_ROLES = [
  {
    id: 'fullstack',
    name: 'Full Stack Engineer',
    category: 'Engineering',
    level: 'Mid to Senior',
    description: 'Modern web applications, distributed APIs, microservices, and reactive frontends.',
    requiredSkills: [
      { name: 'React', category: 'Frontend', importance: 'Critical' },
      { name: 'TypeScript', category: 'Frontend', importance: 'Critical' },
      { name: 'Node.js', category: 'Backend', importance: 'Critical' },
      { name: 'PostgreSQL', category: 'Database', importance: 'Critical' },
      { name: 'Docker', category: 'DevOps', importance: 'Critical' },
      { name: 'REST APIs', category: 'Backend', importance: 'Critical' },
      { name: 'Git', category: 'Tools', importance: 'Critical' },
      { name: 'Next.js', category: 'Frontend', importance: 'Recommended' },
      { name: 'GraphQL', category: 'Backend', importance: 'Recommended' },
      { name: 'Redis', category: 'Database', importance: 'Recommended' },
      { name: 'AWS', category: 'Cloud', importance: 'Recommended' },
      { name: 'CI/CD Pipelines', category: 'DevOps', importance: 'Recommended' },
      { name: 'Jest / Unit Testing', category: 'Testing', importance: 'Nice-to-Have' },
      { name: 'Tailwind CSS', category: 'Frontend', importance: 'Nice-to-Have' },
      { name: 'Kubernetes', category: 'DevOps', importance: 'Nice-to-Have' },
      { name: 'Microservices', category: 'Architecture', importance: 'Nice-to-Have' }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend React Specialist',
    category: 'Frontend',
    level: 'Senior',
    description: 'High-performance interactive web apps, component architecture, state management & UI/UX.',
    requiredSkills: [
      { name: 'React', category: 'Frontend', importance: 'Critical' },
      { name: 'JavaScript (ES6+)', category: 'Frontend', importance: 'Critical' },
      { name: 'TypeScript', category: 'Frontend', importance: 'Critical' },
      { name: 'HTML5 & Semantic Web', category: 'Frontend', importance: 'Critical' },
      { name: 'CSS3 / Modern CSS', category: 'Frontend', importance: 'Critical' },
      { name: 'State Management (Redux/Zustand)', category: 'Frontend', importance: 'Critical' },
      { name: 'Web Performance Optimization', category: 'Performance', importance: 'Critical' },
      { name: 'Responsive Design', category: 'UI/UX', importance: 'Critical' },
      { name: 'Next.js', category: 'Frontend', importance: 'Recommended' },
      { name: 'Tailwind CSS', category: 'Styling', importance: 'Recommended' },
      { name: 'Testing (Jest/Cypress/Playwright)', category: 'Testing', importance: 'Recommended' },
      { name: 'REST & GraphQL APIs', category: 'Integration', importance: 'Recommended' },
      { name: 'Git & GitHub Workflow', category: 'Tools', importance: 'Recommended' },
      { name: 'Web Accessibility (WCAG)', category: 'Accessibility', importance: 'Nice-to-Have' },
      { name: 'Webpack / Vite', category: 'Build Tools', importance: 'Nice-to-Have' },
      { name: 'Figma to Code', category: 'Design', importance: 'Nice-to-Have' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend & Cloud Engineer',
    category: 'Backend',
    level: 'Senior',
    description: 'Scalable cloud infrastructure, distributed microservices, low latency systems, and data pipelines.',
    requiredSkills: [
      { name: 'Python', category: 'Language', importance: 'Critical' },
      { name: 'Node.js', category: 'Language', importance: 'Critical' },
      { name: 'PostgreSQL', category: 'Database', importance: 'Critical' },
      { name: 'Docker', category: 'DevOps', importance: 'Critical' },
      { name: 'Kubernetes', category: 'DevOps', importance: 'Critical' },
      { name: 'AWS / Cloud Architecture', category: 'Cloud', importance: 'Critical' },
      { name: 'System Design & Scalability', category: 'Architecture', importance: 'Critical' },
      { name: 'Redis / In-memory Caching', category: 'Database', importance: 'Recommended' },
      { name: 'Kafka / RabbitMQ', category: 'Messaging', importance: 'Recommended' },
      { name: 'CI/CD & GitHub Actions', category: 'DevOps', importance: 'Recommended' },
      { name: 'GraphQL & gRPC', category: 'Protocols', importance: 'Recommended' },
      { name: 'Go / Golang', category: 'Language', importance: 'Nice-to-Have' },
      { name: 'Terraform / IaC', category: 'Infrastructure', importance: 'Nice-to-Have' },
      { name: 'Monitoring (Prometheus/Grafana)', category: 'Observability', importance: 'Nice-to-Have' }
    ]
  },
  {
    id: 'aiml',
    name: 'AI & Machine Learning Engineer',
    category: 'AI / Data',
    level: 'Mid to Senior',
    description: 'Deep learning models, LLM fine-tuning, retrieval systems (RAG), and data pipeline engineering.',
    requiredSkills: [
      { name: 'Python', category: 'Language', importance: 'Critical' },
      { name: 'PyTorch', category: 'AI/ML', importance: 'Critical' },
      { name: 'Machine Learning Fundamentals', category: 'AI/ML', importance: 'Critical' },
      { name: 'NumPy & Pandas', category: 'Data', importance: 'Critical' },
      { name: 'Large Language Models (LLMs)', category: 'GenAI', importance: 'Critical' },
      { name: 'RAG & Vector Databases (Pinecone/Chroma)', category: 'GenAI', importance: 'Critical' },
      { name: 'LangChain / LlamaIndex', category: 'GenAI', importance: 'Recommended' },
      { name: 'FastAPI / API Deployment', category: 'Backend', importance: 'Recommended' },
      { name: 'Docker & GPU Optimization', category: 'DevOps', importance: 'Recommended' },
      { name: 'SQL & Data Warehousing', category: 'Data', importance: 'Recommended' },
      { name: 'Hugging Face Transformers', category: 'AI/ML', importance: 'Recommended' },
      { name: 'MLOps & Model Tracking (MLflow/W&B)', category: 'MLOps', importance: 'Nice-to-Have' },
      { name: 'Kubernetes', category: 'DevOps', importance: 'Nice-to-Have' }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps & SRE Specialist',
    category: 'Infrastructure',
    level: 'Senior',
    description: 'Automated CI/CD pipelines, zero-downtime deployments, Kubernetes clusters, and observability.',
    requiredSkills: [
      { name: 'Kubernetes', category: 'DevOps', importance: 'Critical' },
      { name: 'Docker', category: 'DevOps', importance: 'Critical' },
      { name: 'Terraform', category: 'IaC', importance: 'Critical' },
      { name: 'AWS / Cloud Infrastructure', category: 'Cloud', importance: 'Critical' },
      { name: 'CI/CD (GitHub Actions / GitLab CI)', category: 'DevOps', importance: 'Critical' },
      { name: 'Linux Administration & Bash', category: 'OS', importance: 'Critical' },
      { name: 'Prometheus & Grafana', category: 'Observability', importance: 'Recommended' },
      { name: 'Python or Go Scripting', category: 'Language', importance: 'Recommended' },
      { name: 'Ansible', category: 'Automation', importance: 'Recommended' },
      { name: 'Networking, DNS & TLS', category: 'Security', importance: 'Recommended' },
      { name: 'Helm Charts', category: 'DevOps', importance: 'Nice-to-Have' },
      { name: 'Security & Compliance (DevSecOps)', category: 'Security', importance: 'Nice-to-Have' }
    ]
  }
];

export const SAMPLE_RESUMES = [
  {
    id: 'alex-fullstack',
    name: 'Alex Rivera — Senior Full Stack Lead',
    roleId: 'fullstack',
    fileLabel: 'Alex_Rivera_Senior_FullStack_Resume.pdf',
    fileSize: '184 KB',
    pages: 2,
    presetScore: 89,
    verdict: 'Interview Ready (Top 10%)',
    summary: 'Strong full-stack engineer with 6+ years of experience across React, TypeScript, Node.js, and cloud deployments.',
    mockExtractedText: `ALEX RIVERA
Senior Full Stack Software Engineer | San Francisco, CA
alex.rivera@example.com | github.com/alexrivera | linkedin.com/in/alexrivera

SUMMARY
Proven Full Stack Engineer with 6+ years architecting reactive web applications and scalable microservices.
Spearheaded frontend migration to React, Next.js, and TypeScript, improving core web vitals by 42%.
Built resilient Node.js REST APIs and GraphQL backends backed by PostgreSQL and Redis.

TECHNICAL SKILLS
Languages & Frameworks: React, TypeScript, JavaScript (ES6+), Next.js, Node.js, Express, HTML5, CSS3, Tailwind CSS
Databases & Caching: PostgreSQL, MongoDB, Redis, Prisma ORM
Cloud & DevOps: Docker, AWS (ECS, S3, RDS), CI/CD Pipelines, GitHub Actions, Git
Testing: Jest, Cypress, Integration Testing, Unit Testing
Methodologies: Agile, Microservices, REST APIs, GraphQL, System Design

EXPERIENCE
Lead Full Stack Engineer | NovaTech Solutions (2022 - Present)
- Architected enterprise dashboard using React 18, TypeScript, and Tailwind CSS serving 120,000+ monthly active users.
- Designed distributed backend services in Node.js, handling 4,500 RPS with sub-80ms p95 latency.
- Implemented Docker containerization and automated CI/CD pipeline via GitHub Actions.
- Mentored 5 junior engineers and established automated code review workflows with Jest.

Senior Software Engineer | CloudStack Labs (2019 - 2022)
- Replatformed legacy monolithic architecture to Node.js microservices with PostgreSQL and Redis caching.
- Spearheaded GraphQL API gateway replacing 24 scattered REST endpoints, reducing payload sizes by 35%.
- Integrated AWS S3 and CloudFront CDN for global asset distribution.`,
    presentSkills: [
      { name: 'React', category: 'Frontend', confidence: 99 },
      { name: 'TypeScript', category: 'Frontend', confidence: 98 },
      { name: 'Node.js', category: 'Backend', confidence: 96 },
      { name: 'PostgreSQL', category: 'Database', confidence: 94 },
      { name: 'Docker', category: 'DevOps', confidence: 92 },
      { name: 'REST APIs', category: 'Backend', confidence: 95 },
      { name: 'Git', category: 'Tools', confidence: 98 },
      { name: 'Next.js', category: 'Frontend', confidence: 91 },
      { name: 'GraphQL', category: 'Backend', confidence: 88 },
      { name: 'Redis', category: 'Database', confidence: 90 },
      { name: 'AWS', category: 'Cloud', confidence: 87 },
      { name: 'CI/CD Pipelines', category: 'DevOps', confidence: 89 },
      { name: 'Jest / Unit Testing', category: 'Testing', confidence: 86 },
      { name: 'Tailwind CSS', category: 'Frontend', confidence: 92 },
      { name: 'Microservices', category: 'Architecture', confidence: 85 }
    ],
    missingSkills: [
      { name: 'Kubernetes', category: 'DevOps', importance: 'Nice-to-Have', tip: 'Mention orchestrating containers with Kubernetes (K8s) or Helm charts.' }
    ],
    breakdown: {
      keywordMatch: 94,
      technicalDepth: 88,
      readabilityScore: 92,
      impactMetrics: 82
    },
    recommendations: [
      'Add Kubernetes or container orchestration experience to secure top-tier DevOps ATS checkpoints.',
      'Quantify your AWS architectural scope (e.g. Terraform / IaC usage).',
      'Format bullet points with action-verb + tech-stack + quantifiable outcome.'
    ]
  },
  {
    id: 'maya-frontend',
    name: 'Maya Patel — Frontend UI Developer',
    roleId: 'frontend',
    fileLabel: 'Maya_Patel_Frontend_Developer.pdf',
    fileSize: '142 KB',
    pages: 1,
    presetScore: 76,
    verdict: 'Competitive (Needs Minor Tuning)',
    summary: 'Talented React specialist with strong UI/UX design sense and modern styling, but missing performance testing & WCAG credentials.',
    mockExtractedText: `MAYA PATEL
Frontend React Engineer | Austin, TX
maya.patel@example.com | github.com/mayapatel-dev

PROFILE
Enthusiastic Frontend Developer with 3.5 years developing pixel-perfect, accessible user interfaces using React, JavaScript, and Tailwind CSS.
Passionate about modern component libraries and intuitive user experiences.

SKILLS
Frontend: React, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive Design, Redux Toolkit
Tools: Git, GitHub, Vite, Webpack, Figma
APIs: REST APIs, JSON integration

EXPERIENCE
Frontend Developer | PixelCraft Studio (2022 - Present)
- Built interactive client portals using React and Tailwind CSS.
- Converted 30+ Figma design prototypes into reusable React component design systems.
- Handled global application state using Redux Toolkit and React Query.
- Collaborated closely with product designers to ensure seamless responsive UX across mobile and desktop.

Junior Web Developer | Apex Media (2021 - 2022)
- Maintained web applications with HTML5, CSS3, and JavaScript.
- Enhanced site speed by refactoring unoptimized CSS and asset loading.`,
    presentSkills: [
      { name: 'React', category: 'Frontend', confidence: 98 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', confidence: 95 },
      { name: 'HTML5 & Semantic Web', category: 'Frontend', confidence: 94 },
      { name: 'CSS3 / Modern CSS', category: 'Frontend', confidence: 96 },
      { name: 'Responsive Design', category: 'UI/UX', confidence: 92 },
      { name: 'Tailwind CSS', category: 'Styling', confidence: 97 },
      { name: 'State Management (Redux/Zustand)', category: 'Frontend', confidence: 88 },
      { name: 'Webpack / Vite', category: 'Build Tools', confidence: 85 },
      { name: 'Git & GitHub Workflow', category: 'Tools', confidence: 90 },
      { name: 'Figma to Code', category: 'Design', confidence: 91 },
      { name: 'REST & GraphQL APIs', category: 'Integration', confidence: 82 }
    ],
    missingSkills: [
      { name: 'TypeScript', category: 'Frontend', importance: 'Critical', tip: 'TypeScript is now required for 85%+ of modern senior React positions.' },
      { name: 'Web Performance Optimization', category: 'Performance', importance: 'Critical', tip: 'Include explicit metrics: Core Web Vitals, code splitting, memoization, lazy loading.' },
      { name: 'Testing (Jest/Cypress/Playwright)', category: 'Testing', importance: 'Recommended', tip: 'Add unit and end-to-end testing frameworks to demonstrate code reliability.' },
      { name: 'Next.js', category: 'Frontend', importance: 'Recommended', tip: 'Demonstrate SSR/SSG server component experience with Next.js App Router.' },
      { name: 'Web Accessibility (WCAG)', category: 'Accessibility', importance: 'Nice-to-Have', tip: 'Highlight ARIA attributes, keyboard navigation, and WCAG 2.1 compliance.' }
    ],
    breakdown: {
      keywordMatch: 72,
      technicalDepth: 75,
      readabilityScore: 84,
      impactMetrics: 68
    },
    recommendations: [
      'High Priority: Add TypeScript experience — TypeScript is the #1 missing keyword for this profile.',
      'Introduce automated testing credentials (Jest, React Testing Library, or Cypress).',
      'Mention Next.js (SSR / Server Actions) to demonstrate modern frontend architecture maturity.'
    ]
  },
  {
    id: 'liam-junior',
    name: 'Liam Chen — Junior Software Developer',
    roleId: 'fullstack',
    fileLabel: 'Liam_Chen_Junior_Software_Dev.pdf',
    fileSize: '115 KB',
    pages: 1,
    presetScore: 54,
    verdict: 'At Risk (High ATS Dropoff)',
    summary: 'Entry-level developer with foundational JavaScript and HTML/CSS, but missing critical database, cloud, containerization, and automated testing keywords.',
    mockExtractedText: `LIAM CHEN
Software Engineering Graduate | Seattle, WA
liam.chen@example.com | github.com/liamchen

EDUCATION
B.S. in Computer Science — University of Washington (Graduated 2024)

TECHNICAL SKILLS
Languages: Python, JavaScript, HTML, CSS
Frameworks: React (Basic), Node.js (Express beginner)
Tools: Git, VS Code

PROJECTS
Task Manager App
- Built a to-do list application using React and local storage.
- Allowed users to add, edit, and delete daily tasks.

E-Commerce Storefront Prototype
- Created product listing pages with JavaScript and styled with custom CSS.
- Handled simulated shopping cart state.`,
    presentSkills: [
      { name: 'React', category: 'Frontend', confidence: 75 },
      { name: 'Node.js', category: 'Backend', confidence: 70 },
      { name: 'REST APIs', category: 'Backend', confidence: 65 },
      { name: 'Git', category: 'Tools', confidence: 80 }
    ],
    missingSkills: [
      { name: 'TypeScript', category: 'Frontend', importance: 'Critical', tip: 'Critical: Port one project to TypeScript to demonstrate production type safety.' },
      { name: 'PostgreSQL', category: 'Database', importance: 'Critical', tip: 'Critical: Add relational database querying and schema design.' },
      { name: 'Docker', category: 'DevOps', importance: 'Critical', tip: 'Critical: Containerize your projects with Docker and Docker Compose.' },
      { name: 'AWS', category: 'Cloud', importance: 'Recommended', tip: 'Deploy your applications to AWS Free Tier or Vercel with custom domain.' },
      { name: 'CI/CD Pipelines', category: 'DevOps', importance: 'Recommended', tip: 'Add GitHub Actions workflow to run linting and tests automatically.' },
      { name: 'Redis', category: 'Database', importance: 'Recommended', tip: 'Implement caching for API responses using Redis.' },
      { name: 'Next.js', category: 'Frontend', importance: 'Recommended', tip: 'Upgrade React prototypes to full-stack Next.js.' },
      { name: 'Jest / Unit Testing', category: 'Testing', importance: 'Nice-to-Have', tip: 'Add unit tests to prove test-driven development fundamentals.' },
      { name: 'Tailwind CSS', category: 'Frontend', importance: 'Nice-to-Have', tip: 'Adopt modern utility-first CSS styling.' }
    ],
    breakdown: {
      keywordMatch: 44,
      technicalDepth: 48,
      readabilityScore: 78,
      impactMetrics: 42
    },
    recommendations: [
      'Urgent: Add a database (PostgreSQL/MongoDB) and deploy a live project with Docker containerization.',
      'Convert vanilla JavaScript projects to TypeScript to pass automated resume screeners.',
      'Add quantifiable impact metrics to projects rather than listing tasks (e.g., "Reduced response latency by 20%").'
    ]
  }
];

export const ATS_SYSTEMS = [
  { name: 'Workday', marketShare: '36%', filterType: 'Strict Keyword & Header Parsing' },
  { name: 'Greenhouse', marketShare: '24%', filterType: 'Contextual Semantic Matching' },
  { name: 'Lever', marketShare: '18%', filterType: 'Skill Matrix & Title Extraction' },
  { name: 'Taleo / Oracle', marketShare: '14%', filterType: 'Heuristic Rule-Based Scoring' }
];

export const COMMON_SKILLS_DICTIONARY = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'Next.js', 'Vue.js', 'Angular',
  'Python', 'Django', 'FastAPI', 'Flask', 'Java', 'Spring Boot', 'Go', 'Golang', 'Rust', 'C++',
  'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Rails', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB',
  'Redis', 'GraphQL', 'REST APIs', 'gRPC', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
  'Terraform', 'CI/CD Pipelines', 'GitHub Actions', 'Git', 'Linux', 'Jest', 'Cypress',
  'Playwright', 'HTML5 & Semantic Web', 'CSS3 / Modern CSS', 'Tailwind CSS', 'Redux', 'Zustand',
  'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy', 'Machine Learning Fundamentals',
  'Large Language Models (LLMs)', 'RAG & Vector Databases', 'LangChain', 'OpenAI API', 'Microservices',
  'System Design & Scalability', 'Prometheus & Grafana', 'Kafka', 'RabbitMQ', 'Web Performance Optimization',
  'Responsive Design', 'Web Accessibility (WCAG)', 'Figma to Code', 'Webpack / Vite'
];
