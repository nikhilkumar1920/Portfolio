import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  Mail, 
  Video, 
  Sparkles, 
  Check, 
  ExternalLink,
  Copy,
  User,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { GoogleMeetIcon } from './GoogleMeetIcon';
import { BorderBeam } from './BorderBeam';

interface MeetingSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MeetingDuration = '15' | '30' | '45';
type MeetingTopic = 'recruitment' | 'research' | 'agentic' | 'general';

const TOPIC_DETAILS: Record<MeetingTopic, { label: string; desc: string }> = {
  recruitment: {
    label: 'Recruiter Sync / SDE Roles',
    desc: 'Discussion regarding software engineering, cybersecurity, or internship opportunities.',
  },
  research: {
    label: 'Medical AI & Springer CVR \'26',
    desc: 'Discussion on fine-tuned SAM-ViT-B domain adaptation for glioma MRI segmentation.',
  },
  agentic: {
    label: 'LemonX Agentic AI QA',
    desc: 'Deep-dive into multi-agent automated testing, AST AST mutation, and self-healing PRs.',
  },
  general: {
    label: 'Open Tech Discussion / Intro',
    desc: 'Casual engineering conversation, student collaboration, or open-source ideas.',
  },
};

export const MeetingSchedulerModal = ({ isOpen, onClose }: MeetingSchedulerModalProps) => {
  const { personal } = PORTFOLIO_DATA;
  const [duration, setDuration] = useState<MeetingDuration>('30');
  const [topic, setTopic] = useState<MeetingTopic>('recruitment');
  const [guestName, setGuestName] = useState('');
  const [guestOrg, setGuestOrg] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('15:00');
  const [activeTab, setActiveTab] = useState<'gmeet' | 'calendly'>('gmeet');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00ac47', '#0066da', '#ea4335', '#ffba00'],
        });
      } catch {
        // graceful fallback
      }

      // Default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPreferredDate(tomorrow.toISOString().split('T')[0]);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Construct dynamic Google Calendar + Google Meet URL
  const generateGoogleCalendarUrl = () => {
    const selectedTopic = TOPIC_DETAILS[topic];
    const eventTitle = `Google Meet: ${selectedTopic.label} with Nikhil Kumar`;
    
    // Create Date objects for start and end
    let startDateTime = new Date();
    if (preferredDate) {
      const [year, month, day] = preferredDate.split('-').map(Number);
      const [hours, minutes] = preferredTime.split(':').map(Number);
      startDateTime = new Date(year, month - 1, day, hours, minutes);
    } else {
      startDateTime.setDate(startDateTime.getDate() + 1);
      startDateTime.setHours(15, 0, 0, 0);
    }

    const endDateTime = new Date(startDateTime.getTime() + parseInt(duration, 10) * 60 * 1000);

    const formatGCalDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const datesParam = `${formatGCalDate(startDateTime)}/${formatGCalDate(endDateTime)}`;

    const details = [
      `1-on-1 Google Meet Video Discussion with Nikhil Kumar`,
      `Topic: ${selectedTopic.label}`,
      `Description: ${selectedTopic.desc}`,
      guestName ? `Attendee: ${guestName} (${guestOrg || 'Independent'})` : '',
      `Organizer / Host: Nikhil Kumar (${personal.socials.email})`,
      `Meeting Location: Google Meet (link generated in calendar event)`,
      `Portfolio: https://nikhilkumar.dev`,
    ].filter(Boolean).join('\n\n');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&dates=${datesParam}&details=${encodeURIComponent(
      details
    )}&location=Google%20Meet&add=${encodeURIComponent(personal.socials.email)}`;
  };

  // Pre-filled Email Request
  const generateMailtoUrl = () => {
    const selectedTopic = TOPIC_DETAILS[topic];
    const subject = encodeURIComponent(
      `Google Meet Request (${duration} mins) — ${selectedTopic.label} [${guestName || 'Guest'}]`
    );
    const body = encodeURIComponent(
      `Hi Nikhil,\n\nI would like to schedule a ${duration}-minute Google Meet video discussion with you.\n\n` +
      `Topic: ${selectedTopic.label}\n` +
      (guestName ? `Name: ${guestName}\n` : '') +
      (guestOrg ? `Organization / Company: ${guestOrg}\n` : '') +
      `Proposed Date: ${preferredDate || 'Flexible'}\n` +
      `Proposed Time: ${preferredTime || '15:00'} IST\n\n` +
      `Could you please share your Google Meet link or confirm if this time works for you?\n\n` +
      `Best regards,\n${guestName || 'Your Name'}`
    );
    return `mailto:${personal.socials.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl glass-card rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,172,71,0.25)] z-10 max-h-[92vh] overflow-y-auto overflow-x-hidden"
          >
            {/* Luminous Animated Border Beam with Google Meet Colors */}
            <BorderBeam size={280} duration={12} colorFrom="#00ac47" colorTo="#0066da" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close scheduler"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-emerald-400 transition-colors z-20"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header with Google Meet Identity */}
            <div className="mb-6 pr-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300 mb-3 shadow-[0_0_15px_rgba(0,172,71,0.2)]">
                <GoogleMeetIcon className="h-4 w-4" />
                <span>Google Meet Video Conferencing</span>
              </div>
              <h2 id="scheduler-title" className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Schedule a Google Meet with Nikhil Kumar
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Connect directly for recruiter interviews, research inquiries, agentic AI demos, or software engineering discussions.
              </p>
            </div>

            {/* Scheduling Mode Toggle */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <button
                onClick={() => setActiveTab('gmeet')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-semibold transition-all ${
                  activeTab === 'gmeet'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_15px_rgba(0,172,71,0.4)]'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <GoogleMeetIcon className="h-3.5 w-3.5" />
                <span>Google Meet Direct Scheduler</span>
              </button>

              <button
                onClick={() => setActiveTab('calendly')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-semibold transition-all ${
                  activeTab === 'calendly'
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Calendly / Alternative</span>
              </button>
            </div>

            {activeTab === 'gmeet' ? (
              /* GOOGLE MEET DIRECT SCHEDULER VIEW */
              <div className="space-y-6">
                
                {/* Step 1: Duration Selector */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">
                    1. Select Google Meet Duration
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: '15', label: '15 Mins', sub: 'Quick Sync' },
                      { val: '30', label: '30 Mins', sub: 'Standard Tech' },
                      { val: '45', label: '45 Mins', sub: 'Deep Dive' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setDuration(item.val as MeetingDuration)}
                        className={`rounded-2xl p-3 text-center border transition-all ${
                          duration === item.val
                            ? 'border-emerald-400 bg-emerald-950/40 text-white shadow-[0_0_15px_rgba(0,172,71,0.3)] scale-[1.02]'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5 font-heading text-sm font-bold text-white">
                          <Clock className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{item.label}</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">{item.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Topic Selector */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">
                    2. Select Discussion Agenda
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(Object.keys(TOPIC_DETAILS) as MeetingTopic[]).map((key) => {
                      const item = TOPIC_DETAILS[key];
                      const isSelected = topic === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setTopic(key)}
                          className={`rounded-2xl p-3.5 text-left border transition-all ${
                            isSelected
                              ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_15px_rgba(0,172,71,0.25)]'
                              : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-heading text-xs font-bold text-white mb-1">
                            {item.label}
                          </div>
                          <p className="font-sans text-[11px] text-slate-400 leading-snug">
                            {item.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Date, Time & Attendee Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <User className="h-3 w-3 text-emerald-400" />
                      <span>Your Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Building className="h-3 w-3 text-cyan-400" />
                      <span>Organization / Company</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TechCorp / University"
                      value={guestOrg}
                      onChange={(e) => setGuestOrg(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-violet-400" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-violet-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-amber-400" />
                      <span>Preferred Time (IST)</span>
                    </label>
                    <input
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Primary Google Meet Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {/* Action 1: Add to Google Calendar with GMeet */}
                  <a
                    href={generateGoogleCalendarUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 px-5 py-3.5 text-xs font-semibold text-white shadow-[0_0_25px_rgba(0,172,71,0.35)] transition-all hover:scale-[1.02]"
                  >
                    <GoogleMeetIcon className="h-4 w-4" />
                    <span>Schedule via Google Calendar + Meet</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                  </a>

                  {/* Action 2: Launch Instant Google Meet Room */}
                  <a
                    href={personal.googleMeetUrl || 'https://meet.google.com/new'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 hover:border-emerald-400 px-5 py-3.5 text-xs font-semibold text-emerald-200 transition-all hover:scale-[1.02] shadow-sm"
                  >
                    <Video className="h-4 w-4 text-emerald-400" />
                    <span>Start Instant Google Meet Call</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                  </a>
                </div>

                {/* Secondary Option: Send GMeet Email Invitation Request */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-heading text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      Prefer Email Confirmation?
                    </span>
                    <p className="font-sans text-[11px] text-slate-400 mt-0.5">
                      Send your meeting agenda directly to Nikhil's inbox.
                    </p>
                  </div>

                  <a
                    href={generateMailtoUrl()}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-mono text-slate-200 hover:text-white hover:border-violet-400 transition-colors shrink-0"
                  >
                    <Mail className="h-3.5 w-3.5 text-violet-400" />
                    <span>Send GMeet Request via Email</span>
                  </a>
                </div>

              </div>
            ) : (
              /* CALENDLY EMBED / BACKUP VIEW */
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-white">
                    Alternative: Calendly Booking
                  </h3>
                  <a
                    href={personal.calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:underline"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  If you prefer using a self-serve scheduling widget, you can use Nikhil's Calendly calendar which automatically creates a Google Meet session upon confirmation.
                </p>

                <div className="p-4 rounded-xl border border-violet-500/20 bg-slate-900/60 font-mono text-xs text-slate-300 flex items-center justify-between">
                  <span>Target: {personal.calendlyUrl}</span>
                  <a
                    href={personal.calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-violet-600 hover:bg-violet-500 text-white px-3 py-1 text-xs"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            )}

            {/* Direct Contact Reference Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span>Google Account:</span>
                <span className="text-emerald-400 font-semibold">{personal.socials.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="rounded p-1 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Copy Email Address"
                >
                  {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-500">Video: Google Meet HD</span>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white underline"
                >
                  Close
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
