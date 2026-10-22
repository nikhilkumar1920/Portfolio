import { useState, useEffect } from 'react';
import { 
  Code2, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const LeetCodeStats = () => {
  const { leetcode } = PORTFOLIO_DATA;
  const [stats, setStats] = useState(leetcode);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Attempt optional client-side fetch from community CORS-safe LeetCode API
    const fetchLiveStats = async () => {
      try {
        const username = 'nikhilkumar1920';
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.status === 'success' && data.totalSolved) {
            setStats({
              totalSolved: data.totalSolved,
              easy: data.easySolved,
              medium: data.mediumSolved,
              hard: data.hardSolved,
              acceptanceRate: `${data.acceptanceRate}%`,
              lastUpdated: 'Live Today',
              profileUrl: leetcode.profileUrl,
            });
            setIsLive(true);
          }
        }
      } catch {
        // Gracefully keep centralized verified configuration data
        setIsLive(false);
      }
    };

    fetchLiveStats();
  }, [leetcode]);

  const easyPercent = Math.round((stats.easy / stats.totalSolved) * 100) || 44;
  const mediumPercent = Math.round((stats.medium / stats.totalSolved) * 100) || 49;
  const hardPercent = Math.round((stats.hard / stats.totalSolved) * 100) || 7;

  return (
    <section id="leetcode" className="relative py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-950/20 px-3 py-1 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            <Code2 className="h-3 w-3" />
            Algorithmic Problem Solving
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            LeetCode Engineering Profile
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Data structures, algorithms, graph theory, dynamic programming, and computational complexity.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-500 to-violet-500" />
        </div>

        {/* Main Card Container */}
        <div className="mx-auto max-w-4xl glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-2xl relative overflow-hidden">
          
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Code2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                  <span>@{stats.profileUrl.split('/').filter(Boolean).pop()}</span>
                </h3>
                <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 inline" />
                  {isLive ? 'Real-time Live Sync' : `Verified Config • Updated ${stats.lastUpdated}`}
                </span>
              </div>
            </div>

            <a
              href={stats.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 px-5 py-2.5 text-xs font-semibold text-slate-950 font-mono shadow-lg transition-all hover:scale-105"
            >
              <span>View LeetCode Profile</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Stats Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
            {/* Total Solved */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white">
                {stats.totalSolved}
              </span>
              <span className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                Total Solved
              </span>
              {stats.acceptanceRate && (
                <span className="font-mono text-[11px] text-cyan-400 mt-2">
                  Acceptance: {stats.acceptanceRate}
                </span>
              )}
            </div>

            {/* Easy */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-3xl font-bold text-emerald-400">
                {stats.easy}
              </span>
              <span className="font-sans text-xs font-semibold text-emerald-200 uppercase tracking-wider mt-1">
                Easy
              </span>
              <span className="font-mono text-[11px] text-slate-400 mt-2">
                {easyPercent}% of Total
              </span>
            </div>

            {/* Medium */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-3xl font-bold text-amber-400">
                {stats.medium}
              </span>
              <span className="font-sans text-xs font-semibold text-amber-200 uppercase tracking-wider mt-1">
                Medium
              </span>
              <span className="font-mono text-[11px] text-slate-400 mt-2">
                {mediumPercent}% of Total
              </span>
            </div>

            {/* Hard */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-3xl font-bold text-rose-400">
                {stats.hard}
              </span>
              <span className="font-sans text-xs font-semibold text-rose-200 uppercase tracking-wider mt-1">
                Hard
              </span>
              <span className="font-mono text-[11px] text-slate-400 mt-2">
                {hardPercent}% of Total
              </span>
            </div>
          </div>

          {/* Difficulty Visual Distribution Bar */}
          <div className="pt-2">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
              <span>Difficulty Distribution</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Easy
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="h-2 w-2 rounded-full bg-amber-400" /> Medium
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="h-2 w-2 rounded-full bg-rose-400" /> Hard
                </span>
              </div>
            </div>

            {/* Progress Segment Bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800 flex">
              <div
                style={{ width: `${easyPercent}%` }}
                className="bg-emerald-400 transition-all duration-700"
                title={`Easy: ${stats.easy}`}
              />
              <div
                style={{ width: `${mediumPercent}%` }}
                className="bg-amber-400 transition-all duration-700"
                title={`Medium: ${stats.medium}`}
              />
              <div
                style={{ width: `${hardPercent}%` }}
                className="bg-rose-500 transition-all duration-700"
                title={`Hard: ${stats.hard}`}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
