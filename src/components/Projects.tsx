import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import { ProjectModal } from './ProjectModal';
import { VisualComparisonViewer } from './VisualComparisonViewer';
import { GithubIcon } from './SocialIcons';
import { BorderBeam } from './BorderBeam';

export const Projects = () => {
  const { projects } = PORTFOLIO_DATA;
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'featured' | 'ai' | 'security' | 'tools'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [expandedComparisonId, setExpandedComparisonId] = useState<string | null>(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured Systems' },
    { id: 'ai', label: 'AI & Medical Imaging' },
    { id: 'security', label: 'Cybersecurity & ZKP' },
    { id: 'tools', label: 'Developer Tools & Automation' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'featured') return p.featured;
    if (selectedFilter === 'ai') return p.category.toLowerCase().includes('ai') || p.category.toLowerCase().includes('imaging') || p.category.toLowerCase().includes('deep learning');
    if (selectedFilter === 'security') return p.category.toLowerCase().includes('cybersecurity') || p.category.toLowerCase().includes('blockchain');
    if (selectedFilter === 'tools') return p.category.toLowerCase().includes('developer tools') || p.category.toLowerCase().includes('automation') || p.category.toLowerCase().includes('python');
    return true;
  });

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <FolderGit2 className="h-3 w-3" />
            Engineering Portfolio
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Featured Projects & Systems
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Selected works demonstrating agentic architectures, medical foundation model adaptation, and zero-knowledge cryptography.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all duration-200 ${
                selectedFilter === f.id
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.35)] scale-105'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className={`glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative group overflow-hidden ${
                  project.featured 
                    ? 'border-violet-500/40 shadow-[0_0_35px_rgba(139,92,246,0.18)]' 
                    : 'border-slate-800/80'
                }`}
              >
                {/* Spotlight Cursor Glow */}
                <div 
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.12), transparent 40%)'
                  }}
                />

                {/* Animated Border Beam for Featured Systems */}
                {project.featured && (
                  <BorderBeam size={280} duration={14} colorFrom="#8b5cf6" colorTo="#06b6d4" />
                )}
                <div>
                  {/* Top Category and Status Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-lg">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-300 bg-amber-950/30 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="h-3 w-3" />
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="font-heading text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-3">
                    {project.title}
                  </h3>

                  {/* Project Visual Banner */}
                  {project.image && (
                    <div 
                      onClick={() => setActiveModalProject(project)}
                      className="relative mb-5 rounded-2xl overflow-hidden border border-slate-800 bg-[#070a14] group-hover:border-violet-500/50 transition-all aspect-[16/9] flex items-center justify-center cursor-pointer shadow-lg"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute top-3 right-3 rounded-lg bg-black/70 border border-cyan-400/30 px-2.5 py-1 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 shadow-md">
                        <Eye className="h-3 w-3" />
                        <span>Inspect System</span>
                      </div>
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="font-sans text-sm text-slate-300 leading-relaxed mb-5">
                    {project.shortDescription}
                  </p>

                  {/* Key Technical Contribution Card */}
                  {project.keyContribution && (
                    <div className="rounded-xl border border-violet-500/20 bg-slate-900/60 p-3.5 mb-5">
                      <div className="font-mono text-[11px] font-semibold text-violet-300 uppercase mb-1 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                        Key Technical Contribution
                      </div>
                      <p className="font-sans text-xs text-slate-300 leading-relaxed">
                        {project.keyContribution}
                      </p>
                    </div>
                  )}

                  {/* Verified Metrics (if any) */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mb-5">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="rounded-lg border border-cyan-500/25 bg-cyan-950/20 px-2.5 py-2 text-center"
                          >
                            <span className="block font-mono text-base font-bold text-cyan-300">
                              {m.value}
                            </span>
                            <span className="block font-sans text-[10px] text-slate-400">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {project.evaluationNote && (
                        <p className="font-sans text-[11px] text-slate-400 mt-2 italic">
                          * {project.evaluationNote}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Visual Comparison Area Toggle for SAM project */}
                  {project.hasVisualComparison && (
                    <div className="mb-5">
                      <button
                        onClick={() => 
                          setExpandedComparisonId(
                            expandedComparisonId === project.id ? null : project.id
                          )
                        }
                        className="w-full flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-2.5 text-xs font-mono text-cyan-200 hover:bg-cyan-900/40 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-cyan-400" />
                          <span>Interactive MRI Comparison Viewer</span>
                        </span>
                        <span>{expandedComparisonId === project.id ? '▲ Hide' : '▼ View Comparison'}</span>
                      </button>

                      {expandedComparisonId === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden"
                        >
                          <VisualComparisonViewer />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 font-mono text-xs font-medium text-slate-200 hover:border-violet-500 hover:text-white transition-colors"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>Code</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-3 py-1.5 font-mono text-xs font-medium text-cyan-300 hover:border-cyan-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="flex items-center gap-1 font-sans text-xs font-semibold text-violet-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Full Architecture Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
