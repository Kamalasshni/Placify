import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { GameHUD } from './components/GameHUD';
import { CandyWorldMap } from './components/CandyWorldMap';
import { CompanySelectorModal } from './components/CompanySelectorModal';
import { LevelUpModal } from './components/LevelUpModal';
import { CertificateModal } from './components/CertificateModal';
import { AIGlitchCoachModal } from './components/AIGlitchCoachModal';
import { GameShopModal } from './components/GameShopModal';
import { LootChestModal } from './components/LootChestModal';

import { ArcadeLevelPlayView } from './views/ArcadeLevelPlayView';
import { DashboardView } from './views/DashboardView';
import { AssessmentView } from './views/AssessmentView';
import { SkillRadarView } from './views/SkillRadarView';
import { CompanyWorldsView } from './views/CompanyWorldsView';
import { StageRunnerView } from './views/StageRunnerView';
import { BossBattleView } from './views/BossBattleView';
import { CodeArenaView } from './views/CodeArenaView';
import { AIMockInterviewView } from './views/AIMockInterviewView';
import { QuestsView } from './views/QuestsView';
import { SkillTreeView } from './views/SkillTreeView';
import { LeaderboardBadgesView } from './views/LeaderboardBadgesView';
import { playSound } from './utils/audio';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('world-map');
  const [selectedStageForRunner, setSelectedStageForRunner] = useState(1);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  const { activePlayLevel, setActivePlayLevel } = useGame();

  const handleSelectLevelToPlay = (levelNumber) => {
    setActivePlayLevel(levelNumber);
  };

  const handleExitLevel = () => {
    setActivePlayLevel(null);
  };

  // Hackathon Quick Showcase shortcuts
  const hackathonShortcuts = [
    { label: '🍬 Match-3 Puzzle', level: 4 },
    { label: '🔨 Whack-A-Bug', level: 5 },
    { label: '🃏 Memory Cards', level: 6 },
    { label: '🚀 Flappy Coder', level: 7 },
    { label: '⚡ Speed Math', level: 1 },
    { label: '🐛 Bug Buster', level: 2 },
    { label: '💀 1000HP Boss', level: 9 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#070913] text-[#f8fafc]">
      {/* HACKATHON JUDGE SHOWCASE QUICK BAR */}
      <div className="bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-cyan-950/90 border-b border-purple-500/40 py-2 px-4 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black font-black uppercase text-[10px] animate-pulse">
              SRM IRIDESCENCE 1.0
            </span>
            <span className="text-purple-300 font-bold hidden sm:inline">⚡ Judge Showcase Quick-Play:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {hackathonShortcuts.map((sc, i) => (
              <button
                key={i}
                onClick={() => {
                  playSound('click');
                  setActivePlayLevel(sc.level);
                }}
                className="text-[11px] font-heading font-bold px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white whitespace-nowrap transition cursor-pointer border border-white/10"
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Arcade Gaming HUD */}
      <GameHUD 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActivePlayLevel(null);
          setActiveTab(tab);
        }} 
        onOpenCompanyModal={() => setIsCompanyModalOpen(true)}
      />

      {/* Main Arcade Arena & World Map Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If user is actively playing a level */}
        {activePlayLevel !== null ? (
          <ArcadeLevelPlayView 
            levelNumber={activePlayLevel} 
            onExitLevel={handleExitLevel} 
          />
        ) : (
          <>
            {activeTab === 'world-map' && (
              <CandyWorldMap onSelectLevelToPlay={handleSelectLevelToPlay} />
            )}

            {activeTab === 'dashboard' && (
              <DashboardView 
                setActiveTab={setActiveTab} 
                onOpenCompanyModal={() => setIsCompanyModalOpen(true)} 
              />
            )}

            {activeTab === 'assessment' && (
              <AssessmentView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'radar' && (
              <SkillRadarView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'worlds' && (
              <CompanyWorldsView 
                setActiveTab={setActiveTab} 
                setSelectedStageForRunner={setSelectedStageForRunner} 
                onOpenCompanyModal={() => setIsCompanyModalOpen(true)} 
              />
            )}

            {activeTab === 'stage-runner' && (
              <StageRunnerView 
                stageNumber={selectedStageForRunner} 
                setActiveTab={setActiveTab} 
              />
            )}

            {activeTab === 'boss' && (
              <BossBattleView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'code-arena' && (
              <CodeArenaView />
            )}

            {activeTab === 'mock-interview' && (
              <AIMockInterviewView />
            )}

            {activeTab === 'quests' && (
              <QuestsView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'skill-tree' && (
              <SkillTreeView />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardBadgesView />
            )}
          </>
        )}
      </main>

      {/* Interactive Game Modals */}
      <CompanySelectorModal 
        isOpen={isCompanyModalOpen} 
        onClose={() => setIsCompanyModalOpen(false)} 
      />
      <GameShopModal />
      <LootChestModal />
      <LevelUpModal />
      <CertificateModal />
      <AIGlitchCoachModal />

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#05070e] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">⚡</span>
            <span className="font-heading font-black text-white">PLACIFY ARCADE</span>
            <span>• SRM Iridescence 1.0 Gamethon Entry</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span>Team Glitch Theory</span>
            <span>•</span>
            <span className="text-cyan-400">Match-3 • Whack-A-Bug • Memory Cards • Flappy Coder • Boss Battle</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}
