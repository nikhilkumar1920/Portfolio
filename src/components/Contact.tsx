import { useState } from 'react';
import { 
  Mail, 
  Send, 
  Calendar, 
  Copy, 
  Check, 
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { LinkedinIcon } from './SocialIcons';
import { GoogleMeetIcon } from './GoogleMeetIcon';

interface ContactProps {
  onOpenScheduler: () => void;
}

export const Contact = ({ onOpenScheduler }: ContactProps) => {
  const { personal } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.socials.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setStatusMessage('Preparing your transmission...');

    const customEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    if (customEndpoint) {
      try {
        const response = await fetch(customEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setStatus('success');
          setStatusMessage('Message successfully transmitted. I will respond within 24-48 hours.');
          setFormData({ name: '', email: '', subject: '', message: '' });
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
        } else {
          throw new Error('Endpoint returned error');
        }
      } catch (err) {
        setStatus('error');
        setStatusMessage('Error submitting to custom endpoint. Falling back to email client...');
        openMailto();
      }
    } else {
      // Direct mailto fallback with honest user feedback
      setTimeout(() => {
        openMailto();
        setStatus('success');
        setStatusMessage('Opening your default email client with your message prepared. Thank you for reaching out!');
      }, 500);
    }
  };

  const openMailto = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${personal.socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Mail className="h-3 w-3" />
            Get In Touch
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Have an interesting problem to solve?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            I'm always interested in discussing software engineering, AI research, developer tools, and opportunities to build useful technology.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Quick Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <button
            onClick={onOpenScheduler}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule a Meeting</span>
          </button>

          <a
            href={`mailto:${personal.socials.email}`}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-violet-500 px-6 py-3 text-xs font-mono text-slate-200 transition-all hover:scale-105"
          >
            <Mail className="h-4 w-4 text-violet-400" />
            <span>Send an Email</span>
          </a>

          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/40 px-6 py-3 text-xs font-mono text-cyan-300 transition-all hover:scale-105"
          >
            <LinkedinIcon className="h-4 w-4" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>

        {/* Grid: Contact Information & Functional Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-violet-500/20 shadow-xl">
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Direct Channels
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Feel free to reach out directly via email, phone, or schedule a calendar invitation.
              </p>

              {/* Email Box with Copy */}
              <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex items-center justify-between">
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] uppercase text-slate-500">Email</span>
                  <a
                    href={`mailto:${personal.socials.email}`}
                    className="block font-mono text-sm text-cyan-300 truncate hover:underline"
                  >
                    {personal.socials.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy Email"
                  className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Phone Box with Copy */}
              <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-500">Phone / WhatsApp</span>
                  <a
                    href={`tel:${personal.socials.phone}`}
                    className="block font-mono text-sm text-slate-300 hover:underline"
                  >
                    {personal.socials.phone}
                  </a>
                </div>
                <button
                  onClick={handleCopyPhone}
                  aria-label="Copy Phone"
                  className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                >
                  {copiedPhone ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Location Box */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 mb-4">
                <span className="font-mono text-[10px] uppercase text-slate-500">Location</span>
                <div className="flex items-center gap-2 font-sans text-sm text-slate-300 mt-1">
                  <MapPin className="h-4 w-4 text-violet-400 shrink-0" />
                  <span>{personal.location}</span>
                </div>
              </div>

              {/* Google Meet Video Scheduling Card */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex flex-col justify-between gap-3 shadow-[0_0_20px_rgba(0,172,71,0.15)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GoogleMeetIcon className="h-4 w-4" />
                    <span className="font-heading text-xs font-bold text-white">
                      Google Meet Video Call
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    1-on-1 HD
                  </span>
                </div>
                <p className="font-sans text-[11px] text-slate-400 leading-snug">
                  Schedule an instant or planned 15, 30, or 45-minute video discussion via Google Meet.
                </p>
                <button
                  type="button"
                  onClick={onOpenScheduler}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 py-2.5 font-mono text-xs font-semibold text-white shadow-md transition-all hover:scale-[1.01]"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Schedule on Google Meet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the details below. Messages are routed directly to Nikhil's inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block font-mono text-xs text-slate-300 mb-1.5">
                      Your Name <span className="text-violet-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block font-mono text-xs text-slate-300 mb-1.5">
                      Your Email <span className="text-violet-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@organization.com"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block font-mono text-xs text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Internship opportunity / AI collaboration / Inquiry"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block font-mono text-xs text-slate-300 mb-1.5">
                    Message <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Nikhil, I came across your portfolio and wanted to discuss..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                  />
                </div>

                {/* Status Notice */}
                {status !== 'idle' && (
                  <div
                    className={`rounded-xl p-3 text-xs font-sans ${
                      status === 'error'
                        ? 'bg-rose-950/30 border border-rose-500/40 text-rose-300'
                        : status === 'success'
                        ? 'bg-emerald-950/30 border border-emerald-500/40 text-emerald-300'
                        : 'bg-violet-950/30 border border-violet-500/40 text-violet-300'
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 py-3 text-xs font-semibold font-mono text-white shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{status === 'loading' ? 'Transmitting...' : 'Send Message ↵'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
