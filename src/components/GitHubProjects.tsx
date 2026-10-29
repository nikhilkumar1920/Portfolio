import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  RotateCw, 
  AlertTriangle,
  FolderCode
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { GithubIcon } from './SocialIcons';

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

// Fallback repositories showcasing best GitHub projects with original links
const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 101,
    name: 'lemon.ai',
    description: 'An AI-driven software testing platform designed to autonomously generate, execute, analyze, and repair unit, integration, and E2E tests.',
    html_url: 'https://github.com/nikhilkumar1920/lemon.ai',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-15T00:00:00Z',
    fork: false,
  },
  {
    id: 102,
    name: 'voice-ai-orchestrator',
    description: 'An AI-powered multi-tenant Voice SaaS platform that automates outbound lead qualification calls using Vapi AI, LangGraph, FastAPI, MongoDB Atlas, React, and Docker.',
    html_url: 'https://github.com/nikhilkumar1920/voice-ai-orchestrator',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-10T00:00:00Z',
    fork: false,
  },
  {
    id: 103,
    name: 'Linkplease',
    description: 'Production-ready DM automation service with FastAPI, PostgreSQL, Celery, and Redis with HMAC webhook verification, deduplication, retries, and delivery reconciliation.',
    html_url: 'https://github.com/nikhilkumar1920/Linkplease',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-25T00:00:00Z',
    fork: false,
  },
  {
    id: 104,
    name: 'lenny-growth-assistant',
    description: 'A grounded product and growth workspace built from podcast transcripts using RAG, LLM multi-provider abstraction, and interactive document artifact rendering.',
    html_url: 'https://github.com/nikhilkumar1920/lenny-growth-assistant',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-01T00:00:00Z',
    fork: false,
  },
  {
    id: 105,
    name: 'ZKP-BASED-MEDICAL-TRIAL-ELIGIBILITY-VERIFICATION-BY-BLOCKCHAIN',
    description: 'Privacy-preserving medical trial eligibility verification system using Zero-Knowledge Proofs, digital signatures, and blockchain-based verification.',
    html_url: 'https://github.com/nikhilkumar1920/ZKP-BASED-MEDICAL-TRIAL-ELIGIBILITY-VERIFICATION-BY-BLOCKCHAIN',
    language: 'Noir',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-08-14T00:00:00Z',
    fork: false,
  },
  {
    id: 106,
    name: 'Heart-Disease-Prediction',
    description: 'Heart disease detection and diagnostic risk prediction using various machine learning and classification algorithms.',
    html_url: 'https://github.com/nikhilkumar1920/Heart-Disease-Prediction',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-07-20T00:00:00Z',
    fork: false,
  },
  {
    id: 107,
    name: 'stockprediction-',
    description: 'Interactive stock market trend and equity technical analysis desktop application using Python, financial data APIs, and Matplotlib.',
    html_url: 'https://github.com/nikhilkumar1920/stockprediction-',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-06-20T00:00:00Z',
    fork: false,
  },
  {
    id: 108,
    name: 'wedding-planner',
    description: 'Matrimonial web platform clone with personalized matchmaking tools, advanced partner search filters, and secure real-time messaging.',
    html_url: 'https://github.com/nikhilkumar1920/wedding-planner',
    language: 'PHP',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-05-15T00:00:00Z',
    fork: false,
  },
];

const REPO_DESCRIPTIONS: Record<string, string> = {
  'lemon.ai': 'An agentic AI software testing platform designed to autonomously generate, execute, and repair unit, integration, and E2E tests for TypeScript/JavaScript codebases.',
  'voice-ai-orchestrator': 'An AI-powered multi-tenant Voice SaaS platform that automates outbound lead qualification calls using Vapi AI, LangGraph, FastAPI, MongoDB Atlas, React, and Docker.',
  'Linkplease': 'Production-ready DM automation service with FastAPI, PostgreSQL, Celery, and Redis with webhook signature verification, deduplication, retries, and delivery reconciliation.',
  'lenny-growth-assistant': 'A grounded product and growth workspace built from podcast transcripts using RAG, LLM multi-provider abstraction, and interactive document artifact rendering.',
  'ZKP-BASED-MEDICAL-TRIAL-ELIGIBILITY-VERIFICATION-BY-BLOCKCHAIN': 'Privacy-preserving medical trial eligibility verification system using Zero-Knowledge Proofs, digital signatures, and blockchain-based verification.',
  'Heart-Disease-Prediction': 'Heart disease detection and diagnostic risk prediction using various machine learning and classification algorithms on clinical datasets.',
  'stockprediction-': 'Desktop stock market visualization and price prediction dashboard built with Python, financial time-series APIs, and Matplotlib.',
  'wedding-planner': 'Matrimonial full-stack web application with user profiles, partner search with advanced filters, and secure real-time messaging.',
  'web-security': 'Security testing workbench and vulnerability demonstration scripts exploring common web application threats and defenses.',
  'airline-management': 'C++ airline ticketing, reservation, passenger flight management system with object-oriented software engineering principles.',
  'backend-auth': 'Secure backend authentication system implementing JWT access tokens, refresh tokens, role-based access control, and password hashing.',
};

const IGNORED_REPOS = new Set([
  '111',
  'superman--api',
  'supermanapi',
  'random-api',
  'Games',
  'AP23110010119',
  'AP23110010119_',
  'snippet',
  'nikhilkumar1920',
  'joke-api-',
  'TO-DO-LIST',
  'case-study',
  'amazon-prime-landing-page-',
  'skill-swap',
  'e-com',
  'machine-learning'
]);

const PRIORITY_ORDER = [
  'lemon.ai',
  'voice-ai-orchestrator',
  'Linkplease',
  'lenny-growth-assistant',
  'ZKP-BASED-MEDICAL-TRIAL-ELIGIBILITY-VERIFICATION-BY-BLOCKCHAIN',
  'Heart-Disease-Prediction',
  'stockprediction-',
  'wedding-planner',
  'web-security',
  'airline-management',
  'backend-auth',
  'gen-ai'
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Noir: '#8b5cf6',
  PHP: '#4f5d95',
  'Jupyter Notebook': '#da5b0b',
  Default: '#64748b',
};

export const GitHubProjects = () => {
  const { personal } = PORTFOLIO_DATA;
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [languageFilter, setLanguageFilter] = useState('All');

  const fetchGithubRepos = async () => {
    setLoading(true);
    setIsFallback(false);
    try {
      const response = await fetch(
        `https://api.github.com/users/${personal.socials.githubUsername}/repos?per_page=100`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      );

      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }

      const data: GithubRepo[] = await response.json();
      
      // Filter out forks, ignored placeholder repos, and excluded repos
      const isIgnored = (name: string) => {
        const lower = name.toLowerCase().trim();
        return (
          IGNORED_REPOS.has(name) ||
          IGNORED_REPOS.has(lower) ||
          lower === 'skill-swap' ||
          lower === 'e-com' ||
          lower === 'machine-learning'
        );
      };

      const filtered = data
        .filter((r) => !r.fork && !isIgnored(r.name))
        .map((r) => ({
          ...r,
          description: r.description || REPO_DESCRIPTIONS[r.name] || 'Source code and technical implementation on GitHub.',
        }));

      // Sort so priority best projects appear first
      filtered.sort((a, b) => {
        const indexA = PRIORITY_ORDER.indexOf(a.name);
        const indexB = PRIORITY_ORDER.indexOf(b.name);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      });

      setRepos(filtered.length > 0 ? filtered : FALLBACK_REPOS);
    } catch (err) {
      console.warn('GitHub API rate limited or unreachable. Using fallback portfolio data.', err);
      setRepos(FALLBACK_REPOS);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  const availableLanguages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))];

  const filteredRepos = languageFilter === 'All'
    ? repos
    : repos.filter(r => r.language === languageFilter);

  return (
    <section id="github" className="relative py-24 overflow-hidden bg-slate-950/60 border-t border-slate-900">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <GithubIcon className="h-3 w-3" />
            Live Ecosystem
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            GitHub Repositories
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Real-time feed connected to <span className="font-mono text-cyan-300">@{personal.socials.githubUsername}</span> via GitHub REST API.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Rate-limit or Offline Status Notice (Graceful degradation) */}
        {isFallback && (
          <div className="mx-auto max-w-2xl mb-8 flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-950/20 px-4 py-2.5 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Displaying cached repository index (GitHub API rate limit or offline mode).</span>
            </div>
            <button
              onClick={fetchGithubRepos}
              className="flex items-center gap-1 font-mono text-[11px] underline hover:text-white"
            >
              <RotateCw className="h-3 w-3" /> Retry
            </button>
          </div>
        )}

        {/* Language Filters & Refresh */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`rounded-full px-3.5 py-1 text-xs font-mono transition-all ${
                  languageFilter === lang
                    ? 'bg-violet-600 text-white font-medium shadow-md'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <a
            href={`https://github.com/${personal.socials.githubUsername}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 underline"
          >
            <span>View All on GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Repositories Grid */}
        {loading ? (
          // Loading Skeletons
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="glass-card rounded-2xl p-6 border border-slate-800 animate-pulse">
                <div className="h-5 w-3/4 rounded bg-slate-800 mb-4" />
                <div className="h-3 w-full rounded bg-slate-800/60 mb-2" />
                <div className="h-3 w-4/5 rounded bg-slate-800/60 mb-6" />
                <div className="flex gap-4 pt-4 border-t border-slate-800/80">
                  <div className="h-3 w-16 rounded bg-slate-800" />
                  <div className="h-3 w-12 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <FolderCode className="h-5 w-5 text-violet-400 group-hover:text-cyan-400 transition-colors" />
                    <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-200 transition-colors mb-2 truncate">
                    {repo.name}
                  </h3>

                  <p className="font-sans text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {repo.description || 'Repository source code and technical implementation details.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Default }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                      <Star className="h-3.5 w-3.5 text-slate-500" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <GitFork className="h-3.5 w-3.5 text-slate-500" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
