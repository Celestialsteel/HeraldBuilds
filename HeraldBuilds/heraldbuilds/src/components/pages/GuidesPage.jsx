import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Styles/GuidesPage.css';

const GuidesPage = () => {
  const [guides, setGuides] = useState([]);
  const [adminGuides, setAdminGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimits, setDisplayLimits] = useState({
    beginner: 3,
    intermediate: 3,
    advanced: 3,
    expert: 3
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load guides from guides.json file
  useEffect(() => {
    const loadGuidesFromFile = async () => {
      try {
        const response = await fetch('/guides.json');
        const guidesData = await response.json();
      
        const transformedGuides = guidesData.map(guide => ({
          id: guide.id,
          title: guide.title,
          summary: guide.summary,
          level: guide.level?.toLowerCase() || '',
          tags: Array.isArray(guide.tags) ? guide.tags : [],
        
          // Keep both for flexibility
          content: guide.summary, // Brief overview
          detailedContent: Array.isArray(guide.instructions) 
            ? guide.instructions.join('\n\n') 
            : guide.summary,
          steps: Array.isArray(guide.instructions) ? guide.instructions : [],
        
          link: guide.link,
          readTime: guide.readTime,
          recommendedTools: Array.isArray(guide.recommendedTools) ? guide.recommendedTools : [],
          whatToLookFor: Array.isArray(guide.whatToLookFor) ? guide.whatToLookFor : []
        }));
      
        setGuides(transformedGuides);
        setLoading(false);
      
        // Fetch additional guides from admin to enhance guide details
        fetchAdminGuides();
      } catch (error) {
        console.error('Error loading guides from file:', error);
        setGuides([]);
        setLoading(false);
      }
    };

    loadGuidesFromFile();
  }, []);

  // Fetch additional guides from admin (optional enhancement)
  const fetchAdminGuides = async () => {
    try {
      const response = await fetch('http://localhost/heraldbuilds/apis/guides/get.php');
      const data = await response.json();
      
      if (response.ok && Array.isArray(data)) {
        // Only show admin guides that are NOT in the original list
        const newAdminGuides = data.filter(adminGuide => 
          !guides.some(originalGuide => 
            originalGuide.title.toLowerCase().includes(adminGuide.title.toLowerCase())
          )
        );
        
        setAdminGuides(newAdminGuides);
        setLastUpdated(new Date().toLocaleTimeString());
        console.log('✅ Admin guides loaded:', newAdminGuides.length, 'new items');
      }
    } catch (err) {
      console.error('Error fetching admin guides:', err);
      // Silently fail - original content still works
    }
  };

  // Auto-refresh every 30 seconds for admin guides
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchAdminGuides();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, guides]);

  const handleShowMore = (level) => {
    setDisplayLimits((prev) => ({
      ...prev,
      [level]: prev[level] + 3,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setDisplayLimits({ beginner: 3, intermediate: 3, advanced: 3, expert: 3 });
  };

  const renderGuideCard = (guide, isAdmin = false) => (
    <div className={`guide-card ${isAdmin ? 'admin-guide' : ''}`} key={guide.id || guide.title}>
      <div className={`level-tag ${guide.level.toLowerCase()}`}>{guide.level}</div>
      {isAdmin && <div className="admin-badge">New</div>}
      <h3>{guide.title}</h3>
      <p className="guide-summary">{guide.summary}</p>
      {guide.readTime && <p className="read-time">📖 {guide.readTime}</p>}
      <div className="tag-list">
        {(Array.isArray(guide.tags) ? guide.tags : (guide.tags ? guide.tags.split(',').map(t => t.trim()) : [])).map((tag, i) => (
          <span key={i} className="guide-tag">{tag}</span>
        ))}
      </div>
      {guide.link && (
        <a href={guide.link} target="_blank" rel="noopener noreferrer" className="video-link">
          🎥 Watch Video
        </a>
      )}
      <button className="open-guide-btn" onClick={() => openGuideDetail(guide)}>More Info</button>
    </div>
  );

  const openGuideDetail = (guide) => {
    localStorage.setItem('selectedGuide', JSON.stringify(guide));
    navigate('/guide-details');
  };

  const levels = ['beginner', 'intermediate', 'advanced', 'expert'];

  // Combine original and admin guides for filtering
  const allGuides = [...guides, ...adminGuides];
  
  const filteredGuides = allGuides.filter((guide) =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(guide.tags) ? guide.tags : (guide.tags ? guide.tags.split(',') : [])).some(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const categorizedGuides = levels.reduce((acc, level) => {
    const levelGuides = filteredGuides.filter(guide => guide.level.toLowerCase() === level);
    acc[level] = {
      original: levelGuides.filter(guide => guides.includes(guide)),
      admin: levelGuides.filter(guide => adminGuides.includes(guide))
    };
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="guides-container">
        <Header />
        <main className="guides-main">
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
            Loading your guides...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="guides-container">
      <Header />
      <main className="guides-main">
        <section className="guides-header">
          <h1 className="title">PC Building Guides</h1>
          <p className="subtitle">Explore our comprehensive guides to build your ultimate PC</p>
          
          {/* Auto-refresh controls - minimal and unobtrusive */}
          {adminGuides.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              margin: '1rem 0',
              fontSize: '12px',
              color: '#94a3b8'
            }}>
              <span>✨ {adminGuides.length} additional guides from admin</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                Auto-update
              </label>
              {lastUpdated && <span>Updated: {lastUpdated}</span>}
            </div>
          )}

          <input
            type="text"
            id="searchInput"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search guides by title, description, or tags..."
          />
        </section>

        {levels.map((level) => {
          const originalCount = categorizedGuides[level]?.original.length || 0;
          const adminCount = categorizedGuides[level]?.admin.length || 0;
          const totalCount = originalCount + adminCount;
          const displayLimit = displayLimits[level];
          
          if (totalCount === 0) return null;
          
          return (
            <section key={level} className="guide-section">
              <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Guides ({totalCount})</h2>
              <div className="guide-grid">
                {/* Original guides first */}
                {categorizedGuides[level]?.original.slice(0, Math.min(displayLimit, originalCount)).map(guide => 
                  renderGuideCard(guide, false)
                )}
                
                {/* Admin guides after original ones */}
                {displayLimit > originalCount && categorizedGuides[level]?.admin.slice(0, displayLimit - originalCount).map(guide => 
                  renderGuideCard(guide, true)
                )}
              </div>
              
              {totalCount > displayLimit && (
                <button
                  className="show-more-btn"
                  onClick={() => handleShowMore(level)}
                >
                  Show More ({totalCount - displayLimit} remaining)
                </button>
              )}
            </section>
          );
        })}
      </main>
      <Footer/>
    </div>
  );
};

export default GuidesPage;