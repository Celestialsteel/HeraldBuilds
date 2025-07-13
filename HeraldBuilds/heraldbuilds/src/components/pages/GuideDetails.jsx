import React, { useEffect, useState } from 'react';
import './Styles/GuideDetails.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const GuideDetails = () => {
  const [guide, setGuide] = useState(null);
  const [adminGuideDetails, setAdminGuideDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGuideDetails = async () => {
      const storedGuide = localStorage.getItem('selectedGuide');
      if (storedGuide) {
        const parsedGuide = JSON.parse(storedGuide);
        setGuide(parsedGuide);
        
        // Try to fetch additional details from admin API
        await fetchAdminGuideDetails(parsedGuide);
      }
      setLoading(false);
    };

    loadGuideDetails();
  }, []);

  const fetchAdminGuideDetails = async (currentGuide) => {
    try {
      const response = await fetch('http://localhost/heraldbuilds/apis/guides/get.php');
      const data = await response.json();
      
      if (response.ok && Array.isArray(data)) {
        // Find matching guide in admin data by title similarity
        const matchingAdminGuide = data.find(adminGuide => 
          adminGuide.title.toLowerCase().includes(currentGuide.title.toLowerCase()) ||
          currentGuide.title.toLowerCase().includes(adminGuide.title.toLowerCase())
        );
        
        if (matchingAdminGuide) {
          setAdminGuideDetails(matchingAdminGuide);
          console.log('✅ Found matching admin guide details:', matchingAdminGuide.title);
        }
      }
    } catch (err) {
      console.error('Error fetching admin guide details:', err);
      setError('Could not load additional guide details');
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="guide-details-container">
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
            Loading guide details...
          </div>
        </div>

        
        <Footer />
      </div>
    );
  }

  if (!guide) {
    return (
      <div>
        <Header />
        <div className="guide-details-container">
          <p style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
            No guide selected. Please go back to the guides page and select a guide.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // Merge guide data with admin details if available
  const mergedGuide = adminGuideDetails ? {
    ...guide,
    // Prefer admin data for certain fields if available
    summary: adminGuideDetails.summary || guide.summary,
    content: adminGuideDetails.content || guide.content,
    detailedContent: adminGuideDetails.detailedContent || adminGuideDetails.content || guide.detailedContent,
    steps: adminGuideDetails.steps || adminGuideDetails.instructions || guide.steps || guide.instructions || [],
    instructions: adminGuideDetails.instructions || adminGuideDetails.steps || guide.instructions || guide.steps || [],
    recommendedTools: adminGuideDetails.recommendedTools || adminGuideDetails.tools || guide.recommendedTools || [],
    whatToLookFor: adminGuideDetails.whatToLookFor || adminGuideDetails.warnings || guide.whatToLookFor || [],
    link: adminGuideDetails.link || guide.link,
    readTime: adminGuideDetails.readTime || guide.readTime,
    tags: [...(guide.tags || []), ...(adminGuideDetails.tags ? (Array.isArray(adminGuideDetails.tags) ? adminGuideDetails.tags : adminGuideDetails.tags.split(',').map(t => t.trim())) : [])].filter((tag, index, self) => self.indexOf(tag) === index), // Remove duplicates
  } : guide;

  // Get the instructions/steps - handle both possible property names
  const instructions = mergedGuide.steps || mergedGuide.instructions || [];
  const tools = mergedGuide.recommendedTools || [];
  const lookFor = mergedGuide.whatToLookFor || [];

  return (
    <div>
      <Header />
      <div className="guide-details-container">
        <div className="guide-card">
          {/* Admin Enhancement Indicator */}
          {adminGuideDetails && (
            <div className="admin-enhancement-badge">
              ✨ Enhanced with additional admin content
            </div>
          )}

          {/* Header Section */}
          <div className="guide-header">
            <div className={`level-tag ${mergedGuide.level.toLowerCase()}`}>{mergedGuide.level}</div>
            <h1>{mergedGuide.title}</h1>
            {mergedGuide.readTime && <p className="read-time">📖 {mergedGuide.readTime}</p>}
          </div>

          {/* Summary Section */}
          <div className="guide-section">
            <h2>Overview</h2>
            <p className="guide-summary">{mergedGuide.summary}</p>
          </div>

          {/* Tags Section */}
          {mergedGuide.tags && mergedGuide.tags.length > 0 && (
            <div className="guide-section">
              <h3>Tags</h3>
              <div className="tag-list">
                {mergedGuide.tags.map((tag, i) => (
                  <span key={i} className="guide-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Video Link Section */}
          {mergedGuide.link && (
            <div className="guide-section">
              <h3>Video Tutorial</h3>
              <a href={mergedGuide.link} className="guide-link" target="_blank" rel="noopener noreferrer">
                🎥 Watch Video Tutorial
              </a>
            </div>
          )}

          {/* Recommended Tools Section */}
          {tools.length > 0 && (
            <div className="guide-section">
              <h3>🔧 Recommended Tools & Materials</h3>
              <ul className="guide-list tools-list">
                {tools.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step-by-Step Instructions */}
          {instructions.length > 0 && (
            <div className="guide-section">
              <h3>📋 Step-by-Step Instructions</h3>
              <ol className="guide-list instructions-list">
                {instructions.map((item, i) => (
                  <li key={i} className="instruction-step">
                    <span className="step-number">Step {i + 1}</span>
                    <span className="step-content">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* What to Look For Section */}
          {lookFor.length > 0 && (
            <div className="guide-section">
              <h3>⚠️ Important Things to Watch For</h3>
              <ul className="guide-list warning-list">
                {lookFor.map((item, i) => (
                  <li key={i} className="warning-item">{item}</li>
                ))}
              </ul>
            </div>
          )}

          
          {/* Admin-specific additional content */}
          {adminGuideDetails && adminGuideDetails.additionalNotes && (
            <div className="guide-section">
              <h3>📝 Additional Notes from Admin</h3>
              <div className="admin-notes">
                <p>{adminGuideDetails.additionalNotes}</p>
              </div>
            </div>
          )}

          {/* Error display if admin fetch failed */}
          {error && (
            <div className="guide-section">
              <div className="error-notice">
                <p>⚠️ {error}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="guide-navigation">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back to Guides
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuideDetails;