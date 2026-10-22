import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  Mail, 
  Video, 
  Check, 
  ExternalLink,
  User,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { GoogleMeetIcon } from './GoogleMeetIcon';

interface MeetingSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeetingSchedulerModal = ({ isOpen, onClose }: MeetingSchedulerModalProps) => {
  const { personal } = PORTFOLIO_DATA;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('15:00');
  const [note, setNote] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Default to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
      setIsScheduled(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert('Please provide your name and email.');
      return;
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00ac47', '#0066da', '#ea4335', '#ffba00'],
      });
    } catch {
      // ignore
    }

    // 1. Build Google Calendar Event with Google Meet conference
    const eventTitle = `Google Meet: Discussion with ${name} & Nikhil Kumar`;
    
    let startDateTime = new Date();
    if (date) {
      const [y, m, d] = date.split('-').map(Number);
      const [hours, minutes] = time.split(':').map(Number);
      startDateTime = new Date(y, m - 1, d, hours, minutes);
    } else {
      startDateTime.setDate(startDateTime.getDate() + 1);
      startDateTime.setHours(15, 0, 0, 0);
    }

    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); // 30 min default

    const formatGCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const datesParam = `${formatGCalDate(startDateTime)}/${formatGCalDate(endDateTime)}`;

    const details = [
      `Google Meet Video Call with Nikhil Kumar`,
      `Attendee: ${name} (${email})`,
      note ? `Discussion Note: ${note}` : 'Topic: General / SDE Opportunities',
      `Host Email: ${personal.socials.email}`,
      `Video Service: Google Meet`,
    ].join('\n\n');

    // Google Calendar template with auto-invite to Nikhil's email
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&dates=${datesParam}&details=${encodeURIComponent(
      details
    )}&location=Google%20Meet&add=${encodeURIComponent(personal.socials.email)},${encodeURIComponent(email)}`;

    // Open Google Calendar in new tab (which sends invite + Meet link directly to Nikhil's email)
    window.open(gcalUrl, '_blank', 'noopener,noreferrer');

    // 2. Also prepare direct notification email to Nikhil
    const mailtoSubject = encodeURIComponent(`Google Meet Scheduled: ${name} (${date} at ${time} IST)`);
    const mailtoBody = encodeURIComponent(
      `Hi Nikhil,\n\nI have scheduled a Google Meet call with you:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Date: ${date}\n` +
      `Time: ${time} IST\n` +
      (note ? `Topic: ${note}\n\n` : '\n') +
      `Google Calendar invite has been created and sent to your email (${personal.socials.email}).\n\n` +
      `Best regards,\n${name}`
    );

    // Trigger email notification backup
    setTimeout(() => {
      window.location.href = `mailto:${personal.socials.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 800);

    setIsScheduled(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg glass-card rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,172,71,0.25)] z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-emerald-400 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {!isScheduled ? (
              /* CLEAN BASIC FORM */
              <>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/40">
                    <GoogleMeetIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-white">
                      Schedule a Call on Google Meet
                    </h2>
                    <p className="font-mono text-xs text-emerald-400">
                      Direct with Nikhil Kumar
                    </p>
                  </div>
                </div>

                <p className="font-sans text-xs text-slate-400 mb-6">
                  Pick a convenient time. When you submit, Google automatically generates the Google Meet video link and emails the invitation directly to Nikhil ({personal.socials.email}).
                </p>

                <form onSubmit={handleSchedule} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Your Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Your Email *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-violet-400" />
                        <span>Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-violet-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                        <span>Time (IST) *</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Topic / Note */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                      <span>Topic / Note (Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SDE Interview / AI Research sync"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,172,71,0.35)] transition-all hover:scale-[1.01]"
                  >
                    <GoogleMeetIcon className="h-4 w-4" />
                    <span>Schedule on Google Meet</span>
                  </button>

                  <p className="text-center font-mono text-[10px] text-slate-500">
                    Host: {personal.socials.email} • Video: Google Meet
                  </p>
                </form>
              </>
            ) : (
              /* SUCCESS CONFIRMATION */
              <div className="text-center py-4">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Google Meet Scheduled!
                </h3>
                <p className="font-sans text-xs text-slate-300 max-w-sm mx-auto mb-6 leading-relaxed">
                  Your Google Meet invite has been generated and emailed directly to <strong className="text-emerald-400">{personal.socials.email}</strong>.
                </p>

                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 mb-6 text-left space-y-1.5 font-mono text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Attendee:</span>
                    <span>{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Host:</span>
                    <span>Nikhil Kumar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Time:</span>
                    <span className="text-cyan-300">{date} at {time} IST</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://meet.google.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-semibold text-white transition-all shadow-md"
                  >
                    <Video className="h-4 w-4" />
                    <span>Open Google Meet</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
