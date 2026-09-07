import React, { useState } from 'react';
import { 
  Radio, 
  Bot, 
  Send, 
  Mic, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  HelpCircle, 
  RotateCcw,
  Zap,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { MOCK_INTERVIEW_QUESTIONS, evaluateInterviewAnswer } from '../data/mockInterviews';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/audio';

export const AIMockInterviewView = () => {
  const { targetCompany, addXP, addGems } = useGame();

  const [selectedQId, setSelectedQId] = useState('mock-1');
  const [candidateResponse, setCandidateResponse] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const activeQuestion = MOCK_INTERVIEW_QUESTIONS.find(q => q.id === selectedQId) || MOCK_INTERVIEW_QUESTIONS[0];

  const handleSelectQuestion = (q) => {
    playSound('click');
    setSelectedQId(q.id);
    setCandidateResponse('');
    setEvaluation(null);
  };

  const handleSpeechToggle = () => {
    playSound('click');
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported by your browser. Please type your response.');
      return;
    }

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!isRecording) {
      setIsRecording(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCandidateResponse(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    } else {
      setIsRecording(false);
      recognition.stop();
    }
  };

  const handleEvaluate = () => {
    if (!candidateResponse.trim()) return;
    playSound('click');
    setIsEvaluating(true);

    setTimeout(() => {
      const result = evaluateInterviewAnswer(activeQuestion, candidateResponse);
      setEvaluation(result);
      setIsEvaluating(false);

      if (result.overallScore >= 60) {
        playSound('correct');
        addXP(250);
        addGems(40);
      } else {
        playSound('wrong');
      }
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
              <Radio size={13} />
              <span>AI MOCK INTERVIEW SIMULATOR</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">• Target: {targetCompany.name}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            AI Placement Interview Practice
          </h1>
        </div>

        {/* Question Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {MOCK_INTERVIEW_QUESTIONS.map((q) => (
            <button
              key={q.id}
              onClick={() => handleSelectQuestion(q)}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedQId === q.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {q.category.split(' ')[0]} Round
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Question Prompt + Candidate Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interviewer Avatar & Prompt */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Bot size={26} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">Placify AI Interviewer</h3>
                <span className="text-xs text-emerald-400 font-mono">{activeQuestion.role}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                INTERVIEW PROMPT:
              </span>
              <p className="text-sm font-heading font-semibold text-white leading-relaxed">
                "{activeQuestion.question}"
              </p>
            </div>

            {/* STAR Tips */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2 text-xs">
              <span className="font-mono font-bold text-emerald-300 block">💡 Expected STAR Rubric:</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {activeQuestion.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Answer Input & Real-time AI Scoring */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">YOUR RESPONSE (STAR FRAMEWORK)</span>
              <button
                onClick={handleSpeechToggle}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition ${
                  isRecording 
                    ? 'bg-rose-500 text-white animate-pulse' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <Mic size={14} />
                <span>{isRecording ? 'Listening...' : 'Voice Input'}</span>
              </button>
            </div>

            <textarea
              rows={8}
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              placeholder="Structure your answer clearly:
1. Situation: (Context/Problem)
2. Task: (What needed to be done)
3. Action: (Specific tools/code/decisions you made)
4. Result: (Measurable outcomes / % improvement)..."
              className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-slate-500">
                {candidateResponse.trim().split(/\s+/).filter(Boolean).length} Words Typed
              </span>

              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || !candidateResponse.trim()}
                className="btn-cyber-primary bg-gradient-to-r from-emerald-600 to-teal-500 text-xs px-6 py-2.5 font-bold shadow-lg shadow-emerald-500/30 disabled:opacity-40"
              >
                <Zap size={14} />
                <span>{isEvaluating ? 'Evaluating STAR...' : 'Evaluate Answer'}</span>
              </button>
            </div>
          </div>

          {/* AI Feedback Report Card */}
          {evaluation && (
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-[#0c1220] space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-white text-base">STAR Rubric Report</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    evaluation.overallScore >= 75
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {evaluation.overallScore >= 75 ? 'OFFER-READY' : 'NEEDS POLISH'}
                  </span>
                </div>

                <span className="text-xl font-heading font-black text-emerald-400 font-mono">
                  {evaluation.overallScore} / 100
                </span>
              </div>

              {/* Score breakdown pillars */}
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-slate-400 block text-[10px]">STAR STRUCTURE</span>
                  <span className="text-emerald-400 font-bold text-sm">{evaluation.starScore}%</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-slate-400 block text-[10px]">TECHNICAL DEPTH</span>
                  <span className="text-cyan-400 font-bold text-sm">{evaluation.technicalScore}%</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-slate-400 block text-[10px]">CLARITY</span>
                  <span className="text-purple-400 font-bold text-sm">{evaluation.communicationScore}%</span>
                </div>
              </div>

              {/* Detailed AI Critiques */}
              <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                {evaluation.aiFeedback}
              </p>

              {/* Strengths and improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="font-mono text-emerald-400 font-bold block">✓ Strengths:</span>
                  {evaluation.strengths.map((s, i) => (
                    <p key={i} className="text-emerald-200 text-[11px]">• {s}</p>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="font-mono text-amber-400 font-bold block">⚠ Polish Needed:</span>
                  {evaluation.improvements.map((imp, i) => (
                    <p key={i} className="text-amber-200 text-[11px]">• {imp}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
