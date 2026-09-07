import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Flame, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Lock, 
  Share2,
  GraduationCap,
  Globe
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

const LEADERBOARD_STUDENTS = [
  { rank: 1, name: 'Aditya Sharma', college: 'IIT Madras', target: 'Google', level: 9, pri: 98, xp: 9450, avatar: '👑' },
  { rank: 2, name: 'Pooja Iyer', college: 'BITS Pilani', target: 'Microsoft', level: 8, pri: 94, xp: 7820, avatar: '💎' },
  { rank: 3, name: 'Rahul Varma', college: 'NIT Trichy', target: 'Amazon', level: 8, pri: 91, xp: 7200, avatar: '🔥' },
  { rank: 4, name: 'Kamalasshni M (You)', college: 'College of Engineering', target: 'Google', level: 4, pri: 82, xp: 1850, avatar: '🚀', isUser: true },
  { rank: 5, name: 'Siddharth Roy', college: 'VIT Vellore', target: 'Zoho', level: 4, pri: 79, xp: 1620, avatar: '⚡' },
  { rank: 6, name: 'Ananya Deshmukh', college: 'SRM Institute', target: 'Goldman Sachs', level: 3, pri: 74, xp: 1200, avatar: '🎯' },
  { rank: 7, name: 'Karthik Raja', college: 'PSG Tech', target: 'TCS Digital', level: 3, pri: 70, xp: 980, avatar: '🛡️' }
];

const ALL_POSSIBLE_BADGES = [
  { id: 'b-first-login', name: 'Placify Initiate', desc: 'Joined the gamified placement journey.', icon: '⚡' },
  { id: 'b-streak-5', name: 'Streak Flame', desc: 'Maintained a 5-day daily placement streak.', icon: '🔥' },
  { id: 'b-algo-solve', name: 'Clean Complexity', desc: 'Solved an optimal O(N) Hash Map algorithm in the Code Arena.', icon: '💎' },
  { id: 'b-diag-pioneer', name: 'Diagnostic Pioneer', desc: 'Completed AI skill gap analysis across all 5 placement pillars.', icon: '🧠' },
  { id: 'b-boss-slayer', name: 'Boss Slayer', desc: 'Defeated a Target Company Hiring Bar Boss.', icon: '⚔️' },
  { id: 'b-star-master', name: 'STAR Master', desc: 'Scored 85%+ on the AI Mock Interview Behavioral Rubric.', icon: '🏆' }
];

export const LeaderboardBadgesView = () => {
  const { 
    user, 
    badges, 
    setShowCertModal, 
    resetProgress 
  } = useGame();

  const [leaderboardTab, setLeaderboardTab] = useState('global');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5">
              <Trophy size={13} />
              <span>GLOBAL & COLLEGE HALL OF FAME</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">• Competitive Leaderboard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            Leaderboard & Badges
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Rank up on the global placement ladder, collect rare interview badges, and view certified credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click');
              setShowCertModal(true);
            }}
            className="btn-cyber-primary text-xs px-5 py-2.5 flex items-center gap-2"
          >
            <Award size={15} />
            <span>View My Certificate</span>
          </button>
        </div>
      </div>

      {/* Grid: Leaderboard (Left) + Badges Showcase (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Leaderboard Table */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="font-heading font-bold text-white text-base flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" />
              <span>Placement Ranks</span>
            </h2>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setLeaderboardTab('global')}
                className={`px-3 py-1 rounded-lg transition ${
                  leaderboardTab === 'global' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Global
              </button>
              <button
                onClick={() => setLeaderboardTab('college')}
                className={`px-3 py-1 rounded-lg transition ${
                  leaderboardTab === 'college' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                College Tier
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 font-mono">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">CANDIDATE</th>
                  <th className="py-2.5 px-3">TARGET</th>
                  <th className="py-2.5 px-3">PRI SCORE</th>
                  <th className="py-2.5 px-3">TOTAL XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {LEADERBOARD_STUDENTS.map((st) => (
                  <tr
                    key={st.rank}
                    className={`transition ${
                      st.isUser 
                        ? 'bg-indigo-950/40 text-white font-semibold' 
                        : 'hover:bg-white/[0.02] text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold">
                      {st.rank === 1 ? '🥇' : st.rank === 2 ? '🥈' : st.rank === 3 ? '🥉' : `#${st.rank}`}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{st.avatar}</span>
                        <div>
                          <span className="font-heading font-bold text-white block truncate">{st.name}</span>
                          <span className="text-[10px] text-slate-400 block">{st.college}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {st.target}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-emerald-400">{st.pri}%</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-purple-400 font-bold">
                      {st.xp} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Badges & Achievements */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="font-heading font-bold text-white text-base flex items-center gap-2">
                <Award size={18} className="text-cyan-400" />
                <span>Earned Achievements</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">
                {badges.length} of {ALL_POSSIBLE_BADGES.length} Badges
              </span>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 gap-3">
              {ALL_POSSIBLE_BADGES.map((b) => {
                const isUnlocked = badges.some(userBadge => userBadge.name === b.name || userBadge.id === b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                      isUnlocked
                        ? 'bg-purple-950/20 border-purple-500/30 shadow-md shadow-purple-500/10'
                        : 'bg-white/[0.01] border-white/5 opacity-40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{b.icon}</span>
                        {isUnlocked ? (
                          <CheckCircle2 size={14} className="text-emerald-400" />
                        ) : (
                          <Lock size={12} className="text-slate-500" />
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-xs text-white mb-1">
                        {b.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset Progress Box for Demos */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block font-mono">DEMO CONTROLS</span>
              <span className="text-slate-500 text-[11px]">Reset local demo progression</span>
            </div>
            <button
              onClick={() => {
                if (confirm('Reset your demo progress back to initial state?')) {
                  resetProgress();
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono transition cursor-pointer"
            >
              Reset Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
