import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Star, Zap, CheckCircle2, Search, Filter, TrendingUp } from 'lucide-react';

const Jobs = ({ user }) => {
  const [matchingJobs, setMatchingJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    resume: null,
    score: 0,
    courses: []
  });

  const allJobs = [
    {
      id: 1,
      title: 'Junior Full Stack Developer',
      company: 'TechSphere Solutions',
      location: 'Remote / Bangalore',
      salary: '₹6L - ₹10L',
      type: 'Full-time',
      requiredSkills: ['React', 'Node.js', 'HTML/CSS', 'JavaScript'],
      minScore: 40,
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'UI/UX Design Intern',
      company: 'Creative Studio',
      location: 'Hyderabad',
      salary: '₹25k - ₹40k',
      type: 'Internship',
      requiredSkills: ['Figma', 'Wireframing', 'User Research'],
      minScore: 20,
      posted: '5h ago'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'DataInsights Co.',
      location: 'Remote',
      salary: '₹8L - ₹12L',
      type: 'Full-time',
      requiredSkills: ['Python', 'SQL', 'Tableau', 'Statistics'],
      minScore: 60,
      posted: '1 day ago'
    },
    {
      id: 4,
      title: 'Frontend Engineer',
      company: 'WebFlow Systems',
      location: 'Mumbai',
      salary: '₹10L - ₹15L',
      type: 'Full-time',
      requiredSkills: ['React', 'TypeScript', 'Tailwind', 'JavaScript'],
      minScore: 50,
      posted: '3 days ago'
    },
    {
      id: 5,
      title: 'Backend Developer',
      company: 'SecureCloud',
      location: 'Pune',
      salary: '₹12L - ₹18L',
      type: 'Full-time',
      requiredSkills: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      minScore: 70,
      posted: '1 week ago'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get score from localStorage
        const savedResult = localStorage.getItem('lastResult');
        const score = savedResult ? JSON.parse(savedResult).score : 0;

        // 2. Fetch Resume from backend
        const resumeRes = await fetch(`http://localhost:5000/api/resume/${user.id}`);
        const resumeData = await resumeRes.json();

        // 3. Fetch Course progress from backend
        const coursesRes = await fetch(`http://localhost:5000/api/courses/${user.id}`);
        const coursesData = await coursesRes.json();

        setUserData({
          resume: resumeData,
          score: score,
          courses: coursesData
        });

        // 4. Calculate Matches
        const userSkills = new Set([
          ...(resumeData?.skills || []),
          ...(user.roles || [])
        ]);

        const scoredJobs = allJobs.map(job => {
          let matchPoints = 0;
          const matchedSkills = job.requiredSkills.filter(skill => 
            Array.from(userSkills).some(us => us.toLowerCase().includes(skill.toLowerCase()))
          );

          // Points for skills
          matchPoints += (matchedSkills.length / job.requiredSkills.length) * 60;
          
          // Points for Assessment Score
          if (score >= job.minScore) {
            matchPoints += 30;
          } else if (score > 0) {
            matchPoints += (score / job.minScore) * 20;
          }

          // Points for learning activity
          if (coursesData.length > 0) matchPoints += 10;

          return {
            ...job,
            matchPercentage: Math.min(Math.round(matchPoints), 100),
            matchedSkills
          };
        }).sort((a, b) => b.matchPercentage - a.matchPercentage);

        setMatchingJobs(scoredJobs);
      } catch (err) {
        console.error('Error matching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <div className="header-info">
          <h1>Smart Job Matches</h1>
          <p className="text-muted">AI-powered recommendations based on your assessment, resume, and learning path.</p>
        </div>
        <div className="search-box glass-card">
          <Search size={18} />
          <input type="text" placeholder="Search for jobs..." />
        </div>
      </div>

      <div className="jobs-stats-grid">
        <div className="stat-card glass-card">
          <TrendingUp className="text-primary" />
          <div>
            <h3>{matchingJobs.filter(j => j.matchPercentage > 80).length}</h3>
            <p>High Matches</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <Zap className="text-secondary" />
          <div>
            <h3>{userData.score}%</h3>
            <p>Current Score</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <CheckCircle2 className="text-success" />
          <div>
            <h3>{userData.resume ? 'Active' : 'Missing'}</h3>
            <p>Resume Status</p>
          </div>
        </div>
      </div>

      <div className="jobs-list">
        {loading ? (
          <div className="loading-spinner">Analyzing matches...</div>
        ) : (
          matchingJobs.map((job, i) => (
            <motion.div 
              key={job.id}
              className="job-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="job-match-badge brand-bg">
                {job.matchPercentage}% Match
              </div>
              
              <div className="job-card-content">
                <div className="job-main">
                  <div className="job-icon brand-bg">
                    <Briefcase size={24} />
                  </div>
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                    <div className="job-meta">
                      <span><MapPin size={14} /> {job.location}</span>
                      <span><DollarSign size={14} /> {job.salary}</span>
                      <span><Star size={14} /> {job.type}</span>
                    </div>
                  </div>
                </div>

                <div className="job-skills-match">
                  <h4>Required Skills:</h4>
                  <div className="skills-tags">
                    {job.requiredSkills.map(skill => (
                      <span 
                        key={skill} 
                        className={`skill-tag ${job.matchedSkills.includes(skill) ? 'matched' : ''}`}
                      >
                        {job.matchedSkills.includes(skill) && <CheckCircle2 size={12} />}
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="job-actions">
                  <p className="posted-time">{job.posted}</p>
                  <button className="btn btn-primary">Apply Now</button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .jobs-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-bottom: 3rem;
        }

        .jobs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .jobs-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          width: 400px;
        }

        .search-box input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
        }

        .jobs-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
        }

        .stat-card h3 { font-size: 1.75rem; }
        .stat-card p { color: var(--text-muted); font-size: 0.9rem; }

        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .job-card {
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s;
        }

        .job-card:hover {
          transform: translateX(10px);
        }

        .job-match-badge {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0.5rem 1.5rem;
          border-bottom-left-radius: 1.5rem;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 4px 15px var(--primary-glow);
        }

        .job-main {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .job-icon {
          width: 60px;
          height: 60px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .job-info h3 { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .company { color: var(--primary); font-weight: 600; margin-bottom: 0.75rem; }

        .job-meta {
          display: flex;
          gap: 1.5rem;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .job-meta span { display: flex; align-items: center; gap: 0.5rem; }

        .job-skills-match {
          margin-bottom: 2rem;
        }

        .job-skills-match h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .skill-tag {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
        }

        .skill-tag.matched {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .job-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--glass-border);
          padding-top: 1.5rem;
        }

        .posted-time {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .jobs-header { flex-direction: column; align-items: flex-start; }
          .search-box { width: 100%; }
          .jobs-stats-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default Jobs;
