import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Users, 
  Briefcase, 
  Award, 
  ChevronRight,
  Shield,
  Zap,
  Globe,
  BarChart2,
  Target,
  CheckCircle,
  TrendingUp,
  Search,
  Sun,
  Moon,
  Layers
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const stats = [
    { icon: <Users className="text-primary" />, value: '10K+', label: 'Users Trained' },
    { icon: <Briefcase className="text-secondary" />, value: '5K+', label: 'Jobs Matched' },
    { icon: <Award className="text-accent" />, value: '15K+', label: 'Badges Earned' },
    { icon: <Users className="text-warning" />, value: '200+', label: 'Employer Partners' },
  ];

  const features = [
    { 
      icon: <BarChart2 size={24} />, 
      title: 'AI-Powered Assessments', 
      description: 'Pinpoint your strengths and areas for growth with our adaptive testing engine.' 
    },
    { 
      icon: <CheckCircle size={24} />, 
      title: 'Resume Intelligence', 
      description: 'Build resumes that get noticed by ATS and recruiters alike.' 
    },
    { 
      icon: <TrendingUp size={24} />, 
      title: 'Personalized Pathways', 
      description: 'Get a custom learning roadmap tailored specifically to your career goals.' 
    }
  ];

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-nav glass">
        <div className="logo">
          <div className="logo-icon" style={{background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'}}>
            <Layers size={24} color="white" />
          </div>
          <span>Skill Up Connect</span>
        </div>
        <div className="nav-links">
          <button 
            onClick={() => setIsLightMode(!isLightMode)} 
            className="theme-toggle-nav"
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge glass-card animate-fade-in">
            <Zap size={14} className="text-secondary" />
            <span>Empowering Your Career Journey</span>
          </span>
          <h1 className="hero-title">
            From Job Seeker <br />
            <span className="brand-gradient">to Skill Up Connect.</span>
          </h1>
          <p className="hero-subtitle">
            The all-in-one platform to assess your skills, build a professional resume, 
            and land your dream job with personalized recommendations.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
              Take Free Skills Assessment <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/login')}>
              Build My Resume
            </button>
          </div>
        </motion.div>


      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="grid grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="stat-card glass-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Premium <span className="brand-gradient">Features</span></h2>
          <p>Everything you need to accelerate your career growth.</p>
        </div>
        <div className="grid grid-cols-3">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              className="feature-card glass-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="feature-icon brand-bg">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section glass-card">
        <div className="about-content">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            About <span className="brand-gradient">Skill Up Connect</span>
          </motion.h2>
          <p>We are a mission-driven platform dedicated to bridging the gap between talent and opportunity. Our comprehensive assessment tools and personalized learning paths ensure that every user is not just looking for a job, but is truly job-ready.</p>
          <div className="about-stats">
            <div className="about-stat-item glass-card">
              <h4>100%</h4>
              <span>Secure</span>
            </div>
            <div className="about-stat-item glass-card">
              <h4>24/7</h4>
              <span>Support</span>
            </div>
            <div className="about-stat-item glass-card">
              <h4>Global</h4>
              <span>Network</span>
            </div>
          </div>
        </div>
      </section>



      <style dangerouslySetInnerHTML={{ __html: `
        .landing-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; scroll-behavior: smooth; }
        .landing-nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; margin-top: 1.5rem; border-radius: 1.25rem; position: sticky; top: 1.5rem; z-index: 1000; }
        .logo { display: flex; align-items: center; gap: 0.75rem; font-family: var(--font-heading); font-weight: 700; font-size: 1.25rem; }
        .logo-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .theme-toggle-nav { background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: color 0.2s; display: flex; align-items: center; justify-content: center; padding: 0.5rem; border-radius: 50%; }
        .theme-toggle-nav:hover { color: var(--primary); background: rgba(255,255,255,0.05); }
        
        .hero { padding: 8rem 0 4rem; text-align: center; position: relative; }
        .hero-glow { position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 800px; height: 400px; background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%); filter: blur(60px); z-index: -1; opacity: 0.3; }
        .badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 2rem; font-size: 0.85rem; font-weight: 600; margin-bottom: 2rem; }
        .hero-title { font-size: 4.5rem; line-height: 1.1; margin-bottom: 1.5rem; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 2.5rem; }
        .hero-actions { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 4rem; }
        .btn-lg { padding: 1rem 2rem; font-size: 1.1rem; }
        
        .stats-section { padding: 4rem 0; }
        .stat-card { padding: 2rem; text-align: center; }
        .stat-icon { margin-bottom: 1rem; display: flex; justify-content: center; }
        .stat-value { font-size: 2.5rem; font-weight: 800; font-family: var(--font-heading); margin-bottom: 0.25rem; }
        .stat-label { color: var(--text-muted); font-size: 0.95rem; font-weight: 500; }

        .features-section { padding: 8rem 0; text-align: center; }
        .section-header { margin-bottom: 4rem; }
        .section-header h2 { font-size: 3rem; margin-bottom: 1rem; }
        .feature-card { padding: 3rem; text-align: left; transition: all 0.3s; }
        .feature-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: white; }
        .feature-card h3 { margin-bottom: 1rem; font-size: 1.5rem; }
        .feature-card p { color: var(--text-muted); line-height: 1.6; }

        .about-section { padding: 6rem; margin: 4rem 0; border-radius: 3rem; text-align: center; }
        .about-content h2 { font-size: 3.5rem; margin-bottom: 1.5rem; }
        .about-content p { font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto 3.5rem; line-height: 1.7; }
        .about-stats { display: flex; gap: 2rem; justify-content: center; max-width: 800px; margin: 0 auto; }
        .about-stat-item { padding: 2rem; flex: 1; border-radius: 1.5rem; transition: all 0.3s; }
        .about-stat-item h4 { font-size: 3rem; color: var(--primary); margin-bottom: 0.5rem; }
        .about-stat-item span { color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; }



        @media (max-width: 1024px) { .grid-cols-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { 
          .hero-title { font-size: 3rem; } 
          .hero-actions { flex-direction: column; } 
          .nav-links { display: none; } 
          .grid-cols-4, .grid-cols-3 { grid-template-columns: 1fr; }
          .about-stats { flex-direction: column; gap: 2rem; }
          .about-section { padding: 3rem 1.5rem; }
        }
      `}} />
    </div>
  );
};

export default LandingPage;
