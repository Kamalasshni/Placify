import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Trophy, 
  RotateCcw, 
  Star, 
  HelpCircle,
  Clock,
  Users
} from 'lucide-react';
import { COMPANY_HISTORIES } from '../data/companyHistoryQuizzes';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const CompanyHistoryQuizView = () => {
  const { addXP, addGems, user } = useGame();

  const [selectedCompanyKey, setSelectedCompanyKey] = useState(user.targetCompanyId || 'google');
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz', 'story'

  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentCompany = COMPANY_HISTORIES[selectedCompanyKey] || COMPANY_HISTORIES.google;
  const currentQuestion = currentCompany.questions[qIndex] || currentCompany.questions[0];

  const handleSelectCompany = (key) => {
    playSound('click');
    setSelectedCompanyKey(key);
    setQIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleSelectOption = (idx) => {
    if (isAnswerRevealed) return;
    setSelectedOption(idx);
    setIsAnswerRevealed(true);

    if (idx === currentQuestion.ans) {
      playSound('correct');
      setScore(prev => prev + 1);
    } else {
      playSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    playSound('click');
    if (qIndex < currentCompany.questions.length - 1) {
      setQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = () => {
    playSound('victory');
    setIsFinished(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    addXP(300);
    addGems(50);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn select-none">
      {/* Header Banner */}
      <div 
        className="glass-panel p-6 md:p-8 rounded-3xl border border-white/20 relative overflow-hidden shadow-2xl"
        style={{ backgroundImage: currentCompany.bannerGradient }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-black/40 text-white font-mono text-xs font-bold border border-white/20">
                COMPANY ARCHITECTURE & FOUNDER LORE
              </span>
              <span className="text-xs text-white/80 font-mono">• {currentCompany.founded}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-black">
              {currentCompany.name}: {currentCompany.tagline}
            </h1>
            <p className="text-white/90 text-xs sm:text-sm mt-1 max-w-xl">
              Founders: <strong>{currentCompany.founders}</strong>
            </p>
          </div>

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-3xl bg-black/40 border border-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
            {currentCompany.icon}
          </div>
        </div>
      </div>

      {/* Company Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {Object.keys(COMPANY_HISTORIES).map((key) => {
          const comp = COMPANY_HISTORIES[key];
          const isSelected = selectedCompanyKey === key;
          return (
            <button
              key={key}
              onClick={() => handleSelectCompany(key)}
              className={`px-4 py-2 rounded-2xl text-xs font-heading font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{comp.icon}</span>
              <span>{comp.name}</span>
            </button>
          );
        })}
      </div>

      {/* View Tabs (Quiz vs Origin Story) */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <button
          onClick={() => {
            playSound('click');
            setActiveTab('quiz');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition cursor-pointer ${
            activeTab === 'quiz' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          🎯 History & Architecture Quiz
        </button>
        <button
          onClick={() => {
            playSound('click');
            setActiveTab('story');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition cursor-pointer ${
            activeTab === 'story' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          📖 Founder Story & Breakthroughs
        </button>
      </div>

      {/* TAB 1: HISTORY & ARCHITECTURE QUIZ */}
      {activeTab === 'quiz' && !isFinished && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 bg-[#0c0f1f]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-3">
            <span>Question {qIndex + 1} of {currentCompany.questions.length}</span>
            <span>Score: {score} Correct</span>
          </div>

          <h3 className="text-lg md:text-xl font-heading font-semibold text-white leading-relaxed">
            {currentQuestion.q}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === currentQuestion.ans;

              let btnStyle = 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-slate-200';
              if (isAnswerRevealed) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-white shadow-md shadow-emerald-500/20';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-white shadow-md shadow-rose-500/20';
                } else {
                  btnStyle = 'bg-white/[0.01] border-white/5 opacity-40 text-slate-500';
                }
              }

              return (
                <div
                  key={i}
                  onClick={() => handleSelectOption(i)}
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

          {/* Solution & Historical Explanation */}
          {isAnswerRevealed && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed animate-fadeIn">
              <span className="font-mono font-bold text-cyan-400 block mb-1">💡 Historical Context:</span>
              {currentQuestion.exp}
            </div>
          )}

          {isAnswerRevealed && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="btn-cyber-primary text-xs px-6 py-2.5 font-bold"
              >
                <span>{qIndex < currentCompany.questions.length - 1 ? 'Next Question' : 'Complete History Quiz'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* QUIZ FINISHED CELEBRATION */}
      {activeTab === 'quiz' && isFinished && (
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-emerald-500/40 text-center space-y-6 animate-fadeIn bg-gradient-to-b from-[#0e1628] to-[#090b14]">
          <div className="text-5xl animate-bounce">🎓</div>
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
              {currentCompany.name.toUpperCase()} HISTORY MASTERED!
            </span>
            <h2 className="text-3xl font-heading font-black text-white mt-2">
              Score: {score} / {currentCompany.questions.length} Correct
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              +300 XP & +50 Gems 💎 added to your profile!
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleSelectCompany(selectedCompanyKey)}
              className="btn-cyber-secondary text-xs px-4 py-2 font-bold"
            >
              <RotateCcw size={14} />
              <span>Retry Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('story')}
              className="btn-cyber-primary text-xs px-5 py-2 font-bold"
            >
              <span>Read Origin Lore</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ORIGIN STORY & FOUNDER LORE */}
      {activeTab === 'story' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 space-y-4 bg-[#0d1020]">
            <h3 className="font-heading font-bold text-white text-lg">
              {currentCompany.name} Founding Story
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              {currentCompany.story}
            </p>

            <h4 className="font-heading font-bold text-white text-sm pt-2">
              Recruitment Philosophy & Hiring Loop:
            </h4>
            <p className="text-xs text-indigo-300 leading-relaxed bg-indigo-950/30 p-4 rounded-2xl border border-indigo-500/30">
              {currentCompany.hiringPhilosophy}
            </p>
          </div>

          <div className="md:col-span-4 glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-4 bg-[#141220]">
            <h3 className="font-heading font-bold text-amber-300 text-base flex items-center gap-2">
              <Sparkles size={16} /> Did You Know?
            </h3>
            <div className="space-y-3">
              {currentCompany.funFacts.map((fact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 leading-relaxed font-mono">
                  ✨ {fact}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
