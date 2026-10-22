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
      "I am an undergraduate in Cybersecurity and Computer Science at SRM University–AP (2023–2027) with a CGPA of 8.00. My technical focus spans across software engineering, artificial intelligence, cybersecurity, and automated quality engineering.",
      "Rather than treating engineering and research as separate silos, I enjoy building practical systems that unite rigorous machine learning research with scalable, dependable software engineering. Whether designing autonomous agentic testing workflows, adapting vision foundation models for clinical MRI segmentation, or engineering zero-knowledge verification protocols, I build with precision and purpose."
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
      title: "Frontend",
      iconName: "Layout",
      accentColor: "from-violet-500 to-indigo-500",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React.js",
        "Tailwind CSS",
        "Responsive Web Design"
      ]
    },
    {
      title: "Backend",
      iconName: "Server",
      accentColor: "from-cyan-500 to-blue-500",
      skills: [
        "Node.js",
        "Express.js",
        "FastAPI",
        "REST APIs",
        "JSON",
        "JWT Authentication"
      ]
    },
    {
      title: "Programming",
      iconName: "Terminal",
      accentColor: "from-emerald-500 to-teal-500",
      skills: [
        "Python",
        "Java",
        "C++",
        "SQL",
        "Bash"
      ]
    },
    {
      title: "AI & Machine Learning",
      iconName: "BrainCircuit",
      accentColor: "from-purple-500 to-pink-500",
      skills: [
        "PyTorch",
        "TensorFlow",
        "Computer Vision",
        "Deep Learning",
        "Medical Image Segmentation",
        "Agentic AI"
      ]
    },
    {
      title: "Testing & Automation",
      iconName: "CheckCircle2",
      accentColor: "from-amber-500 to-orange-500",
      skills: [
        "Functional Testing",
        "Regression Testing",
        "Integration Testing",
        "End-to-End Testing",
        "Test Case Design",
        "Defect Reporting",
        "Vitest",
        "GitHub Actions",
        "CI/CD",
        "Docker"
      ]
    },
    {
      title: "Databases",
      iconName: "Database",
      accentColor: "from-blue-500 to-indigo-500",
      skills: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Firebase"
      ]
    },
    {
      title: "Cybersecurity & Core CS",
      iconName: "ShieldAlert",
      accentColor: "from-rose-500 to-red-500",
      skills: [
        "Cybersecurity",
        "Blockchain",
        "Zero-Knowledge Proofs",
        "Data Structures & Algorithms",
        "OOPs",
        "DBMS",
        "Operating Systems",
        "Computer Networks"
      ]
    },
    {
      title: "Developer Tools",
      iconName: "Wrench",
      accentColor: "from-slate-400 to-zinc-400",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "Linux"
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
      githubUrl: "https://github.com/nikhilkumar1920/LemonX",
      featured: true,
      image: "/images/projects/lemonx-preview.svg"
    },
    {
      id: "sam-brain-tumor",
      title: "Brain Tumor Segmentation Using Fine-Tuned SAM",
      category: "AI Research · Medical Imaging · Computer Vision",
      shortDescription: "Fine-tuned the Segment Anything Model (SAM-ViT-B) for brain tumor segmentation in MRI images using medical image preprocessing and domain adaptation techniques.",
      fullDescription: "Applied domain-aware adaptation techniques to Meta's Segment Anything Model (ViT-B) for automated Glioma segmentation in multi-modal brain MRIs. Introduced specialized prompt-free medical adapters and preprocessing pipelines to overcome domain divergence between natural photographs and clinical radiology scans.",
      technologies: ["Python", "PyTorch", "SAM-ViT-B", "U-Net++", "Computer Vision"],
      keyContribution: "Designed domain-aware prompt-free adapter tuning on SAM-ViT-B, achieving state-of-the-art boundary delineation on challenging multi-contrast MRI sequences.",
      metrics: [
        { label: "Dice Score", value: "0.9864", verified: true },
        { label: "IoU (Jaccard)", value: "0.9733", verified: true },
        { label: "Pixel Accuracy", value: "99.93%", verified: true }
      ],
      evaluationNote: "Experimental results measured on research MRI test split. Conducted as academic research comparing against baseline U-Net++; not intended as a clinical guarantee.",
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
      githubUrl: "https://github.com/nikhilkumar1920",
      featured: true,
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
      githubUrl: "https://github.com/nikhilkumar1920",
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
      githubUrl: "https://github.com/nikhilkumar1920",
      featured: false,
      image: "/images/projects/heart-preview.svg"
    },
    {
      id: "unet-brain-tumor",
      title: "Brain Tumor Segmentation — U-Net++",
      category: "Deep Learning · Medical Image Segmentation",
      shortDescription: "An encoder-decoder segmentation baseline developed to compare tumor segmentation performance against a fine-tuned Segment Anything Model.",
      fullDescription: "Implemented a U-Net++ architecture featuring nested dense convolutional skip pathways and deep supervision as an empirical baseline to rigorously evaluate the performance of vision foundation models on MRI brain tumor datasets.",
      technologies: ["Python", "PyTorch", "U-Net++", "OpenCV"],
      keyContribution: "Implemented deeply supervised nested skip networks providing a baseline benchmark for medical image segmentation.",
      metrics: [
        { label: "Dice Score", value: "0.8395", verified: true },
        { label: "IoU (Jaccard)", value: "0.7466", verified: true }
      ],
      evaluationNote: "Experimental baseline results measured during the comparative research study.",
      highlights: [
        "Nested dense skip pathways to bridge the semantic gap between encoder and decoder sub-networks",
        "Deep supervision loss calculation for accelerated convergence across intermediate scales",
        "Empirical benchmark confirming SAM-ViT-B adapter superiority (+0.1469 Dice improvement)"
      ],
      githubUrl: "https://github.com/nikhilkumar1920",
      featured: false,
      image: "/images/projects/sam-preview.svg"
    }
  ],

  leetcode: {
    totalSolved: 215,
    easy: 95,
    medium: 105,
    hard: 15,
    acceptanceRate: "66.2%",
    lastUpdated: "October 2026",
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
