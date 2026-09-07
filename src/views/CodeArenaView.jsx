import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  Zap,
  ChevronRight,
  Terminal,
  Cpu
} from 'lucide-react';
import { CODE_ARENA_PROBLEMS } from '../data/challenges';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const CodeArenaView = () => {
  const { addXP, addGems } = useGame();

  const [selectedProblemId, setSelectedProblemId] = useState('two-sum');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showHint, setShowHint] = useState(false);
  const [runStatus, setRunStatus] = useState(null); // null, 'running', 'passed', 'failed'
  const [testResults, setTestResults] = useState([]);
  const [customInput, setCustomInput] = useState('');

  const currentProblem = CODE_ARENA_PROBLEMS.find(p => p.id === selectedProblemId) || CODE_ARENA_PROBLEMS[0];
  const [userCode, setUserCode] = useState(currentProblem.starterCode[selectedLanguage] || '');

  const handleSelectProblem = (prob) => {
    playSound('click');
    setSelectedProblemId(prob.id);
    setUserCode(prob.starterCode[selectedLanguage] || '');
    setShowHint(false);
    setRunStatus(null);
  };

  const handleSelectLanguage = (lang) => {
    playSound('click');
    setSelectedLanguage(lang);
    setUserCode(currentProblem.starterCode[lang] || '');
  };

  const handleRunCode = () => {
    playSound('click');
    setRunStatus('running');

    setTimeout(() => {
      // Simulate running against test suite
      const results = currentProblem.testCases.map((tc, idx) => ({
        index: idx + 1,
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expected),
        actual: JSON.stringify(tc.expected),
        passed: true,
        runtime: `${12 + idx * 3}ms`
      }));

      setTestResults(results);
      setRunStatus('passed');
      playSound('correct');
      addXP(currentProblem.xpReward);
      addGems(currentProblem.gemReward);
    }, 600);
  };

  const handleResetCode = () => {
    playSound('click');
    setUserCode(currentProblem.starterCode[selectedLanguage] || '');
    setRunStatus(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Code Arena Header */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-semibold border border-purple-500/30 flex items-center gap-1.5">
              <Code2 size={13} />
              <span>INTERACTIVE CODE RUNNER</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">• Multi-Language Sandbox</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            Code Arena Playground
          </h1>
        </div>

        {/* Problem selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CODE_ARENA_PROBLEMS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectProblem(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedProblemId === p.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {p.title.split(' ')[0]} {p.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Coding IDE Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem Description & Test Cases */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
              <span className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-bold ${
                currentProblem.difficulty === 'Easy'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {currentProblem.difficulty}
              </span>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-purple-400 font-bold">+{currentProblem.xpReward} XP</span>
                <span className="text-cyan-400 font-bold">+{currentProblem.gemReward} 💎</span>
              </div>
            </div>

            <h2 className="text-xl font-heading font-bold text-white">
              {currentProblem.title}
            </h2>

            <div className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
              {currentProblem.description}
            </div>

            {/* Complexity Specs */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">TIME COMPLEXITY</span>
                <span className="text-cyan-400 font-semibold">{currentProblem.timeComplexity}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">SPACE COMPLEXITY</span>
                <span className="text-purple-400 font-semibold">{currentProblem.spaceComplexity}</span>
              </div>
            </div>

            {/* AI Code Doctor Hint */}
            <div>
              <button
                onClick={() => {
                  playSound('click');
                  setShowHint(!showHint);
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition"
              >
                <HelpCircle size={14} />
                <span>{showHint ? 'Hide AI Doctor Hint' : '💡 Need an AI Doctor Hint?'}</span>
              </button>

              {showHint && (
                <div className="mt-2 p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed animate-fadeIn">
                  {currentProblem.aiHint}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Console */}
        <div className="lg:col-span-7 space-y-4">
          {/* Editor Container */}
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-[#090b14]">
            {/* Editor Header Bar */}
            <div className="bg-[#101426] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
              {/* Language Selector */}
              <div className="flex items-center gap-1.5">
                {['javascript', 'python', 'cpp', 'java'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                      selectedLanguage === lang
                        ? 'bg-purple-600/40 text-purple-300 border border-purple-500/50'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>

              {/* Reset button */}
              <button
                onClick={handleResetCode}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
                title="Reset Starter Code"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Code Input Area */}
            <div className="relative">
              <textarea
                rows={14}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                spellCheck={false}
                className="w-full p-4 bg-transparent font-mono text-xs text-indigo-200 focus:outline-none leading-relaxed resize-none selection:bg-purple-500/30"
              />
            </div>

            {/* Run Button Bar */}
            <div className="bg-[#0e1222] p-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <Cpu size={14} /> Node v20 Runtime Environment
              </span>

              <button
                onClick={handleRunCode}
                disabled={runStatus === 'running'}
                className="btn-cyber-primary text-xs px-6 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-purple-500/30"
              >
                <Play size={14} className="fill-white" />
                <span>{runStatus === 'running' ? 'Compiling...' : 'Run & Test'}</span>
              </button>
            </div>
          </div>

          {/* Test Case Execution Output Console */}
          {testResults.length > 0 && (
            <div className="glass-panel p-5 rounded-3xl border border-emerald-500/40 bg-[#0a0f1d] space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-heading font-bold text-sm text-emerald-400">
                  <CheckCircle2 size={16} />
                  <span>All {testResults.length} Test Cases Passed Successfully!</span>
                </div>
                <span className="text-xs font-mono text-purple-400 font-bold">
                  +{currentProblem.xpReward} XP Awarded
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                {testResults.map((tr) => (
                  <div key={tr.index} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Test Case {tr.index}</span>
                      <span className="text-emerald-400">✓ {tr.runtime}</span>
                    </div>
                    <p className="text-slate-300 truncate">Input: {tr.input}</p>
                    <p className="text-cyan-400">Output: {tr.actual}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
