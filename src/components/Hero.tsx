import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Code2, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  BrainCircuit
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { BorderBeam } from './BorderBeam';
import { MagneticButton } from './MagneticButton';
import { GoogleMeetIcon } from './GoogleMeetIcon';

interface HeroProps {
  onOpenScheduler: () => void;
}

const ROTATING_HEADLINES = [
  { prefix: "Building", highlight: "Intelligent Systems.", suffix: "Engineering What's Next." },
  { prefix: "Orchestrating", highlight: "Multi-Agent AI.", suffix: "Autonomous Test & Repair." },
  { prefix: "Fine-Tuning", highlight: "Vision Transformers.", suffix: "Medical MRI Precision." },
  { prefix: "Engineering", highlight: "Resilient Software.", suffix: "Zero-Knowledge Security." },
];

export const Hero = ({ onOpenScheduler }: HeroProps) => {
  const { personal, hero } = PORTFOLIO_DATA;
  const [imageError, setImageError] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // Rotating Headline Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % ROTATING_HEADLINES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 3D Perspective Tilt on portrait hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[94vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Ambient Glows & Tech Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Narrative & Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Availability & Role Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-violet-950/30 px-3.5 py-1.5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
                SOFTWARE DEVELOPER • AI/ML RESEARCHER
              </span>
            </div>

            {/* Main Dynamic Headline with AnimatePresence */}
            <div className="min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] flex items-center mb-4">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={headlineIndex}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
                >
                  {ROTATING_HEADLINES[headlineIndex].prefix}{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 animate-shimmer bg-[length:200%_auto]">
                    {ROTATING_HEADLINES[headlineIndex].highlight}
                  </span>
                  <br />
                  <span className="text-slate-100 hover:text-cyan-200 transition-colors">
                    {ROTATING_HEADLINES[headlineIndex].suffix}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Introduction and Supporting Narrative */}
            <p className="font-sans text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-3 max-w-2xl">
              {hero.bio}
            </p>
            <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed mb-6 max-w-2xl">
              {hero.subBio}
            </p>

            {/* Availability Status Tag (Editable) */}
            <div className="flex items-center gap-2 mb-8 text-xs font-mono text-slate-300 bg-slate-900/70 border border-slate-800 rounded-xl px-3.5 py-2 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{personal.availability}</span>
            </div>

            {/* Action Buttons with Magnetic Pull */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              {/* Explore My Work */}
              <MagneticButton strength={0.25}>
                <a
                  href="#projects"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </MagneticButton>

              {/* Schedule Google Meet */}
              <MagneticButton strength={0.25}>
                <button
                  onClick={onOpenScheduler}
                  className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-5 py-3 text-sm font-semibold text-emerald-200 backdrop-blur-sm transition-all hover:bg-emerald-900/40 hover:border-emerald-400 hover:text-white hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(0,172,71,0.25)]"
                >
                  <GoogleMeetIcon className="h-4 w-4" />
                  <span>Schedule Google Meet</span>
                </button>
              </MagneticButton>

              {/* Download Resume Button */}
              <div className="flex items-center gap-1.5">
                <MagneticButton strength={0.2}>
                  <a
                    href={personal.resumePath}
                    download="Nikhil_Kumar_Resume.pdf"
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-mono text-slate-200 transition-all hover:border-violet-500 hover:text-white hover:bg-slate-800/80 hover:scale-[1.02]"
                  >
                    <Download className="h-4 w-4 text-violet-400" />
                    <span>Download CV</span>
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <a
                    href={personal.resumePath}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="View Resume in New Tab"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-cyan-400 hover:text-white transition-all hover:scale-105"
                    title="View Resume in New Tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </MagneticButton>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase text-slate-500">Connect:</span>
              <MagneticButton strength={0.3}>
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-violet-500 hover:text-white hover:scale-110 transition-all shadow-sm"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-cyan-400 hover:text-white hover:scale-110 transition-all shadow-sm"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <a
                  href={personal.socials.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LeetCode Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-amber-400 hover:text-white hover:scale-110 transition-all shadow-sm"
                >
                  <Code2 className="h-4 w-4" />
                </a>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <a
                  href={`mailto:${personal.socials.email}`}
                  aria-label="Send Email"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-rose-400 hover:text-white hover:scale-110 transition-all shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Dedicated Portrait Slot & Interactive 3D Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative perspective-[1000px]"
          >
            {/* Outer Cybernetic Ring */}
            <div className="relative flex items-center justify-center">
              
              {/* Animated Glow Halo */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-violet-600/30 via-indigo-600/20 to-cyan-500/30 blur-3xl animate-pulse-glow pointer-events-none" />

              {/* Orbiting Tech Satellite Pills */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-10 sm:-inset-14 rounded-full border border-violet-500/15 pointer-events-none"
              >
                {/* Python Satellite */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/50 bg-slate-950/90 px-2.5 py-1 text-[11px] font-mono text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center gap-1">
                  <span>🐍</span>
                  <span className="font-semibold">Python</span>
                </div>
                {/* PyTorch Satellite */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-rose-400/50 bg-slate-950/90 px-2.5 py-1 text-[11px] font-mono text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center gap-1">
                  <span>🔥</span>
                  <span className="font-semibold">PyTorch</span>
                </div>
                {/* TypeScript Satellite */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50 bg-slate-950/90 px-2.5 py-1 text-[11px] font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-1">
                  <span>⚡</span>
                  <span className="font-semibold">TypeScript</span>
                </div>
                {/* Security Satellite */}
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/50 bg-slate-950/90 px-2.5 py-1 text-[11px] font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1">
                  <span>🛡️</span>
                  <span className="font-semibold">CyberSec</span>
                </div>
              </motion.div>

              {/* Main Portrait Container with 3D Mouse Tilt */}
              <motion.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative h-[380px] w-[300px] sm:h-[450px] sm:w-[350px] rounded-3xl p-[2px] bg-gradient-to-b from-violet-500/80 via-cyan-400/80 to-indigo-500/80 shadow-[0_0_60px_rgba(139,92,246,0.35)] group cursor-pointer overflow-hidden"
              >
                {/* Animated Border Beam around Portrait */}
                <BorderBeam size={250} duration={10} colorFrom="#06b6d4" colorTo="#8b5cf6" />

                <div className="h-full w-full rounded-[22px] bg-[#070a14] overflow-hidden relative flex flex-col items-center justify-between p-4">
                  
                  {/* Corner Tech Accents */}
                  <div className="absolute top-3 left-3 h-2.5 w-2.5 border-t-2 border-l-2 border-cyan-400 z-10" />
                  <div className="absolute top-3 right-3 h-2.5 w-2.5 border-t-2 border-r-2 border-violet-400 z-10" />
                  <div className="absolute bottom-3 left-3 h-2.5 w-2.5 border-b-2 border-l-2 border-violet-400 z-10" />
                  <div className="absolute bottom-3 right-3 h-2.5 w-2.5 border-b-2 border-r-2 border-cyan-400 z-10" />

                  {/* Profile Photo (Nikhil Kumar) or Fallback */}
                  <div className="relative h-full w-full rounded-2xl overflow-hidden flex items-center justify-center bg-slate-950">
                    {!imageError ? (
                      <img
                        src={personal.profileImage}
                        alt="Nikhil Kumar — Software Developer & AI/ML Researcher"
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover object-top rounded-2xl transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      // Futuristic Cyber Monogram Avatar
                      <div className="flex flex-col items-center justify-center text-center p-6">
                        <div className="relative mb-5 flex h-28 w-28 items-center justify-center rounded-2xl border border-violet-500/40 bg-gradient-to-tr from-violet-900/40 to-cyan-900/40 shadow-inner">
                          <span className="font-heading text-4xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-cyan-200 to-white">
                            NK<span className="text-cyan-400">.</span>
                          </span>
                          <div className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] border-2 border-[#070a14]" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-white mb-1">
                          {personal.name}
                        </h3>
                        <p className="font-mono text-xs text-cyan-400 mb-2">
                          B.Tech in Cybersecurity & CS
                        </p>
                      </div>
                    )}

                    {/* Gradient Overlay for bottom text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-80 pointer-events-none" />

                    {/* Badge Overlay at bottom of Photo */}
                    <div className="absolute bottom-3 inset-x-3 rounded-xl border border-violet-500/30 bg-slate-950/80 p-2.5 backdrop-blur-md flex items-center justify-between">
                      <div>
                        <div className="font-heading text-xs font-bold text-white">
                          {personal.name}
                        </div>
                        <div className="font-mono text-[10px] text-cyan-400">
                          SRM University–AP • CGPA {personal.education.cgpa}
                        </div>
                      </div>
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* Floating Card: "Currently exploring" */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-4 sm:-left-8 glass-card rounded-2xl p-3.5 shadow-2xl border border-cyan-400/30 max-w-[240px] backdrop-blur-xl z-20"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin-slow" />
                  <span className="font-mono text-[11px] font-semibold uppercase text-slate-300">
                    Currently exploring
                  </span>
                </div>
                <p className="font-sans text-xs font-medium text-cyan-200/90 leading-tight">
                  {hero.currentlyExploring.join(' • ')}
                </p>
              </motion.div>

              {/* Top Floating Badge: Research & Security */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-5 -right-3 sm:-right-6 glass-card rounded-xl px-3 py-2 border border-violet-400/30 shadow-xl backdrop-blur-xl z-20 flex items-center gap-2"
              >
                <ShieldCheck className="h-4 w-4 text-violet-400" />
                <span className="font-mono text-xs font-semibold text-slate-200">
                  Springer CVR '26
                </span>
              </motion.div>

              {/* Extra Floating Badge: Agentic AI */}
              <motion.div 
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="hidden sm:flex absolute top-1/2 -left-12 glass-card rounded-xl px-2.5 py-1.5 border border-cyan-400/30 shadow-lg backdrop-blur-xl z-20 items-center gap-1.5"
              >
                <BrainCircuit className="h-3.5 w-3.5 text-cyan-400" />
                <span className="font-mono text-[10px] text-cyan-200 font-medium">Agentic Testing</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* SLIM TECHNOLOGY TICKER */}
      <div className="relative mt-16 w-full border-y border-slate-800/80 bg-slate-950/60 py-3.5 backdrop-blur-md overflow-hidden">
        <div className="flex w-max items-center animate-ticker hover:[animation-play-state:paused]">
          {[...hero.tickerItems, ...hero.tickerItems, ...hero.tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 mx-4">
              <span className="font-mono text-xs font-medium tracking-wider text-slate-300 hover:text-cyan-300 transition-colors">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
