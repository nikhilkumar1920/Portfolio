import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Terminal, 
  BrainCircuit, 
  Server, 
  Layout, 
  TestTube2, 
  Shield, 
  Activity, 
  Database, 
  Boxes, 
  GitBranch, 
  Wrench, 
  Layers, 
  Search, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="h-5 w-5 text-emerald-400" />,
  BrainCircuit: <BrainCircuit className="h-5 w-5 text-purple-400" />,
  Server: <Server className="h-5 w-5 text-cyan-400" />,
  Layout: <Layout className="h-5 w-5 text-violet-400" />,
  TestTube2: <TestTube2 className="h-5 w-5 text-amber-400" />,
  Shield: <Shield className="h-5 w-5 text-rose-400" />,
  Activity: <Activity className="h-5 w-5 text-teal-400" />,
  Database: <Database className="h-5 w-5 text-blue-400" />,
  Boxes: <Boxes className="h-5 w-5 text-indigo-400" />,
  GitBranch: <GitBranch className="h-5 w-5 text-sky-400" />,
  Wrench: <Wrench className="h-5 w-5 text-slate-300" />,
};

const ACCENT_GLOW_MAP: Record<string, string> = {
  Terminal: 'rgba(16, 185, 129, 0.15)',
  BrainCircuit: 'rgba(168, 85, 247, 0.15)',
  Server: 'rgba(6, 182, 212, 0.15)',
  Layout: 'rgba(139, 92, 246, 0.15)',
  TestTube2: 'rgba(245, 158, 11, 0.15)',
  Shield: 'rgba(244, 63, 94, 0.15)',
  Activity: 'rgba(20, 184, 166, 0.15)',
  Database: 'rgba(59, 130, 246, 0.15)',
  Boxes: 'rgba(99, 102, 241, 0.15)',
  GitBranch: 'rgba(14, 165, 233, 0.15)',
  Wrench: 'rgba(148, 163, 184, 0.15)',
};

const FILTER_TABS = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'primary', label: 'Core Strengths' },
  { id: 'ai', label: 'AI & Research' },
  { id: 'engineering', label: 'Software & QA' },
  { id: 'systems', label: 'Security & Systems' },
  { id: 'devops', label: 'Data & DevOps' },
];

export const Skills = () => {
  const { skills } = PORTFOLIO_DATA;
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Group mappings
  const filteredCategories = useMemo(() => {
    let result = skills;

    // Filter by tab
    if (activeTab === 'primary') {
      const primaryTitles = [
        'Programming Languages',
        'AI and Machine Learning',
        'Backend Development',
        'Frontend Development',
        'Software Testing and Quality Engineering',
        'Cybersecurity and Blockchain'
      ];
      result = result.filter(c => primaryTitles.includes(c.title));
    } else if (activeTab === 'ai') {
      result = result.filter(c => c.title === 'AI and Machine Learning' || c.title === 'Medical AI and Research');
    } else if (activeTab === 'engineering') {
      result = result.filter(c => 
        c.title === 'Backend Development' || 
        c.title === 'Frontend Development' || 
        c.title === 'Software Testing and Quality Engineering' ||
        c.title === 'Programming Languages'
      );
    } else if (activeTab === 'systems') {
      result = result.filter(c => 
        c.title === 'Cybersecurity and Blockchain' || 
        c.title === 'Computer Science Fundamentals'
      );
    } else if (activeTab === 'devops') {
      result = result.filter(c => 
        c.title === 'Databases' || 
        c.title === 'DevOps and Deployment' || 
        c.title === 'Developer Tools'
      );
    }

    // Filter by search query if present
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    return result;
  }, [skills, activeTab, searchQuery]);

  // Determine whether to limit initial view when on 'all' without search
  const showExpandToggle = activeTab === 'all' && !searchQuery.trim();
  const displayedCategories = showExpandToggle && !isExpanded 
    ? filteredCategories.slice(0, 6) 
    : filteredCategories;

  const totalSkillCount = useMemo(() => {
    return skills.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [skills]);

  return (
    <section id="skills" className="relative py-24 overflow-hidden bg-slate-950/40">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3.5 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Layers className="h-3.5 w-3.5" />
            Technical Architecture & Tooling
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Skills & Technical Expertise
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            A comprehensive, structured inventory of {totalSkillCount}+ technologies, frameworks, and engineering disciplines across AI, systems, quality engineering, and cybersecurity.
          </p>
          <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Filter Tabs & Quick Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== 'all') {
                    setIsExpanded(true);
                  }
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-semibold shadow-[0_0_16px_rgba(139,92,246,0.45)] scale-105 border border-cyan-400/40'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search skill (e.g. PyTorch, Vitest)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white font-mono cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category, index) => {
              const glowColor = ACCENT_GLOW_MAP[category.iconName] || 'rgba(139, 92, 246, 0.15)';
              return (
                <motion.div
                  key={category.title}
                  layout
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
                  transition={{ 
                    duration: shouldReduceMotion ? 0 : 0.35, 
                    delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.3) 
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                  className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between group relative overflow-hidden transition-colors"
                >
                  {/* Spotlight Cursor Glow */}
                  <div 
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(420px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}, transparent 65%)`
                    }}
                  />

                  {/* Top Header */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-violet-500/50 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.3)] transition-all shrink-0">
                          {ICON_MAP[category.iconName]}
                        </div>
                        <div>
                          <h3 className="font-heading text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                            {category.title}
                          </h3>
                          <span className="font-mono text-[11px] text-slate-400">
                            {category.badge || category.group || 'Core Competency'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {category.description && (
                      <p className="font-sans text-xs text-slate-400/90 mb-4 leading-relaxed">
                        {category.description}
                      </p>
                    )}

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {category.skills.map((skill) => {
                        const isMatch = searchQuery.trim() !== '' && 
                          skill.toLowerCase().includes(searchQuery.toLowerCase().trim());
                        return (
                          <motion.span
                            key={skill}
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -1 }}
                            className={`inline-flex items-center rounded-lg border px-2.5 py-1 font-sans text-xs font-medium transition-all cursor-default select-none ${
                              isMatch
                                ? 'border-cyan-400 bg-cyan-950/70 text-cyan-100 shadow-[0_0_12px_rgba(6,182,212,0.5)] ring-1 ring-cyan-400 font-semibold'
                                : 'border-slate-800/90 bg-slate-900/70 text-slate-300 hover:border-violet-500/50 hover:bg-violet-950/30 hover:text-cyan-200'
                            }`}
                          >
                            {skill}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Footer Details */}
                  <div className="mt-6 pt-3.5 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono relative z-10">
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider">
                      {category.skills.length} competencies
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-cyan-400/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                      <span>Active Practice</span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when searching */}
        {displayedCategories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-sm font-mono mb-2">No skills matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-cyan-400 hover:underline font-mono cursor-pointer"
            >
              Reset search filter
            </button>
          </div>
        )}

        {/* Expand / Show More Button */}
        {showExpandToggle && filteredCategories.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2.5 rounded-xl border border-violet-500/30 bg-slate-900/90 hover:bg-violet-950/40 px-6 py-3 text-xs font-mono font-medium text-slate-200 hover:text-cyan-300 hover:border-cyan-400/50 transition-all shadow-[0_0_20px_rgba(139,92,246,0.15)] group cursor-pointer"
            >
              <span>
                {isExpanded 
                  ? 'Show Less (Top 6 Priorities)' 
                  : `Show All 11 Categories (${filteredCategories.length - 6} More: Databases, DevOps, Tools & More)`}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-cyan-400 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="h-4 w-4 text-cyan-400 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
