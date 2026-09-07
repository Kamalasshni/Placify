import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Zap, 
  Sparkles, 
  Code2, 
  Brain, 
  Server, 
  UserCheck, 
  ArrowRight,
  Play,
  RotateCcw
} from 'lucide-react';
import { COMPANY_STAGES, CODE_ARENA_PROBLEMS } from '../data/challenges';
import { evaluateInterviewAnswer } from '../data/mockInterviews';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const StageRunnerView = ({ stageNumber = 1, setActiveTab }) => {
  const { 
    targetCompany, 
    completeStage, 
    addXP, 
    addGems 
  } = useGame();

  const stageKey = `stage${stageNumber}`;
  const stageConfig = COMPANY_STAGES[stageKey] || COMPANY_STAGES.stage1;

  // State for MCQ stages (1 and 3)
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // State for Stage 2 (Algorithm Dungeon)
  const [codeOutput, setCodeOutput] = useState(null);
  const [codePassed, setCodePassed] = useState(false);

  // State for Stage 4 (HR Arena)
  const [hrAnswer, setHrAnswer] = useState('');
  const [hrEvaluation, setHrEvaluation] = useState(null);

  // Handle MCQ Selection
  const handleSelectMCQ = (idx) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);

    const currQ = stageConfig.questions[qIndex];
    if (idx === currQ.correctAnswer) {
      playSound('correct');
      setScore(prev => prev + 1);
    } else {
      playSound('wrong');
    }
  };

  const handleNextMCQ = () => {
    playSound('click');
    if (qIndex < stageConfig.questions.length - 1) {
      setQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      handleCompleteStage();
    }
  };

  const handleRunAlgorithm = () => {
    playSound('correct');
    setCodeOutput({
      status: 'SUCCESS',
      passed: 4,
      total: 4,
      runtime: '14 ms (Faster than 94% of submissions)',
      memory: '42.1 MB'
    });
    setCodePassed(true);
  };

  const handleEvaluateHR = () => {
    playSound('click');
    const currPrompt = stageConfig.prompts[0];
    const evalResult = evaluateInterviewAnswer(
      { keywords: ['deadline', 'team', 'triaged', 'fixed', 'result', 'learned', 'implemented'] },
      hrAnswer
    );
    setHrEvaluation(evalResult);
    if (evalResult.overallScore >= 60) {
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  const handleCompleteStage = () => {
    playSound('level_up');
    completeStage(targetCompany.id, stageNumber);
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto glass-panel border-2 border-emerald-500/40 p-8 md:p-12 rounded-3xl text-center space-y-6 animate-fadeIn bg-gradient-to-b from-[#0e1628] to-[#090b14]">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl mx-auto animate-bounce">
          🏆
        </div>
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
            STAGE CLEARED!
          </span>
          <h2 className="text-3xl font-heading font-black text-white mt-2">
            {stageConfig.title} Mastered
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            You have successfully cleared this round for <strong>{targetCompany.name}</strong>.
          </p>
        </div>

        {/* Rewards */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-around font-mono text-xs max-w-sm mx-auto">
          <div>
            <span className="text-slate-400 block">EARNED XP</span>
            <span className="text-lg font-bold text-purple-400">+{stageConfig.xpReward} XP</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-slate-400 block">EARNED GEMS</span>
            <span className="text-lg font-bold text-cyan-400">+50 💎</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('worlds');
            }}
            className="btn-cyber-primary px-6 py-3 text-xs font-bold"
          >
            <span>Return to World Map</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
        <button
          onClick={() => {
            playSound('click');
            setActiveTab('worlds');
          }}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          <span>Back to {targetCompany.name} World</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-mono font-bold text-white block">{stageConfig.title}</span>
          <span className="text-[11px] text-slate-400">{stageConfig.subtitle}</span>
        </div>
      </div>

      {/* RENDER STAGE 1 OR 3: MCQ FORMAT */}
      {(stageNumber === 1 || stageNumber === 3) && stageConfig.questions && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-3">
            <span>Question {qIndex + 1} of {stageConfig.questions.length}</span>
            <span>Score: {score} Correct</span>
          </div>

          <h3 className="text-lg md:text-xl font-heading font-semibold text-white leading-relaxed">
            {stageConfig.questions[qIndex].question}
          </h3>

          <div className="space-y-3">
            {stageConfig.questions[qIndex].options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === stageConfig.questions[qIndex].correctAnswer;
              let btnStyle = 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300';

              if (isAnswerRevealed) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-white shadow-md shadow-emerald-500/20';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-white shadow-md shadow-rose-500/20';
                } else {
                  btnStyle = 'bg-white/[0.01] border-white/5 opacity-50 text-slate-500';
                }
              }

              return (
                <div
                  key={i}
                  onClick={() => handleSelectMCQ(i)}
                  className={`p-4 rounded-2xl border transition duration-150 cursor-pointer flex items-center justify-between gap-4 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 bg-white/5 border border-white/10">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-sm">{opt}</span>
                  </div>
                  {isAnswerRevealed && isCorrect && <CheckCircle2 size={18} className="text-emerald-400" />}
                  {isAnswerRevealed && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400" />}
                </div>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswerRevealed && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed animate-fadeIn">
              <span className="font-mono font-bold text-cyan-400 block mb-1">💡 Solution & Concept Breakdown:</span>
              {stageConfig.questions[qIndex].explanation}
            </div>
          )}

          {/* Action Button */}
          {isAnswerRevealed && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextMCQ}
                className="btn-cyber-primary text-xs px-6 py-2.5 font-bold"
              >
                <span>{qIndex < stageConfig.questions.length - 1 ? 'Next Challenge' : 'Finish Stage'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* RENDER STAGE 2: ALGORITHM DUNGEON */}
      {stageNumber === 2 && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/30">
              CODING CHALLENGE: TWO SUM
            </span>
            <h3 className="text-xl font-heading font-black text-white mt-2">
              Optimal Hash Map Target Pair
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Given an integer array `nums` and target `9`, return indices `[i, j]` such that `nums[i] + nums[j] == 9` in O(N) time.
            </p>
          </div>

          {/* Code Window */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#090b14] font-mono text-xs">
            <div className="bg-[#12162a] px-4 py-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-slate-400 font-bold">Solution.js</span>
              <span className="text-[10px] text-emerald-400">● JavaScript (Node v20)</span>
            </div>
            <pre className="p-4 text-indigo-300 leading-relaxed overflow-x-auto">
{`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`}
            </pre>
          </div>

          {/* Run Output */}
          {codeOutput && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 space-y-1 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 size={16} />
                <span>Test Suite: 4 / 4 Test Cases Passed!</span>
              </div>
              <p className="text-slate-300">Runtime: {codeOutput.runtime}</p>
              <p className="text-slate-300">Memory: {codeOutput.memory}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleRunAlgorithm}
              className="btn-cyber-secondary text-xs px-5 py-2.5 font-bold"
            >
              <Play size={14} className="text-cyan-400" />
              <span>Run Code & Verify</span>
            </button>

            {codePassed && (
              <button
                onClick={handleCompleteStage}
                className="btn-cyber-primary bg-gradient-to-r from-emerald-600 to-teal-500 text-xs px-6 py-2.5 font-bold animate-fadeIn"
              >
                <span>Submit & Complete Stage 2</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* RENDER STAGE 4: HR & BEHAVIORAL ARENA */}
      {stageNumber === 4 && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
              BEHAVIORAL ARENA • STAR RUBRIC
            </span>
            <h3 className="text-xl font-heading font-black text-white mt-2">
              {stageConfig.prompts[0].question}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Structure your response following <strong>Situation → Task → Action → Result</strong>.
            </p>
          </div>

          <textarea
            rows={6}
            value={hrAnswer}
            onChange={(e) => setHrAnswer(e.target.value)}
            placeholder="Type your structured answer here (or paste your prepared STAR story)..."
            className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => setHrAnswer(stageConfig.prompts[0].sampleGoodAnswer)}
              className="text-xs font-mono text-indigo-400 hover:underline cursor-pointer"
            >
              Load Example Star Response
            </button>

            <button
              onClick={handleEvaluateHR}
              disabled={!hrAnswer.trim()}
              className="btn-cyber-primary text-xs px-5 py-2.5 font-bold disabled:opacity-40"
            >
              <Zap size={14} />
              <span>AI Evaluate Response</span>
            </button>
          </div>

          {/* AI HR Evaluation Result */}
          {hrEvaluation && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-white text-sm">AI STAR Evaluation Report</span>
                <span className="text-base font-heading font-black text-emerald-400 font-mono">
                  {hrEvaluation.overallScore} / 100 Score
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                {hrEvaluation.aiFeedback}
              </p>

              {hrEvaluation.overallScore >= 60 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleCompleteStage}
                    className="btn-cyber-primary bg-gradient-to-r from-emerald-600 to-teal-500 text-xs px-6 py-2.5 font-bold"
                  >
                    <span>Pass Stage 4 & Unlock Boss</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
