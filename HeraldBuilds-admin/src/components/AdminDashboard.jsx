
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FAQManager from './FAQManager';
import ToolsManager from './ToolsManager';
import GuidesManager from './GuidesManager';
import UserQuestionsManager from './UserQuestionsManager';
import logo from '../assets/Heraldbuilds-logo.png';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('questions');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div>
      <nav className="admin-nav">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={logo} alt="HeraldBuilds Logo" style={{ height: 48, width: 'auto' }} />
          <h1 style={{ margin: 0 }}>HeraldBuilds Admin</h1>
          <div className="nav-links" style={{ marginLeft: 'auto' }}>
            <button 
              className={activeTab === 'questions' ? 'active' : ''}
              onClick={() => setActiveTab('questions')}
            >
              User Questions
            </button>
            <button 
              className={activeTab === 'faqs' ? 'active' : ''}
              onClick={() => setActiveTab('faqs')}
            >
              Manage FAQs
            </button>
            <button 
              className={activeTab === 'tools' ? 'active' : ''}
              onClick={() => setActiveTab('tools')}
            >
              Manage Tools
            </button>
            <button 
              className={activeTab === 'guides' ? 'active' : ''}
              onClick={() => setActiveTab('guides')}
            >
              Manage Guides
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="admin-content">
        {activeTab === 'questions' && <UserQuestionsManager />}
        {activeTab === 'faqs' && <FAQManager />}
        {activeTab === 'tools' && <ToolsManager />}
        {activeTab === 'guides' && <GuidesManager />}
      </div>
    </div>
  );
}