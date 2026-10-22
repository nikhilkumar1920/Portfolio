import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { GithubIcon } from './SocialIcons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass-card rounded-2xl border border-violet-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(139,92,246,0.3)] z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Project Modal"
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-violet-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-10">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              {project.category}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
              {project.title}
            </h3>
          </div>

          {/* Project Architecture Visual Banner */}
          {project.image && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-slate-700/80 bg-[#070a14] shadow-lg max-h-[320px] flex items-center justify-center">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Key Technical Contribution Callout */}
          {project.keyContribution && (
            <div className="mb-6 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-semibold text-cyan-300 uppercase">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Key Technical Contribution
              </div>
              <p className="font-sans text-sm text-cyan-100/90 leading-relaxed">
                {project.keyContribution}
              </p>
            </div>
          )}

          {/* Full Description */}
          <div className="mb-6">
            <h4 className="font-heading text-sm font-semibold uppercase text-slate-300 tracking-wider mb-2">
              Overview & Architecture
            </h4>
            <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Verified Metrics (if any) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-6">
              <h4 className="font-heading text-sm font-semibold uppercase text-slate-300 tracking-wider mb-3">
                Experimental Results & Verification
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-violet-500/30 bg-slate-900/80 p-3 text-center"
                  >
                    <div className="font-mono text-xl sm:text-2xl font-bold text-cyan-300">
                      {metric.value}
                    </div>
                    <div className="font-sans text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                      {metric.verified && (
                        <CheckCircle className="h-3 w-3 text-emerald-400 inline" />
                      )}
                      <span>{metric.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              {project.evaluationNote && (
                <div className="mt-2 flex items-start gap-2 text-xs font-sans text-slate-400">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{project.evaluationNote}</span>
                </div>
              )}
            </div>
          )}

          {/* Technical Highlights */}
          <div className="mb-6">
            <h4 className="font-heading text-sm font-semibold uppercase text-slate-300 tracking-wider mb-3">
              Engineering Highlights
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="mb-8">
            <h4 className="font-heading text-sm font-semibold uppercase text-slate-300 tracking-wider mb-3">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-1 font-mono text-xs text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/30 transition-all"
            >
              <GithubIcon className="h-4 w-4" />
              <span>View Source on GitHub</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/40 px-5 py-2.5 text-xs font-semibold text-cyan-200 transition-all"
              >
                <ExternalLink className="h-4 w-4 text-cyan-400" />
                <span>Launch Demo</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-mono text-slate-300 hover:text-white"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
