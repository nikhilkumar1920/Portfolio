import { motion } from 'framer-motion';
import { Code, Cpu, Shield, ArrowUpRight, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { BorderBeam } from './BorderBeam';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code: <Code className="h-6 w-6 text-violet-400" />,
  Cpu: <Cpu className="h-6 w-6 text-cyan-400" />,
  Shield: <Shield className="h-6 w-6 text-indigo-400" />,
};

export const About = () => {
  const { about, personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full bg-violet-900/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles className="h-3 w-3" />
            Background & Philosophy
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {about.headline}
          </h2>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Introduction Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Text Narrative */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-5 text-slate-300 font-sans text-base sm:text-[16px] leading-relaxed"
          >
            {about.paragraphs.map((para, i) => (
              <p key={i} className="text-slate-300/90 leading-relaxed tracking-normal">
                {para}
              </p>
            ))}

            {/* Quick Context Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-3 glass-card rounded-xl p-3 border border-slate-800">
                <GraduationCap className="h-5 w-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-heading text-xs font-semibold text-white">
                    {personal.education.institution}
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    B.Tech CS & Cybersecurity • {personal.education.period}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 glass-card rounded-xl p-3 border border-slate-800">
                <MapPin className="h-5 w-5 text-violet-400 shrink-0" />
                <div>
                  <div className="font-heading text-xs font-semibold text-white">
                    Based in India
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    {personal.location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Highlight Box: Technical Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 border border-violet-500/35 shadow-xl relative overflow-hidden"
          >
            <BorderBeam size={220} duration={12} colorFrom="#8b5cf6" colorTo="#06b6d4" />
            <div className="absolute top-4 right-4 font-mono text-[11px] text-violet-400 bg-violet-950/40 px-2 py-0.5 rounded border border-violet-500/20">
              PHILOSOPHY
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-3">
              Research Meets Production Engineering
            </h3>
            <p className="font-sans text-sm text-slate-300 leading-relaxed mb-4">
              "The most rewarding systems are those that convert mathematical rigor and research insights into reproducible, resilient software. From fine-tuning vision transformers to testing multi-agent workflows, I prioritize code quality, maintainability, and measurable impact."
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-cyan-300 border border-cyan-500/20">
                Agentic Workflows
              </span>
              <span className="rounded-full bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-violet-300 border border-violet-500/20">
                Foundation Models
              </span>
              <span className="rounded-full bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-emerald-300 border border-emerald-500/20">
                Test Automation
              </span>
              <span className="rounded-full bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-blue-300 border border-blue-500/20">
                ZK Cryptography
              </span>
            </div>
          </motion.div>

        </div>

        {/* 3 Interactive Cards: Build, Research, Secure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {about.pillars.map((pillar, index) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.01 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className="glass-card glass-card-hover rounded-2xl p-7 relative overflow-hidden group flex flex-col justify-between border border-slate-800/80"
            >
              {/* Spotlight Cursor Glow */}
              <div 
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.15), transparent 65%)'
                }}
              />

              {/* Corner Pillar Number */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="font-mono text-xs font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors">
                  {pillar.num}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-700/60 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                  {ICON_MAP[pillar.icon]}
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                  {pillar.title}
                </h4>
                <div className="font-mono text-xs text-violet-400/90 mb-3">
                  {pillar.subtitle}
                </div>
                <p className="font-sans text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Subtle Gradient Accent Line */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors relative z-10">
                <span>Core Pillar</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
