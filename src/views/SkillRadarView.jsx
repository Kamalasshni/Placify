import React from 'react';
import { 
  Radar as RadarIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Target, 
  Bot, 
  RotateCcw,
  ShieldAlert,
  Zap,
  Award
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const SkillRadarView = ({ setActiveTab }) => {
  const { 
    user, 
    skillMastery, 
    diagnosticReport, 
    targetCompany, 
    setShowGlitchCoachModal 
  } = useGame();

  // Radar chart computation (5-point polygon)
  const categories = [
    { key: 'aptitude', label: 'Aptitude & Logic', angle: -90, color: '#06b6d4' },
    { key: 'dsa', label: 'DSA & Algorithms', angle: -18, color: '#a855f7' },
    { key: 'core_cs', label: 'OS & DBMS Core', angle: 54, color: '#6366f1' },
    { key: 'system_design', label: 'System Design', angle: 126, color: '#f59e0b' },
    { key: 'hr', label: 'HR & Leadership', angle: 198, color: '#10b981' }
  ];

  const center = 150;
  const maxRadius = 100;

  // Convert polar coordinates to Cartesian
  const getCoordinates = (angleDeg, value) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = (value / 100) * maxRadius;
    const x = center + r * Math.cos(angleRad);
    const y = center + r * Math.sin(angleRad);
    return { x, y };
  };

  // Build polygon path string for student mastery
  const polygonPoints = categories.map(cat => {
    const val = skillMastery[cat.key] || 50;
    const { x, y } = getCoordinates(cat.angle, val);
    return `${x},${y}`;
  }).join(' ');

  // Target company benchmark points (e.g. 85% requirement)
  const targetPoints = categories.map(cat => {
    const { x, y } = getCoordinates(cat.angle, 85);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-semibold border border-purple-500/30 flex items-center gap-1.5">
              <Sparkles size={13} className="text-purple-400" />
              <span>STEP 3: AI SKILL GAP DIAGNOSIS</span>
            </span>
            <span className="text-xs text-slate-400">• Dynamic Radar Model</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            Placement Competency & Skill Gap Radar
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Visualized comparison of your real skill metrics against the hiring benchmark for <strong>{targetCompany.name} ({targetCompany.badge})</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('assessment');
            }}
            className="btn-cyber-secondary text-xs px-4 py-2.5 flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>Retake Diagnostic</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              setActiveTab('quests');
            }}
            className="btn-cyber-primary text-xs px-5 py-2.5 flex items-center gap-2 shadow-lg shadow-indigo-500/30"
          >
            <Zap size={14} />
            <span>Start Remediation Quests</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart + AI Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive SVG Radar Chart */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
              <RadarIcon size={18} className="text-indigo-400" />
              <span>Skill Polygon Radar</span>
            </h3>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Your Skills
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600 border border-white/20" /> {targetCompany.name} Target
              </span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center my-2">
            <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
              {/* Concentric grid rings */}
              {[20, 40, 60, 80, 100].map(val => {
                const ringPoints = categories.map(cat => {
                  const { x, y } = getCoordinates(cat.angle, val);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polygon
                    key={val}
                    points={ringPoints}
                    fill="transparent"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Radial spoke lines */}
              {categories.map((cat, i) => {
                const { x, y } = getCoordinates(cat.angle, 100);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                );
              })}

              {/* Target Company Benchmark Polygon (Dashed outline) */}
              <polygon
                points={targetPoints}
                fill="rgba(99, 102, 241, 0.05)"
                stroke="rgba(99, 102, 241, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Student Mastery Polygon (Gradient Glow) */}
              <polygon
                points={polygonPoints}
                fill="url(#radarGradient)"
                stroke="#a855f7"
                strokeWidth="2.5"
                className="transition-all duration-700 ease-out drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
              />

              {/* Data points */}
              {categories.map((cat, i) => {
                const val = skillMastery[cat.key] || 50;
                const { x, y } = getCoordinates(cat.angle, val);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4.5"
                    fill={cat.color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Pillar Bar Summary */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5 text-xs font-mono">
            {categories.map(cat => {
              const val = skillMastery[cat.key] || 50;
              return (
                <div key={cat.key} className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-slate-400 block truncate">{cat.label}</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-white">{val}%</span>
                    <span className={`text-[10px] ${val >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {val >= 70 ? '✓ Proficient' : '⚠ Skill Gap'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Glitch Coach Analysis & Action Plan */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* AI Coach Card */}
          <div className="glass-panel-glow p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-[#121427] to-[#0c0e1e]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Bot size={22} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">Glitch AI Placement Diagnosis</h3>
                <span className="text-xs text-purple-400 font-mono">Personalized Learning Directive</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
              {diagnosticReport ? diagnosticReport.aiCoachFeedback : (
                `Diagnostic indicates high logical aptitude! To crack ${targetCompany.name}, your primary focus must be dynamic programming optimization and concurrency race-condition prevention.`
              )}
            </p>

            {/* Identified Gaps */}
            <div className="space-y-2 mb-4">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">
                HIGH PRIORITY REMEDIATIONS
              </h4>
              <div className="space-y-1.5">
                {(diagnosticReport?.weakSkills?.length ? diagnosticReport.weakSkills : ['Dynamic Programming', 'OS Deadlocks', 'B-Tree Indexing']).map((gap, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
                    <ShieldAlert size={14} className="text-rose-400 shrink-0" />
                    <span>Focus Gap: {gap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Identified Strengths */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">
                CONFIRMED STRENGTH PILLARS
              </h4>
              <div className="space-y-1.5">
                {(diagnosticReport?.strongSkills?.length ? diagnosticReport.strongSkills : ['Quantitative Math', 'STAR Method', 'Array Patterns']).map((str, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Mastered: {str}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-cyan-900/40 border border-indigo-500/30 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-heading font-bold text-white text-sm">Targeted Quests Generated</h4>
              <p className="text-xs text-slate-400">Complete these AI-assigned quests to boost your PRI score.</p>
            </div>
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('quests');
              }}
              className="btn-cyber-primary text-xs px-4 py-2 shrink-0 font-bold"
            >
              <span>View Quests</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
