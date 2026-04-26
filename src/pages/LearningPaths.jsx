import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Clock, BookOpen, Star, Lock } from 'lucide-react';

const LearningPaths = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedResult = localStorage.getItem('lastResult');
    if (savedResult) {
      setScore(JSON.parse(savedResult).score);
    }
  }, []);

  const courses = [
    { id: 1, title: 'Mastering Professional Communication', provider: 'JobReady Academy', level: 'Intermediate', progress: 0, duration: '4h 30m', type: 'recommended', minScore: 0 },
    { id: 2, title: 'Critical Thinking for Problem Solving', provider: 'JobReady Academy', level: 'Beginner', progress: 0, duration: '2h 15m', type: 'recommended', minScore: 0 },
    { id: 3, title: 'Advanced Leadership Skills', provider: 'JobReady Academy', level: 'Advanced', progress: 0, duration: '6h 00m', type: 'all', minScore: 80 },
    { id: 4, title: 'Data Analysis Fundamentals', provider: 'TechFlow', level: 'Beginner', progress: 0, duration: '5h 45m', type: 'all', minScore: 0 },
    { id: 5, title: 'Agile Project Management', provider: 'ScaleUp', level: 'Intermediate', progress: 0, duration: '3h 20m', type: 'all', minScore: 50 },
    { id: 6, title: 'UX/UI Design Principles', provider: 'CreativeLabs', level: 'Beginner', progress: 0, duration: '4h 10m', type: 'all', minScore: 0 }
  ];

  const displayCourses = courses.filter(c => 
    activeTab === 'all' || c.type === 'recommended'
  );

  return (
    <div className="learning-container">
      <div className="learning-header">
        <h1>Learning Paths</h1>
        <p className="text-muted">Enhance your skills with courses tailored to your career goals.</p>
      </div>

      <div className="learning-tabs glass-card">
        <button 
          className={`tab-btn ${activeTab === 'recommended' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          <Star size={16} /> Recommended for You
        </button>
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <BookOpen size={16} /> All Courses
        </button>
      </div>

      <div className="courses-grid">
        {displayCourses.map((course, i) => {
          const isLocked = score < course.minScore && course.minScore > 0;

          return (
            <motion.div 
              key={course.id}
              className={`course-card glass-card ${isLocked ? 'locked' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="course-card-image brand-bg">
                {isLocked ? <Lock size={40} className="lock-icon" /> : <Play size={40} className="play-icon" />}
              </div>
              <div className="course-card-content">
                <div className="course-meta-top">
                  <span className="level-badge">{course.level}</span>
                  <span className="duration"><Clock size={14} /> {course.duration}</span>
                </div>
                <h3>{course.title}</h3>
                <p className="provider">{course.provider}</p>
                
                {isLocked ? (
                  <div className="lock-message">
                    <AlertCircle size={14} /> Score {course.minScore}%+ on assessment to unlock
                  </div>
                ) : (
                  <div className="course-progress">
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span>{course.progress}% Complete</span>
                  </div>
                )}
                
                <button className="btn btn-primary w-full mt-4" disabled={isLocked}>
                  {isLocked ? 'Locked' : (course.progress > 0 ? 'Continue Course' : 'Start Course')}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .learning-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-bottom: 2rem;
        }

        .learning-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .learning-tabs {
          display: inline-flex;
          padding: 0.5rem;
          gap: 0.5rem;
          border-radius: 1rem;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          border-radius: 0.75rem;
          transition: all 0.2s;
        }

        .tab-btn:hover {
          color: var(--text);
        }

        .tab-btn.active {
          background: var(--primary);
          color: white;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .course-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.2s;
        }

        .course-card:hover:not(.locked) {
          transform: translateY(-5px);
        }

        .course-card.locked {
          opacity: 0.7;
        }

        .course-card-image {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        }

        .play-icon {
          opacity: 0.8;
          transition: transform 0.2s;
        }

        .course-card:hover:not(.locked) .play-icon {
          transform: scale(1.1);
        }

        .lock-icon {
          opacity: 0.5;
        }

        .course-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .course-meta-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .level-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1rem;
        }

        .duration {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .course-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .provider {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .course-progress {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .progress-bar-bg {
          height: 6px;
          background: var(--surface-lighter);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--primary);
        }

        .course-progress span {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-align: right;
        }

        .lock-message {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--warning);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .w-full { width: 100%; }
        .mt-4 { margin-top: 1rem; }
      `}} />
    </div>
  );
};

export default LearningPaths;
