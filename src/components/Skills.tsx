import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Server, 
  Terminal, 
  BrainCircuit, 
  CheckCircle2, 
  Database, 
  ShieldAlert, 
  Wrench, 
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const ICON_MAP: Record<string, React.ReactNode> = {
  Layout: <Layout className="h-5 w-5 text-violet-400" />,
  Server: <Server className="h-5 w-5 text-cyan-400" />,
  Terminal: <Terminal className="h-5 w-5 text-emerald-400" />,
  BrainCircuit: <BrainCircuit className="h-5 w-5 text-pink-400" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5 text-amber-400" />,
  Database: <Database className="h-5 w-5 text-blue-400" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5 text-rose-400" />,
  Wrench: <Wrench className="h-5 w-5 text-slate-300" />,
};

export const Skills = () => {
  const { skills } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...skills.map(s => s.title)];

  const displayedCategories = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.title === activeCategory);

  return (
    <section id="skills" className="relative py-24 overflow-hidden bg-slate-950/40">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 h-80 w-80 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Layers className="h-3 w-3" />
            Technical Architecture & Tooling
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Skills & Capabilities
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            A comprehensive, verified inventory of technologies, programming languages, and engineering disciplines I use.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.4)] scale-105'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {displayedCategories.map((category, index) => (
              <motion.div
                key={category.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Spotlight Cursor Glow */}
                <div 
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.14), transparent 60%)'
                  }}
                />

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:border-violet-500/50 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                      {ICON_MAP[category.iconName]}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {category.title}
                      </h3>
                      <span className="font-mono text-[10px] text-slate-500">
                        {category.skills.length} competencies
                      </span>
                    </div>
                  </div>

                  {/* Skill Badges / Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="inline-flex items-center rounded-lg border border-slate-800/90 bg-slate-900/60 px-2.5 py-1 font-sans text-xs font-medium text-slate-300 transition-colors hover:border-violet-500/60 hover:bg-violet-950/40 hover:text-cyan-200 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between relative z-10">
                  <span className="font-mono text-[10px] uppercase text-slate-500">
                    Production Verified
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
