import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Scissors, Gem, Paintbrush, Wand2, CheckCircle2, Trophy, ArrowRight, Heart } from 'lucide-react';
import { playSound } from '../utils/audio';

const MAKEOVER_STEPS = [
  {
    id: 'jargon',
    toolName: '✂️ Jargon Trimmer',
    desc: 'Cut out generic soft buzzwords and replace with hard technical tools.',
    before: '• Hard-working, punctual team player who likes coding and learning.',
    after: '• Engineered microservices in Node.js & TypeScript, optimizing cache lookups with Redis.',
    fixed: false
  },
  {
    id: 'metrics',
    toolName: '💎 Impact Highlighter',
    desc: 'Inject quantifiable business numbers and performance statistics.',
    before: '• Made our college fest registration website faster and handled users.',
    after: '• Reduced API p99 latency by 42% and scaled system throughput to 15,000 concurrent requests during college fest.',
    fixed: false
  },
  {
    id: 'verbs',
    toolName: '💄 Power-Verb Polish',
    desc: 'Replace weak passive words with executive technical action verbs.',
    before: '• Helped with developing backend queries and fixed bugs.',
    after: '• Architected PostgreSQL schema with B-Tree indexing, eliminating N+1 query bottlenecks.',
    fixed: false
  },
  {
    id: 'layout',
    toolName: '🎨 FAANG Layout Brush',
    desc: 'Apply clean single-column hierarchy adhering to ATS standards.',
    before: '• Unstructured 3-column table with multi-color fonts and no dates.',
    after: '• Standard single-column ATS-compliant structure with clear Timeline, Tech Stack tags, and verified GitHub links.',
    fixed: false
  }
];

export const ResumeMakeoverGame = ({ onGameComplete }) => {
  const [makeoverSteps, setMakeoverSteps] = useState(MAKEOVER_STEPS);
  const [activeTool, setActiveTool] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const fixedCount = makeoverSteps.filter(s => s.fixed).length;
  const glowUpPercent = 20 + fixedCount * 20;

  const handleApplyTool = (stepId) => {
    playSound('correct');
    setMakeoverSteps(prev =>
      prev.map(s => (s.id === stepId ? { ...s, fixed: true } : s))
    );

    if (fixedCount + 1 === makeoverSteps.length) {
      handleCompleteGlowUp();
    }
  };

  const handleCompleteGlowUp = () => {
    playSound('victory');
    setIsFinished(true);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });

    setTimeout(() => {
      if (onGameComplete) {
        onGameComplete(1000, 3);
      }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn select-none">
      {/* Salon HUD */}
      <div className="glass-panel p-6 rounded-3xl border border-pink-500/40 bg-gradient-to-r from-[#240d1a] via-[#1a0c18] to-[#0a0c1a] flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-3xl">
            💄
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-white text-lg">Resume Glow-Up Salon</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
                MAKEOVER STUDIO
              </span>
            </div>
            <p className="text-xs text-pink-300 font-mono">Transform a messy profile into a FAANG Gold Resume</p>
          </div>
        </div>

        {/* Glow-Up Meter */}
        <div className="w-full md:w-56 space-y-1 text-xs font-mono">
          <div className="flex justify-between font-bold">
            <span className="text-pink-300">GLOW-UP SCORE</span>
            <span className="text-emerald-400">{glowUpPercent}% / 100%</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${glowUpPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Makeover Transformation Studio */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/15 space-y-6 bg-[#0c0e1e]">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <span className="text-xs font-mono font-bold text-slate-300">
            Candidate: Alex's Resume Makeover ({fixedCount} of {makeoverSteps.length} Sections Polished)
          </span>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            {isFinished ? '✨ 100% FAANG READY!' : 'Tap tools to apply glow-up'}
          </span>
        </div>

        {/* Sections List */}
        <div className="space-y-4">
          {makeoverSteps.map((step, idx) => (
            <div
              key={step.id}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                step.fixed
                  ? 'bg-emerald-950/25 border-emerald-500/50 text-slate-200 shadow-md shadow-emerald-500/10'
                  : 'bg-white/[0.03] border-white/10 hover:border-pink-500/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-pink-300">
                  {step.toolName}
                </span>

                {step.fixed ? (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 size={14} /> GLOWED UP
                  </span>
                ) : (
                  <button
                    onClick={() => handleApplyTool(step.id)}
                    className="btn-cyber-primary py-1.5 px-4 text-xs font-bold flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30"
                  >
                    <Wand2 size={13} />
                    <span>Apply {step.toolName.split(' ')[1]}</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] font-mono text-slate-400 mb-2">{step.desc}</p>

              {/* Before vs After Box */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs leading-relaxed">
                {step.fixed ? (
                  <span className="text-emerald-300 font-medium">{step.after}</span>
                ) : (
                  <span className="text-rose-400/80 line-through">{step.before}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Finished Celebration Banner */}
        {isFinished && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500 text-center space-y-2 animate-bounce">
            <h3 className="font-heading font-black text-xl text-white">
              👑 Perfect Makeover! 100% FAANG-Ready Resume Created!
            </h3>
            <p className="text-xs text-emerald-200 font-mono">
              +1,000 XP & 3 Gold Stars ⭐⭐⭐ Earned!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
