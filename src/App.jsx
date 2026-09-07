import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { GameHUD } from './components/GameHUD';
import { CompanySelectorModal } from './components/CompanySelectorModal';
import { LevelUpModal } from './components/LevelUpModal';
import { CertificateModal } from './components/CertificateModal';
import { AIGlitchCoachModal } from './components/AIGlitchCoachModal';
import { GameShopModal } from './components/GameShopModal';
import { LootChestModal } from './components/LootChestModal';

import { GameWorldMapView } from './views/GameWorldMapView';
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

  return (
    <div className="min-h-screen flex flex-col bg-[#070913] text-[#f8fafc]">
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
              <GameWorldMapView onSelectLevelToPlay={handleSelectLevelToPlay} />
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
            <span>• 100% Gamified Placement RPG</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span>Team Glitch Theory</span>
            <span>•</span>
            <span className="text-cyan-400">Level 1 → Level 10 Grandmaster Placement Journey</span>
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
