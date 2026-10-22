import { ArrowUp, Mail, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer = () => {
  const { personal } = PORTFOLIO_DATA;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-900 bg-[#04060b] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Monogram & Tagline */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-950/30 text-white font-heading font-bold text-sm">
              NK<span className="text-cyan-400">.</span>
            </div>
            <div>
              <div className="font-heading text-sm font-semibold text-slate-200">
                {personal.name}
              </div>
              <div className="font-mono text-xs text-slate-500">
                Designed and built with curiosity by Nikhil Kumar.
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-violet-500 hover:text-white transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-cyan-400 hover:text-white transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={personal.socials.leetcode}
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-amber-400 hover:text-white transition-colors"
            >
              <Code2 className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${personal.socials.email}`}
              aria-label="Email"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-rose-400 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Back to top button & copyright */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-slate-500">
              © {currentYear} Nikhil Kumar
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:border-cyan-400 hover:text-cyan-300 transition-all hover:-translate-y-1"
            >
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
