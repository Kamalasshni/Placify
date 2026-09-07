export const COMPANY_HISTORIES = {
  google: {
    id: 'google',
    name: 'Google',
    tagline: 'From Stanford Dorms to Global Distributed Search',
    founded: '1998 in Menlo Park, California',
    founders: 'Larry Page & Sergey Brin',
    icon: '🌐',
    themeColor: '#4285F4',
    bannerGradient: 'linear-gradient(135deg, #4285F4 0%, #EA4335 35%, #FBBC05 70%, #34A853 100%)',
    story: `Google began in January 1996 as a research project by Larry Page and Sergey Brin at Stanford University. Their revolutionary insight was PageRank—ranking web pages based on the quantity and importance of citations (backlinks) pointing to them, rather than just keyword counting. Operating out of Susan Wojcicki's Menlo Park garage in 1998, they pioneered foundational distributed systems like MapReduce, Google File System (GFS), and Bigtable that reshaped the entire computer science industry.`,
    funFacts: [
      'The original name was "Backrub" because it analyzed web backlinks.',
      'The first Google server rack was built out of Lego bricks to accommodate 10 hard drives of 4GB each.',
      'Google\'s famous "20% Time" policy led to the creation of Gmail, Google Maps, and AdSense.'
    ],
    hiringPhilosophy: 'Google tests for four core pillars: General Cognitive Ability (GCA), Role-Related Knowledge (RRK), Leadership, and "Googliness" (navigating ambiguity, intellectual humility, and collaborative passion).',
    questions: [
      {
        q: 'What was the foundational mathematical insight behind Google\'s PageRank algorithm created in 1996?',
        options: [
          'Ranking web pages based on incoming hyperlink graph citations as votes of authority',
          'Counting raw keyword occurrences on the HTML body text',
          'Alphabetical index sorting in an SQL database',
          'Manual curation by human editors'
        ],
        ans: 0,
        exp: 'PageRank treats hyperlinks as votes of trust: a link from an authoritative site passes higher weight to the destination page.'
      },
      {
        q: 'Which groundbreaking distributed storage paper published by Google in 2006 directly inspired the creation of Apache Cassandra and Apache HBase?',
        options: [
          'Bigtable: A Distributed Storage System for Structured Data',
          'MapReduce: Simplified Data Processing on Large Clusters',
          'Spanner: Google\'s Globally-Distributed Database',
          'The Google File System (GFS)'
        ],
        ans: 0,
        exp: 'Google\'s 2006 Bigtable paper defined sparse, distributed multi-dimensional sorted maps that powered modern NoSQL distributed databases.'
      },
      {
        q: 'In Google interview evaluations, what does "Googliness" specifically measure in a candidate?',
        options: [
          'Intellectual humility, thriving in ambiguity, bias to do the right thing, and collaborative energy',
          'Knowing every Google product line and memorizing API documentation',
          'Typing speed exceeding 100 words per minute',
          'Wearing colorful Google apparel'
        ],
        ans: 0,
        exp: 'Googliness evaluates your cultural synergy: how you handle constructive feedback, navigate ambiguous problems with low ego, and support your team.'
      }
    ]
  },
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    tagline: 'From an Online Bookstore to the World\'s Cloud Infrastructure',
    founded: '1994 in Bellevue, Washington',
    founders: 'Jeff Bezos',
    icon: '📦',
    themeColor: '#FF9900',
    bannerGradient: 'linear-gradient(135deg, #FF9900 0%, #146EB4 100%)',
    story: `Jeff Bezos left his Wall Street job at D.E. Shaw in 1994 after learning that web usage was growing by 2,300% per year. He chose books as the first product because books had more individual items (over 3 million titles) than any physical store could stock. As Amazon expanded, internal engineering bottlenecks forced them to create standardized, decoupled web services—which evolved into Amazon Web Services (AWS) in 2006, creating the modern cloud computing era.`,
    funFacts: [
      'Amazon\'s original registered name was "Cadabra" (as in Abracadabra), but it was changed after a lawyer misheard it as "Cadaver".',
      'The famous "Two-Pizza Team" rule dictates that no team should be larger than what two pizzas can feed (~6 to 10 engineers).',
      'Amazon invented the "Door Desk"—Jeff Bezos built the first company desks from wooden doors and four-by-four posts to symbolize Frugality.'
    ],
    hiringPhilosophy: 'Every hiring loop includes a "Bar Raiser"—a trained interviewer from a completely different department with independent veto power to ensure every new hire raises the collective average of the team.',
    questions: [
      {
        q: 'Why does Amazon enforce the "Bar Raiser" role in every placement interview loop?',
        options: [
          'To provide an objective external veto and ensure each new hire is stronger than 50% of current team members',
          'To negotiate salary and benefits package exclusively',
          'To administer live typing speed tests',
          'To replace the hiring manager\'s technical questions'
        ],
        ans: 0,
        exp: 'The Bar Raiser ensures long-term talent standards do not drop during urgent hiring sprints, holding full veto power.'
      },
      {
        q: 'Which distributed database whitepaper published by Amazon in 2007 established the foundation for modern Key-Value cloud storage with eventual consistency?',
        options: [
          'Dynamo: Amazon\'s Highly Available Key-value Store',
          'The Cassandra Architecture Blueprint',
          'Redshift Distributed Data Warehouse',
          'SimpleDB Architecture'
        ],
        ans: 0,
        exp: 'The Amazon Dynamo paper introduced Consistent Hashing, Vector Clocks, and Sloppy Quorums for high-availability cloud shopping carts.'
      },
      {
        q: 'Which of Amazon\'s 16 Leadership Principles emphasizes presenting data-backed conviction while committing whole-heartedly to final decisions?',
        options: [
          'Have Backbone; Disagree and Commit',
          'Frugality',
          'Invent and Simplify',
          'Hire and Develop the Best'
        ],
        ans: 0,
        exp: '"Have Backbone; Disagree and Commit" requires engineers to respectfully challenge decisions with data, but fully commit once a consensus is reached.'
      }
    ]
  },
  zoho: {
    id: 'zoho',
    name: 'Zoho',
    tagline: 'The Bootstrapped SaaS Titan of Rural Tech',
    founded: '1996 in Pleasanton, California / Chennai',
    founders: 'Sridhar Vembu & Tony Thomas',
    icon: '🔥',
    themeColor: '#E42528',
    bannerGradient: 'linear-gradient(135deg, #E42528 0%, #FBB900 50%, #008AD8 100%)',
    story: `Zoho was founded in 1996 as AdventNet, initially building network management software. Unlike almost all Silicon Valley unicorns, founder Sridhar Vembu refused venture capital funding, choosing to bootstrap the company to over 100 million global users and billions in revenue. Zoho pioneered the "Rural Tech Model", opening major engineering hubs in rural Tamil Nadu (Tenkasi) and training students through Zoho Schools of Learning without requiring college degrees.`,
    funFacts: [
      'Zoho has 0 outside investors and is 100% profitable and privately owned.',
      'Over 15% of Zoho\'s core engineering staff are graduates of Zoho Schools of Learning rather than traditional engineering colleges.',
      'Zoho runs its own data centers worldwide on custom-optimized bare-metal Linux servers with 0 third-party cloud dependence.'
    ],
    hiringPhilosophy: 'Zoho\'s recruitment focuses on raw, native algorithmic logic (Round 2 Advanced Coding & Round 3 CLI Design) where external libraries and regex shortcuts are strictly prohibited.',
    questions: [
      {
        q: 'What is unique about Zoho\'s corporate funding and engineering architecture compared to other tech unicorns?',
        options: [
          'It is 100% bootstrapped with zero venture capital and runs its SaaS suite on its own bare-metal datacenters',
          'It only builds hardware microchips',
          'It relies entirely on public cloud credits',
          'It was funded by 50 venture capital firms'
        ],
        ans: 0,
        exp: 'Zoho is one of the world\'s largest bootstrapped tech companies, owning and operating its entire hardware and software stack.'
      },
      {
        q: 'Why does Zoho\'s Round 2 and Round 3 interview format forbid the use of external packages and built-in library functions?',
        options: [
          'To test if a candidate understands first-principles memory manipulation, string parsing, and 2D matrix transformations',
          'Because Zoho only uses assembly language',
          'To save internet bandwidth during interviews',
          'Because libraries are illegal in software engineering'
        ],
        ans: 0,
        exp: 'Zoho prioritizes native logic: if you can write algorithms without standard library helpers, you can build scalable native software.'
      },
      {
        q: 'Which famous educational initiative by Zoho trains high school and diploma students directly into software engineers without formal college degrees?',
        options: [
          'Zoho Schools of Learning (ZSL)',
          'Zoho Stanford Academy',
          'The Silicon Valley Institute',
          'Zoho University Bootcamps'
        ],
        ans: 0,
        exp: 'Zoho Schools of Learning provides free education and monthly stipends, training exceptional talent directly into core software teams.'
      }
    ]
  },
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft',
    tagline: 'From Personal Computing to Intelligent Cloud',
    founded: '1975 in Albuquerque, New Mexico',
    founders: 'Bill Gates & Paul Allen',
    icon: '💎',
    themeColor: '#00A4EF',
    bannerGradient: 'linear-gradient(135deg, #00A4EF 0%, #7FBA00 50%, #F25022 100%)',
    story: `Microsoft was born in 1975 when Bill Gates and Paul Allen adapted the BASIC programming language for the MITS Altair 8800 microcomputer. Their 1980 deal with IBM to supply MS-DOS propelled Microsoft into becoming the dominant software operating system across the globe. Under CEO Satya Nadella\'s leadership since 2014, Microsoft executed one of the greatest corporate transformations in history, shifting from a "know-it-all" culture to a "learn-it-all" Growth Mindset, embracing open-source, GitHub, and Azure cloud infrastructure.`,
    funFacts: [
      'Bill Gates wrote his first computer program (a tic-tac-toe game in BASIC) at age 13.',
      'Microsoft famously originated brainteaser interview questions in the 1990s (e.g. "Why are manhole covers round?").',
      'TypeScript, created by Microsoft architect Anders Hejlsberg in 2012, has become the 2nd most popular programming language on Earth.'
    ],
    hiringPhilosophy: 'Microsoft looks for collaborative problem solvers who demonstrate a "Growth Mindset"—viewing failure as a learning vector, showing deep coding modularity, and explaining code clearly.',
    questions: [
      {
        q: 'Under CEO Satya Nadella, what core cultural philosophy became the central evaluation criterion across Microsoft engineering?',
        options: [
          'The "Learn-it-All" Growth Mindset over a "Know-it-All" fixed mindset',
          'Working 100 hours a week without vacation',
          'Banning all open-source software contributions',
          'Memorizing Windows OS registry keys'
        ],
        ans: 0,
        exp: 'The Growth Mindset encourages continuous curiosity, learning from failure, and inclusive collaboration across teams.'
      },
      {
        q: 'Which open-source language created by Microsoft in 2012 revolutionized scalable web application development by adding optional static typing to JavaScript?',
        options: ['TypeScript', 'C#', 'Rust', 'Kotlin'],
        ans: 0,
        exp: 'TypeScript was created by Anders Hejlsberg at Microsoft to enable robust, maintainable large-scale JavaScript codebases.'
      }
    ]
  },
  goldman: {
    id: 'goldman',
    name: 'Goldman Sachs',
    tagline: 'High-Frequency FinTech and Quantitative Mastery',
    founded: '1869 in New York City',
    founders: 'Marcus Goldman & Samuel Sachs',
    icon: '📈',
    themeColor: '#689FD2',
    bannerGradient: 'linear-gradient(135deg, #689FD2 0%, #D4AF37 100%)',
    story: `Goldman Sachs was founded in 1869 by Marcus Goldman, who pioneered commercial paper trading by buying promissory notes from merchants and selling them to banks. In the modern era, Goldman Sachs became a financial technology powerhouse, building SecDB (Securities Database)—a proprietary distributed risk management and pricing platform written in its custom language, Slang. Their engineering teams build low-latency order execution systems where nanoseconds and probability theory determine billions in trades.`,
    funFacts: [
      'Goldman Sachs was among the first financial institutions to treat software engineers as front-office revenue generators rather than back-office cost centers.',
      'SecDB manages over 100 million lines of code and computes real-time pricing and risk across millions of global financial instruments every second.'
    ],
    hiringPhilosophy: 'Interviews evaluate high-speed mathematical agility, probability puzzles (Bayes theorem, dice games), low-latency caching, and precise Big-O reasoning.',
    questions: [
      {
        q: 'What is SecDB, the famous proprietary technology platform built by Goldman Sachs engineering?',
        options: [
          'A real-time distributed object-oriented risk analysis and pricing engine that processes millions of market calculations per second',
          'A simple spreadsheet calculator for client invoices',
          'A social networking portal for stock traders',
          'A hardware chip for ATM machines'
        ],
        ans: 0,
        exp: 'SecDB is one of Wall Street\'s most sophisticated proprietary distributed computational platforms, calculating global financial risk continuously.'
      },
      {
        q: 'A fair coin is flipped 3 times. What is the probability of getting at least two heads in a row (HH)?',
        options: ['3/8 (37.5%)', '1/2 (50%)', '1/4 (25%)', '5/8 (62.5%)'],
        ans: 0,
        exp: 'Total outcomes = 8. Favorable outcomes with consecutive HH: {HHH, HHT, THH} = 3 outcomes. Probability = 3/8.'
      }
    ]
  },
  tcs: {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    tagline: 'The Pioneer of the Indian IT Revolution',
    founded: '1968 in Mumbai, India',
    founders: 'FC Kohli & JRD Tata',
    icon: '🏛️',
    themeColor: '#0072C6',
    bannerGradient: 'linear-gradient(135deg, #0072C6 0%, #800080 100%)',
    story: `Tata Consultancy Services was established in 1968 by visionary JRD Tata and Faqir Chand Kohli (known as the "Father of the Indian IT Industry"). In 1970, TCS won its first overseas project to automate the depository system of the London Stock Exchange. TCS grew to become India's largest IT multinational and one of the highest market-capitalization technology service companies in the world, employing over 600,000 engineers globally.`,
    funFacts: [
      'FC Kohli was an MIT graduate who championed the creation of India\'s first computer science engineering curricula at IIT Kanpur.',
      'TCS was the first Indian software services firm to cross $100 billion in market valuation.',
      'The TCS NQT (National Qualifier Test) screens over 300,000 engineering graduates annually.'
    ],
    hiringPhilosophy: 'TCS evaluates candidates on speed math, verbal reasoning, core Java/Python syntax, and agile collaborative adaptability in client engagements.',
    questions: [
      {
        q: 'Who is widely recognized as the "Father of the Indian IT Industry" and the founding leader of TCS?',
        options: ['Faqir Chand Kohli (FC Kohli)', 'Narayana Murthy', 'Ratan Tata', 'Azim Premji'],
        ans: 0,
        exp: 'FC Kohli founded TCS in 1968 and laid the technical and managerial blueprint for India\'s multi-billion dollar software export industry.'
      },
      {
        q: 'In the TCS National Qualifier Test (NQT), which two programming paradigms are most critical for clearing the Advanced Coding section?',
        options: [
          'Array manipulations & String formatting algorithms',
          'GPU Quantum Assembly Language',
          '3D Game Physics rendering',
          'Compiler design tokenizers'
        ],
        ans: 0,
        exp: 'TCS NQT coding rounds focus on efficient string parsing, matrix operations, sorting, and array sliding window logic.'
      }
    ]
  }
};
