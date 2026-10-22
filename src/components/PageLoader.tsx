import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader = ({ onComplete }: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        // Rapid randomized increments for high-tech feeling
        const increment = Math.floor(Math.random() * 20) + 12;
        return Math.min(100, prev + increment);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05070d] text-white"
        >
          {/* Background cyber grid */}
          <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

          {/* Ambient center glow */}
          <div className="absolute h-96 w-96 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
          <div className="absolute h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

          {/* Center Monogram NK */}
          <div className="relative flex flex-col items-center">
            {/* Spinning orbital ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-violet-500/30 p-1 shadow-[0_0_30px_rgba(139,92,246,0.25)]"
            >
              <div className="absolute inset-1 rounded-xl border border-cyan-400/20" />
              <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </motion.div>

            {/* Monogram letters */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-300 to-white">
                NK<span className="text-cyan-400">.</span>
              </span>
            </div>

            {/* Subtext and progress */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Initializing Intelligent Systems
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1 w-56 overflow-hidden rounded-full bg-slate-800/80 border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-400"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <div className="flex w-56 justify-between font-mono text-[10px] text-slate-500">
                <span>SYSTEM_BOOT</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Skip button for quick convenience */}
            <button
              onClick={() => {
                setIsDone(true);
                setTimeout(onComplete, 200);
              }}
              className="mt-6 rounded-full border border-slate-800 px-3 py-1 font-mono text-[10px] text-slate-500 hover:border-slate-600 hover:text-slate-300 transition-colors"
            >
              Skip Intro ↵
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
