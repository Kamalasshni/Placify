export const SHOP_POWERUPS = [
  {
    id: 'heart_refill',
    name: 'Full Heart Refill',
    icon: '❤️',
    category: 'Life',
    cost: 50,
    desc: 'Instantly restores all 5 candidate hearts so you can keep playing without waiting.',
    badge: 'Essential'
  },
  {
    id: 'time_freeze',
    name: 'Cryo Time Freeze',
    icon: '❄️',
    category: 'Power-up',
    cost: 30,
    desc: 'Pauses the level countdown clock for 15 seconds, giving you time to compute answers.',
    badge: 'Popular'
  },
  {
    id: 'excalibur',
    name: '50/50 Excalibur',
    icon: '⚔️',
    category: 'Power-up',
    cost: 35,
    desc: 'Slashes away 2 incorrect choices instantly in any multiple-choice or bug-finding stage.',
    badge: 'Tactical'
  },
  {
    id: 'shield',
    name: 'AI Firewall Shield',
    icon: '🛡️',
    category: 'Defense',
    cost: 40,
    desc: 'Absorbs 1 mistake without losing a heart and shields you from Boss counterattacks.',
    badge: 'Defense'
  },
  {
    id: 'xp_potion',
    name: 'Double XP Hyper-Elixir',
    icon: '🧪',
    category: 'Boost',
    cost: 60,
    desc: 'Doubles all XP earned from the next 3 completed game levels for rapid level-ups.',
    badge: 'Boost'
  }
];

export const AVATAR_SKINS = [
  {
    id: 'cyber_hacker',
    name: 'Cyber Coder',
    icon: '🤖',
    cost: 0,
    desc: 'Standard issue neural coder skin for all Placify initiates.',
    unlockedByDefault: true,
    color: '#6366f1'
  },
  {
    id: 'ninja_dev',
    name: 'Code Shinobi',
    icon: '🥷',
    cost: 150,
    desc: 'Masters silent bug execution and swift algorithmic traversals.',
    unlockedByDefault: false,
    color: '#10b981'
  },
  {
    id: 'wizard_architect',
    name: 'Syntax Wizard',
    icon: '🧙‍♂️',
    cost: 250,
    desc: 'Commands high-level distributed systems and database spells.',
    unlockedByDefault: false,
    color: '#a855f7'
  },
  {
    id: 'quantum_cyborg',
    name: 'Quantum Cyborg',
    icon: '⚡',
    cost: 400,
    desc: 'Legendary elite avatar with overclocked Big-O processing speed.',
    unlockedByDefault: false,
    color: '#f59e0b'
  }
];
