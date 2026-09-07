export const SKILL_TREE_DATA = [
  {
    category: 'Aptitude & Logic Mastery',
    icon: 'Brain',
    color: '#06b6d4',
    nodes: [
      {
        id: 'apt-speed-math',
        title: 'Speed Arithmetic & Percentages',
        description: 'Mental calculation shortcuts, ratio & proportions, and profit-loss formulae.',
        cost: 100,
        tier: 1,
        unlocked: true,
        buff: '+15% Time Bonus on Aptitude Stages',
        prereqs: []
      },
      {
        id: 'apt-time-work',
        title: 'Time, Speed, Distance & Work',
        description: 'Pipes & cisterns, relative speed, train problems and work-rate equivalencies.',
        cost: 200,
        tier: 2,
        unlocked: false,
        buff: '+25 XP per Aptitude challenge',
        prereqs: ['apt-speed-math']
      },
      {
        id: 'apt-probability',
        title: 'Permutations, Combinations & Probability',
        description: 'Bayesian odds, conditional probability, independent events, and circular arrangements.',
        cost: 350,
        tier: 3,
        unlocked: false,
        buff: '+10% PRI score multiplier',
        prereqs: ['apt-time-work']
      }
    ]
  },
  {
    category: 'Data Structures & Algorithms',
    icon: 'Code',
    color: '#a855f7',
    nodes: [
      {
        id: 'dsa-arrays-hashmaps',
        title: 'Arrays & Hash Maps Foundation',
        description: 'Two Pointers, Sliding Window, Prefix Sums, and O(1) Hash Map lookups.',
        cost: 150,
        tier: 1,
        unlocked: true,
        buff: 'Unlocks Code Arena Standard Suite',
        prereqs: []
      },
      {
        id: 'dsa-trees-graphs',
        title: 'Trees & Graph Traversals',
        description: 'BFS, DFS, Dijkstra Shortest Path, Binary Search Trees, and Topological Sort.',
        cost: 300,
        tier: 2,
        unlocked: false,
        buff: '+20% Damage vs Tier-1 Company Bosses',
        prereqs: ['dsa-arrays-hashmaps']
      },
      {
        id: 'dsa-dp-mastery',
        title: 'Dynamic Programming Grandmaster',
        description: '0/1 Knapsack, Longest Common Subsequence, Matrix DP, and State Compression.',
        cost: 500,
        tier: 3,
        unlocked: false,
        buff: 'Immunity to Boss Big-O Penalties',
        prereqs: ['dsa-trees-graphs']
      }
    ]
  },
  {
    category: 'Core Computer Science',
    icon: 'Server',
    color: '#6366f1',
    nodes: [
      {
        id: 'core-os-concurrency',
        title: 'Operating Systems & Concurrency',
        description: 'Virtual memory paging, thread synchronization, mutexes, semaphores, and deadlocks.',
        cost: 200,
        tier: 1,
        unlocked: false,
        buff: 'Reveals 1 free hint in Core CS rounds',
        prereqs: []
      },
      {
        id: 'core-dbms-indexing',
        title: 'Database Systems & B-Trees',
        description: 'SQL queries, Normalization (1NF to BCNF), ACID guarantees, and Index optimization.',
        cost: 350,
        tier: 2,
        unlocked: false,
        buff: '+50 Gems on Core Tower completion',
        prereqs: ['core-os-concurrency']
      },
      {
        id: 'core-system-design',
        title: 'High-Level System Design',
        description: 'Load balancers, Caching strategies, Message Queues (Kafka/RabbitMQ), and CAP theorem.',
        cost: 600,
        tier: 3,
        unlocked: false,
        buff: 'Unlocks Boss Battle AI Shield Powerup',
        prereqs: ['core-dbms-indexing']
      }
    ]
  },
  {
    category: 'Behavioral & Leadership',
    icon: 'Award',
    color: '#10b981',
    nodes: [
      {
        id: 'hr-star-method',
        title: 'STAR Interview Framework',
        description: 'Structure answers into Situation, Task, Action, and Measurable Result.',
        cost: 150,
        tier: 1,
        unlocked: true,
        buff: '+25% score on AI Mock Interviews',
        prereqs: []
      },
      {
        id: 'hr-leadership-principles',
        title: 'Executive Communication & Culture Fit',
        description: 'Master conflict resolution, ambiguity navigation, and authentic value alignment.',
        cost: 350,
        tier: 2,
        unlocked: false,
        buff: 'Unlocks Certified Placement Ready Badge',
        prereqs: ['hr-star-method']
      }
    ]
  }
];
