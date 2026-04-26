import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import SkillsAssessment from './pages/SkillsAssessment';
import ResultsPage from './pages/ResultsPage';
import ResumeBuilder from './pages/ResumeBuilder';
import LearningPaths from './pages/LearningPaths';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-theme');
    }

    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Router>
      <div className="app-container">
        {user && <Sidebar user={user} setUser={setUser} />}
        <div className={user ? "main-content with-sidebar" : "main-content"}>
          {user && <Header user={user} />}
          <Routes>
            <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/onboarding" element={user ? <Onboarding user={user} /> : <Navigate to="/login" />} />
            <Route path="/assessment" element={user ? <SkillsAssessment user={user} /> : <Navigate to="/login" />} />
            <Route path="/results" element={user ? <ResultsPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/resume" element={user ? <ResumeBuilder user={user} /> : <Navigate to="/login" />} />
            <Route path="/learning" element={user ? <LearningPaths user={user} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
