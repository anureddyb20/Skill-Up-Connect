import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  ArrowRight, 
  Download, 
  Share2, 
  Zap, 
  Target,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';

const ResultsPage = () => {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedResult = localStorage.getItem('lastResult');
    if (savedResult) {
      const data = JSON.parse(savedResult);
      setResults(data);
      if (data.score >= 70) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#ec4899', '#14b8a6']
        });
      }
    } else {
      navigate('/dashboard');
    }
  }, []);

  if (!results) return null;

  const getPerformanceMessage = (score) => {
    if (score >= 80) return { title: 'Advanced', msg: 'Exceptional performance! You are highly job-ready.', color: 'var(--success)' };
    if (score >= 50) return { title: 'Intermediate', msg: 'Good progress! Focus on refining your weaker areas.', color: 'var(--warning)' };
    return { title: 'Beginner', msg: 'Keep learning! Start with our recommended foundational courses.', color: 'var(--secondary)' };
  };

  const performance = getPerformanceMessage(results.score);

  const chartData = Object.entries(results.breakdown).map(([key, val]) => ({
    subject: key,
    A: Math.round((val.correct / val.total) * 100),
    fullMark: 100
  }));

  const strengths = Object.entries(results.breakdown)
    .filter(([_, val]) => (val.correct / val.total) >= 0.7)
    .map(([key]) => key);

  const recommendations = [
    { title: 'Mastering Professional Communication', provider: 'JobReady Academy', level: 'Intermediate' },
    { title: 'Critical Thinking for Problem Solving', provider: 'JobReady Academy', level: 'Beginner' },
  ];

  return (
    <div className="results-container">
      <div className="results-grid">
        {/* Left Column: Summary */}
        <div className="results-summary glass">
          <motion.div 
            className="score-circle-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="score-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="circle-bg" />
                <circle cx="50" cy="50" r="45" className="circle-fill" style={{ strokeDashoffset: 283 - (283 * results.score) / 100 }} />
              </svg>
              <div className="score-text">
                <span className="percent">{results.score}%</span>
                <span className="label">Overall Score</span>
              </div>
            </div>
          </motion.div>

          <div className="performance-info">
            <h2 style={{ color: performance.color }}>{performance.title}</h2>
            <p>{performance.msg}</p>
          </div>

          <div className="summary-actions">
            <button className="btn btn-primary w-full" onClick={() => navigate('/learning')}>
              Start Learning Path <ArrowRight size={18} />
            </button>
            <div className="secondary-btns grid grid-cols-2">
              <button className="btn btn-secondary"><Download size={18} /> PDF</button>
              <button className="btn btn-secondary"><Share2 size={18} /> Share</button>
            </div>
          </div>
        </div>

        {/* Middle Column: Skill Breakdown */}
        <div className="results-details glass">
          <div className="section-header">
            <h3>Skill Breakdown</h3>
            <p className="text-muted">A detailed view of your performance across categories.</p>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                <PolarGrid stroke="var(--glass-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="strengths-section">
            <h4>Your Key Strengths</h4>
            <div className="strength-chips">
              {strengths.map(s => (
                <div key={s} className="strength-chip">
                  <CheckCircle2 size={14} /> {s}
                </div>
              ))}
              {strengths.length === 0 && <p className="text-muted">Take more assessments to identify strengths.</p>}
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations */}
        <div className="results-recommendations">
          <section className="recommend-card glass">
            <h3>Recommended for You</h3>
            <div className="recommendation-list">
              {recommendations.map((rec, i) => (
                <div key={i} className="recommend-item glass-card">
                  <div className="rec-icon"><Zap size={20} /></div>
                  <div className="rec-details">
                    <p className="rec-title">{rec.title}</p>
                    <p className="rec-meta">{rec.provider} • {rec.level}</p>
                  </div>
                  <button className="icon-btn" onClick={() => navigate('/learning')}><ArrowRight size={16} /></button>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary w-full mt-4" onClick={() => navigate('/learning')}>View All Courses</button>
          </section>

          <section className="job-match-card glass mt-4">
            <h3>Potential Job Matches</h3>
            <div className="mini-job-list">
              <div className="mini-job-item">
                <p>Support Specialist</p>
                <span className="match-tag">95% Match</span>
              </div>
              <div className="mini-job-item">
                <p>Sales Coordinator</p>
                <span className="match-tag">88% Match</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .results-container {
          padding: 1rem 0;
        }

        .results-grid {
          display: grid;
          grid-template-columns: 350px 1fr 350px;
          gap: 2rem;
          align-items: start;
        }

        .results-summary {
          padding: 3rem 2rem;
          text-align: center;
          border-radius: 2rem;
        }

        .score-circle-wrapper {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .score-circle {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .circle-bg {
          fill: none;
          stroke: var(--surface-lighter);
          stroke-width: 8;
        }

        .circle-fill {
          fill: none;
          stroke: var(--primary);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 283;
          transition: stroke-dashoffset 1s ease-out;
        }

        .score-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
        }

        .percent {
          font-size: 3rem;
          font-weight: 800;
          font-family: var(--font-heading);
          line-height: 1;
        }

        .score-text .label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .performance-info h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .performance-info p {
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .summary-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .results-details {
          padding: 2.5rem;
          border-radius: 2rem;
        }

        .chart-container {
          margin: 2rem 0;
        }

        .strengths-section h4 {
          margin-bottom: 1rem;
        }

        .strength-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .strength-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-radius: 2rem;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .results-recommendations section {
          padding: 2rem;
          border-radius: 2rem;
        }

        .recommendation-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .recommend-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
        }

        .rec-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rec-title {
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        .rec-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .mini-job-list {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mini-job-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .match-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
        }

        .mt-4 { margin-top: 1rem; }
        .w-full { width: 100%; }

        @media (max-width: 1400px) {
          .results-grid {
            grid-template-columns: 1fr 1.5fr;
          }
          .results-recommendations {
            grid-column: span 2;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 1024px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
          .results-recommendations {
            grid-column: span 1;
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default ResultsPage;
