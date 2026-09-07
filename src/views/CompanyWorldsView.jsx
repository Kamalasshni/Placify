import React from 'react';
import { 
  Compass, 
  Brain, 
  Code2, 
  Server, 
  UserCheck, 
  Swords, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Sparkles,
  Shield,
  Trophy,
  Play
} from 'lucide-react';
import { COMPANIES } from '../data/companies';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const CompanyWorldsView = ({ setActiveTab, setSelectedStageForRunner, onOpenCompanyModal }) => {
  const { 
    targetCompany, 
    completedStages, 
    setTargetCompany 
  } = useGame();

  const stagesCompletedList = completedStages[targetCompany.id] || [];

  const stages = [
    {
      stageNumber: 1,
      title: 'Stage 1: Aptitude Citadel',
      category: 'Screening Round',
      desc: 'Speed Math, Permutations, Logical Puzzles & Series deduction.',
      icon: Brain,
      color: '#06b6d4',
      xp: 200,
      gems: 25,
      viewTarget: 'stage-runner'
    },
    {
      stageNumber: 2,
      title: 'Stage 2: Algorithm Dungeon',
      category: 'Technical Round 1',
      desc: 'In-browser Coding Challenge with runnable test suites and Big-O verification.',
      icon: Code2,
      color: '#a855f7',
      xp: 350,
      gems: 40,
      viewTarget: 'stage-runner'
    },
    {
      stageNumber: 3,
      title: 'Stage 3: Core CS & System Tower',
      category: 'Technical Round 2',
      desc: 'OS Concurrency, Deadlocks, SQL Normalization & Network Architecture.',
      icon: Server,
      color: '#6366f1',
      xp: 300,
      gems: 35,
      viewTarget: 'stage-runner'
    },
    {
      stageNumber: 4,
      title: 'Stage 4: HR & Behavioral Arena',
      category: 'Behavioral & Leadership',
      desc: 'Culture alignment, conflict resolution & STAR method scoring.',
      icon: UserCheck,
      color: '#10b981',
      xp: 250,
      gems: 30,
      viewTarget: 'stage-runner'
    },
    {
      stageNumber: 5,
      title: `Stage 5: ${targetCompany.boss.name}`,
      category: 'THE FINAL BOSS BATTLE',
      desc: `Live RPG combat with health bars, combo streaks, and ${targetCompany.name} bar-raising questions.`,
      icon: Swords,
      color: '#ef4444',
      xp: 600,
      gems: 100,
      isBoss: true,
      viewTarget: 'boss'
    }
  ];

  const handleEnterStage = (stage) => {
    playSound('click');
    if (stage.isBoss) {
      setActiveTab('boss');
    } else {
      setSelectedStageForRunner(stage.stageNumber);
      setActiveTab('stage-runner');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* World Map Banner */}
      <div 
        className="glass-panel p-6 md:p-10 rounded-3xl border border-indigo-500/30 relative overflow-hidden shadow-2xl"
        style={{ backgroundImage: targetCompany.bannerGradient }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-semibold border border-white/15">
                COMPANY WORLD: {targetCompany.name.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                {targetCompany.ctc}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs border border-indigo-500/30">
                {targetCompany.difficulty} Tier
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-black text-white">
              {targetCompany.worldName}
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {targetCompany.worldDescription}
            </p>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onOpenCompanyModal();
            }}
            className="btn-cyber-secondary text-xs px-4 py-2.5 shrink-0"
          >
            <Compass size={15} />
            <span>Switch Company World</span>
          </button>
        </div>
      </div>

      {/* World Map Stage Progression Path */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <span className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wider">
              RECRUITMENT STAGE PROGRESSION
            </span>
            <h2 className="text-xl font-heading font-black text-white">Company World Stages</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {stagesCompletedList.length} of 5 Stages Cleared
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = stagesCompletedList.includes(stage.stageNumber);
            const isUnlocked = stage.stageNumber === 1 || stagesCompletedList.includes(stage.stageNumber - 1);

            return (
              <div
                key={stage.stageNumber}
                className={`glass-panel p-6 rounded-3xl border transition duration-200 flex flex-col justify-between relative overflow-hidden ${
                  stage.isBoss
                    ? isUnlocked 
                      ? 'border-rose-500/50 bg-gradient-to-b from-rose-950/20 to-[#0e1122] shadow-lg shadow-rose-500/20'
                      : 'border-white/10 opacity-70'
                    : isCompleted
                    ? 'border-emerald-500/40 bg-emerald-950/15'
                    : isUnlocked
                    ? 'border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.04]'
                    : 'border-white/5 opacity-60'
                }`}
              >
                {/* Stage Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span 
                      className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${stage.color}20`, 
                        color: stage.color, 
                        border: `1px solid ${stage.color}40` 
                      }}
                    >
                      {stage.category}
                    </span>

                    {isCompleted ? (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 size={15} /> CLEARED
                      </span>
                    ) : !isUnlocked ? (
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <Lock size={13} /> LOCKED
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 font-bold animate-pulse">
                        READY
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-inner"
                      style={{ backgroundColor: `${stage.color}25`, color: stage.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-purple-400 font-bold">+{stage.xp} XP</span>
                    <span className="text-cyan-400 font-bold">+{stage.gems} 💎</span>
                  </div>

                  <button
                    onClick={() => handleEnterStage(stage)}
                    disabled={!isUnlocked}
                    className={`px-4 py-2 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition ${
                      stage.isBoss
                        ? 'btn-cyber-danger shadow-lg shadow-rose-500/30'
                        : isCompleted
                        ? 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                        : isUnlocked
                        ? 'btn-cyber-primary'
                        : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    <span>{isCompleted ? 'Replay Stage' : isUnlocked ? 'Enter Challenge' : 'Locked'}</span>
                    {isUnlocked && <ArrowRight size={13} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
