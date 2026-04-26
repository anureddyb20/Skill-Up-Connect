import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  ExternalLink,
  BookOpen,
  Briefcase
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const lastResultStr = localStorage.getItem('lastResult');
  const lastResult = lastResultStr ? JSON.parse(lastResultStr) : null;
  const hasTakenAssessment = !!lastResult;
  const score = lastResult ? lastResult.score : 0;

  const stats = [
    { label: 'Overall Readiness', value: hasTakenAssessment ? `${score}%` : 'N/A', icon: <TrendingUp />, color: 'var(--primary)' },
    { label: 'Skills Assessed', value: hasTakenAssessment ? '20/20' : '0/20', icon: <Target />, color: 'var(--secondary)' },
    { label: 'Badges Earned', value: hasTakenAssessment ? Math.floor(score / 25).toString() : '0', icon: <Trophy />, color: 'var(--warning)' },
    { label: 'Learning Hours', value: hasTakenAssessment ? '2h' : '0h', icon: <Clock />, color: 'var(--accent)' },
  ];

  const recentJobs = hasTakenAssessment ? [
    { title: 'Junior Frontend Developer', company: 'TechFlow', match: `${Math.max(10, Math.min(98, score + 15))}%`, location: 'Remote' },
    { title: 'UX Designer', company: 'CreativeLabs', match: `${Math.max(10, Math.min(92, score + 8))}%`, location: 'Hybrid' },
    { title: 'Product Manager', company: 'ScaleUp', match: `${Math.max(10, Math.min(85, score - 5))}%`, location: 'On-site' },
  ] : [];

  return (
    <div className="dashboard-container">
      {/* Stats Grid */}
      <div className="stats-grid grid grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            className="stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="stat-header">
              <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <span className="stat-label">{stat.label}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-main-grid">
        {/* Left Column: Actions & Progress */}
        <div className="dashboard-left">
          <section className="action-cards">
            {hasTakenAssessment ? (
              <div className="promo-card glass-card brand-bg">
                <div className="promo-content">
                  <h3>Great work, {user.name}!</h3>
                  <p>You completed your assessment with a score of {score}%. Keep learning to improve your matches.</p>
                  <button className="btn btn-primary bg-white text-primary" onClick={() => navigate('/learning')}>
                    Start Learning <ArrowRight size={18} />
                  </button>
                </div>
                <div className="promo-image">
                  <Trophy size={120} opacity={0.2} />
                </div>
              </div>
            ) : (
              <div className="promo-card glass-card brand-bg">
                <div className="promo-content">
                  <h3>Level up your career</h3>
                  <p>Complete your skills assessment to get personalized job recommendations.</p>
                  <button className="btn btn-primary bg-white text-primary" onClick={() => navigate('/assessment')}>
                    Start Assessment <ArrowRight size={18} />
                  </button>
                </div>
                <div className="promo-image">
                  <Target size={120} opacity={0.2} />
                </div>
              </div>
            )}

            <div className="secondary-actions grid grid-cols-2">
              <div className="action-card glass-card" onClick={() => navigate('/resume')}>
                <div className="action-icon"><BookOpen /></div>
                <h4>Build My Resume</h4>
                <p>Create a professional resume in minutes.</p>
              </div>
              <div className="action-card glass-card">
                <div className="action-icon"><Briefcase /></div>
                <h4>Find Jobs</h4>
                <p>Explore opportunities matched to you.</p>
              </div>
            </div>
          </section>

          <section className="learning-progress glass-card">
            <div className="section-header">
              <h3>Recommended Learning</h3>
              <button className="text-btn">View All</button>
            </div>
            <div className="course-list">
              {hasTakenAssessment ? (
                [
                  { title: 'Advanced Communication', progress: 65, duration: '4h 30m' },
                  { title: 'Critical Thinking 101', progress: 30, duration: '2h 15m' },
                  { title: 'Digital Literacy for Pros', progress: 0, duration: '5h 00m' }
                ].map((course, i) => (
                  <div key={i} className="course-item">
                    <div className="course-info">
                      <p className="course-title">{course.title}</p>
                      <p className="course-meta">{course.duration}</p>
                    </div>
                    <div className="course-progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="progress-text">{course.progress}%</span>
                  </div>
                ))
              ) : (
                <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Take the assessment to unlock your personalized learning paths!
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Jobs & Notifications */}
        <div className="dashboard-right">
          <section className="jobs-section glass-card">
            <div className="section-header">
              <h3>Top Job Matches</h3>
              <button className="text-btn">Explore <ExternalLink size={14} /></button>
            </div>
            <div className="job-list">
              {recentJobs.length > 0 ? recentJobs.map((job, i) => (
                <div key={i} className="job-item">
                  <div className="job-details">
                    <p className="job-title">{job.title}</p>
                    <p className="job-company">{job.company} • {job.location}</p>
                  </div>
                  <div className="job-match-badge">
                    {job.match} Match
                  </div>
                </div>
              )) : (
                <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Take the assessment to unlock your personalized job matches!
                </div>
              )}
            </div>
          </section>

          <section className="notifications-section glass-card">
            <div className="section-header">
              <h3>Recent Updates</h3>
            </div>
            <div className="notification-list">
              {hasTakenAssessment ? (
                <>
                  <div className="notification-item">
                    <div className="dot success"></div>
                    <div className="notif-content">
                      <p><strong>Assessment Complete!</strong> You scored {score}% overall.</p>
                      <span>Just now</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="dot warning"></div>
                    <div className="notif-content">
                      <p><strong>New Job Matches!</strong> {recentJobs.length} new roles added to your board.</p>
                      <span>Just now</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No recent updates. Complete the assessment to see activity here!
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stat-card {
          padding: 1.5rem;
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .stat-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 800;
          font-family: var(--font-heading);
        }

        .dashboard-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
        }

        .action-cards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .brand-bg {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          position: relative;
          overflow: hidden;
          border: none;
        }

        .promo-card {
          padding: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .promo-content h3 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .promo-content p {
          opacity: 0.9;
          margin-bottom: 1.5rem;
          max-width: 400px;
        }

        .bg-white { background: white !important; }
        .text-primary { color: var(--primary) !important; }

        .promo-image {
          position: absolute;
          right: -20px;
          bottom: -20px;
          opacity: 0.2;
          transform: rotate(-15deg);
        }

        .action-card {
          padding: 1.5rem;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .action-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: var(--primary);
        }

        .action-card h4 {
          margin-bottom: 0.25rem;
        }

        .action-card p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .learning-progress, .jobs-section, .notifications-section {
          padding: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .text-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .course-list, .job-list, .notification-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .course-item {
          display: grid;
          grid-template-columns: 1fr 150px 40px;
          align-items: center;
          gap: 1rem;
        }

        .course-title {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .course-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .course-progress-bar {
          height: 6px;
          background: var(--surface-lighter);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 3px;
        }

        .progress-text {
          font-size: 0.8rem;
          font-weight: 700;
          text-align: right;
        }

        .job-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 0.75rem;
        }

        .job-title {
          font-weight: 600;
          margin-bottom: 2px;
        }

        .job-company {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .job-match-badge {
          padding: 0.4rem 0.8rem;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .notification-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
        }

        .dot.success { background: var(--success); }
        .dot.warning { background: var(--warning); }

        .notif-content p {
          font-size: 0.85rem;
          margin-bottom: 2px;
        }

        .notif-content span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .dashboard-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default Dashboard;
