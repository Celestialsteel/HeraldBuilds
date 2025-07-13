import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <div 
        className="faq-question" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{question}</h3>
        <i className={`fas fa-chevron-down faq-icon ${isOpen ? 'rotate' : ''}`}></i>
      </div>
      
      {isOpen && (
        <div className="faq-answer">
          {/* Render HTML safely */}
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      )}
    </div>
  );
};

export default FAQItem;