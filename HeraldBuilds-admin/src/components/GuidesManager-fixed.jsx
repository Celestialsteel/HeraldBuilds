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
    steps: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const res = await axios.get('/heraldbuilds/apis/guides/get.php');
      setGuides(res.data);
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
      
      const guideData = {
        ...formData,
        tags: tagsArray,
        steps: stepsArray
      };

      if (editingId) {
        await axios.post('/heraldbuilds/apis/guides/update.php', { ...guideData, id: editingId });
        setEditingId(null);
      } else {
        await axios.post('/heraldbuilds/apis/guides/create.php', guideData);
      }

      setFormData({
        title: '',
        summary: '',
        level: 'beginner',
        tags: '',
        content: '',
        steps: ''
      });
      fetchGuides();
    } catch (err) {
      console.error('Error saving guide:', err);
      alert('Error saving guide. Please check console for details.');
    }
  };

  const handleEdit = (guide) => {
    setFormData({
      title: guide.title,
      summary: guide.summary,
      level: guide.level,
      tags: Array.isArray(guide.tags) ? guide.tags.join(', ') : guide.tags,
      content: guide.content || '',
      steps: Array.isArray(guide.steps) ? guide.steps.join('\n') : guide.steps || ''
    });
    setEditingId(guide.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      try {
        await axios.post('/heraldbuilds/apis/guides/delete.php', { id });
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
      steps: ''
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
          placeholder="Steps (one per line)"
          value={formData.steps}
          onChange={e => setFormData({ ...formData, steps: e.target.value })}
          rows="5"
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
                <button 
                  onClick={() => handleEdit(guide)}
                  style={{ backgroundColor: '#28a745', marginRight: '0.5rem' }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(guide.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}