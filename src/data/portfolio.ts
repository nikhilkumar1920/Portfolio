export interface PersonalInfo {
  name: string;
  monogram: string;
  titles: string[];
  education: {
    degree: string;
    institution: string;
    period: string;
    cgpa: string;
  };
  location: string;
  availability: string;
  availabilityStatus: 'available' | 'busy' | 'selective';
  socials: {
    github: string;
    githubUsername: string;
    leetcode: string;
    linkedin: string;
    email: string;
    phone: string;
  };
  profileImage: string;
  resumePath: string;
  calendlyUrl: string;
  googleMeetUrl?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
  accentColor: string;
  group?: string;
  badge?: string;
  description?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  verified: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  highlights: string[];
  keyContribution?: string;
  metrics?: ProjectMetric[];
  evaluationNote?: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  hasVisualComparison?: boolean;
  image?: string;
}

export interface LeetCodeStatsData {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  acceptanceRate?: string;
  ranking?: string | number;
  lastUpdated: string;
  profileUrl: string;
}

export interface Publication {
  title: string;
  venue: string;
  status: string;
  description: string;
  researchSummary: string;
  relatedProjectId: string;
  paperUrl?: string;
  researchInterests: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  badgeText: string;
  iconType: 'trophy' | 'award' | 'star';
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
  description: string;
}

export const PORTFOLIO_DATA: {
  personal: PersonalInfo;
  hero: {
    headlinePrefix: string;
    headlineHighlight: string;
    headlineSuffix: string;
    bio: string;
    subBio: string;
    tickerItems: string[];
    currentlyExploring: string[];
  };
  about: {
    headline: string;
    paragraphs: string[];
    pillars: Array<{
      num: string;
      title: string;
      subtitle: string;
      description: string;
      icon: string;
    }>;
  };
  skills: SkillCategory[];
  projects: Project[];
  leetcode: LeetCodeStatsData;
  publication: Publication;
  experience: ExperienceItem[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
} = {
  personal: {
    name: "Nikhil Kumar",
    monogram: "NK.",
    titles: [
      "Software Developer",
      "AI/ML Researcher",
      "Cybersecurity Enthusiast",
      "Agentic AI Developer",
      "Software Testing & Automation Enthusiast"
    ],
    education: {
      degree: "B.Tech in Cybersecurity and Computer Science",
      institution: "SRM University–AP",
      period: "2023–2027",
      cgpa: "8.00"
    },
    location: "Vijayawada, Andhra Pradesh, India",
    availability: "Available for Summer 2025/2026 Internships & Research",
    availabilityStatus: "available",
    socials: {
      github: "https://github.com/nikhilkumar1920",
      githubUsername: "nikhilkumar1920",
      leetcode: "https://leetcode.com/u/nikhilkumar1920/",
      linkedin: "https://www.linkedin.com/in/nikhil-kumar-670839291/",
      email: "nikhilkumar20aug@gmail.com",
      phone: "+91 9334352316"
    },
    profileImage: "/images/profile.png",
    resumePath: "/resume.pdf",
    calendlyUrl: import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/nikhilkumar20aug/introductory-meeting",
    googleMeetUrl: import.meta.env.VITE_GOOGLE_MEET_URL || "https://meet.google.com/new"
  },

  hero: {
    headlinePrefix: "Building",
    headlineHighlight: "Intelligent Systems.",
    headlineSuffix: "Engineering What's Next.",
    bio: "I'm Nikhil Kumar, a developer exploring the intersection of software engineering, artificial intelligence, cybersecurity, and intelligent automation.",
    subBio: "From agentic AI platforms to medical image segmentation and privacy-preserving blockchain systems, I enjoy building technology that solves meaningful problems.",
    tickerItems: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PyTorch",
      "Docker",
      "AI Agents",
      "Cybersecurity",
      "Vitest",
      "Zero-Knowledge Proofs"
    ],
    currentlyExploring: [
      "Agentic AI",
      "Machine Learning",
      "Software Engineering"
    ]
  },

  about: {
    headline: "A little about me.",
    paragraphs: [
      "I'm Nikhil Kumar, a Computer Science and Cybersecurity undergraduate at SRM University–AP (2023–2027), passionate about building intelligent, secure, and scalable software systems.",
      "My work spans software engineering, Agentic AI, automated software testing, cybersecurity, and deep learning. I enjoy turning complex ideas into practical solutions—from autonomous AI testing platforms and privacy-preserving blockchain applications to transformer-based medical image segmentation.",
      "I combine research-driven problem-solving with hands-on engineering to build systems that are reliable, efficient, and impactful. I'm continuously exploring new technologies, strengthening my engineering skills, and building projects that solve real-world problems."
    ],
    pillars: [
      {
        num: "01",
        title: "Build",
        subtitle: "Software & Intelligent Systems",
        description: "Developing robust software products, full-stack applications, and agentic workflows designed for performance and reliability.",
        icon: "Code"
      },
      {
        num: "02",
        title: "Research",
        subtitle: "AI, Vision & Transformers",
        description: "Exploring machine learning, medical image segmentation, domain adaptation of foundation models, and emerging AI architectures.",
        icon: "Cpu"
      },
      {
        num: "03",
        title: "Secure",
        subtitle: "Cybersecurity & Privacy",
        description: "Applying zero-knowledge proofs, cryptography, and secure development practices to safeguard sensitive data in distributed environments.",
        icon: "Shield"
      }
    ]
  },

  skills: [
    {
      title: "Programming Languages",
      iconName: "Terminal",
      accentColor: "from-emerald-500 to-teal-500",
      group: "Languages",
      badge: "Core Stack",
      description: "Systems programming, backend scripting, typed application engineering, and query design.",
      skills: [
        "Python",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "TypeScript",
        "SQL",
        "Bash"
      ]
    },
    {
      title: "AI and Machine Learning",
      iconName: "BrainCircuit",
      accentColor: "from-purple-500 to-pink-500",
      group: "AI & Research",
      badge: "Core Discipline",
      description: "Deep learning models, vision architectures, agentic orchestration, and LLM reasoning pipelines.",
      skills: [
        "Machine Learning",
        "Deep Learning",
        "PyTorch",
        "TensorFlow",
        "Computer Vision",
        "Vision Transformers",
        "Generative AI",
        "Large Language Models (LLMs)",
        "Retrieval-Augmented Generation (RAG)",
        "Agentic AI",
        "Multi-Agent Systems",
        "Prompt Engineering",
        "LangGraph"
      ]
    },
    {
      title: "Backend Development",
      iconName: "Server",
      accentColor: "from-cyan-500 to-blue-500",
      group: "Engineering",
      badge: "APIs & Services",
      description: "Asynchronous services, robust REST APIs, token authentication, and microservice architectures.",
      skills: [
        "Python",
        "FastAPI",
        "Flask",
        "Node.js",
        "Express.js",
        "REST APIs",
        "JSON",
        "JWT Authentication",
        "Asynchronous Programming"
      ]
    },
    {
      title: "Frontend Development",
      iconName: "Layout",
      accentColor: "from-violet-500 to-indigo-500",
      group: "Engineering",
      badge: "Client Architecture",
      description: "Component-based user interfaces, modern responsive designs, and reactive state management.",
      skills: [
        "HTML5",
        "CSS3",
        "React.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Responsive Web Design",
        "Component-Based Architecture"
      ]
    },
    {
      title: "Software Testing and Quality Engineering",
      iconName: "TestTube2",
      accentColor: "from-amber-500 to-orange-500",
      group: "Testing & QA",
      badge: "Autonomous QA",
      description: "Automated test harnesses, regression prevention, synthetic test generation, and CI test suites.",
      skills: [
        "Functional Testing",
        "Regression Testing",
        "Integration Testing",
        "End-to-End Testing",
        "Test Case Design",
        "Bug Reporting",
        "Test Automation",
        "Vitest",
        "API Testing",
        "AI-Assisted Test Generation",
        "Automated Test Repair",
        "GitHub Actions"
      ]
    },
    {
      title: "Cybersecurity and Blockchain",
      iconName: "Shield",
      accentColor: "from-rose-500 to-red-500",
      group: "Security & Systems",
      badge: "Cryptographic Privacy",
      description: "Privacy-preserving zero-knowledge circuits, cryptographic protocols, smart contracts, and network defense.",
      skills: [
        "Cybersecurity Fundamentals",
        "Network Security",
        "Application Security",
        "Cryptography",
        "Digital Signatures",
        "Zero-Knowledge Proofs",
        "Blockchain",
        "Smart Contracts",
        "Privacy-Preserving Systems",
        "Security Testing"
      ]
    },
    {
      title: "Medical AI and Research",
      iconName: "Activity",
      accentColor: "from-teal-500 to-cyan-500",
      group: "AI & Research",
      badge: "Academic Research",
      description: "Clinical MRI segmentation, parameter-efficient foundation adapters, and statistical evaluation.",
      skills: [
        "Medical Image Segmentation",
        "U-Net",
        "U-Net++",
        "Segment Anything Model (SAM)",
        "Image Processing",
        "Model Fine-Tuning",
        "Data Augmentation",
        "Dice Score",
        "Intersection over Union (IoU)",
        "Model Evaluation"
      ]
    },
    {
      title: "Databases",
      iconName: "Database",
      accentColor: "from-blue-500 to-indigo-500",
      group: "Data & Systems",
      badge: "Data Modeling",
      description: "Relational and document persistence, schema design, transactional integrity, and CRUD optimization.",
      skills: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "SQL",
        "Database Design",
        "Database Management Systems (DBMS)",
        "CRUD Operations",
        "Data Modeling"
      ]
    },
    {
      title: "Computer Science Fundamentals",
      iconName: "Boxes",
      accentColor: "from-indigo-500 to-violet-500",
      group: "CS Core",
      badge: "Foundational Theory",
      description: "Core algorithms, data structures, operating systems, networks, and computer architecture.",
      skills: [
        "Data Structures and Algorithms (DSA)",
        "Object-Oriented Programming (OOP)",
        "Operating Systems",
        "Computer Networks",
        "Database Management Systems",
        "Computer Architecture",
        "Algorithms and Complexity Analysis",
        "Software Engineering",
        "Problem-Solving"
      ]
    },
    {
      title: "DevOps and Deployment",
      iconName: "GitBranch",
      accentColor: "from-sky-500 to-blue-600",
      group: "DevOps & Tools",
      badge: "Deployment & CI/CD",
      description: "Containerization, automated workflow pipelines, Linux environments, and reliable deployment.",
      skills: [
        "Git",
        "GitHub",
        "Docker",
        "CI/CD",
        "GitHub Actions",
        "Linux",
        "PowerShell",
        "Environment Configuration",
        "Application Deployment"
      ]
    },
    {
      title: "Developer Tools",
      iconName: "Wrench",
      accentColor: "from-slate-400 to-zinc-400",
      group: "DevOps & Tools",
      badge: "Productivity & Tooling",
      description: "Engineering IDEs, API debugging consoles, cloud accelerators, and browser developer diagnostics.",
      skills: [
        "Visual Studio Code",
        "Postman",
        "Jupyter Notebook",
        "Google Colab",
        "Git",
        "GitHub",
        "Browser Developer Tools"
      ]
    }
  ],

  projects: [
    {
      id: "lemonx",
      title: "LemonX — Agentic AI Testing Platform",
      category: "Agentic AI · Developer Tools · Test Automation",
      shortDescription: "An AI-driven software testing platform designed to autonomously generate, execute, analyze, and repair unit, integration, and end-to-end tests using a multi-agent architecture.",
      fullDescription: "LemonX orchestrates intelligent agents across every phase of software quality assurance. Instead of manually writing brittle tests, developers leverage autonomous agents to inspect codebases, generate contextual unit and integration tests with Vitest, execute suites in isolated environments, analyze stack traces, and synthesize bug-fixing pull requests.",
      technologies: ["TypeScript", "Vitest", "GitHub Actions", "Cloudflare Workers AI", "REST APIs"],
      keyContribution: "Architected multi-agent orchestration for autonomous test synthesis, deterministic failure root-cause analysis, and automated code repair loops.",
      highlights: [
        "Autonomous test generation and execution across unit, integration, and e2e suites",
        "Intelligent failure analysis with root-cause identification and stack trace mapping",
        "Iterative code repair pipeline synthesizing regression-safe patches",
        "Seamless workflow automation integrated directly with GitHub Actions CI/CD"
      ],
      githubUrl: "https://github.com/nikhilkumar1920/lemon.ai",
      featured: true,
      image: "/images/projects/lemonx-preview.svg"
    },
    {
      id: "voice-ai-orchestrator",
      title: "Multi-Tenant Agentic Voice Orchestrator",
      category: "Agentic AI · Voice SaaS · Full-Stack",
      shortDescription: "An AI-powered multi-tenant Voice SaaS platform that automates outbound lead qualification calls using Vapi AI, LangGraph, FastAPI, MongoDB Atlas, React, and Docker.",
      fullDescription: "Architected a multi-tenant voice automation platform that coordinates outbound AI voice qualification calls. Features dynamic webhook event processing, LangGraph-driven conversational state tracking and transcript evaluation, multi-tenant workspace isolation, and automated database updates.",
      technologies: ["Python", "FastAPI", "LangGraph", "Vapi AI", "MongoDB Atlas", "React", "Docker"],
      keyContribution: "Engineered LangGraph agent workflows for stateful call evaluation, transcript synthesis, and multi-tenant webhook reconciliation.",
      highlights: [
        "Multi-tenant voice SaaS architecture with customer status tracking and role-based data isolation",
        "LangGraph state machine for dynamic call evaluation and conversational reasoning",
        "Automated Vapi AI webhook pipelines with idempotency and retry handling",
        "Live deployment with interactive frontend and Swagger API documentation"
      ],
      githubUrl: "https://github.com/nikhilkumar1920/voice-ai-orchestrator",
      liveUrl: "https://voice-ai-orchestrator-5.onrender.com/",
      featured: true,
      image: "/images/projects/lemonx-preview.svg"
    },
    {
      id: "sam-brain-tumor",
      title: "Brain Tumor Segmentation Using Fine-Tuned SAM",
      category: "AI Research · Medical Imaging · Computer Vision",
      shortDescription: "Fine-tuned the Segment Anything Model (SAM-ViT-B) for brain tumor segmentation in MRI images using medical image preprocessing and domain adaptation techniques.",
      fullDescription: "Applied domain-aware adaptation techniques to Meta's Segment Anything Model (ViT-B) for automated Glioma segmentation in multi-modal brain MRIs. Introduced specialized prompt-free medical adapters and preprocessing pipelines to overcome domain divergence between natural photographs and clinical radiology scans.",
      technologies: ["Python", "PyTorch", "SAM-ViT-B", "Computer Vision"],
      keyContribution: "Designed domain-aware prompt-free adapter tuning on SAM-ViT-B, achieving state-of-the-art boundary delineation on challenging multi-contrast MRI sequences.",
      metrics: [
        { label: "Dice Score", value: "0.9864", verified: true },
        { label: "IoU (Jaccard)", value: "0.9733", verified: true },
        { label: "Pixel Accuracy", value: "99.93%", verified: true }
      ],
      evaluationNote: "Experimental results measured on research MRI test split. Conducted as academic research; not intended as a clinical guarantee.",
      highlights: [
        "Fine-tuned SAM-ViT-B foundation model with parameter-efficient adapters",
        "Contrast normalization and skull-stripping medical image preprocessing pipeline",
        "Achieved 0.9864 Dice Score, outperforming standard segmentation baselines",
        "Published research at Springer CVR 2026"
      ],
      githubUrl: "https://github.com/nikhilkumar1920",
      featured: true,
      hasVisualComparison: true,
      image: "/images/projects/sam-preview.svg"
    },
    {
      id: "zkp-medical-trial",
      title: "Zero-Knowledge-Proof-Based Medical Trial Eligibility Verification",
      category: "Cybersecurity · Blockchain · Privacy Engineering",
      shortDescription: "A privacy-preserving medical trial eligibility verification system using Zero-Knowledge Proofs, digital signatures, and blockchain-based verification.",
      fullDescription: "Engineered an end-to-end cryptographic system allowing patients to prove eligibility criteria (such as biomarker criteria, age thresholds, or negative diagnostic markers) to clinical trial coordinators without revealing their underlying confidential health records or identity.",
      technologies: ["Noir", "Zero-Knowledge Proofs", "Ethereum Smart Contracts", "RSA Digital Signatures"],
      keyContribution: "Constructed zk-SNARK circuits in Noir DSL coupled with smart contracts for verifiable, tamper-proof, and privacy-preserving clinical trial screening.",
      highlights: [
        "Cryptographic credential validation utilizing RSA digital signatures",
        "Privacy-preserving zk-SNARK proof generation using the Noir domain-specific language",
        "On-chain proof verification executed via EVM smart contracts",
        "Guaranteed mathematical confidentiality of sensitive medical and personal data"
      ],
      githubUrl: "https://github.com/nikhilkumar1920/ZKP-BASED-MEDICAL-TRIAL-ELIGIBILITY-VERIFICATION-BY-BLOCKCHAIN",
      featured: true,
      image: "/images/projects/zkp-preview.svg"
    },
    {
      id: "linkplease",
      title: "LinkPlease — Distributed DM Automation Service",
      category: "Backend Systems · Microservices · Celery & Redis",
      shortDescription: "A production-grade distributed backend service for automated social messaging workflows with HMAC-SHA256 webhook verification, Redis deduplication, and Celery retries.",
      fullDescription: "Designed an asynchronous event-driven microservice to trigger automated direct messages based on social interaction keywords. Built with FastAPI, PostgreSQL, Celery, and Redis to handle high-throughput webhook streams with strict deduplication, signature security, and delivery reconciliation.",
      technologies: ["Python", "FastAPI", "PostgreSQL", "Celery", "Redis", "Docker"],
      keyContribution: "Built high-throughput webhook ingestion pipeline with HMAC signature validation, Redis atomic deduplication locks, and asynchronous Celery workers.",
      highlights: [
        "HMAC-SHA256 signature verification preventing tampering and unauthorized payloads",
        "Redis-backed distributed deduplication ensuring exactly-once processing guarantees",
        "Asynchronous Celery task execution with exponential backoff and retry budgets",
        "Comprehensive delivery reconciliation and PostgreSQL audit logs"
      ],
      githubUrl: "https://github.com/nikhilkumar1920/Linkplease",
      featured: false,
      image: "/images/projects/stock-preview.svg"
    },
    {
      id: "lenny-growth-assistant",
      title: "The Lenny Growth Assistant — RAG Workspace",
      category: "Generative AI · RAG · Full-Stack",
      shortDescription: "A grounded product and growth workspace built on podcast transcripts using RAG, LLM multi-provider abstraction, and interactive document artifact rendering.",
      fullDescription: "Constructed a grounded conversational and analytical workspace powered by retrieval-augmented generation across podcast transcript knowledge bases. Features modular model provider abstractions across Ollama, OpenAI, and Anthropic with persistent vector search in ChromaDB and interactive artifact generation.",
      technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "ChromaDB", "RAG"],
      keyContribution: "Implemented hybrid retrieval combining dense vector embeddings with deterministic fallback retrieval, coupled with streaming artifact rendering.",
      highlights: [
        "Hybrid RAG retrieval pipeline querying dense ChromaDB embeddings with lexical fallback",
        "Provider abstraction layer supporting local Ollama models alongside OpenAI and Anthropic",
        "Interactive document synthesizer rendering structured Markdown and HTML deliverables",
        "Full-stack reactive interface built with React, TypeScript, and Vite"
      ],
      githubUrl: "https://github.com/nikhilkumar1920/lenny-growth-assistant",
      featured: false,
      image: "/images/projects/zkp-preview.svg"
    },
    {
      id: "stock-market-visualizer",
      title: "Stock Market Visualizer",
      category: "Python · Data Visualization · Finance",
      shortDescription: "A desktop application for visualizing stock market data using Python, Tkinter, yfinance, pandas, and Matplotlib.",
      fullDescription: "Built an interactive financial desktop visualization dashboard. Allows users to query tickers, retrieve real-time and historical price histories, plot technical indicators, and analyze market trends.",
      technologies: ["Python", "Tkinter", "yfinance", "pandas", "Matplotlib"],
      keyContribution: "Built multi-threaded market data pipelines with dynamic candlestick rendering and technical indicator calculations.",
      highlights: [
        "Real-time historical equity and index data fetching via yfinance",
        "Interactive candlestick and technical indicator charts (SMA, EMA, RSI)",
        "Local data caching and CSV export functionality"
      ],
      githubUrl: "https://github.com/nikhilkumar1920/stockprediction-",
      featured: false,
      image: "/images/projects/stock-preview.svg"
    },
    {
      id: "heart-disease-prediction",
      title: "Heart Disease Prediction",
      category: "Machine Learning · Healthcare",
      shortDescription: "A machine learning project exploring heart disease prediction using the UCI dataset.",
      fullDescription: "Developed and evaluated predictive machine learning models to identify cardiovascular disease risk based on clinical patient indicators such as blood pressure, cholesterol, and electrocardiogram findings.",
      technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Seaborn"],
      keyContribution: "Performed statistical feature engineering and comparative model evaluation across ensemble and kernel classifiers.",
      highlights: [
        "Exploratory data analysis and missing value imputation on UCI clinical features",
        "Comparative benchmark of Random Forest, Support Vector Machines, and Logistic Regression",
        "Evaluation using ROC-AUC, sensitivity, and confusion matrix analysis"
      ],
      githubUrl: "https://github.com/nikhilkumar1920/Heart-Disease-Prediction",
      featured: false,
      image: "/images/projects/heart-preview.svg"
    }
  ],

  leetcode: {
    totalSolved: 194,
    easy: 68,
    medium: 101,
    hard: 25,
    acceptanceRate: "85.8%",
    ranking: "906,486",
    lastUpdated: "Real-time Live",
    profileUrl: "https://leetcode.com/u/nikhilkumar1920/"
  },

  publication: {
    title: "Domain-Aware Adaptation of the Segment Anything Model for Robust Brain Tumor Segmentation in MRI",
    venue: "Springer CVR 2026 — 6th International Conference on Computer Vision & Robotics",
    status: "Accepted & Forthcoming",
    description: "Research exploring domain-aware adaptation of the Segment Anything Model for brain tumor segmentation in MRI images.",
    researchSummary: "Foundation models such as Meta's SAM are pre-trained on massive datasets of natural RGB images, often struggling when deployed directly to high-noise, volumetric, multi-modal clinical radiology scans. This paper introduces a parameter-efficient adapter framework that recalibrates spatial and feature representations specifically for Glioma boundaries without catastrophic forgetting.",
    relatedProjectId: "sam-brain-tumor",
    paperUrl: "", // Configurable: when paper is published, paste Springer DOI URL here
    researchInterests: [
      "Medical Imaging & Segmentation",
      "Computer Vision",
      "Transformer Architectures",
      "Foundation Models & Adaptation",
      "Agentic Multi-Agent Systems"
    ]
  },

  experience: [
    {
      role: "Research Intern",
      organization: "SRM University–AP",
      period: "June 2025 – August 2025",
      location: "Andhra Pradesh, India",
      type: "On-site / Research",
      description: "Developed a MATLAB-based simulation framework to study wireless channel effects on MIDI music transmission.",
      highlights: [
        "Modeled Additive White Gaussian Noise (AWGN) channel degradation on digital musical event streams",
        "Quantified macro jitter and micro jitter impacts on timing-critical packet arrival distributions",
        "Analyzed transmission behavior using time-domain waveform visualization and statistical error distribution modeling"
      ],
      skills: ["MATLAB", "Signal Processing", "Channel Modeling", "Data Analysis"]
    },
    {
      role: "Web Development Intern",
      organization: "Edunet Foundation – Microsoft Foundation",
      period: "2024",
      location: "Remote",
      type: "Internship",
      description: "Developed a responsive web application using HTML, CSS, and JavaScript to showcase technical projects and professional achievements.",
      highlights: [
        "Constructed clean mobile-first responsive layouts ensuring fluid rendering across viewports",
        "Engineered modular, reusable UI components adhering to modern frontend best practices",
        "Optimized web asset performance and improved cross-browser compatibility"
      ],
      skills: ["HTML5", "CSS3", "JavaScript", "UI/UX", "Responsive Design"]
    }
  ],

  achievements: [
    {
      title: "Amazon ML Summer School 2026",
      organization: "Amazon India",
      year: "2026",
      description: "Selected among the top 3,000 students nationwide for advanced, intensive training in Machine Learning, Deep Learning, and generative models conducted directly by Amazon scientists.",
      badgeText: "Top 3,000 Nationwide",
      iconType: "star"
    },
    {
      title: "NULLPOINT CTF — 3rd Runner-Up",
      organization: "NULLPOINT Cybersecurity Community",
      year: "2024",
      description: "Secured 3rd Runner-Up position in NULLPOINT Capture The Flag competition, demonstrating practical skills in cybersecurity, binary reverse engineering, network forensics, and applied cryptography.",
      badgeText: "3rd Runner-Up",
      iconType: "trophy"
    }
  ],

  certifications: [
    {
      title: "Oracle Java Certification",
      issuer: "Oracle",
      description: "Validation of core Java programming, object-oriented software engineering principles, memory management, and data structures."
    },
    {
      title: "PHP Training",
      issuer: "Unstop",
      description: "Comprehensive training in server-side scripting, relational database queries, and backend development workflows."
    },
    {
      title: "Web Development Training",
      issuer: "Edunet Foundation",
      description: "Hands-on foundation in modern web technologies, responsive layouts, DOM manipulation, and interactive interfaces."
    }
  ]
};
