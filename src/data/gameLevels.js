export const GAME_LEVELS = [
  {
    levelNumber: 1,
    id: 'level-1',
    title: 'Speed Math Blitz',
    subtitle: 'Screening Round • Fast Quantitative Arcade',
    category: 'Aptitude Arcade',
    gameType: 'speed_math',
    worldZone: 'Aptitude Citadel',
    icon: '⚡',
    color: '#06b6d4',
    timePerQuestion: 12,
    targetScore: 400,
    xpReward: 200,
    gemReward: 30,
    starThresholds: { 1: 300, 2: 600, 3: 900 },
    description: 'Answer rapid-fire arithmetic and percentage questions before the fuse runs out. Maintain combos for 3x multiplier points!',
    questions: [
      {
        q: 'What is 15% of 480?',
        options: ['64', '72', '78', '82'],
        ans: 1, // 72: 48 + 24 = 72
        exp: '10% of 480 = 48. 5% = 24. 48 + 24 = 72.'
      },
      {
        q: 'A train 180m long passes a pole in 9 seconds. What is its speed in km/h?',
        options: ['54 km/h', '64 km/h', '72 km/h', '90 km/h'],
        ans: 2, // 180/9 = 20 m/s * (18/5) = 72 km/h
        exp: 'Speed = 180m / 9s = 20 m/s. In km/h = 20 * (18/5) = 72 km/h.'
      },
      {
        q: 'If the cost price of 12 pens equals the selling price of 8 pens, what is the gain percentage?',
        options: ['33.33%', '50.00%', '66.66%', '40.00%'],
        ans: 1, // Gain % = ((12-8)/8)*100 = 50%
        exp: 'Gain on 8 pens = 4 pens. Profit % = (4 / 8) * 100 = 50%.'
      },
      {
        q: 'Find the next number in series: 7, 14, 28, 56, ?',
        options: ['98', '112', '124', '108'],
        ans: 1, // 56 * 2 = 112
        exp: 'Each number is multiplied by 2: 56 * 2 = 112.'
      }
    ]
  },
  {
    levelNumber: 2,
    id: 'level-2',
    title: 'Bug Buster 15s Blitz',
    subtitle: 'Technical Round • Spot The Critical Bug Line',
    category: 'Code Arcade',
    gameType: 'bug_buster',
    worldZone: 'Algorithm Dungeon',
    icon: '🐛',
    color: '#a855f7',
    timePerQuestion: 15,
    targetScore: 450,
    xpReward: 250,
    gemReward: 35,
    starThresholds: { 1: 350, 2: 700, 3: 1000 },
    description: 'A faulty code snippet is threatening production! Tap the exact line containing the memory leak, index out of bounds, or logic flaw before the timer hits zero.',
    codePuzzles: [
      {
        title: 'Binary Search Boundary Bug',
        language: 'JavaScript',
        lines: [
          'function binarySearch(arr, target) {',
          '  let left = 0, right = arr.length;', // Bug is right = arr.length instead of arr.length - 1
          '  while (left <= right) {',
          '    let mid = Math.floor((left + right) / 2);',
          '    if (arr[mid] === target) return mid;',
          '    if (arr[mid] < target) left = mid + 1;',
          '    else right = mid - 1;',
          '  }',
          '  return -1;',
          '}'
        ],
        bugLineIndex: 1, // 0-indexed line 1: `let left = 0, right = arr.length;`
        explanation: 'Off-by-one bug! `right` must be initialized to `arr.length - 1` to prevent out-of-bounds array access on boundary searches.'
      },
      {
        title: 'Array Push Mutation Bug',
        language: 'Python',
        lines: [
          'def get_squares(numbers):',
          '    res = []',
          '    for i in range(len(numbers)):',
          '        res.append(numbers[i] ** 2)',
          '    return numbers' // Bug: returning numbers instead of res!
        ],
        bugLineIndex: 4,
        explanation: 'Logic Bug! The function computes squares into `res` but mistakenly returns the original unmodified `numbers` list.'
      },
      {
        title: 'Infinite Loop Recursion Bug',
        language: 'Java',
        lines: [
          'public int factorial(int n) {',
          '    if (n == 0) return 1;',
          '    return n * factorial(n);', // Bug: factorial(n) instead of factorial(n - 1)
          '}'
        ],
        bugLineIndex: 2,
        explanation: 'Stack Overflow Hazard! Recursion calls `factorial(n)` instead of `factorial(n - 1)`, resulting in an infinite recursion stack overflow.'
      }
    ]
  },
  {
    levelNumber: 3,
    id: 'level-3',
    title: 'Pattern Matrix Dungeon',
    subtitle: 'Logical Reasoning • Deduction Puzzles',
    category: 'Logic Arcade',
    gameType: 'pattern_matrix',
    worldZone: 'The Redmond Matrix',
    icon: '🧩',
    color: '#3b82f6',
    timePerQuestion: 15,
    targetScore: 400,
    xpReward: 300,
    gemReward: 40,
    starThresholds: { 1: 300, 2: 650, 3: 950 },
    description: 'Decode 2D matrix grids, symbol rotations, and alpha-numeric series under ticking clock pressure.',
    questions: [
      {
        q: 'Identify the missing element in the 3x3 matrix:\n[ 2, 4, 8 ]\n[ 3, 9, 27 ]\n[ 4, 16, ? ]',
        options: ['32', '64', '48', '80'],
        ans: 1, // 4^3 = 64
        exp: 'Row rule: x, x^2, x^3. For 3rd row: 4, 4^2=16, 4^3 = 64.'
      },
      {
        q: 'If APPLE = 50 and BANANA = 42, what is the value of ORANGE using sum of letter positions?',
        options: ['60', '65', '72', '58'],
        ans: 0, // O(15)+R(18)+A(1)+N(14)+G(7)+E(5) = 60
        exp: 'O(15) + R(18) + A(1) + N(14) + G(7) + E(5) = 60.'
      },
      {
        q: 'Complete the pattern: AZ, BY, CX, DW, ?',
        options: ['EV', 'FU', 'EU', 'ET'],
        ans: 0, // A->B->C->D->E and Z->Y->X->W->V => EV
        exp: 'First letter moves forward (+1), second letter moves backward (-1) from Z: E and V => EV.'
      }
    ]
  },
  {
    levelNumber: 4,
    id: 'level-4',
    title: 'Algorithm Duel vs Glitch Bot',
    subtitle: 'Live Code Race • Beat the AI Rival',
    category: 'Duel Arcade',
    gameType: 'algo_duel',
    worldZone: 'The Mountain View Spire',
    icon: '⚔️',
    color: '#6366f1',
    timePerQuestion: 25,
    targetScore: 500,
    xpReward: 350,
    gemReward: 50,
    starThresholds: { 1: 400, 2: 750, 3: 1100 },
    description: 'Race head-to-head against Glitch Bot AI! Answer the optimal time complexity and data structure decisions before the bot finishes writing its solution.',
    rivalName: 'Glitch Bot 3000 (Rival AI)',
    rivalAvatar: '🤖',
    duelRounds: [
      {
        q: 'Glitch Bot is sorting 1,000,000 integers with O(1) auxiliary memory. Which algorithm must he execute?',
        options: ['Merge Sort', 'Heap Sort or In-Place QuickSort', 'Counting Sort', 'Radix Sort'],
        ans: 1,
        exp: 'HeapSort runs in O(N log N) worst-case time with strictly O(1) extra space.'
      },
      {
        q: 'Glitch Bot needs to find if a cycle exists in a Singly LinkedList in O(1) space. Which technique wins?',
        options: ['Floyd\'s Tortoise and Hare (Two Pointers)', 'Hash Set of all node pointers', 'Recursion stack tracking', 'Modifying node values to -1'],
        ans: 0,
        exp: 'Floyd\'s Cycle Detection algorithm uses slow (1x) and fast (2x) pointers to detect loops in O(N) time and O(1) space.'
      },
      {
        q: 'Which data structure allows finding the median of a dynamically growing stream of numbers in O(log N) insert and O(1) find?',
        options: ['Two Heaps (Max-Heap for lower half, Min-Heap for upper half)', 'Single sorted dynamic array', 'Standard FIFO Queue', 'Trie prefix tree'],
        ans: 0,
        exp: 'Balancing a Max-Heap and Min-Heap keeps the median directly accessible at the root in O(1) time.'
      }
    ]
  },
  {
    levelNumber: 5,
    id: 'level-5',
    title: 'Deadlock Defense (OS Puzzler)',
    subtitle: 'Core Systems • Avoid Circular Wait',
    category: 'Systems Arcade',
    gameType: 'deadlock_puzzler',
    worldZone: 'The SaaS Bastion',
    icon: '🛡️',
    color: '#10b981',
    timePerQuestion: 15,
    targetScore: 450,
    xpReward: 300,
    gemReward: 40,
    starThresholds: { 1: 350, 2: 700, 3: 1000 },
    description: 'Process threads are competing for Mutex Locks! Allocate resources to safe states and prevent Coffman deadlocks.',
    questions: [
      {
        q: 'Thread A holds Lock 1 and requests Lock 2. Thread B holds Lock 2 and requests Lock 1. How do you break this deadlock condition?',
        options: [
          'Enforce strict global lock hierarchy ordering (always acquire Lock 1 before Lock 2)',
          'Create 10 more threads to compete for Lock 1',
          'Disable CPU interrupts forever',
          'Convert both locks into infinite sleep loops'
        ],
        ans: 0,
        exp: 'Imposing a strict global resource hierarchy ordering eliminates Circular Wait, preventing deadlocks permanently.'
      },
      {
        q: 'In Banker\'s Algorithm for deadlock avoidance, when is a system state defined as "Safe"?',
        options: [
          'When at least one sequence of process allocations exists that allows all processes to finish without deadlock',
          'When all memory is 100% utilized with 0 free bytes',
          'When no processes are running at all',
          'When every thread acquires locks simultaneously'
        ],
        ans: 0,
        exp: 'A state is Safe if there exists a safe sequence <P1, P2, ... Pn> where each process can obtain its maximum needed resources and terminate.'
      },
      {
        q: 'Which CPU scheduling algorithm gives the absolute minimum average waiting time for a given set of stationary processes?',
        options: ['Shortest Job First (SJF / SRTF)', 'First Come First Served (FCFS)', 'Round Robin with Large Quantum', 'Priority Scheduling with Aging'],
        ans: 0,
        exp: 'SJF is provably optimal for minimizing average waiting time by scheduling the shortest bursts first.'
      }
    ]
  },
  {
    levelNumber: 6,
    id: 'level-6',
    title: 'SQL Query Quest',
    subtitle: 'Database Mastery • Assemble The Query',
    category: 'Database Arcade',
    gameType: 'sql_quest',
    worldZone: 'The Enterprise Colosseum',
    icon: '💾',
    color: '#f59e0b',
    timePerQuestion: 15,
    targetScore: 450,
    xpReward: 350,
    gemReward: 45,
    starThresholds: { 1: 350, 2: 700, 3: 1050 },
    description: 'Construct high-performance SQL queries, index lookups, and transaction isolations to unlock the database vault.',
    questions: [
      {
        q: 'Which query correctly finds the 2nd Highest Salary from an `Employees` table?',
        options: [
          'SELECT MAX(salary) FROM Employees WHERE salary < (SELECT MAX(salary) FROM Employees);',
          'SELECT salary FROM Employees ORDER BY salary ASC LIMIT 2;',
          'SELECT salary FROM Employees WHERE salary = 2;',
          'SELECT AVG(salary) FROM Employees GROUP BY salary;'
        ],
        ans: 0,
        exp: 'Filtering out the overall MAX salary and selecting the next MAX returns the 2nd highest salary cleanly.'
      },
      {
        q: 'What type of Index is created by default on a Table\'s PRIMARY KEY column in MySQL / PostgreSQL?',
        options: ['Clustered B+ Tree Index', 'Full-Text Hash Index', 'Spatial R-Tree Index', 'Bitmap Index only'],
        ans: 0,
        exp: 'Primary keys automatically construct a Clustered B+ Tree Index, physically ordering the table rows on disk.'
      },
      {
        q: 'To prevent "Dirty Reads" where Transaction 1 reads uncommitted changes from Transaction 2, which minimum isolation level is required?',
        options: ['Read Committed', 'Read Uncommitted', 'Repeatable Read', 'Serializable'],
        ans: 0,
        exp: 'Read Committed guarantees that transactions only read data that has been fully committed to disk.'
      }
    ]
  },
  {
    levelNumber: 7,
    id: 'level-7',
    title: 'System Defense Simulator',
    subtitle: 'High-Level Architecture • Defend Against DDoS',
    category: 'Architecture Arcade',
    gameType: 'system_defense',
    worldZone: 'The Bar Raiser Citadel',
    icon: '🌐',
    color: '#ec4899',
    timePerQuestion: 18,
    targetScore: 500,
    xpReward: 400,
    gemReward: 50,
    starThresholds: { 1: 400, 2: 800, 3: 1200 },
    description: 'Incoming user traffic spikes from 1K to 10M requests/sec! Deploy the optimal distributed architectural components to prevent system outage.',
    questions: [
      {
        q: 'Traffic spike detected: 10,000,000 read requests/second on celebrity profile data. Where do you place the primary caching layer?',
        options: [
          'Redis / Memcached in-memory cluster with Cache-Aside pattern',
          'Write directly to spinning magnetic hard drive disks',
          'Store everything in browser localStorage only',
          'Disable the server until traffic subsides'
        ],
        ans: 0,
        exp: 'Redis distributed in-memory clusters provide sub-millisecond read responses, shielding the primary SQL database from overload.'
      },
      {
        q: 'An asynchronous payment processing webhook takes 3 seconds to complete. How do you prevent API gateway timeouts?',
        options: [
          'Push payment events into a Message Queue (Apache Kafka / RabbitMQ) and respond 202 Accepted immediately',
          'Hold the user on a synchronous HTTP connection for 5 minutes',
          'Cancel 90% of transactions at random',
          'Execute all payments sequentially on a single thread'
        ],
        ans: 0,
        exp: 'Message Queues decouple request ingestion from background processing, enabling high throughput without blocking client APIs.'
      },
      {
        q: 'To route global users to the geographically nearest server datacenter with lowest latency, which routing strategy is optimal?',
        options: [
          'Anycast DNS + CDN Edge Server Routing (Cloudflare / CloudFront)',
          'Hardcode a single IP address in Oregon for everyone',
          'Round-Robin across opposite ends of the globe',
          'Manual country selector dropdown on every packet'
        ],
        ans: 0,
        exp: 'Anycast and Edge CDNs route packets to the nearest Point of Presence (PoP), cutting latency from 250ms down to <15ms.'
      }
    ]
  },
  {
    levelNumber: 8,
    id: 'level-8',
    title: 'STAR Behavioral Gauntlet',
    subtitle: 'HR Arena • Fast Situational Decisions',
    category: 'HR Arcade',
    gameType: 'star_gauntlet',
    worldZone: 'The Mountain View Spire',
    icon: '🎙️',
    color: '#14b8a6',
    timePerQuestion: 18,
    targetScore: 500,
    xpReward: 400,
    gemReward: 50,
    starThresholds: { 1: 400, 2: 800, 3: 1100 },
    description: 'Face rapid-fire workplace dilemmas and pressure questions. Pick the response demonstrating highest emotional intelligence, ownership, and STAR rigor.',
    questions: [
      {
        q: 'Interviewer asks: "Your teammate wrote code that caused a minor production incident. The manager asks who is responsible. What do you do?"',
        options: [
          'Focus on a blameless postmortem: take shared ownership, identify testing gaps in CI/CD, and write automated tests together to ensure it never happens again.',
          'Immediately point fingers at the teammate so your reputation is clear.',
          'Refuse to answer and stay silent.',
          'Blame the client for clicking the button.'
        ],
        ans: 0,
        exp: 'Mature engineering culture prioritizes Blameless Postmortems and systemic guardrails over personal finger-pointing.'
      },
      {
        q: 'Interviewer asks: "You have 3 high-priority features due in 2 days, but only capacity to finish 1. How do you handle this?"',
        options: [
          'Proactively communicate with stakeholders, present impact data, negotiate scope to deliver the highest-ROI feature first, and set realistic timelines for the rest.',
          'Work 48 hours without sleep and push untested buggy code.',
          'Ignore the emails and hope no one notices the deadline.',
          'Quit the project.'
        ],
        ans: 0,
        exp: 'Proactive transparent communication and data-backed prioritization demonstrate true executive maturity.'
      }
    ]
  },
  {
    levelNumber: 9,
    id: 'level-9',
    title: 'The Bar Raiser Boss Battle',
    subtitle: 'Hiring Bar Boss • 1,000 HP Battle',
    category: 'Boss Battle',
    gameType: 'boss_fight',
    worldZone: 'The Bar Raiser Citadel',
    icon: '💀',
    color: '#ef4444',
    timePerQuestion: 25,
    targetScore: 800,
    xpReward: 600,
    gemReward: 100,
    starThresholds: { 1: 600, 2: 1000, 3: 1500 },
    bossHp: 1000,
    bossName: 'Vanguard Prime (The Bar Raiser)',
    bossAvatar: '🛡️',
    description: 'Turn-based combat against the Bar Raiser Boss! Boss has 1,000 HP. Answer correctly to unleash high-damage combo attacks. Use your Power-ups to survive counterattacks!',
    bossRounds: [
      {
        action: 'Vanguard Prime casts: [Principle Invalidation Pulse]!',
        q: 'Which distributed system design pattern guarantees that a service remains responsive by immediately failing calls to an unresponsive downstream microservice?',
        options: ['Circuit Breaker Pattern', 'Infinite Retry Loop', 'Direct Thread Blocking', 'Random Socket Dropping'],
        ans: 0,
        dmgToBoss: 350,
        dmgToPlayer: 25,
        exp: 'The Circuit Breaker pattern trips open after a failure threshold, protecting upstream systems from cascading latency lockups.'
      },
      {
        action: 'Vanguard Prime attacks with: [Heap Sorting Avalanche]!',
        q: 'What is the optimal time complexity to find the Kth largest element in a stream of N numbers using a Min-Heap of size K?',
        options: ['O(N log K)', 'O(N^2)', 'O(N * K)', 'O(K log N)'],
        ans: 0,
        dmgToBoss: 350,
        dmgToPlayer: 30,
        exp: 'A Min-Heap of size K processes N incoming items in O(N log K) time total.'
      },
      {
        action: 'FINAL STRIKE: [Extreme High-Throughput Barrage]!',
        q: 'In DynamoDB or NoSQL stores, how is data evenly partitioned across distributed physical storage nodes?',
        options: ['Consistent Hashing on Partition Key', 'Storing everything on one SSD', 'Alphabetical locks', 'Random round robin without keys'],
        ans: 0,
        dmgToBoss: 400,
        dmgToPlayer: 35,
        exp: 'Consistent Hashing distributes keys evenly along a virtual hash ring with minimal data migration when scaling nodes.'
      }
    ]
  },
  {
    levelNumber: 10,
    id: 'level-10',
    title: 'The Grandmaster Placement Trial',
    subtitle: 'Final Boss • Gold Certification Unlocked',
    category: 'Grandmaster Boss',
    gameType: 'boss_fight',
    worldZone: 'The Wall Street Fortress',
    icon: '👑',
    color: '#eab308',
    timePerQuestion: 25,
    targetScore: 1000,
    xpReward: 1000,
    gemReward: 200,
    starThresholds: { 1: 800, 2: 1200, 3: 1800 },
    bossHp: 1200,
    bossName: 'Dr. Cypher - The Placement Grandmaster',
    bossAvatar: '⚡',
    description: 'The final proving trial! Defeat the Placement Grandmaster to claim 3 Stars, unlock the Gold Trophy, and earn your verified Placement Ready Certification!',
    bossRounds: [
      {
        action: 'Dr. Cypher unleashes: [Distributed Split-Brain Attack]!',
        q: 'In distributed consensus algorithms (Raft / Paxos), what is the minimum quorum of nodes required to elect a new leader in an N-node cluster?',
        options: ['Majority: (N / 2) + 1 nodes', 'All 100% of nodes must agree', 'Exactly 1 node', 'Only worker nodes'],
        ans: 0,
        dmgToBoss: 400,
        dmgToPlayer: 30,
        exp: 'A strict majority (N/2 + 1) prevents split-brain scenarios where two disjoint clusters could elect rival leaders.'
      },
      {
        action: 'Dr. Cypher charges: [Dynamic Programming Obliteration]!',
        q: 'What is the optimal time complexity of finding the Longest Common Subsequence of two strings of lengths M and N?',
        options: ['O(M * N)', 'O(M + N)', 'O(2^(M+N))', 'O(M log N)'],
        ans: 0,
        dmgToBoss: 400,
        dmgToPlayer: 35,
        exp: 'A 2D Dynamic Programming table of dimensions (M+1) x (N+1) computes the LCS in O(M * N) time.'
      },
      {
        action: 'FINAL STAND: [Placement Readiness Singularity]!',
        q: 'Which Bloom Filter characteristic guarantees zero false negatives for high-speed cache lookups?',
        options: [
          'If the Bloom filter returns "Not Present", the element is 100% guaranteed not in the dataset',
          'It can store unlimited string values with 0 memory',
          'It removes all duplicate records automatically',
          'It replaces SQL tables completely'
        ],
        ans: 0,
        dmgToBoss: 500,
        dmgToPlayer: 40,
        exp: 'Bloom Filters have zero false negatives: if all hash bits are not set, the element definitely does not exist.'
      }
    ]
  }
];

export const getLevelByNumber = (num) => {
  return GAME_LEVELS.find(l => l.levelNumber === Number(num)) || GAME_LEVELS[0];
};
