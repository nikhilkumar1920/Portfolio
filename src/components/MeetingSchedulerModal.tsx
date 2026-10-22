import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  Mail, 
  Info, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface MeetingSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeetingSchedulerModal = ({ isOpen, onClose }: MeetingSchedulerModalProps) => {
  const { personal } = PORTFOLIO_DATA;
  const [meetingType, setMeetingType] = useState<'intro' | 'technical'>('intro');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Check whether user has configured a custom non-placeholder Calendly URL
  const isDefaultPlaceholder = personal.calendlyUrl.includes('YOUR_USERNAME');

  useEffect(() => {
    if (isOpen) {
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#06b6d4', '#10b981'],
        });
      } catch {
        // Fallback gracefully if canvas unavailable
      }

      // Close on Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="scheduler-title"
        >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-violet-500/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(139,92,246,0.35)] z-10 max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close scheduler"
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-violet-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-10">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <Calendar className="h-3.5 w-3.5" />
              Schedule a Discussion
            </div>
            <h2 id="scheduler-title" className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Connect with Nikhil Kumar
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Available for recruiters, internship opportunities, research collaborations, agentic AI discussions, and technical evaluations.
            </p>
          </div>

          {/* Meeting Format Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setMeetingType('intro')}
              className={`rounded-2xl p-4 text-left border transition-all ${
                meetingType === 'intro'
                  ? 'border-violet-500 bg-violet-950/40 shadow-[0_0_20px_rgba(139,92,246,0.25)]'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading text-sm font-bold text-white">
                  15-Min Introductory Meeting
                </span>
                <span className="font-mono text-xs text-cyan-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 15 mins
                </span>
              </div>
              <p className="font-sans text-xs text-slate-400">
                Quick introductory conversation, recruiter sync, or preliminary opportunity review.
              </p>
            </button>

            <button
              onClick={() => setMeetingType('technical')}
              className={`rounded-2xl p-4 text-left border transition-all ${
                meetingType === 'technical'
                  ? 'border-cyan-500 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading text-sm font-bold text-white">
                  30-Min Technical & Research Discussion
                </span>
                <span className="font-mono text-xs text-violet-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 30 mins
                </span>
              </div>
              <p className="font-sans text-xs text-slate-400">
                In-depth discussion on agentic testing architectures, SAM medical image adaptation, or engineering roles.
              </p>
            </button>
          </div>

          {/* Calendly Booking Area or Graceful Recruiter Contact Panel */}
          {!isDefaultPlaceholder ? (
            /* Live Calendly Embedded iFrame */
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden min-h-[500px]">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
                  <span className="font-mono text-xs">Loading secure Calendly scheduler...</span>
                </div>
              )}
              <iframe
                src={`${personal.calendlyUrl}?embed_domain=${window.location.hostname}&embed_type=Inline`}
                width="100%"
                height="580"
                title="Schedule a Meeting with Nikhil Kumar"
                onLoad={() => setIframeLoaded(true)}
                className="w-full border-0"
              />
            </div>
          ) : (
            /* Configurable Fallback Panel with Direct Email & Booking Instructions */
            <div className="rounded-2xl border border-violet-500/20 bg-slate-900/70 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    Instant Direct Scheduling
                  </h3>
                  <p className="font-sans text-xs text-slate-300 mt-1">
                    Send an automated calendar invitation directly to Nikhil Kumar's inbox.
                  </p>
                </div>

                <a
                  href={`mailto:${personal.socials.email}?subject=${encodeURIComponent(
                    meetingType === 'intro'
                      ? '15-Min Introductory Meeting Request — Nikhil Kumar'
                      : '30-Min Technical / Research Discussion — Nikhil Kumar'
                  )}&body=${encodeURIComponent(
                    `Hi Nikhil,\n\nI would like to schedule a ${
                      meetingType === 'intro' ? '15-minute introductory meeting' : '30-minute technical discussion'
                    } regarding opportunities or collaborations.\n\nProposed Times/Dates:\n1. \n2. \n\nBest regards,\n[Your Name]\n[Your Organization]`
                  )}`}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 px-5 py-3 text-xs font-semibold text-white shadow-lg transition-all hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                  <span>Propose Time via Email</span>
                </a>
              </div>

              {/* Direct Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <span className="font-mono text-[11px] uppercase text-slate-500">Email Address</span>
                  <a
                    href={`mailto:${personal.socials.email}`}
                    className="block font-mono text-sm text-cyan-300 hover:underline mt-1"
                  >
                    {personal.socials.email}
                  </a>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <span className="font-mono text-[11px] uppercase text-slate-500">Phone / WhatsApp</span>
                  <a
                    href={`tel:${personal.socials.phone}`}
                    className="block font-mono text-sm text-slate-300 hover:text-white mt-1"
                  >
                    {personal.socials.phone}
                  </a>
                </div>
              </div>

              {/* Documentation Note for User */}
              <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-semibold mb-1">
                  <Info className="h-3.5 w-3.5" />
                  <span>Calendly Setup Instructions</span>
                </div>
                <p>
                  To embed your personal Calendly calendar widget automatically, create a <code className="text-cyan-200">.env</code> file in the project root with:
                  <br />
                  <code className="mt-1 block font-mono text-violet-300 bg-slate-950 px-2.5 py-1.5 rounded">
                    VITE_CALENDLY_URL=https://calendly.com/your-username/introductory-meeting
                  </code>
                </p>
              </div>
            </div>
          )}

          {/* Footer Notice */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 pt-4 border-t border-slate-800">
            <span>Guaranteed response within 24-48 business hours</span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white underline"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
