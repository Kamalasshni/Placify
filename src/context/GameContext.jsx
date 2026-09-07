import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSound, toggleSound as setAudioMute } from '../utils/audio';
import { INITIAL_QUESTS, generateSkillGapQuests } from '../data/quests';
import { getCompanyById } from '../data/companies';
import { AVATAR_SKINS } from '../data/shopItems';

const GameContext = createContext();

const LEVEL_TITLES = [
  { level: 1, title: 'Intern Initiate', minXP: 0 },
  { level: 2, title: 'Bug Hunter', minXP: 400 },
  { level: 3, title: 'Code Squire', minXP: 900 },
  { level: 4, title: 'Algorithm Knight', minXP: 1600 },
  { level: 5, title: 'Data Structure Adept', minXP: 2500 },
  { level: 6, title: 'Concurrency Crusader', minXP: 3600 },
  { level: 7, title: 'System Architect', minXP: 5000 },
  { level: 8, title: 'Bar Raiser Challenger', minXP: 6800 },
  { level: 9, title: 'Grandmaster Coder', minXP: 9000 },
  { level: 10, title: 'Placement Ready Legend', minXP: 12000 }
];

const INITIAL_USER = {
  name: 'Kamalasshni M',
  avatar: '🚀',
  level: 1,
  levelTitle: 'Intern Initiate',
  xp: 150,
  gems: 120,
  streak: 5,
  targetCompanyId: 'google',
  priScore: 65
};

const INITIAL_SKILL_MASTERY = {
  aptitude: 65,
  dsa: 55,
  core_cs: 70,
  system_design: 50,
  hr: 75
};

export const GameProvider = ({ children }) => {
  // User Profile
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Hearts / Lives System (Max 5)
  const [hearts, setHearts] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_hearts');
      return saved !== null ? Number(saved) : 5;
    } catch {
      return 5;
    }
  });
  const maxHearts = 5;

  // Level Progression: unlockedLevels array (e.g. [1, 2, 3])
  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_unlocked_levels');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  // Stars per level: { 1: 3, 2: 2, ... }
  const [levelStars, setLevelStars] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_level_stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // High Scores: { 1: 850, ... }
  const [highScores, setHighScores] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_high_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Power-up Inventory
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_inventory');
      return saved ? JSON.parse(saved) : { time_freeze: 2, excalibur: 2, shield: 1, xp_potion: 1 };
    } catch {
      return { time_freeze: 2, excalibur: 2, shield: 1, xp_potion: 1 };
    }
  });

  // Active Avatar Skin
  const [avatarSkin, setAvatarSkin] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_avatar_skin');
      return saved || 'cyber_hacker';
    } catch {
      return 'cyber_hacker';
    }
  });

  const [unlockedSkins, setUnlockedSkins] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_unlocked_skins');
      return saved ? JSON.parse(saved) : ['cyber_hacker'];
    } catch {
      return ['cyber_hacker'];
    }
  });

  const [skillMastery, setSkillMastery] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_skills');
      return saved ? JSON.parse(saved) : INITIAL_SKILL_MASTERY;
    } catch {
      return INITIAL_SKILL_MASTERY;
    }
  });

  const [diagnosticReport, setDiagnosticReport] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_diagnostic');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [quests, setQuests] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_quests');
      return saved ? JSON.parse(saved) : INITIAL_QUESTS;
    } catch {
      return INITIAL_QUESTS;
    }
  });

  const [completedStages, setCompletedStages] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_completed_stages');
      return saved ? JSON.parse(saved) : { google: [1], amazon: [], zoho: [], microsoft: [] };
    } catch {
      return { google: [1], amazon: [], zoho: [], microsoft: [] };
    }
  });

  const [unlockedSkillNodes, setUnlockedSkillNodes] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_skill_nodes');
      return saved ? JSON.parse(saved) : ['apt-speed-math', 'dsa-arrays-hashmaps', 'hr-star-method'];
    } catch {
      return ['apt-speed-math', 'dsa-arrays-hashmaps', 'hr-star-method'];
    }
  });

  const [badges, setBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('placify_badges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [levelUpModalData, setLevelUpModalData] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showGlitchCoachModal, setShowGlitchCoachModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showLootChest, setShowLootChest] = useState(false);
  const [lootChestData, setLootChestData] = useState(null);
  const [activePlayLevel, setActivePlayLevel] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('placify_user', JSON.stringify(user));
      localStorage.setItem('placify_hearts', String(hearts));
      localStorage.setItem('placify_unlocked_levels', JSON.stringify(unlockedLevels));
      localStorage.setItem('placify_level_stars', JSON.stringify(levelStars));
      localStorage.setItem('placify_high_scores', JSON.stringify(highScores));
      localStorage.setItem('placify_inventory', JSON.stringify(inventory));
      localStorage.setItem('placify_avatar_skin', avatarSkin);
      localStorage.setItem('placify_unlocked_skins', JSON.stringify(unlockedSkins));
      localStorage.setItem('placify_skills', JSON.stringify(skillMastery));
      localStorage.setItem('placify_quests', JSON.stringify(quests));
      localStorage.setItem('placify_completed_stages', JSON.stringify(completedStages));
      localStorage.setItem('placify_skill_nodes', JSON.stringify(unlockedSkillNodes));
      localStorage.setItem('placify_badges', JSON.stringify(badges));
    } catch (e) {
      console.error(e);
    }
  }, [user, hearts, unlockedLevels, levelStars, highScores, inventory, avatarSkin, unlockedSkins, skillMastery, quests, completedStages, unlockedSkillNodes, badges]);

  const toggleAudio = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setAudioMute(next);
  };

  const calculateLevel = (currentXP) => {
    let currentLevelObj = LEVEL_TITLES[0];
    for (let i = LEVEL_TITLES.length - 1; i >= 0; i--) {
      if (currentXP >= LEVEL_TITLES[i].minXP) {
        currentLevelObj = LEVEL_TITLES[i];
        break;
      }
    }
    return currentLevelObj;
  };

  const addXP = (amount) => {
    setUser(prev => {
      const streakMultiplier = prev.streak >= 7 ? 2.0 : prev.streak >= 3 ? 1.5 : 1.0;
      const gainedXP = Math.round(amount * streakMultiplier);
      const newTotalXP = prev.xp + gainedXP;
      const newLevelObj = calculateLevel(newTotalXP);

      if (newLevelObj.level > prev.level) {
        playSound('level_up');
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        setLevelUpModalData({
          oldLevel: prev.level,
          newLevel: newLevelObj.level,
          title: newLevelObj.title,
          bonusGems: 100
        });
        return {
          ...prev,
          xp: newTotalXP,
          level: newLevelObj.level,
          levelTitle: newLevelObj.title,
          gems: prev.gems + 100,
          priScore: Math.min(99, prev.priScore + 4)
        };
      } else {
        return {
          ...prev,
          xp: newTotalXP,
          priScore: Math.min(99, prev.priScore + 1)
        };
      }
    });
  };

  const addGems = (amount) => {
    setUser(prev => ({
      ...prev,
      gems: prev.gems + amount
    }));
  };

  const loseHeart = () => {
    if (inventory.shield > 0) {
      // Use shield automatically
      playSound('powerup_used');
      setInventory(prev => ({ ...prev, shield: prev.shield - 1 }));
      return { heartLost: false, blockedByShield: true, remaining: hearts };
    }

    playSound('heart_lost');
    const newHearts = Math.max(0, hearts - 1);
    setHearts(newHearts);
    return { heartLost: true, blockedByShield: false, remaining: newHearts };
  };

  const refillHearts = () => {
    playSound('correct');
    setHearts(maxHearts);
  };

  const useInventoryItem = (itemKey) => {
    if ((inventory[itemKey] || 0) <= 0) return false;
    playSound('powerup_used');
    setInventory(prev => ({
      ...prev,
      [itemKey]: prev[itemKey] - 1
    }));
    return true;
  };

  const buyShopItem = (item) => {
    if (user.gems < item.cost) {
      playSound('wrong');
      return false;
    }

    playSound('correct');
    setUser(prev => ({ ...prev, gems: prev.gems - item.cost }));

    if (item.id === 'heart_refill') {
      refillHearts();
    } else if (item.category === 'Power-up' || item.category === 'Defense' || item.category === 'Boost') {
      setInventory(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1
      }));
    } else if (item.color) {
      // Avatar Skin
      setUnlockedSkins(prev => [...new Set([...prev, item.id])]);
      setAvatarSkin(item.id);
    }
    return true;
  };

  const equipAvatarSkin = (skinId) => {
    if (!unlockedSkins.includes(skinId)) return;
    playSound('click');
    setAvatarSkin(skinId);
  };

  const finishLevel = (levelNumber, score, stars, earnedXp, earnedGems) => {
    // Record Stars & High Score
    setLevelStars(prev => ({
      ...prev,
      [levelNumber]: Math.max(prev[levelNumber] || 0, stars)
    }));

    setHighScores(prev => ({
      ...prev,
      [levelNumber]: Math.max(prev[levelNumber] || 0, score)
    }));

    // Unlock Next Level if cleared with >= 1 Star
    if (stars >= 1) {
      const nextLevel = levelNumber + 1;
      if (nextLevel <= 10 && !unlockedLevels.includes(nextLevel)) {
        setUnlockedLevels(prev => [...prev, nextLevel]);
      }
    }

    addXP(earnedXp);
    addGems(earnedGems);

    // Trigger Loot Chest Mystery Drop
    const possibleDrops = [
      { type: 'gems', name: '+40 Bonus Gems 💎', value: 40 },
      { type: 'time_freeze', name: 'Cryo Time Freeze ❄️', value: 1 },
      { type: 'excalibur', name: '50/50 Excalibur ⚔️', value: 1 },
      { type: 'shield', name: 'AI Firewall Shield 🛡️', value: 1 }
    ];
    const randomDrop = possibleDrops[Math.floor(Math.random() * possibleDrops.length)];

    // Apply drop
    if (randomDrop.type === 'gems') {
      addGems(randomDrop.value);
    } else {
      setInventory(prev => ({ ...prev, [randomDrop.type]: (prev[randomDrop.type] || 0) + randomDrop.value }));
    }

    setLootChestData({
      levelNumber,
      stars,
      score,
      earnedXp,
      earnedGems,
      drop: randomDrop
    });
    setShowLootChest(true);
  };

  const setTargetCompany = (companyId) => {
    setUser(prev => ({ ...prev, targetCompanyId: companyId }));
    playSound('click');
  };

  const completeQuest = (questId) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    playSound('correct');
    addXP(quest.xpReward);
    addGems(quest.gemReward);

    setQuests(prev => prev.map(q => q.id === questId ? { ...q, progress: q.maxProgress, completed: true } : q));
  };

  const completeStage = (companyId, stageNumber) => {
    setCompletedStages(prev => {
      const companyCompleted = prev[companyId] || [];
      if (!companyCompleted.includes(stageNumber)) {
        return { ...prev, [companyId]: [...companyCompleted, stageNumber] };
      }
      return prev;
    });
    addXP(300);
    addGems(50);
  };

  const unlockSkillNode = (nodeId, cost) => {
    if (user.gems < cost) return false;
    playSound('level_up');
    setUser(prev => ({ ...prev, gems: prev.gems - cost, priScore: Math.min(99, prev.priScore + 4) }));
    setUnlockedSkillNodes(prev => [...prev, nodeId]);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    return true;
  };

  const saveDiagnosticResult = (report) => {
    setDiagnosticReport(report);
    setSkillMastery(report.radarScores);
    setUser(prev => ({ ...prev, priScore: report.overallPRI }));
    const gapQuests = generateSkillGapQuests(report.weakSkills);
    setQuests(prev => [...prev.map(q => q.id === 'quest-diag' ? { ...q, progress: 1, completed: true } : q), ...gapQuests]);
    addXP(350);
    addGems(75);
  };

  const unlockBadge = (badgeObj) => {
    setBadges(prev => {
      if (prev.some(b => b.name === badgeObj.name)) return prev;
      return [badgeObj, ...prev];
    });
  };

  const resetProgress = () => {
    localStorage.clear();
    setUser(INITIAL_USER);
    setHearts(5);
    setUnlockedLevels([1]);
    setLevelStars({});
    setHighScores({});
    setInventory({ time_freeze: 2, excalibur: 2, shield: 1, xp_potion: 1 });
    setAvatarSkin('cyber_hacker');
    setUnlockedSkins(['cyber_hacker']);
    setSkillMastery(INITIAL_SKILL_MASTERY);
    setDiagnosticReport(null);
    setQuests(INITIAL_QUESTS);
    setCompletedStages({ google: [1], amazon: [], zoho: [], microsoft: [] });
    setUnlockedSkillNodes(['apt-speed-math', 'dsa-arrays-hashmaps', 'hr-star-method']);
    setBadges([]);
    playSound('click');
  };

  const currentLevelObj = calculateLevel(user.xp);
  const nextLevelObj = LEVEL_TITLES.find(l => l.level === currentLevelObj.level + 1) || { minXP: user.xp + 1000 };
  const xpInCurrentLevel = user.xp - currentLevelObj.minXP;
  const xpRequiredForCurrentLevel = nextLevelObj.minXP - currentLevelObj.minXP;
  const xpProgressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpRequiredForCurrentLevel) * 100)));

  const targetCompany = getCompanyById(user.targetCompanyId);
  const currentSkinObj = AVATAR_SKINS.find(s => s.id === avatarSkin) || AVATAR_SKINS[0];

  return (
    <GameContext.Provider value={{
      user,
      hearts,
      maxHearts,
      unlockedLevels,
      levelStars,
      highScores,
      inventory,
      avatarSkin,
      unlockedSkins,
      currentSkinObj,
      skillMastery,
      diagnosticReport,
      quests,
      completedStages,
      unlockedSkillNodes,
      badges,
      soundEnabled,
      targetCompany,
      xpProgressPercent,
      xpInCurrentLevel,
      xpRequiredForCurrentLevel,
      levelUpModalData,
      showCertModal,
      showGlitchCoachModal,
      showShopModal,
      showLootChest,
      lootChestData,
      activePlayLevel,
      setActivePlayLevel,
      setLevelUpModalData,
      setShowCertModal,
      setShowGlitchCoachModal,
      setShowShopModal,
      setShowLootChest,
      setLootChestData,
      toggleAudio,
      addXP,
      addGems,
      loseHeart,
      refillHearts,
      buyShopItem,
      equipAvatarSkin,
      useInventoryItem,
      finishLevel,
      setTargetCompany,
      completeQuest,
      completeStage,
      unlockSkillNode,
      saveDiagnosticResult,
      unlockBadge,
      resetProgress
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
