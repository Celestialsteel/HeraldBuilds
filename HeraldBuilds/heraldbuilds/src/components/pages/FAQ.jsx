import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FAQItem from './FAQItem';
import FAQForm from './FAQForm';
import './Styles/faq.css';
import './Styles/global.css';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch FAQs from backend
  const fetchFAQs = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    
    try {
      const response = await fetch('http://localhost/heraldbuilds/apis/faqs/get.php');
      const data = await response.json();
      
      if (response.ok) {
        setFaqData(data);
        setLastUpdated(new Date().toLocaleTimeString());
        setError(null);
        console.log('✅ FAQs loaded from backend:', data.length, 'items');
      } else {
        throw new Error('Failed to fetch FAQs');
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setError('Failed to load FAQs from backend, using fallback data');
      
      // Fallback to hardcoded data if backend fails
      setFaqData([
        {
          question: "What's the minimum budget for building a decent gaming PC?",
          answer: "A decent entry-level gaming PC typically starts around $600-$800 (KES 82,000-110,000). This will get you a system capable of running most games at 1080p with medium to high settings. However, for a more future-proof build with better components, we recommend budgeting $1000-$1200 (KES 137,000-165,000)",
          category: "PC Building"
        },
        {
          question: "Do I need to buy Windows for my new PC build?",
          answer: "While you can install and use Windows 10/11 without activation, you'll have some limitations and a watermark. For a complete experience, we recommend purchasing a legitimate Windows license (approximately $139 or KES 19,000). However, you can start with the unactivated version and upgrade later",
          category: "PC Building"
        },
        {
          question: "How do I know if my components are compatible?",
          answer: "The main compatibility points to check are: <br />- CPU socket matching the motherboard <br />- RAM type and speed supported by the motherboard <br />- Power supply wattage sufficient for all components <br />- Case size accommodating your graphics card and CPU cooler <br /><br />You can use tools like PCPartPicker to verify compatibility automatically",
          category: "Components"
        },
        {
          question: "How often should I clean my PC?",
          answer: "We recommend cleaning your PC every 3-6 months, depending on your environment. If you have pets or live in a dusty area, you might need to clean it more frequently. Regular cleaning helps maintain optimal airflow and prevents overheating",
          category: "Maintenance"
        },
        {
          question: "What's the best CPU and GPU combination for gaming?",
          answer: "This depends on your budget and needs <br /><br />For mid-range gaming: <br />- CPU: AMD Ryzen 5 or Intel i5 <br />- GPU: NVIDIA RTX 3060 or AMD RX 6600 XT <br /><br />For high-end gaming: <br />- CPU: AMD Ryzen 7/9 or Intel i7/i9 <br />- GPU: NVIDIA RTX 4070 Ti or better <br /><br />Always check our build guides for current recommendations!",
          category: "Performance"
        }
      ]);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchFAQs();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchFAQs(false); // Don't show loading spinner for auto-refresh
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const categories = ['All', 'PC Building', 'Components', 'Troubleshooting', 'Performance', 'Maintenance'];
  
  const filteredFAQs = activeCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  return (
    <div className="faq-page">
      <Header />
      
      <main className="faq-container">
        <section className="hero">
          <h1>Frequently Asked Questions</h1>
          <p className="subtitle">
            Find answers to common questions about PC building and troubleshooting
          </p>
          
          {/* Auto-refresh controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            margin: '1rem 0',
            fontSize: '14px',
            color: '#94a3b8'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto-refresh every 30s
            </label>
            
            <button
              onClick={() => fetchFAQs(false)}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              🔄 Refresh Now
            </button>
            
            {lastUpdated && (
              <span>Last updated: {lastUpdated}</span>
            )}
          </div>

          {error && (
            <div style={{
              background: '#ef4444',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              margin: '10px 0',
              fontSize: '14px'
            }}>
              ⚠️ {error}
            </div>
          )}
        </section>
        
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <section className="faq-list">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
              Loading FAQs...
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <FAQItem 
                key={faq.id || index}
                question={faq.question}
                answer={faq.answer}
              />
            ))
          )}
        </section>
        
        <FAQForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;