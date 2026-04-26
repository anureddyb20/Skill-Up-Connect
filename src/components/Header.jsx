import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, X, CheckCircle, Info, Star } from 'lucide-react';

const Header = ({ user }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'New Course Recommended', type: 'success', time: '2m ago', desc: 'Communication skills course unlocked.' },
    { id: 2, title: 'Assessment Pending', type: 'info', time: '1h ago', desc: 'Complete your assessment to unlock more jobs.' },
    { id: 3, title: 'Profile Updated', type: 'star', time: '3h ago', desc: 'Your resume was successfully updated.' },
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (q.includes('job')) navigate('/jobs');
      else if (q.includes('resum')) navigate('/resume');
      else if (q.includes('learn') || q.includes('cours')) navigate('/learning');
      else if (q.includes('assess')) navigate('/assessment');
      else navigate('/learning'); // Default to learning for skill search
      setSearchQuery('');
    }
  };
  return (
    <header className="header glass">
      <div className="header-left">
        <h2 className="page-title">Welcome back, {user.name.split(' ')[0]}!</h2>
        <p className="page-subtitle">Your career journey is looking promising today.</p>
      </div>

      <div className="header-right">
        <button className="mobile-menu-btn icon-btn glass-card">
          <Menu size={20} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
          border-radius: 1rem;
          border: 1px solid var(--glass-border);
        }

        .page-title {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .page-subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          width: 300px;
          border-radius: 0.75rem;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: var(--text);
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }

        .icon-btn {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          border-radius: 0.75rem;
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--secondary);
          border-radius: 50%;
          border: 2px solid var(--surface);
        }

        .notification-wrapper {
          position: relative;
        }

        .notifications-dropdown {
          position: absolute;
          top: calc(100% + 1rem);
          right: 0;
          width: 320px;
          padding: 1rem;
          z-index: 1000;
          box-shadow: var(--shadow-xl);
        }

        .notifications-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .notifications-header h3 {
          font-size: 1rem;
        }

        .text-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .notification-item {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          transition: background 0.2s;
          cursor: pointer;
        }

        .notification-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .notification-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notification-icon.success { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .notification-icon.info { background: rgba(59, 130, 246, 0.1); color: var(--primary); }
        .notification-icon.star { background: rgba(245, 158, 11, 0.1); color: var(--warning); }

        .notification-content {
          flex: 1;
        }

        .notification-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
        }

        .notification-title-row h4 {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .time {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .notification-content p {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .mobile-menu-btn {
          display: none;
        }

        @media (max-width: 1024px) {
          .search-bar {
            width: 200px;
          }
        }

        @media (max-width: 768px) {
          .search-bar {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .header {
            padding: 1rem;
          }
        }
      `}} />
    </header>
  );
};

export default Header;
