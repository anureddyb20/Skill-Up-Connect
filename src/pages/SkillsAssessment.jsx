import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Timer,
  AlertCircle
} from 'lucide-react';
import { questions } from '../data/questions';

const SkillsAssessment = ({ user }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('lastResult')) {
      navigate('/results', { replace: true });
      return;
    }
    
    if (shuffledQuestions.length === 0) {
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    }
  }, [navigate, shuffledQuestions.length]);

  useEffect(() => {
    if (shuffledQuestions.length === 0) return;
    if (timeLeft <= 0) handleFinish();
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, shuffledQuestions.length]);

  const handleSelect = (optIdx) => {
    setAnswers({ ...answers, [currentIdx]: optIdx });
  };

  const handleNext = () => {
    if (currentIdx < shuffledQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    // Calculate score
    let score = 0;
    shuffledQuestions.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });
    
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    
    // Calculate category breakdown
    const breakdown = {};
    shuffledQuestions.forEach((q, i) => {
      if (!breakdown[q.category]) breakdown[q.category] = { correct: 0, total: 0 };
      breakdown[q.category].total++;
      if (answers[i] === q.correct) breakdown[q.category].correct++;
    });

    const results = {
      score: percentage,
      breakdown,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('lastResult', JSON.stringify(results));
    navigate('/results', { replace: true });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (shuffledQuestions.length === 0) return null;

  const currentQuestion = shuffledQuestions[currentIdx];
  const progress = ((currentIdx + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="assessment-container">
      <div className="assessment-card glass">
        {/* Header */}
        <div className="assessment-header">
          <div className="header-info">
            <h2>Skills Assessment</h2>
            <p>Question {currentIdx + 1} of {shuffledQuestions.length}</p>
          </div>
          <div className="timer-box glass-card">
            <Timer size={18} className={timeLeft < 60 ? 'text-error' : ''} />
            <span className={timeLeft < 60 ? 'text-error' : ''}>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Question Area */}
        <div className="question-content">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="category-tag">{currentQuestion.category}</div>
              <h3 className="question-text">{currentQuestion.question}</h3>
              
              <div className="options-grid">
                {currentQuestion.options.map((opt, i) => (
                  <div 
                    key={i} 
                    className={`option-card glass-card ${answers[currentIdx] === i ? 'selected' : ''}`}
                    onClick={() => handleSelect(i)}
                  >
                    <div className="option-indicator">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="assessment-footer">
          <button 
            className="btn btn-secondary" 
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            disabled={answers[currentIdx] === undefined}
          >
            {currentIdx === shuffledQuestions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .assessment-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }

        .assessment-card {
          width: 100%;
          max-width: 900px;
          border-radius: 2rem;
          padding: 3rem;
        }

        .assessment-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .timer-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          font-weight: 700;
          font-family: var(--font-heading);
        }

        .progress-container {
          height: 8px;
          background: var(--surface-lighter);
          border-radius: 4px;
          margin-bottom: 3rem;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.3s ease;
        }

        .question-content {
          min-height: 400px;
        }

        .category-tag {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
        }

        .question-text {
          font-size: 1.75rem;
          margin-bottom: 2.5rem;
          line-height: 1.4;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .option-card {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .option-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(8px);
        }

        .option-card.selected {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
        }

        .option-indicator {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--surface-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .selected .option-indicator {
          background: var(--primary);
          color: white;
        }

        .assessment-footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
        }

        .text-error { color: var(--error) !important; }
      `}} />
    </div>
  );
};

export default SkillsAssessment;
