import { useEffect, useState } from "react";
import axios from "axios";
import FaqForm from "./FAQForm";

export default function AdminFAQDashboard() {
  const [faqs, setFaqs] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all FAQs (including unanswered)
  useEffect(() => {
    async function fetchFaqs() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/faqs/list.php");
        setFaqs(res.data || []);
      } catch (err) {
        setError("Failed to load FAQs");
      }
      setLoading(false);
    }
    fetchFaqs();
  }, []);

  // Refresh after save
  const handleSave = () => {
    setSelectedFaq(null);
    // Re-fetch
    axios.get("/api/faqs/list.php").then(res => setFaqs(res.data || []));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">FAQ Management</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">All User Questions</h3>
          <ul className="divide-y">
            {faqs.map(faq => (
              <li
                key={faq.id}
                className="py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedFaq(faq)}
              >
                <div className="font-medium">{faq.question}</div>
                <div className="text-sm text-gray-500">
                  {faq.answer ? "Answered" : "Unanswered"}
                  {faq.category && ` | ${faq.category}`}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">{selectedFaq ? "Edit/Answer FAQ" : "Add New FAQ"}</h3>
          <FaqForm editingFaq={selectedFaq} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
