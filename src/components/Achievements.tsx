import { motion } from 'framer-motion';
import { 
  Trophy,
  Award, 
  Star, 
  GraduationCap, 
  FileCheck, 
  CheckCircle,
  Building2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Achievements = () => {
  const { achievements, personal, certifications } = PORTFOLIO_DATA;

  return (
    <section id="achievements" className="relative py-24 overflow-hidden bg-slate-950/40 border-t border-slate-900">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-80 w-80 rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Trophy className="h-3 w-3" />
            Milestones & Credentials
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Honors, Education & Certifications
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Verified competitive recognitions, undergraduate degree program, and professional certifications.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Top Grid: Competitive Achievements */}
        <div className="mb-14">
          <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            Competitive Honors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-amber-500/25 shadow-xl relative overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold uppercase text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400/20" />
                      {item.badgeText}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {item.year}
                    </span>
                  </div>

                  <h4 className="font-heading text-xl font-bold text-white group-hover:text-amber-200 transition-colors mb-2">
                    {item.title}
                  </h4>
                  <div className="font-mono text-xs text-cyan-400 mb-3">
                    {item.organization}
                  </div>

                  <p className="font-sans text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Verified Distinction</span>
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Split: Education & Professional Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education */}
          <div className="lg:col-span-5">
            <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-cyan-400" />
              Academic Education
            </h3>

            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/20 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded">
                  {personal.education.period}
                </span>
                <span className="font-mono text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                  CGPA: {personal.education.cgpa}
                </span>
              </div>

              <h4 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
                {personal.education.degree}
              </h4>

              <div className="flex items-center gap-2 font-sans text-sm text-slate-300 mb-4">
                <Building2 className="h-4 w-4 text-violet-400 shrink-0" />
                <span>{personal.education.institution}</span>
              </div>

              <p className="font-sans text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3 mb-4">
                Comprehensive training across cryptography, data structures, network security, operating systems, database management, and intelligent systems.
              </p>

              {/* Secondary Education Timeline */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-heading font-semibold text-white">Class 12 (Senior Secondary)</span>
                    <span className="block font-sans text-[11px] text-slate-400">Sriviswasanthi Education Institution • 2022–2023</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">70%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-heading font-semibold text-white">Class 10 (Secondary School)</span>
                    <span className="block font-sans text-[11px] text-slate-400">Sriviswasanthi Education Institution • 2020–2021</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">84%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-7">
            <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-violet-400" />
              Verified Certifications & Training
            </h3>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="glass-card rounded-xl p-5 border border-slate-800 flex items-start gap-4 hover:border-violet-500/40 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-950/40 border border-violet-500/30 text-violet-400 mt-0.5">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-heading text-base font-bold text-white">
                        {cert.title}
                      </h4>
                      <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                        {cert.issuer}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-slate-300 leading-relaxed mt-1">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
