export const COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    badge: 'Tier 1 MAANG',
    tagline: 'Organize the world\'s information with flawless algorithmic complexity.',
    logoIcon: 'Globe',
    themeColor: '#4285F4',
    accentColor: '#34A853',
    bannerGradient: 'linear-gradient(135deg, rgba(66, 133, 244, 0.25) 0%, rgba(234, 67, 53, 0.2) 50%, rgba(52, 168, 83, 0.25) 100%)',
    ctc: '₹28 - 45 LPA',
    difficulty: 'Grandmaster',
    difficultyLevel: 5,
    worldName: 'The Mountain View Spire',
    worldDescription: 'A high-altitude realm where optimal Big-O bounds and distributed thought prevail.',
    hiringRounds: [
      { step: 1, name: 'Online Assessment', desc: 'Advanced Speed Math & High-Entropy DP' },
      { step: 2, name: 'Data Structures Round', desc: 'Trees, Graphs & Substring Algorithms' },
      { step: 3, name: 'System Architecture', desc: 'Scalable Microservices & Concurrency' },
      { step: 4, name: 'Googliness & Leadership', desc: 'Ambiguity navigation & Team synergy' },
      { step: 5, name: 'The Google Fellow Boss', desc: 'Final Bar-Raising Algorithmic Battle' }
    ],
    boss: {
      id: 'google-fellow',
      name: 'Dr. Cypher - Google Fellow',
      title: 'Grand Arbiter of Distributed Systems',
      avatarEmoji: '⚡',
      hp: 1200,
      lore: 'Guardian of Big-O purity. He rejects O(N^2) solutions on sight with ruthless precision.',
      weakness: 'Dynamic Programming & Trie Architectures',
      specialAttacks: [
        'Memory Overflow Ray',
        'Stack Frame Collapse',
        'Strict Time Limit Exceeded'
      ]
    },
    focusSkills: ['Advanced Graph Theory', 'Dynamic Programming', 'OS Memory Paging', 'STAR Leadership']
  },
  {
    id: 'amazon',
    name: 'Amazon',
    badge: 'Tier 1 MAANG',
    tagline: 'Obsess over customers, write clean scalable code, and pass the Bar Raiser.',
    logoIcon: 'Package',
    themeColor: '#FF9900',
    accentColor: '#146EB4',
    bannerGradient: 'linear-gradient(135deg, rgba(255, 153, 0, 0.25) 0%, rgba(20, 110, 180, 0.25) 100%)',
    ctc: '₹25 - 42 LPA',
    difficulty: 'Grandmaster',
    difficultyLevel: 5,
    worldName: 'The Bar Raiser Citadel',
    worldDescription: 'A colossal bastion forged on 16 Leadership Principles and high-throughput low-latency systems.',
    hiringRounds: [
      { step: 1, name: 'Online Coding & LP', desc: 'OA with strict Leadership Principles check' },
      { step: 2, name: 'Algorithm Crucible', desc: 'Trees, Heaps & Two Pointers' },
      { step: 3, name: 'Object-Oriented Design', desc: 'Design Patterns & SOLID principles' },
      { step: 4, name: 'Customer Obsession HR', desc: 'Deep dive into real conflict resolution' },
      { step: 5, name: 'The Bar Raiser Boss', desc: 'Ultimate test of coding under behavioral interrogation' }
    ],
    boss: {
      id: 'bar-raiser',
      name: 'Vanguard Prime - The Bar Raiser',
      title: 'Keeper of the 16 Leadership Principles',
      avatarEmoji: '🛡️',
      hp: 1100,
      lore: 'He holds the absolute veto power in placement councils. Only candidates with rock-solid STAR proof survive.',
      weakness: 'Quantifiable Metrics & Tree Traversal combos',
      specialAttacks: [
        'Principle Invalidation Pulse',
        'Edge Case Ambush',
        'High-Latency Blackout'
      ]
    },
    focusSkills: ['Heaps & Priority Queues', 'Object Oriented Design', 'DBMS Indexing', 'Customer Obsession STAR']
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    badge: 'Tier 1 Tech Giant',
    tagline: 'Empower every developer on the planet to build with elegant algorithms and clear systems.',
    logoIcon: 'Layers',
    themeColor: '#00A4EF',
    accentColor: '#7FBA00',
    bannerGradient: 'linear-gradient(135deg, rgba(0, 164, 239, 0.25) 0%, rgba(127, 186, 0, 0.2) 100%)',
    ctc: '₹22 - 38 LPA',
    difficulty: 'Master',
    difficultyLevel: 4,
    worldName: 'The Redmond Matrix',
    worldDescription: 'A sanctuary of modular architecture, cloud engineering, and linked list masteries.',
    hiringRounds: [
      { step: 1, name: 'Online Assessment', desc: 'Codility assessment with tricky edge cases' },
      { step: 2, name: 'Data Structures Round', desc: 'LinkedLists, Matrices & Binary Search' },
      { step: 3, name: 'Operating Systems & Threading', desc: 'Deadlocks, Semaphores & Pointers' },
      { step: 4, name: 'Growth Mindset Interview', desc: 'Cultural fit and problem-solving passion' },
      { step: 5, name: 'The Principal Architect Boss', desc: 'High concurrency and optimization gauntlet' }
    ],
    boss: {
      id: 'principal-architect',
      name: 'Azure Core - Principal Architect',
      title: 'Master of Concurrency & Cloud Fabric',
      avatarEmoji: '💎',
      hp: 1000,
      lore: 'Monitors memory leaks across billions of transactions. He crushes buggy pointers without mercy.',
      weakness: 'Binary Search & Mutex Synchronization',
      specialAttacks: [
        'Deadlock Stun',
        'Thread Race Hazard',
        'Cache Miss Barrage'
      ]
    },
    focusSkills: ['LinkedLists & Bit Manipulation', 'OS Concurrency', 'Database Transactions', 'Growth Mindset']
  },
  {
    id: 'zoho',
    name: 'Zoho',
    badge: 'Product SaaS Titan',
    tagline: 'Pure problem solving, zero framework bloat, and mastery of fundamental logic.',
    logoIcon: 'Cpu',
    themeColor: '#E42528',
    accentColor: '#FBB900',
    bannerGradient: 'linear-gradient(135deg, rgba(228, 37, 40, 0.25) 0%, rgba(251, 185, 0, 0.2) 100%)',
    ctc: '₹8.5 - 18 LPA',
    difficulty: 'Master',
    difficultyLevel: 4,
    worldName: 'The SaaS Bastion',
    worldDescription: 'Where syntax memory matters little, and pure raw nested loop & matrix reasoning reigns supreme.',
    hiringRounds: [
      { step: 1, name: 'Basic Programming & Aptitude', desc: 'Fast pattern printing & series deduction' },
      { step: 2, name: 'Advanced Programming (Round 2)', desc: 'String manipulations & Matrix transformations' },
      { step: 3, name: 'Design Round (Round 3)', desc: 'Call Taxi / Railway Ticket / Splitwise in pure CLI' },
      { step: 4, name: 'Technical & HR Round', desc: 'Deep fundamentals & willingness to learn' },
      { step: 5, name: 'The Zoho Logic Maestro Boss', desc: 'Speed problem solving without standard library shortcuts' }
    ],
    boss: {
      id: 'zoho-maestro',
      name: 'The Logic Maestro',
      title: 'Warden of Clean Native Algorithms',
      avatarEmoji: '🔥',
      hp: 950,
      lore: 'Forbids external libraries. Demands that you write memory management and string parsing from first principles.',
      weakness: 'Matrix Spiral traversal & OOP encapsulation',
      specialAttacks: [
        'Library Disabler',
        'Nested Loop Paradox',
        'Regex Ban Curse'
      ]
    },
    focusSkills: ['Matrix Transformations', 'String Pattern Parsing', 'OOP CLI System Design', 'Aptitude Speed']
  },
  {
    id: 'goldman',
    name: 'Goldman Sachs',
    badge: 'FinTech Elite',
    tagline: 'High-frequency algorithmic agility, probability mastery, and low-latency performance.',
    logoIcon: 'TrendingUp',
    themeColor: '#689FD2',
    accentColor: '#D4AF37',
    bannerGradient: 'linear-gradient(135deg, rgba(104, 159, 210, 0.25) 0%, rgba(212, 175, 55, 0.2) 100%)',
    ctc: '₹24 - 36 LPA',
    difficulty: 'Grandmaster',
    difficultyLevel: 5,
    worldName: 'The Wall Street Fortress',
    worldDescription: 'A high-stakes algorithmic trading floor where microseconds and probability puzzles make or break you.',
    hiringRounds: [
      { step: 1, name: 'Aptitude & Quant Test', desc: 'Complex Bayes theorem, permutations & probability' },
      { step: 2, name: 'DSA & Mathematical Coding', desc: 'Number theory, dynamic programming & queues' },
      { step: 3, name: 'System Design & OS', desc: 'Low latency caches, indexing, and memory locks' },
      { step: 4, name: 'Quant & Behavioral Round', desc: 'High pressure scenarios and analytical rigor' },
      { step: 5, name: 'The Quantitative Overlord Boss', desc: 'High-frequency puzzle battle' }
    ],
    boss: {
      id: 'quant-overlord',
      name: 'Aurelius - The Quant Overlord',
      title: 'High-Frequency Market Maker',
      avatarEmoji: '📈',
      hp: 1150,
      lore: 'Calculates every decision down to five decimal places. Penalizes imprecise mathematical assumptions.',
      weakness: 'Probability Trees & Sliding Window Minimums',
      specialAttacks: [
        'Volatility Shock',
        'Bayesian Inversion',
        'Liquidity Freeze'
      ]
    },
    focusSkills: ['Probability & Permutations', 'Sliding Window & Heaps', 'DBMS B-Trees', 'Speed Quant']
  },
  {
    id: 'tcs',
    name: 'TCS (Digital / Ninja)',
    badge: 'Mass & Elite IT Guild',
    tagline: 'Master quantitative aptitude, verbal dexterity, and clean core programming.',
    logoIcon: 'ShieldCheck',
    themeColor: '#0072C6',
    accentColor: '#800080',
    bannerGradient: 'linear-gradient(135deg, rgba(0, 114, 198, 0.25) 0%, rgba(128, 0, 128, 0.2) 100%)',
    ctc: '₹3.6 - 9.0 LPA',
    difficulty: 'Adept',
    difficultyLevel: 3,
    worldName: 'The Enterprise Colosseum',
    worldDescription: 'A proving ground where thousands enter, testing rapid speed math, verbal logic, and coding basics.',
    hiringRounds: [
      { step: 1, name: 'TCS NQT Assessment', desc: 'Aptitude, Reasoning, Verbal & Advanced Coding' },
      { step: 2, name: 'Technical Interview', desc: 'Java/Python fundamentals, OOP, SQL queries' },
      { step: 3, name: 'Managerial Round', desc: 'Project architecture and problem resolution' },
      { step: 4, name: 'HR Interview', desc: 'Communication, location flexibility & company knowledge' },
      { step: 5, name: 'The NQT Gatekeeper Boss', desc: 'Timed speed coding & quantitative test' }
    ],
    boss: {
      id: 'nqt-gatekeeper',
      name: 'Titanus - The NQT Gatekeeper',
      title: 'Warden of Enterprise Selection',
      avatarEmoji: '🏛️',
      hp: 800,
      lore: 'Screens millions of lines of code. Tests your accuracy under intense ticking clocks.',
      weakness: 'Speed Math Formulations & SQL Group-By Queries',
      specialAttacks: [
        'Timer Crunch',
        'Negative Marking Flare',
        'Syntax Scramble'
      ]
    },
    focusSkills: ['Quantitative Aptitude', 'Verbal Reasoning', 'SQL Queries', 'Basic DSA & Arrays']
  }
];

export const getCompanyById = (id) => {
  return COMPANIES.find(c => c.id === id) || COMPANIES[0];
};
