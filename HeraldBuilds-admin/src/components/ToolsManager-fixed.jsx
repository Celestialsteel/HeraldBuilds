import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ToolsManager() {
  const [tools, setTools] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tips: '',
    image: '',
    category: 'tools' // tools, components, hardware
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const res = await axios.get('/heraldbuilds/apis/tools/get.php');
      setTools(res.data);
    } catch (err) {
      console.error('Error fetching tools:', err);
      // Fallback to mock data if backend fails
      const mockTools = [
        { id: 1, title: "Phillips Head Screwdriver", description: "Essential tool for mounting components", tips: ["Use magnetic tip", "Size #2 for most screws"], image: "phillips.webp", category: "tools" },
        { id: 2, title: "Thermal Paste", description: "Ensures proper heat dissipation", tips: ["Apply pea-sized amount", "Spread evenly"], image: "paste.webp", category: "tools" },
        { id: 3, title: "Anti-Static Wrist Strap", description: "Prevents static damage", tips: ["Connect to grounded surface", "Wear during assembly"], image: "strap.webp", category: "tools" }
      ];
      setTools(mockTools);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const tipsArray = formData.tips.split('\n').filter(tip => tip.trim());
      const toolData = {
        ...formData,
        tips: tipsArray
      };

      if (editingId) {
        await axios.post('/heraldbuilds/apis/tools/update.php', { ...toolData, id: editingId });
        setEditingId(null);
      } else {
        await axios.post('/heraldbuilds/apis/tools/create.php', toolData);
      }

      setFormData({
        title: '',
        description: '',
        tips: '',
        image: '',
        category: 'tools'
      });
      fetchTools();
    } catch (err) {
      console.error('Error saving tool:', err);
      alert('Error saving tool. Please check console for details.');
    }
  };

  const handleEdit = (tool) => {
    setFormData({
      title: tool.title,
      description: tool.description,
      tips: Array.isArray(tool.tips) ? tool.tips.join('\n') : tool.tips,
      image: tool.image,
      category: tool.category
    });
    setEditingId(tool.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        await axios.post('/heraldbuilds/apis/tools/delete.php', { id });
        fetchTools();
      } catch (err) {
        console.error('Error deleting tool:', err);
        alert('Error deleting tool. Please check console for details.');
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      tips: '',
      image: '',
      category: 'tools'
    });
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Manage Tools & Components</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tool Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
        
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          required
        />
        
        <textarea
          placeholder="Tips (one per line)"
          value={formData.tips}
          onChange={e => setFormData({ ...formData, tips: e.target.value })}
          rows="4"
        />
        
        <input
          type="text"
          placeholder="Image URL or filename"
          value={formData.image}
          onChange={e => setFormData({ ...formData, image: e.target.value })}
        />
        
        <select
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="tools">Tools</option>
          <option value="components">Components</option>
          <option value="hardware">Hardware</option>
        </select>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit">
            {editingId ? 'Update Tool' : 'Add Tool'}
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
            <th>Description</th>
            <th>Category</th>
            <th>Tips</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map(tool => (
            <tr key={tool.id}>
              <td>{tool.title}</td>
              <td>{tool.description?.substring(0, 100)}...</td>
              <td>{tool.category}</td>
              <td>
                {Array.isArray(tool.tips) 
                  ? tool.tips.length + ' tips'
                  : tool.tips?.split('\n').length + ' tips'
                }
              </td>
              <td>
                <button 
                  onClick={() => handleEdit(tool)}
                  style={{ backgroundColor: '#28a745', marginRight: '0.5rem' }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(tool.id)}>
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