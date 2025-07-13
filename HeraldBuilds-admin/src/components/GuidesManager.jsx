import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GuidesManager() {
  const [guides, setGuides] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    level: 'beginner',
    tags: '',
    content: '',
    steps: '',
    link: '',
    readTime: '',
    recommendedTools: '',
    whatToLookFor: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [viewingGuide, setViewingGuide] = useState(null);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const res = await axios.get('http://localhost/heraldbuilds/apis/guides/get.php');
      console.log('Guides API response:', res.data);
      
      // Ensure we always have an array
      if (Array.isArray(res.data)) {
        setGuides(res.data);
      } else if (res.data && res.data.error) {
        console.error('API Error:', res.data.error);
        setGuides([]);
      } else {
        console.error('Unexpected API response:', res.data);
        setGuides([]);
      }
    } catch (err) {
      console.error('Error fetching guides:', err);
      // Fallback to mock data if backend fails
      const mockGuides = [
        { id: 1, title: "First Time PC Build", summary: "Complete guide for beginners", level: "beginner", tags: ["beginner", "first-build", "tutorial"], content: "This guide will walk you through your first PC build...", steps: ["Prepare workspace", "Install PSU", "Install motherboard", "Install RAM", "Install CPU", "Install GPU", "Connect cables", "Test system"] },
        { id: 2, title: "Cable Management Tips", summary: "How to organize your cables", level: "intermediate", tags: ["cables", "organization", "airflow"], content: "Good cable management improves airflow and aesthetics...", steps: ["Plan cable routes", "Use zip ties", "Hide cables behind motherboard tray", "Test clearances"] }
      ];
      setGuides(mockGuides);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const stepsArray = formData.steps.split('\n').filter(step => step.trim());
      const recommendedToolsArray = formData.recommendedTools.split('\n').filter(tool => tool.trim());
      const whatToLookForArray = formData.whatToLookFor.split('\n').filter(tip => tip.trim());
      
      const guideData = {
        ...formData,
        tags: tagsArray,
        steps: stepsArray,
        recommendedTools: recommendedToolsArray,
        whatToLookFor: whatToLookForArray
      };

      if (editingId) {
        await axios.post('http://localhost/heraldbuilds/apis/guides/update.php', { ...guideData, id: editingId });
        setEditingId(null);
      } else {
        await axios.post('http://localhost/heraldbuilds/apis/guides/create.php', guideData);
      }

      setFormData({
        title: '',
        summary: '',
        level: 'beginner',
        tags: '',
        content: '',
        steps: '',
        link: '',
        readTime: '',
        recommendedTools: '',
        whatToLookFor: ''
      });
      fetchGuides();
    } catch (err) {
      console.error('Error saving guide:', err);
      alert('Error saving guide. Please check console for details.');
    }
  };

  const handleEdit = (guide) => {
    setFormData({
      title: guide.title || '',
      summary: guide.summary || '',
      level: guide.level || 'beginner',
      tags: Array.isArray(guide.tags) ? guide.tags.join(', ') : (guide.tags || ''),
      content: guide.content || '',
      steps: Array.isArray(guide.steps) ? guide.steps.join('\n') : (guide.steps || ''),
      link: guide.link || '',
      readTime: guide.readTime || '',
      recommendedTools: Array.isArray(guide.recommendedTools) ? guide.recommendedTools.join('\n') : (guide.recommendedTools || ''),
      whatToLookFor: Array.isArray(guide.whatToLookFor) ? guide.whatToLookFor.join('\n') : (guide.whatToLookFor || '')
    });
    setEditingId(guide.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      try {
        await axios.post('http://localhost/heraldbuilds/apis/guides/delete.php', { id });
        fetchGuides();
      } catch (err) {
        console.error('Error deleting guide:', err);
        alert('Error deleting guide. Please check console for details.');
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      summary: '',
      level: 'beginner',
      tags: '',
      content: '',
      steps: '',
      link: '',
      readTime: '',
      recommendedTools: '',
      whatToLookFor: ''
    });
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Manage PC Building Guides</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Guide Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
        
        <textarea
          placeholder="Summary"
          value={formData.summary}
          onChange={e => setFormData({ ...formData, summary: e.target.value })}
          required
          rows="3"
        />
        
        <select
          value={formData.level}
          onChange={e => setFormData({ ...formData, level: e.target.value })}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={e => setFormData({ ...formData, tags: e.target.value })}
        />
        
        <textarea
          placeholder="Full Content"
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          rows="6"
        />
        
        <textarea
          placeholder="Steps/Instructions (one per line)"
          value={formData.steps}
          onChange={e => setFormData({ ...formData, steps: e.target.value })}
          rows="5"
        />

        <input
          type="url"
          placeholder="Video Tutorial Link (YouTube URL)"
          value={formData.link}
          onChange={e => setFormData({ ...formData, link: e.target.value })}
        />

        <input
          type="text"
          placeholder="Read Time (e.g., '15 min read')"
          value={formData.readTime}
          onChange={e => setFormData({ ...formData, readTime: e.target.value })}
        />

        <textarea
          placeholder="Recommended Tools (one per line)"
          value={formData.recommendedTools}
          onChange={e => setFormData({ ...formData, recommendedTools: e.target.value })}
          rows="4"
        />

        <textarea
          placeholder="What to Look For / Important Tips (one per line)"
          value={formData.whatToLookFor}
          onChange={e => setFormData({ ...formData, whatToLookFor: e.target.value })}
          rows="4"
        />
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit">
            {editingId ? 'Update Guide' : 'Add Guide'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} style={{ backgroundColor: '#6c757d' }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Level</th>
            <th>Summary</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.map(guide => (
            <tr key={guide.id}>
              <td>{guide.title}</td>
              <td>
                <span className={`level-badge ${guide.level}`}>
                  {guide.level}
                </span>
              </td>
              <td>{guide.summary?.substring(0, 100)}...</td>
              <td>
                {Array.isArray(guide.tags) 
                  ? guide.tags.join(', ')
                  : guide.tags
                }
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setViewingGuide(guide)}
                    style={{ backgroundColor: '#3b82f6', fontSize: '12px', padding: '4px 8px' }}
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleEdit(guide)}
                    style={{ backgroundColor: '#28a745', fontSize: '12px', padding: '4px 8px' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(guide.id)}
                    style={{ backgroundColor: '#ef4444', fontSize: '12px', padding: '4px 8px' }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Guide Details Modal */}
      {viewingGuide && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #1e293b, #172033)',
            padding: '2rem',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            color: '#ffffff'
          }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2rem', borderBottom: '2px solid #334155', paddingBottom: '1.5rem' }}>
              <div className={`level-tag ${viewingGuide.level}`} style={{ marginBottom: '1rem' }}>
                {viewingGuide.level}
              </div>
              <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#ffffff' }}>
                {viewingGuide.title}
              </h1>
            </div>

            {/* Summary Section */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem' }}>
                📖 Overview
              </h3>
              <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
                {viewingGuide.summary}
              </p>
            </div>

            {/* Tags Section */}
            {viewingGuide.tags && (Array.isArray(viewingGuide.tags) ? viewingGuide.tags.length > 0 : viewingGuide.tags) && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  🏷️ Tags
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(Array.isArray(viewingGuide.tags) ? viewingGuide.tags : [viewingGuide.tags]).map((tag, i) => (
                    <span key={i} style={{
                      backgroundColor: '#334155',
                      color: '#e2e8f0',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content Section */}
            {viewingGuide.content && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  📄 Full Content
                </h3>
                <div style={{ 
                  backgroundColor: '#1e293b', 
                  padding: '1rem', 
                  borderRadius: '0.5rem',
                  color: '#e2e8f0',
                  lineHeight: '1.6'
                }}>
                  {viewingGuide.content}
                </div>
              </div>
            )}

            {/* Steps Section */}
            {viewingGuide.steps && (Array.isArray(viewingGuide.steps) ? viewingGuide.steps.length > 0 : viewingGuide.steps) && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  📋 Step-by-Step Instructions
                </h3>
                <ol style={{ listStyle: 'none', padding: 0 }}>
                  {(Array.isArray(viewingGuide.steps) ? viewingGuide.steps : [viewingGuide.steps]).map((step, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      marginBottom: '1rem',
                      padding: '1rem',
                      backgroundColor: '#334155',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #3b82f6'
                    }}>
                      <span style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        minWidth: 'fit-content'
                      }}>
                        Step {i + 1}
                      </span>
                      <span style={{ flex: 1, color: '#e2e8f0', lineHeight: '1.6' }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Recommended Tools Section */}
            {viewingGuide.recommendedTools && (Array.isArray(viewingGuide.recommendedTools) ? viewingGuide.recommendedTools.length > 0 : viewingGuide.recommendedTools) && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  🔧 Recommended Tools
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(Array.isArray(viewingGuide.recommendedTools) ? viewingGuide.recommendedTools : [viewingGuide.recommendedTools]).map((tool, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: '#e2e8f0'
                    }}>
                      <span style={{ color: '#3b82f6', fontSize: '1.2rem' }}>•</span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What to Look For Section */}
            {viewingGuide.whatToLookFor && (Array.isArray(viewingGuide.whatToLookFor) ? viewingGuide.whatToLookFor.length > 0 : viewingGuide.whatToLookFor) && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  ⚠️ What to Look For
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {(Array.isArray(viewingGuide.whatToLookFor) ? viewingGuide.whatToLookFor : [viewingGuide.whatToLookFor]).map((tip, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      padding: '0.5rem',
                      backgroundColor: '#1e293b',
                      borderRadius: '0.5rem',
                      borderLeft: '3px solid #f59e0b'
                    }}>
                      <span style={{ color: '#f59e0b', fontSize: '1.2rem', marginTop: '0.1rem' }}>⚠️</span>
                      <span style={{ color: '#e2e8f0', lineHeight: '1.5' }}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Video Link and Read Time Section */}
            {(viewingGuide.link || viewingGuide.readTime) && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  📺 Additional Resources
                </h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {viewingGuide.link && (
                    <a 
                      href={viewingGuide.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      📺 Watch Tutorial
                    </a>
                  )}
                  {viewingGuide.readTime && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#334155',
                      color: '#e2e8f0',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      ⏱️ {viewingGuide.readTime}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Close Button */}
            <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '2px solid #334155' }}>
              <button 
                onClick={() => setViewingGuide(null)}
                style={{
                  backgroundColor: '#6b7280',
                  color: 'white',
                  padding: '0.8rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}