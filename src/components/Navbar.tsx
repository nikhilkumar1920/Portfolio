import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Download, 
  Sun, 
  Moon, 
  ExternalLink 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'LeetCode', href: '#leetcode' },
  { name: 'Research', href: '#research' },
  { name: 'Experience', href: '#experience' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section based on scroll offset
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo: NK. */}
          <a
            href="#home"
            className="group relative flex items-center gap-2 focus:outline-none"
            aria-label="Nikhil Kumar Home"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 p-[1px] transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                NK<span className="text-cyan-400">.</span>
              </span>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-40 -z-10" />
            </div>
            <div className="hidden sm:block">
              <span className="block font-heading text-sm font-semibold tracking-wide text-slate-200">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="block font-mono text-[10px] text-cyan-400/80">
                CS & Cybersecurity
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-violet-500/20 bg-slate-900/60 px-3 py-1.5 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-1.5 font-sans text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-cyan-300'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-cyan-400/30 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Buttons & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle dark/light theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-300 hover:text-white hover:border-violet-500/50 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-violet-400" />}
            </button>

            {/* Resume Button */}
            <a
              href={PORTFOLIO_DATA.personal.resumePath}
              download="Nikhil_Kumar_Resume.pdf"
              className="group flex items-center gap-1.5 rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-1.5 font-mono text-xs font-medium text-slate-200 transition-all hover:border-violet-500/60 hover:bg-slate-800/80 hover:text-white"
            >
              <Download className="h-3.5 w-3.5 text-violet-400 transition-transform group-hover:-translate-y-0.5" />
              <span>Resume</span>
            </a>

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-300"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-violet-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-slate-900/80 text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden glass-card mx-3 my-2 rounded-2xl p-6 shadow-2xl border border-violet-500/30"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'bg-violet-600/20 text-cyan-300 border border-violet-500/30'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <div className="mt-4 pt-4 border-t border-slate-800">

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={PORTFOLIO_DATA.personal.resumePath}
                    download="Nikhil_Kumar_Resume.pdf"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-mono text-slate-200"
                  >
                    <Download className="h-3.5 w-3.5 text-violet-400" />
                    <span>Download CV</span>
                  </a>
                  <a
                    href={PORTFOLIO_DATA.personal.resumePath}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-mono text-slate-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
                    <span>View CV</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
