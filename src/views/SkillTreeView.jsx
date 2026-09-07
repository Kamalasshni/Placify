import React from 'react';
import { 
  Network, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Brain, 
  Code2, 
  Server, 
  Award, 
  Zap,
  ShieldCheck
} from 'lucide-react';
import { SKILL_TREE_DATA } from '../data/skillTree';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const SkillTreeView = () => {
  const { 
    user, 
    unlockedSkillNodes, 
    unlockSkillNode 
  } = useGame();

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Code': return Code2;
      case 'Server': return Server;
      case 'Award': return Award;
      default: return Sparkles;
    }
  };

  const handleUnlockNode = (node) => {
    playSound('click');
    if (unlockedSkillNodes.includes(node.id)) return;

    // Check prerequisites
    const hasPrereqs = node.prereqs.every(p => unlockedSkillNodes.includes(p));
    if (!hasPrereqs) {
      playSound('wrong');
      alert('You must unlock earlier prerequisite skills in this branch first!');
      return;
    }

    if (user.gems < node.cost) {
      playSound('wrong');
      alert(`You need ${node.cost} Gems to unlock this mastery. (Current: ${user.gems} 💎). Complete quests to earn more gems!`);
      return;
    }

    unlockSkillNode(node.id, node.cost);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5">
              <Network size={13} />
              <span>RPG TALENT TREE</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">• Permanent Mastery Buffs</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            Placement Competency Skill Tree
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Spend your earned gems to permanently unlock core competencies, boss battle shields, and PRI multipliers.
          </p>
        </div>

        {/* Gem Balance Box */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center gap-3">
          <span className="text-2xl">💎</span>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">AVAILABLE GEMS</span>
            <span className="text-xl font-heading font-black text-cyan-300 font-mono">{user.gems}</span>
          </div>
        </div>
      </div>

      {/* Skill Tree Categories Grid */}
      <div className="space-y-8">
        {SKILL_TREE_DATA.map((branch, bIdx) => {
          const Icon = getCategoryIcon(branch.icon);
          return (
            <div key={bIdx} className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
              {/* Branch Header */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-inner"
                  style={{ backgroundColor: `${branch.color}30`, color: branch.color }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">
                    {branch.category}
                  </h2>
                  <span className="text-xs font-mono text-slate-400">
                    {branch.nodes.filter(n => unlockedSkillNodes.includes(n.id)).length} of {branch.nodes.length} Masteries Unlocked
                  </span>
                </div>
              </div>

              {/* Branch Nodes Horizontal Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {branch.nodes.map((node, nIdx) => {
                  const isUnlocked = unlockedSkillNodes.includes(node.id);
                  const canUnlock = node.prereqs.every(p => unlockedSkillNodes.includes(p));

                  return (
                    <div
                      key={node.id}
                      className={`p-5 rounded-2xl border transition duration-200 flex flex-col justify-between relative overflow-hidden ${
                        isUnlocked
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                          : canUnlock
                          ? 'bg-white/[0.03] border-white/15 hover:border-indigo-500/50'
                          : 'bg-white/[0.01] border-white/5 opacity-50'
                      }`}
                    >
                      <div>
                        {/* Node Tier & Status */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                            Tier {node.tier}
                          </span>
                          {isUnlocked ? (
                            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                              <CheckCircle2 size={13} /> MASTERED
                            </span>
                          ) : !canUnlock ? (
                            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                              <Lock size={12} /> Locked
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-cyan-400 font-bold">
                              {node.cost} 💎
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading font-bold text-sm text-white mb-1.5">
                          {node.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          {node.description}
                        </p>
                      </div>

                      {/* Buff Pill & Unlock CTA */}
                      <div className="pt-3 border-t border-white/5 space-y-3">
                        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
                          ⚡ <strong>Buff:</strong> {node.buff}
                        </div>

                        {!isUnlocked && (
                          <button
                            onClick={() => handleUnlockNode(node)}
                            disabled={!canUnlock || user.gems < node.cost}
                            className={`w-full py-2 rounded-xl text-xs font-heading font-bold transition flex items-center justify-center gap-1.5 ${
                              canUnlock && user.gems >= node.cost
                                ? 'btn-cyber-primary'
                                : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                            }`}
                          >
                            <span>{user.gems < node.cost ? `Need ${node.cost} 💎` : 'Unlock Mastery'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
