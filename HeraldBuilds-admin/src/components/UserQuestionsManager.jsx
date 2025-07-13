import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserQuestionsManager() {
  const [userQuestions, setUserQuestions] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, answered
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [faqFormData, setFaqFormData] = useState({
    question: '',
    answer: '',
    category: ''
  });

  useEffect(() => {
    fetchUserQuestions();
  }, []);

  const fetchUserQuestions = async () => {
    // Fetch from backend
    try {
      const res = await axios.get('http://localhost/heraldbuilds/apis/user-questions/get.php');
      setUserQuestions(res.data);
    } catch (err) {
      console.error('Error fetching user questions:', err);
      
      // Fallback to mock data if backend fails
      const mockQuestions = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          category: "PC Building",
          question: "What's the best CPU for gaming in 2024?",
          created_at: "2024-01-15T10:30:00Z",
          status: "pending"
        },
        {
          id: 2,
          name: "Sarah Smith",
          email: "sarah@example.com",
          category: "Components",
          question: "How do I know if my RAM is compatible with my motherboard?",
          created_at: "2024-01-14T15:45:00Z",
          status: "pending"
        },
        {
          id: 3,
          name: "Mike Johnson",
          email: "mike@example.com",
          category: "Troubleshooting",
          question: "My PC won't boot after installing new GPU, what should I check?",
          created_at: "2024-01-13T09:20:00Z",
          status: "answered"
        }
      ];
      setUserQuestions(mockQuestions);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log('Attempting to update status:', { id, newStatus });
    
    try {
      const response = await axios.post('http://localhost/heraldbuilds/apis/user-questions/update-status.php', { 
        id: id, 
        status: newStatus 
      });
      
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        fetchUserQuestions(); // Refresh the list
        alert('Status updated successfully!');
      } else {
        console.error('API returned error:', response.data);
        alert('Error updating status: ' + (response.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error updating question status:', err);
      console.error('Error details:', err.response?.data);
      
      // Show more detailed error message
      const errorMessage = err.response?.data?.message || err.message || 'Network error';
      alert('Error updating status: ' + errorMessage);
      
      // Fallback to local update if backend fails
      setUserQuestions(prev => 
        prev.map(q => q.id === id ? { ...q, status: newStatus } : q)
      );
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await axios.post('http://localhost/heraldbuilds/apis/user-questions/delete.php', { id });
        fetchUserQuestions(); // Refresh the list
      } catch (err) {
        console.error('Error deleting question:', err);
        // Fallback to local delete if backend fails
        setUserQuestions(prev => prev.filter(q => q.id !== id));
      }
    }
  };

  const handleConvertToFAQ = (question) => {
    setSelectedQuestion(question);
    setFaqFormData({
      question: question.question,
      answer: '',
      category: question.category
    });
  };

  const handleCreateFAQ = async (e) => {
    e.preventDefault();
    
    try {
      // Create the FAQ
      await axios.post('http://localhost/heraldbuilds/apis/faqs/create.php', faqFormData);
      
      // Mark the original question as answered
      await handleStatusChange(selectedQuestion.id, 'answered');
      
      // Reset form
      setSelectedQuestion(null);
      setFaqFormData({ question: '', answer: '', category: '' });
      
      alert('FAQ created successfully!');
    } catch (err) {
      console.error('Error creating FAQ:', err);
      alert('Error creating FAQ. Please try again.');
    }
  };

  const filteredQuestions = userQuestions.filter(q => {
    if (filter === 'all') return true;
    return q.status === filter;
  });

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">User Submitted Questions</h2>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            background: filter === 'all' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
            color: filter === 'all' ? 'white' : '#94a3b8'
          }}
        >
          All ({userQuestions.length})
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'active' : ''}
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            background: filter === 'pending' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
            color: filter === 'pending' ? 'white' : '#94a3b8'
          }}
        >
          Pending ({userQuestions.filter(q => q.status === 'pending').length})
        </button>
        <button 
          onClick={() => setFilter('answered')}
          className={filter === 'answered' ? 'active' : ''}
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            background: filter === 'answered' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
            color: filter === 'answered' ? 'white' : '#94a3b8'
          }}
        >
          Answered ({userQuestions.filter(q => q.status === 'answered').length})
        </button>
      </div>

      {/* Questions Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Category</th>
            <th>Question</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map(question => (
            <tr key={question.id}>
              <td>{question.name}</td>
              <td>{question.email}</td>
              <td>{question.category}</td>
              <td style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
                {question.question.length > 100 
                  ? question.question.substring(0, 100) + '...'
                  : question.question
                }
              </td>
              <td>{formatDate(question.created_at || question.timestamp)}</td>
              <td>
                <span 
                  className={`level-badge ${question.status === 'pending' ? 'intermediate' : 'beginner'}`}
                  style={{ fontSize: '10px', padding: '2px 8px' }}
                >
                  {question.status}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {question.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleConvertToFAQ(question)}
                        style={{ 
                          backgroundColor: '#22c55e', 
                          fontSize: '12px', 
                          padding: '4px 8px' 
                        }}
                      >
                        Convert to FAQ
                      </button>
                      <button 
                        onClick={() => handleStatusChange(question.id, 'answered')}
                        style={{ 
                          backgroundColor: '#3b82f6', 
                          fontSize: '12px', 
                          padding: '4px 8px' 
                        }}
                      >
                        Mark Answered
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleDeleteQuestion(question.id)}
                    style={{ 
                      backgroundColor: '#ef4444', 
                      fontSize: '12px', 
                      padding: '4px 8px' 
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredQuestions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
          No {filter === 'all' ? '' : filter} questions found.
        </div>
      )}

      {/* Convert to FAQ Modal */}
      {selectedQuestion && (
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #1e293b, #172033)',
            padding: '2rem',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#ffffff' }}>
              Convert Question to FAQ
            </h3>
            
            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'rgba(30, 41, 59, 0.3)', borderRadius: '8px' }}>
              <strong>Original Question from {selectedQuestion.name}:</strong>
              <p style={{ marginTop: '0.5rem', color: '#cbd5e1' }}>{selectedQuestion.question}</p>
            </div>

            <form onSubmit={handleCreateFAQ}>
              <input
                type="text"
                placeholder="FAQ Question (edit if needed)"
                value={faqFormData.question}
                onChange={e => setFaqFormData({ ...faqFormData, question: e.target.value })}
                required
                style={{ marginBottom: '1rem' }}
              />
              
              <textarea
                placeholder="Your Answer"
                value={faqFormData.answer}
                onChange={e => setFaqFormData({ ...faqFormData, answer: e.target.value })}
                required
                rows="6"
                style={{ marginBottom: '1rem' }}
              />
              
              <input
                type="text"
                placeholder="Category"
                value={faqFormData.category}
                onChange={e => setFaqFormData({ ...faqFormData, category: e.target.value })}
                style={{ marginBottom: '1.5rem' }}
              />
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ flex: 1 }}>
                  Create FAQ
                </button>
                <button 
                  type="button" 
                  onClick={() => setSelectedQuestion(null)}
                  style={{ 
                    flex: 1, 
                    background: 'linear-gradient(135deg, #6b7280, #4b5563)' 
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}