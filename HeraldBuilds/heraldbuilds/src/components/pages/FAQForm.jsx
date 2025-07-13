import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const FAQForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  // Use local state for submissions if needed, or remove if not used
  const [submissions, setSubmissions] = useState([]);

  // Function to submit question to backend
  const submitToBackend = async ({ name, email, category, question }) => {
    const response = await fetch('heraldbuilds/apis/user-questions/submit.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, category, question })
    });
    if (!response.ok) {
      throw new Error('Failed to submit question');
    }
    return response.json();
  };
  // Handle character count and color
  useEffect(() => {
    setCharCount(question.length);
  }, [question]);

  const getCharCountColor = () => {
    if (charCount >= 450) return '#ef4444';
    if (charCount >= 400) return '#f59e0b';
    return '#94a3b8';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Reset message
    setMessage({ text: '', type: '' });
    
    // Validation
    if (question.length < 10) {
      setMessage({ 
        text: 'Your question is too short. Please provide more details.', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }

    if (!/^[A-Za-z\s\-']+$/.test(name)) {
      setMessage({ 
        text: 'Please enter a valid name using only letters, spaces, hyphens, or apostrophes.', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to backend
      const response = await fetch('http://localhost/heraldbuilds/apis/user-questions/submit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          category,
          question
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Also save to localStorage as backup
        const submission = {
          name,
          email,
          category,
          question,
          timestamp: new Date().toISOString()
        };
        const updatedSubmissions = [...submissions, submission];
        setSubmissions(updatedSubmissions);
        
        // Show success message
        setMessage({ 
          text: 'Thank you for your question! We will review it and get back to you soon.', 
          type: 'success' 
        });
        
        // Reset form
        setName('');
        setEmail('');
        setCategory('');
        setQuestion('');
        setCharCount(0);
      } else {
        throw new Error(result.message || 'Failed to submit question');
      }
      
    } catch (error) {
      console.error('Error submitting question:', error);
      
      // Fallback to localStorage if backend fails
      try {
        const submission = {
          name,
          email,
          category,
          question,
          timestamp: new Date().toISOString()
        };
        const updatedSubmissions = [...submissions, submission];
        setSubmissions(updatedSubmissions);
        
        setMessage({ 
          text: 'Question saved locally. We will review it when our system is back online.', 
          type: 'success' 
        });
        
        // Reset form
        setName('');
        setEmail('');
        setCategory('');
        setQuestion('');
        setCharCount(0);
      } catch (fallbackError) {
        setMessage({ 
          text: 'Sorry, there was an error submitting your question. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <section className="submit-faq">
      <h2>Ask a Question</h2>
      <p>Can't find what you're looking for? Submit your question below.</p>
      
      <form id="faqForm" className="faq-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={50}
            pattern="[A-Za-z\s\-']+"
            title="Please enter a valid name using letters, spaces, hyphens, or apostrophes"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select 
            id="category" 
            name="category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="PC Building">PC Building</option>
            <option value="Components">Components</option>
            <option value="Troubleshooting">Troubleshooting</option>
            <option value="Performance">Performance</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="question">Your Question:</label>
          <div className="textarea-container">
            <textarea
              id="question"
              name="question"
              rows="4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              maxLength={500}
              minLength={10}
            ></textarea>
            <div className="char-counter">
              <span id="charCount" style={{ color: getCharCountColor() }}>
                {charCount}
              </span>/500
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          <span className="btn-text">Submit Question</span>
          <div className="loader"></div>
        </button>
      </form>

      {message.text && (
        <div 
          id="submissionMessage" 
          className={`submission-message ${message.type} show`}
        >
          {message.text}
        </div>
      )}
    </section>
  );
};

export default FAQForm;