import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award, 
  ChevronDown, 
  Bot, 
  Target,
  Compass,
  Code2,
  Swords,
  Radio,
  Network,
  Radar,
  Trophy,
  LayoutDashboard
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const Navbar = ({ activeTab, setActiveTab, onOpenCompanyModal }) => {
  const { 
    user, 
    soundEnabled, 
    toggleAudio, 
    targetCompany, 
    xpProgressPercent,
    xpInCurrentLevel,
    xpRequiredForCurrentLevel,
    setShowGlitchCoachModal,
    setShowCertModal
  } = useGame();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'worlds', label: 'Company Worlds', icon: Compass },
    { id: 'quests', label: 'Quests', icon: Target },
    { id: 'boss', label: 'Boss Battle', icon: Swords, isHot: true },
    { id: 'code-arena', label: 'Code Arena', icon: Code2 },
    { id: 'mock-interview', label: 'AI Mock', icon: Radio },
    { id: 'skill-tree', label: 'Skill Tree', icon: Network },
    { id: 'radar', label: 'Skill Radar', icon: Radar },
    { id: 'leaderboard', label: 'Ranks & Badges', icon: Trophy }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090a10]/80 backdrop-blur-xl">
      {/* Top Banner with Team Info & Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-white/5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-semibold border border-indigo-500/30">
            TEAM GLITCH THEORY
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400 font-medium">PLACIFY – Gamify Your Placement Journey</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              playSound('click');
              setShowGlitchCoachModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 transition cursor-pointer"
          >
            <Bot size={14} className="text-purple-400 animate-pulse" />
            <span className="font-semibold font-heading">AI Glitch Coach</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              setShowCertModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition cursor-pointer"
          >
            <Award size={14} className="text-amber-400" />
            <span className="font-semibold font-heading">Placement Certificate</span>
          </button>

          <button 
            onClick={() => {
              playSound('click');
              toggleAudio();
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition"
            title={soundEnabled ? 'Mute Game SFX' : 'Enable Game SFX'}
          >
            {soundEnabled ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} className="text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Main HUD Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => {
            playSound('click');
            setActiveTab('dashboard');
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 transition duration-300">
            <div className="w-full h-full bg-[#0d101d] rounded-[10px] flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl tracking-wider text-white group-hover:text-cyan-300 transition">
                PLACIFY
              </span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                RPG
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Level Up Your Career</p>
          </div>
        </div>

        {/* Center: Target Company Switcher Pill */}
        <button
          onClick={() => {
            playSound('click');
            onOpenCompanyModal();
          }}
          className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-indigo-500/30 hover:border-indigo-400/60 transition shadow-sm hover:shadow-indigo-500/20 group cursor-pointer"
        >
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: `${targetCompany.themeColor}33`, color: targetCompany.themeColor }}
          >
            🏢
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition">
                {targetCompany.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-mono">
                {targetCompany.ctc}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">{targetCompany.worldName}</p>
          </div>
          <ChevronDown size={14} className="text-slate-400 group-hover:text-white transition" />
        </button>

        {/* Right HUD: Player Stats */}
        <div className="flex items-center gap-3">
          {/* Daily Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 font-heading font-semibold text-xs shadow-sm">
            <Flame size={16} className="text-amber-400 fill-amber-400 animate-bounce" />
            <span>{user.streak}d Streak</span>
          </div>

          {/* Gems Wallet */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-heading font-semibold text-xs shadow-sm">
            <span className="text-sm">💎</span>
            <span className="font-mono">{user.gems}</span>
          </div>

          {/* Level & XP HUD */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-heading font-black text-white text-sm shadow-md shadow-purple-500/30">
              {user.level}
            </div>
            <div className="hidden lg:block text-left">
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="font-semibold text-slate-200">{user.levelTitle}</span>
                <span className="font-mono text-purple-400 text-[10px]">{xpInCurrentLevel} / {xpRequiredForCurrentLevel} XP</span>
              </div>
              <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-white/5">
                <div 
                  className="xp-bar-fill h-full rounded-full" 
                  style={{ width: `${xpProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSound('click');
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition cursor-pointer relative ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white border border-indigo-500/50 shadow-sm shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-cyan-400' : 'text-slate-400'} />
              <span>{item.label}</span>
              {item.isHot && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-1 right-1" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
