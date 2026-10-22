import { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { GitHubProjects } from './components/GitHubProjects';
import { LeetCodeStats } from './components/LeetCodeStats';
import { Research } from './components/Research';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MeetingSchedulerModal } from './components/MeetingSchedulerModal';
import { useTheme } from './hooks/useTheme';

export function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative min-h-screen bg-[#05070d] text-slate-100 selection:bg-violet-600/30 selection:text-cyan-300 font-sans overflow-x-hidden">
      {/* Cinematic Introduction Loader */}
      {!loadingComplete && (
        <PageLoader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Top Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 origin-left z-[100] shadow-[0_0_12px_rgba(6,182,212,0.8)]"
      />

      {/* Desktop Custom Glowing Cursor */}
      <CustomCursor />

      {/* Interactive Cyber Particle Constellation */}
      <BackgroundParticles />

      {/* Navigation Bar */}
      <Navbar
        onOpenScheduler={() => setIsSchedulerOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col">
        <Hero onOpenScheduler={() => setIsSchedulerOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <InteractiveTerminal />
        <GitHubProjects />
        <LeetCodeStats />
        <Research />
        <Experience />
        <Achievements />
        <Contact onOpenScheduler={() => setIsSchedulerOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Meeting Scheduler Modal */}
      <MeetingSchedulerModal
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
      />
    </div>
  );
}

export default App;
