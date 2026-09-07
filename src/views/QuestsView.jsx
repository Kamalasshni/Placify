import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Zap, 
  Trophy, 
  Bot, 
  Code2, 
  Brain, 
  Swords, 
  Clock 
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const QuestsView = ({ setActiveTab }) => {
  const { 
    quests, 
    completeQuest, 
    user, 
    targetCompany 
  } = useGame();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'daily', 'skill_gap', 'campaign'

  const filteredQuests = quests.filter(q => {
    if (activeFilter === 'all') return true;
    return q.type === activeFilter;
  });

  const completedCount = quests.filter(q => q.completed).length;

  const handleQuestAction = (quest) => {
    playSound('click');
    if (quest.targetCategory === 'dsa') {
      setActiveTab('code-arena');
    } else if (quest.targetCategory === 'aptitude') {
      setActiveTab('worlds');
    } else if (quest.targetCategory === 'boss') {
      setActiveTab('boss');
    } else if (quest.targetCategory === 'hr') {
      setActiveTab('mock-interview');
    } else if (quest.targetCategory === 'all') {
      setActiveTab('assessment');
    } else {
      setActiveTab('worlds');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5">
              <Target size={13} />
              <span>DYNAMIC QUEST ENGINE</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">• {user.streak}d Streak Multiplier ({user.streak >= 7 ? '2.0x' : user.streak >= 3 ? '1.5x' : '1.0x'})</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            Personalized Quest Log
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Quests generated adaptively based on your target company <strong>({targetCompany.name})</strong> and AI diagnostic gap analysis.
          </p>
        </div>

        {/* Progress Counter Pill */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">COMPLETED</span>
            <span className="text-xl font-heading font-black text-emerald-400">
              {completedCount} / {quests.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            <Flame size={20} className="animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Quests' },
          { id: 'daily', label: 'Daily Challenges' },
          { id: 'skill_gap', label: '🎯 AI Skill Gap Remediations' },
          { id: 'campaign', label: 'Main Campaign' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playSound('click');
              setActiveFilter(tab.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold transition cursor-pointer whitespace-nowrap ${
              activeFilter === tab.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            className={`glass-panel p-6 rounded-3xl border transition duration-200 flex flex-col justify-between ${
              quest.completed
                ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                : quest.type === 'skill_gap'
                ? 'bg-purple-950/20 border-purple-500/40'
                : 'bg-white/[0.03] border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              {/* Card Meta Top */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  quest.type === 'skill_gap'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-white/10 text-slate-300 border border-white/10'
                }`}>
                  {quest.category}
                </span>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-purple-400 font-bold">+{quest.xpReward} XP</span>
                  <span className="text-cyan-400 font-bold">+{quest.gemReward} 💎</span>
                </div>
              </div>

              <h3 className="font-heading font-bold text-base text-white mb-1.5">
                {quest.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {quest.description}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              {quest.completed ? (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                  <CheckCircle2 size={16} />
                  <span>Rewards Claimed</span>
                </div>
              ) : (
                <button
                  onClick={() => completeQuest(quest.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold hover:bg-emerald-500/30 transition cursor-pointer"
                >
                  Claim Reward ({quest.xpReward} XP)
                </button>
              )}

              {!quest.completed && (
                <button
                  onClick={() => handleQuestAction(quest)}
                  className="btn-cyber-secondary text-xs px-3.5 py-1.5 font-semibold flex items-center gap-1.5"
                >
                  <span>Go to Quest</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
