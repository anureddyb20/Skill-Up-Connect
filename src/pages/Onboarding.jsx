import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Phone, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Briefcase,
  Target,
  Clock,
  CheckCircle2
} from 'lucide-react';

const Onboarding = ({ user }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: user.name || '',
    phone: '',
    age: '',
    location: '',
    roles: [],
    experience: '',
    workPreference: '',
    availability: ''
  });

  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // Save onboarding data
    const updatedUser = { ...user, ...formData, onboarded: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/dashboard');
  };

  const toggleRole = (role) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const steps = [
    { title: 'User Details', icon: <User size={18} /> },
    { title: 'Role Selection', icon: <Briefcase size={18} /> },
    { title: 'Experience', icon: <Target size={18} /> },
    { title: 'Preferences', icon: <MapPin size={18} /> },
    { title: 'Availability', icon: <Clock size={18} /> }
  ];

  return (
    <div className="onboarding-container">
      <div className="onboarding-card glass">
        {/* Progress Header */}
        <div className="onboarding-progress">
          {steps.map((s, i) => (
            <div key={i} className={`progress-step ${step > i + 1 ? 'completed' : ''} ${step === i + 1 ? 'active' : ''}`}>
              <div className="step-number">
                {step > i + 1 ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span className="step-label">{s.title}</span>
              {i < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="onboarding-content">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-form"
              >
                <h2>Let's get to know you</h2>
                <p>Please provide your basic information to get started.</p>
                <div className="form-grid">
                  <div className="input-group glass-card">
                    <User size={18} />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="input-group glass-card">
                    <Phone size={18} />
                    <input 
                      type="text" 
                      placeholder="Phone Number" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="input-group glass-card">
                    <Calendar size={18} />
                    <input 
                      type="number" 
                      placeholder="Age" 
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: e.target.value})}
                    />
                  </div>
                  <div className="input-group glass-card">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      placeholder="Location" 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-form"
              >
                <h2>What roles interest you?</h2>
                <p>Select all that apply to your career goals.</p>
                <div className="selection-grid">
                  {[
                    'Customer Service', 'Sales & Marketing', 'Administration', 
                    'Technology', 'Design & Creative', 'Finance & Accounting'
                  ].map(role => (
                    <div 
                      key={role} 
                      className={`selection-card glass-card ${formData.roles.includes(role) ? 'selected' : ''}`}
                      onClick={() => toggleRole(role)}
                    >
                      <CheckCircle2 size={20} className="check-icon" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-form"
              >
                <h2>Your Experience Level</h2>
                <p>Tell us about your professional background.</p>
                <div className="radio-list">
                  {[
                    { label: 'No Experience', val: '0' },
                    { label: 'Some Experience (1–2 years)', val: '1-2' },
                    { label: 'Experienced (3+ years)', val: '3+' }
                  ].map(opt => (
                    <div 
                      key={opt.val} 
                      className={`radio-card glass-card ${formData.experience === opt.val ? 'selected' : ''}`}
                      onClick={() => setFormData({...formData, experience: opt.val})}
                    >
                      <span>{opt.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-form"
              >
                <h2>Work Preference</h2>
                <p>Where do you prefer to work from?</p>
                <div className="selection-grid">
                  {['Remote', 'On-site', 'Hybrid', 'Open to Any'].map(pref => (
                    <div 
                      key={pref} 
                      className={`selection-card glass-card ${formData.workPreference === pref ? 'selected' : ''}`}
                      onClick={() => setFormData({...formData, workPreference: pref})}
                    >
                      <span>{pref}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-form"
              >
                <h2>Availability</h2>
                <p>How much time can you commit?</p>
                <div className="selection-grid">
                  {['Full-time', 'Part-time', 'Freelance', 'Any'].map(av => (
                    <div 
                      key={av} 
                      className={`selection-card glass-card ${formData.availability === av ? 'selected' : ''}`}
                      onClick={() => setFormData({...formData, availability: av})}
                    >
                      <span>{av}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="onboarding-footer">
          <button 
            className="btn btn-secondary" 
            onClick={handleBack}
            disabled={step === 1}
          >
            <ChevronLeft size={18} /> Back
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            {step === 5 ? 'Finish Setup' : 'Continue'} <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .onboarding-container {
          min-height: calc(100vh - 4rem);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .onboarding-card {
          width: 100%;
          max-width: 800px;
          border-radius: 2rem;
          padding: 3rem;
        }

        .onboarding-progress {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4rem;
          position: relative;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 1;
          flex: 1;
          position: relative;
        }

        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--surface-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-muted);
          border: 2px solid var(--glass-border);
          transition: all 0.3s;
        }

        .active .step-number {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
        }

        .completed .step-number {
          background: var(--success);
          color: white;
          border-color: var(--success);
        }

        .step-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .active .step-label { color: var(--text); }

        .step-line {
          position: absolute;
          top: 16px;
          left: calc(50% + 20px);
          width: calc(100% - 40px);
          height: 2px;
          background: var(--glass-border);
          z-index: -1;
        }

        .completed .step-line { background: var(--success); }

        .onboarding-content {
          min-height: 350px;
        }

        .step-form h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .step-form p {
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .input-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
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
          font-size: 1rem;
        }

        .selection-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .selection-card {
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .selection-card .check-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          opacity: 0;
          transition: all 0.2s;
        }

        .selection-card.selected {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }

        .selection-card.selected .check-icon {
          opacity: 1;
        }

        .radio-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .radio-card {
          padding: 1.25rem 2rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .radio-card.selected {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }

        .onboarding-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }

        @media (max-width: 640px) {
          .form-grid, .selection-grid {
            grid-template-columns: 1fr;
          }
          .onboarding-card { padding: 1.5rem; }
        }
      `}} />
    </div>
  );
};

export default Onboarding;
