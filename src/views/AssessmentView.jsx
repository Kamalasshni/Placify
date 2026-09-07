import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Timer, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Bot, 
  Brain, 
  Check, 
  HelpCircle,
  Zap
} from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS, generateSkillGapReport } from '../data/assessments';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const AssessmentView = ({ setActiveTab }) => {
  const { targetCompany, saveDiagnosticResult } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;

  const handleSelectOption = (index) => {
    playSound('click');
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: index
    }));
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    playSound('level_up');
    setIsGeneratingAI(true);
    setIsSubmitted(true);

    setTimeout(() => {
      const report = generateSkillGapReport(selectedAnswers);
      saveDiagnosticResult(report);
      setIsGeneratingAI(false);
      setActiveTab('radar');
    }, 1500);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isGeneratingAI) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center glass-panel border border-indigo-500/30 rounded-3xl animate-fadeIn">
        <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-6 animate-spin">
          <Sparkles size={36} />
        </div>
        <h2 className="text-3xl font-heading font-black text-white mb-2">
          Placify AI is Analyzing Your Skill Profile...
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          Evaluating your answers across Aptitude, DSA, Operating Systems, Database Management, and Behavioral response vectors for <strong>{targetCompany.name}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Assessment Header */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold border border-indigo-500/30">
              STEP 2: DIAGNOSTIC TRIAL
            </span>
            <span className="text-xs text-slate-400">Targeting {targetCompany.name}</span>
          </div>
          <h2 className="text-2xl font-heading font-black text-white">
            AI Placement Diagnostic Assessment
          </h2>
        </div>

        {/* Timer & Question Counter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
            <Timer size={15} className="text-amber-400 animate-pulse" />
            <span className="font-bold text-amber-400">{formatTime(timeLeft)}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 font-mono text-xs font-bold text-purple-300">
            {answeredCount} / {DIAGNOSTIC_QUESTIONS.length} Answered
          </div>
        </div>
      </div>

      {/* Progress Dots Jumper */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 rounded-xl bg-white/[0.02] border border-white/5 no-scrollbar">
        {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
          const isCurr = idx === currentIndex;
          const isDone = selectedAnswers[q.id] !== undefined;
          return (
            <button
              key={q.id}
              onClick={() => {
                playSound('click');
                setCurrentIndex(idx);
              }}
              className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition flex items-center justify-center shrink-0 ${
                isCurr
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/40 border border-indigo-400'
                  : isDone
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Current Question Card */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
        {/* Category Tag & Difficulty */}
        <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              {currentQ.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 font-mono">• {currentQ.skillTag}</span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            Question {currentIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-lg md:text-xl font-heading font-semibold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIndex) => {
            const isSelected = selectedAnswers[currentQ.id] === optIndex;
            return (
              <div
                key={optIndex}
                onClick={() => handleSelectOption(optIndex)}
                className={`p-4 rounded-2xl border transition duration-150 cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/25 text-white'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-white/5 text-slate-400 border-white/10'
                  }`}>
                    {String.fromCharCode(65 + optIndex)}
                  </div>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </div>
                {isSelected && <CheckCircle2 size={18} className="text-indigo-400 shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="btn-cyber-secondary text-xs px-4 py-2.5 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft size={15} />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIndex < DIAGNOSTIC_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn-cyber-primary text-xs px-5 py-2.5"
              >
                <span>Next Question</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-cyber-primary bg-gradient-to-r from-emerald-600 to-teal-500 text-xs px-6 py-2.5 shadow-lg shadow-emerald-500/30"
              >
                <Zap size={15} />
                <span>Submit & Generate AI Gap Report</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
