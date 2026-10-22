import { 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Clock, 
  ArrowRight,
  BrainCircuit
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { BorderBeam } from './BorderBeam';

export const Research = () => {
  const { publication } = PORTFOLIO_DATA;

  return (
    <section id="research" className="relative py-24 overflow-hidden bg-slate-950/40 border-t border-slate-900">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <BookOpen className="h-3 w-3" />
            Scholarly Inquiries
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Research & Publications
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Advancing foundation model adaptation, vision transformers, and computational radiology.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Featured Publication Showcase Card */}
        <div className="mx-auto max-w-5xl glass-card rounded-3xl p-6 sm:p-10 border border-violet-500/40 shadow-[0_0_50px_rgba(139,92,246,0.2)] relative overflow-hidden mb-16">
          <BorderBeam size={350} duration={16} colorFrom="#38bdf8" colorTo="#a78bfa" />
          
          {/* Top Status & Venue Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                {publication.venue}
              </span>
            </div>
            <span className="font-mono text-xs text-violet-300 bg-violet-950/40 border border-violet-500/30 px-3 py-1 rounded-full">
              Status: {publication.status}
            </span>
          </div>

          {/* Paper Title */}
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
            "{publication.title}"
          </h3>

          {/* Short Description */}
          <p className="font-sans text-base text-slate-300 leading-relaxed mb-6">
            {publication.description}
          </p>

          {/* Research Summary Callout */}
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5 mb-6">
            <h4 className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" />
              Methodology & Cross-Domain Significance
            </h4>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              {publication.researchSummary}
            </p>
          </div>

          {/* Architecture Pipeline Diagram */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-violet-500/25 bg-[#060913] p-2 shadow-lg">
            <img
              src="/images/research-architecture.svg"
              alt="Springer CVR 2026 - Domain-Aware SAM-ViT-B Architecture Flowchart"
              className="w-full h-auto rounded-xl"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              {publication.paperUrl ? (
                <a
                  href={publication.paperUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all"
                >
                  <FileText className="h-4 w-4" />
                  <span>Read Paper (Springer)</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-mono text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>Publication Link Coming Soon (Post-Proceedings)</span>
                </div>
              )}

              <a
                href="#projects"
                className="flex items-center gap-1.5 font-sans text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>View Related Project</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="font-mono text-xs text-slate-500">
              Evaluated on SAM-ViT-B vs U-Net++
            </div>
          </div>

        </div>

        {/* Small Section: Research Interests */}
        <div className="mx-auto max-w-4xl text-center">
          <h4 className="font-heading text-lg font-bold text-white mb-2">
            Core Research Interests
          </h4>
          <p className="font-sans text-xs sm:text-sm text-slate-400 mb-6">
            Investigating foundational problems across machine learning and systems.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {publication.researchInterests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-violet-500/25 bg-violet-950/20 px-4 py-1.5 font-sans text-xs font-medium text-slate-300 hover:border-cyan-400 hover:text-white transition-all shadow-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
