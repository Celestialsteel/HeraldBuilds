import FAQForm from './FAQForm';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function FaqManager() {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({ question: '', answer: '', category: '' });

  useEffect(() => {
    axios.get('/heraldbuilds/apis/faqs/get.php')
      .then(res => setFaqs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/heraldbuilds/apis/faqs/create.php', formData).then(() => {
      setFormData({ question: '', answer: '', category: '' });
      return axios.get('/heraldbuilds/apis/faqs/get.php');
    }).then(res => setFaqs(res.data));
  };

  const handleDelete = (id) => {
    axios.post('/heraldbuilds/apis/faqs/delete.php', { id }).then(() => {
      setFaqs(prev => prev.filter(f => f.id !== id));
    });
  };

  return (
    <>
      <div className="faq-container">
        <h2 className="faq-title">Manage FAQs</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Question"
            value={formData.question}
            onChange={e => setFormData({ ...formData, question: e.target.value })}
            required
          />
          <textarea
            placeholder="Answer"
            value={formData.answer}
            onChange={e => setFormData({ ...formData, answer: e.target.value })}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          />
          <button type="submit">Add FAQ</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Question</th><th>Answer</th><th>Category</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map(faq => (
              <tr key={faq.id}>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>{faq.category}</td>
                <td>
                  <button onClick={() => handleDelete(faq.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>
    </>
  );
}


