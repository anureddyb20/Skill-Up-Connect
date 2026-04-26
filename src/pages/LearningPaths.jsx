import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Clock, BookOpen, Star, Lock, ChevronRight, Target, Award, BrainCircuit, AlertCircle } from 'lucide-react';

const LearningPaths = () => {
  const [score, setScore] = useState(0);
  const [startedCourses, setStartedCourses] = useState([]);

  const handleStartCourse = (courseId) => {
    if (!startedCourses.includes(courseId)) {
      setStartedCourses([...startedCourses, courseId]);
      alert('Course started! You can now track your progress in this career roadmap.');
    } else {
      alert('Resuming course...');
    }
  };

  useEffect(() => {
    const savedResult = localStorage.getItem('lastResult');
    if (savedResult) {
      setScore(JSON.parse(savedResult).score);
    }
  }, []);

  const jobRoles = [
    {
      id: 'fsd',
      title: 'Full Stack Web Developer',
      description: 'Build complete web applications from scratch, handling both frontend and backend.',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Cloud Deployment'],
      minScore: 0,
      roadmap: [
        { id: 101, title: 'Frontend Foundations: HTML5 & CSS3', duration: '12h', level: 'Beginner', type: 'Core' },
        { id: 102, title: 'Modern JavaScript (ES6+)', duration: '15h', level: 'Beginner', type: 'Core' },
        { id: 103, title: 'React Framework Mastery', duration: '20h', level: 'Intermediate', type: 'Specialization' },
        { id: 104, title: 'Backend Engineering with Node.js', duration: '18h', level: 'Intermediate', type: 'Core' },
        { id: 105, title: 'System Design & Scalability', duration: '10h', level: 'Advanced', type: 'Advanced' }
      ]
    },
    {
      id: 'ds',
      title: 'Data Scientist',
      description: 'Analyze complex data sets to help businesses make data-driven decisions.',
      skills: ['Python', 'Statistics', 'Pandas/NumPy', 'Machine Learning', 'SQL', 'Tableau'],
      minScore: 40,
      roadmap: [
        { id: 201, title: 'Python for Data Science Fundamentals', duration: '10h', level: 'Beginner', type: 'Core' },
        { id: 202, title: 'Mathematical Foundations & Statistics', duration: '14h', level: 'Beginner', type: 'Core' },
        { id: 203, title: 'Data Exploration & Visualization', duration: '12h', level: 'Intermediate', type: 'Core' },
        { id: 204, title: 'Practical Machine Learning Models', duration: '25h', level: 'Advanced', type: 'Advanced' }
      ]
    },
    {
      id: 'ux',
      title: 'UI/UX Product Designer',
      description: 'Design intuitive and beautiful user experiences for modern digital products.',
      skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'UX Writing'],
      minScore: 20,
      roadmap: [
        { id: 301, title: 'User-Centered Design Principles', duration: '8h', level: 'Beginner', type: 'Core' },
        { id: 302, title: 'Figma Mastery: From Basics to Pro', duration: '16h', level: 'Beginner', type: 'Tooling' },
        { id: 303, title: 'Advanced Interaction Design', duration: '12h', level: 'Intermediate', type: 'Specialization' },
        { id: 304, title: 'Usability Testing & Iteration', duration: '10h', level: 'Advanced', type: 'Professional' }
      ]
    }
  ];

  return (
    <div className="learning-container">
      <div className="learning-header">
        <h1>Career Roadmaps</h1>
        <p className="text-muted">Master the exact skills and subjects needed for your dream job role.</p>
      </div>

      <div className="roadmaps-list">
        {jobRoles.map((role, roleIdx) => {
          const isLocked = score < role.minScore;
          
          return (
            <motion.section 
              key={role.id}
              className={`roadmap-section glass-card ${isLocked ? 'locked' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: roleIdx * 0.1 }}
            >
              <div className="roadmap-main-info">
                <div className="role-header">
                  <div className="role-icon-box brand-bg">
                    {role.id === 'fsd' && <Target size={24} />}
                    {role.id === 'ds' && <BrainCircuit size={24} />}
                    {role.id === 'ux' && <Award size={24} />}
                  </div>
                  <div>
                    <h2>{role.title}</h2>
                    <p className="role-desc">{role.description}</p>
                  </div>
                  {isLocked && (
                    <div className="lock-badge">
                      <Lock size={14} /> Requires {role.minScore}% Assessment Score
                    </div>
                  )}
                </div>

                <div className="skills-required">
                  <h4>Core Skills Needed:</h4>
                  <div className="skills-tags">
                    {role.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="roadmap-path-container">
                <div className="roadmap-path-header">
                  <h4><BookOpen size={16} /> Learning Roadmap (Beginner to Pro)</h4>
                </div>
                
                <div className="roadmap-steps">
                  {role.roadmap.map((step, stepIdx) => (
                    <div key={step.id} className="roadmap-step">
                      <div className="step-marker">
                        <div className="marker-circle">
                          {isLocked ? <Lock size={12} /> : stepIdx + 1}
                        </div>
                        {stepIdx < role.roadmap.length - 1 && <div className="marker-line"></div>}
                      </div>
                      <div className="step-content">
                        <div className="step-meta">
                          <span className="step-type">{step.type}</span>
                          <span className="step-duration"><Clock size={12} /> {step.duration}</span>
                        </div>
                        <h5>{step.title}</h5>
                        <p className="step-level">{step.level} Level</p>
                        {!isLocked && (
                          <button 
                            className="start-step-btn" 
                            onClick={() => handleStartCourse(step.id)}
                          >
                            {startedCourses.includes(step.id) ? 'Continue' : 'Start'} <ChevronRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .learning-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding-bottom: 4rem;
        }

        .learning-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, var(--text-muted) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .roadmaps-list {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .roadmap-section {
          padding: 1.5rem;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          border-radius: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .roadmap-section.locked {
          opacity: 0.6;
          filter: grayscale(0.5);
        }

        .role-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .role-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          box-shadow: 0 4px 15px var(--primary-glow);
        }

        .role-header h2 {
          font-size: 1.4rem;
          line-height: 1.2;
        }

        .role-desc {
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .lock-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
          border-radius: 0.75rem;
          font-size: 0.85rem;
          font-weight: 600;
          width: fit-content;
        }

        .skills-required h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          padding: 0.4rem 0.8rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .roadmap-path-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-width: 0; /* Prevents overflow from breaking grid */
        }

        .roadmap-path-header h4 {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1rem;
        }

        .roadmap-steps {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scrollbar-width: thin;
          scrollbar-color: var(--primary) transparent;
        }

        /* Custom Scrollbar for Roadmaps */
        .roadmap-steps::-webkit-scrollbar {
          height: 6px;
        }

        .roadmap-steps::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .roadmap-steps::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 10px;
        }

        .roadmap-step {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-width: 210px;
        }

        .step-marker {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .marker-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--surface-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          border: 2px solid var(--glass-border);
          flex-shrink: 0;
        }

        .marker-line {
          height: 2px;
          background: var(--glass-border);
          flex: 1;
          margin-left: 0.5rem;
        }

        .step-content {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.85rem;
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          transition: all 0.2s;
        }

        .roadmap-section:not(.locked) .roadmap-step:hover .step-content {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
        }

        .step-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .step-type {
          font-size: 0.6rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.02em;
        }

        .step-duration {
          font-size: 0.65rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .step-content h5 {
          font-size: 0.85rem;
          line-height: 1.3;
          font-weight: 600;
        }

        .step-level {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .start-step-btn {
          margin-top: 0.5rem;
          background: transparent;
          border: none;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          padding: 0;
        }

        @media (max-width: 1200px) {
          .roadmap-section {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default LearningPaths;
