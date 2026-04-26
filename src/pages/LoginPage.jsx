import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, Globe, User, Layers } from 'lucide-react';

const LoginPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    // If user navigates back to login page, clear their session so it renders properly without the dashboard sidebar
    localStorage.removeItem('user');
    localStorage.removeItem('lastResult');
    setUser(null);
  }, [setUser]);

  const handleAuth = (e) => {
    e.preventDefault();
    // Mock user data
    const mockUser = {
      id: '1',
      name: email.split('@')[0] || 'User',
      email: email || 'user@example.com',
      avatar: null,
      onboarded: false
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    navigate('/onboarding');
  };

  const handleGoogleLogin = () => {
    alert("Google Authentication is not configured for this demo environment. Please use the email/password form below.");
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-glow"></div>
      
      <motion.div 
        className="auth-card glass"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button 
          onClick={() => navigate('/')} 
          className="back-to-home"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <div className="auth-header">
          <div className="auth-logo" style={{background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'}}>
            <Layers size={28} color="white" />
          </div>
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{isLogin ? 'Enter your details to access your dashboard' : 'Start your journey with Skill Up Connect'}</p>
        </div>

        <div className="social-auth">
          <button className="btn btn-secondary w-full" onClick={handleGoogleLogin}>
            <Globe size={20} className="text-primary" />
            Continue with Google
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          {!isLogin && (
            <div className="input-group glass-card">
              <User size={18} />
              <input type="text" placeholder="Full Name" required />
            </div>
          )}
          
          <div className="input-group glass-card">
            <Mail size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group glass-card">
            <Lock size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {isLogin && (
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: var(--background);
          padding: 1rem;
        }

        .auth-bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
          filter: blur(80px);
          opacity: 0.2;
          z-index: 0;
        }

        .auth-card {
          width: 100%;
          max-width: 450px;
          padding: 3rem 3rem 2rem;
          border-radius: 2rem;
          position: relative;
          z-index: 1;
        }

        .back-to-home {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .back-to-home:hover {
          color: var(--primary);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .auth-logo {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          font-size: 1.5rem;
          margin: 0 auto 1.5rem;
          flex-shrink: 0;
        }

        .auth-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .auth-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .w-full {
          width: 100%;
          justify-content: center;
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1.5rem 0;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--glass-border);
        }

        .divider span {
          margin: 0 1rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 1rem;
          color: var(--text-muted);
        }

        .input-group input {
          background: transparent;
          border: none;
          color: var(--text);
          width: 100%;
          outline: none;
          font-family: var(--font-main);
        }

        .forgot-password {
          text-align: right;
        }

        .forgot-password a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s;
        }

        .forgot-password a:hover {
          color: var(--primary);
        }

        .auth-footer {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .toggle-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          font-weight: 700;
          margin-left: 0.5rem;
          cursor: pointer;
        }

        .toggle-btn:hover {
          text-decoration: underline;
        }
      `}} />
    </div>
  );
};

export default LoginPage;
