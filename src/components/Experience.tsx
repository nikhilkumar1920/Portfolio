import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Experience = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-80 w-80 rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Briefcase className="h-3 w-3" />
            Career History
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Experience & Internships
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Applied engineering and academic research roles spanning software systems and signal modeling.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Timeline Center Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400 to-indigo-600 opacity-30" />

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.role + item.organization}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glowing Node Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border-2 border-cyan-400 shadow-[0_0_15px_#22d3ee] z-10">
                    <div className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                  </div>

                  {/* Empty side for centering on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className={`ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:mr-8' : 'md:ml-8'
                    }`}
                  >
                    <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 shadow-xl group">
                      
                      {/* Period Badge & Location */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                          <Calendar className="h-3 w-3" />
                          {item.period}
                        </span>
                        <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-500" />
                          {item.location}
                        </span>
                      </div>

                      {/* Role & Org */}
                      <h3 className="font-heading text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {item.role}
                      </h3>
                      <div className="font-mono text-xs font-medium text-violet-400 mb-4 flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5" />
                        <span>{item.organization}</span>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-sm text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 mb-5">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                        {item.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
