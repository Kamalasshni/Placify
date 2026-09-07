import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Target, 
  Swords, 
  Code2, 
  Radio, 
  Network, 
  Radar, 
  ArrowRight, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  AlertCircle,
  Play
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const DashboardView = ({ setActiveTab, onOpenCompanyModal }) => {
  const { 
    user, 
    targetCompany, 
    diagnosticReport, 
    quests, 
    completedStages, 
    badges,
    setShowCertModal
  } = useGame();

  const completedQuestCount = quests.filter(q => q.completed).length;
  const currentCompanyStages = completedStages[targetCompany.id] || [];
  const bossUnlocked = currentCompanyStages.length >= 4;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome & Campaign Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-indigo-500/30 p-6 md:p-10 shadow-2xl bg-gradient-to-br from-[#0c0e1e] via-[#11162e] to-[#090b14]">
        {/* Decorative background aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles size={13} className="text-cyan-400" />
                <span>TEAM GLITCH THEORY</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 font-mono text-xs border border-white/10">
                ACTIVE TARGET: <strong className="text-white">{targetCompany.name}</strong>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">
              Gamify Your <span className="gradient-text-primary">Placement Journey</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Tired of random prep across 10 different platforms? Placify transforms your technical, aptitude, and interview preparation into an adaptive RPG where every quest levels you up for your dream company.
            </p>

            {/* Core Game Loop Flow Pill */}
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-indigo-400 font-bold">1. Choose Company</span>
              <span>→</span>
              <span className="text-purple-400 font-bold">2. Diagnostic Test</span>
              <span>→</span>
              <span className="text-cyan-400 font-bold">3. Skill Gap Quests</span>
              <span>→</span>
              <span className="text-emerald-400 font-bold">4. Company Worlds</span>
              <span>→</span>
              <span className="text-amber-400 font-bold">5. Boss Battle</span>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {!diagnosticReport ? (
                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('assessment');
                  }}
                  className="btn-cyber-primary px-6 py-3 text-sm font-bold shadow-lg shadow-indigo-500/30"
                >
                  <Play size={16} />
                  <span>Take 5-Min Diagnostic Test</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('worlds');
                  }}
                  className="btn-cyber-primary px-6 py-3 text-sm font-bold shadow-lg shadow-indigo-500/30"
                >
                  <Compass size={16} />
                  <span>Enter {targetCompany.name} World Map</span>
                </button>
              )}

              <button
                onClick={() => {
                  playSound('click');
                  setActiveTab('boss');
                }}
                className="btn-cyber-secondary px-5 py-3 text-sm font-semibold flex items-center gap-2"
              >
                <Swords size={16} className="text-rose-400" />
                <span>Boss Battle Arena</span>
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  onOpenCompanyModal();
                }}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono border border-white/10 transition"
              >
                Switch Company
              </button>
            </div>
          </div>

          {/* Right Card: Placement Readiness Gauge (PRI) */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow p-6 rounded-2xl border border-indigo-500/40 bg-gradient-to-b from-[#131833] to-[#0c0e1e] relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                    PLACEMENT READINESS INDEX
                  </span>
                  <h3 className="font-heading font-black text-xl text-white">PRI Metric</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                  {user.priScore >= 80 ? 'TIER-1 READY' : user.priScore >= 60 ? 'ON TRACK' : 'NEEDS PRACTICE'}
                </div>
              </div>

              {/* Big Score Radial */}
              <div className="flex items-center justify-center my-6">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#priGradient)"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * user.priScore) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="priGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-heading font-black text-white">{user.priScore}%</span>
                    <span className="text-[10px] font-mono text-slate-400">PROBABILITY</span>
                  </div>
                </div>
              </div>

              {/* PRI Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    Target: {targetCompany.name} ({targetCompany.ctc})
                  </span>
                  <span className="font-mono text-white font-semibold">Stage {currentCompanyStages.length}/5</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    Boss Status
                  </span>
                  <span className={`font-mono font-semibold ${bossUnlocked ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {bossUnlocked ? '⚔️ UNLOCKED' : '🔒 Stage 5 Locked'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  playSound('click');
                  setShowCertModal(true);
                }}
                className="mt-4 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-heading font-semibold border border-white/10 transition flex items-center justify-center gap-1.5"
              >
                <Trophy size={14} className="text-amber-400" />
                <span>View Certified Placement Card</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recommended Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: AI Diagnostic & Skill Gap */}
        <div 
          onClick={() => {
            playSound('click');
            setActiveTab(diagnosticReport ? 'radar' : 'assessment');
          }}
          className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-950/20 transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Radar size={24} />
          </div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading font-bold text-lg text-white group-hover:text-cyan-300 transition">
              {diagnosticReport ? 'AI Skill Gap Radar' : 'Diagnostic Assessment'}
            </h3>
            <ArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            {diagnosticReport 
              ? `AI Coach identified ${diagnosticReport.weakSkills.length} target gap areas. Click to inspect your skill polygon.`
              : 'Take a 10-question placement quiz to identify exact weaknesses in Aptitude, DSA, OS/DBMS, and HR.'
            }
          </p>
          <span className="text-xs font-mono font-semibold text-indigo-400 flex items-center gap-1">
            {diagnosticReport ? '📊 View Radar & Analytics' : '⚡ Start Assessment'}
          </span>
        </div>

        {/* Card 2: Interactive Code Arena */}
        <div 
          onClick={() => {
            playSound('click');
            setActiveTab('code-arena');
          }}
          className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/20 transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Code2 size={24} />
          </div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading font-bold text-lg text-white group-hover:text-purple-300 transition">
              Code Arena Runner
            </h3>
            <ArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            In-browser coding editor supporting JavaScript, Python, C++, and Java with runnable test suites and instant AI hints.
          </p>
          <span className="text-xs font-mono font-semibold text-purple-400 flex items-center gap-1">
            💻 Open Code Playground
          </span>
        </div>

        {/* Card 3: AI Mock Interview */}
        <div 
          onClick={() => {
            playSound('click');
            setActiveTab('mock-interview');
          }}
          className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Radio size={24} />
          </div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading font-bold text-lg text-white group-hover:text-emerald-300 transition">
              AI Mock Interviewer
            </h3>
            <ArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Simulate realistic technical and behavioral interviews. Get scored on the STAR framework with AI constructive critiques.
          </p>
          <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1">
            🎙️ Launch AI Interview
          </span>
        </div>
      </div>

      {/* Daily Quests Board Preview */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                PERSONALIZED QUEST LOG
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">{completedQuestCount} of {quests.length} Completed</span>
            </div>
            <h2 className="text-2xl font-heading font-black text-white">Active Daily Quests</h2>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setActiveTab('quests');
            }}
            className="btn-cyber-secondary text-xs px-4 py-2 font-semibold"
          >
            <span>View All Quests</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quests.slice(0, 4).map((quest) => (
            <div
              key={quest.id}
              className={`p-4 rounded-2xl border transition ${
                quest.completed 
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                    {quest.category}
                  </span>
                  {quest.completed && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1">
                      <CheckCircle2 size={11} /> COMPLETED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-purple-400 font-bold">+{quest.xpReward} XP</span>
                  <span className="text-cyan-400 font-bold">+{quest.gemReward} 💎</span>
                </div>
              </div>

              <h4 className="font-heading font-bold text-sm text-white mb-1">
                {quest.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {quest.description}
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Progress: {quest.progress} / {quest.maxProgress}</span>
                {!quest.completed && (
                  <span className="text-indigo-400 font-semibold cursor-pointer hover:underline" onClick={() => setActiveTab('quests')}>
                    Open Quest →
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
