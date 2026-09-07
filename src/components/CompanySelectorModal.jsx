import React from 'react';
import { X, CheckCircle2, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { COMPANIES } from '../data/companies';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const CompanySelectorModal = ({ isOpen, onClose }) => {
  const { user, setTargetCompany } = useGame();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-indigo-500/30 p-6 md:p-8 rounded-2xl shadow-2xl bg-[#0e1222]">
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs font-semibold border border-indigo-500/30">
              STEP 1: CHOOSE TARGET COMPANY
            </span>
            <span className="text-xs text-slate-400">• World Map Destination</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white">
            Select Your Target Company World
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Placify adapts your diagnostic tests, algorithm quests, and final boss battles to the exact hiring pattern of your chosen company.
          </p>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPANIES.map((company) => {
            const isSelected = user.targetCompanyId === company.id;
            return (
              <div
                key={company.id}
                onClick={() => {
                  setTargetCompany(company.id);
                  onClose();
                }}
                className={`p-5 rounded-2xl border transition duration-200 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-indigo-950/50 border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                {/* Top Badge & Tier */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/10">
                    {company.badge}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    {company.ctc}
                  </span>
                </div>

                {/* Company Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black shrink-0 shadow-inner"
                    style={{ backgroundColor: `${company.themeColor}25`, color: company.themeColor }}
                  >
                    🏢
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition flex items-center gap-2">
                      {company.name}
                      {isSelected && <CheckCircle2 size={16} className="text-emerald-400" />}
                    </h3>
                    <p className="text-xs text-slate-400">{company.worldName}</p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {company.tagline}
                </p>

                {/* Focus Skills pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {company.focusSkills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer / Boss info */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-mono">
                    <span>Boss:</span>
                    <span className="text-slate-200 font-semibold">{company.boss.name.split(' - ')[0]}</span>
                  </span>
                  <div className="flex items-center gap-1 text-indigo-400 group-hover:translate-x-1 transition font-semibold">
                    <span>{isSelected ? 'Current Target' : 'Enter World'}</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
