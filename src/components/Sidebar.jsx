import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  FileText, 
  LogOut, 
  User, 
  Settings,
  Briefcase,
  GraduationCap,
  Layers
} from 'lucide-react';

const Sidebar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('lastResult');
    setUser(null);
    navigate('/');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <ClipboardCheck size={20} />, label: 'Skills Assessment', path: '/assessment' },
    { icon: <FileText size={20} />, label: 'Resume Builder', path: '/resume' },
    { icon: <GraduationCap size={20} />, label: 'Learning Paths', path: '/learning' },
    { icon: <Briefcase size={20} />, label: 'Jobs', path: '/jobs' },
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-logo">
        <div className="logo-icon" style={{background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'}}>
          <Layers size={24} color="white" />
        </div>
        <span className="logo-text">Skill Up Connect</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div className="user-details">
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: 84px;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 2rem 1rem;
          z-index: 100;
          border-right: 1px solid var(--glass-border);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          white-space: nowrap;
          background: var(--background);
        }

        .sidebar:hover {
          width: 280px;
          box-shadow: var(--shadow-xl);
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          padding-left: 0.375rem;
          white-space: nowrap;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px var(--primary-glow);
          flex-shrink: 0;
        }

        .logo-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .sidebar:hover .logo-text {
          opacity: 1;
          transition: opacity 0.3s ease 0.1s;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: all 0.2s;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-link svg {
          flex-shrink: 0;
        }

        .nav-link span {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .sidebar:hover .nav-link span {
          opacity: 1;
          transition: opacity 0.3s ease 0.1s;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
        }

        .nav-link.active {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-left: 0.375rem;
          white-space: nowrap;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--surface-lighter);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--primary);
          border: 2px solid var(--glass-border);
          flex-shrink: 0;
        }

        .user-details {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .sidebar:hover .user-details {
          opacity: 1;
          transition: opacity 0.3s ease 0.1s;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .user-email {
          font-size: 0.75rem;
          color: var(--text-muted);
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          color: var(--error);
          opacity: 0.8;
          cursor: pointer;
          font-weight: 600;
          padding: 0.5rem 0.375rem;
          transition: opacity 0.2s;
          overflow: hidden;
          white-space: nowrap;
        }

        .logout-btn svg {
          flex-shrink: 0;
        }

        .logout-btn span {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .sidebar:hover .logout-btn span {
          opacity: 1;
          transition: opacity 0.3s ease 0.1s;
        }

        .logout-btn:hover {
          opacity: 1;
        }
      `}} />
    </aside>
  );
};

export default Sidebar;
