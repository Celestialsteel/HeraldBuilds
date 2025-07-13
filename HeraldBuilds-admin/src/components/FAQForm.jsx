import { useEffect, useState } from "react";
import axios from "axios";

export default function FaqForm({ editingFaq, onSave }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingFaq) {
      setQuestion(editingFaq.question);
      setAnswer(editingFaq.answer);
      setCategory(editingFaq.category || "");
    } else {
      setQuestion("");
      setAnswer("");
      setCategory("");
    }
  }, [editingFaq]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingFaq) {
      await axios.post("/heraldbuilds/apis/faqs/update.php", {
        id: editingFaq.id,
        question,
        answer,
        category,
      });
    } else {
      await axios.post("/heraldbuilds/apis/faqs/create.php", {
        question,
        answer,
        category,
      });
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Question"
        className="border p-2 w-full mb-2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <textarea
        placeholder="Answer"
        className="border p-2 w-full mb-2"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category (optional)"
        className="border p-2 w-full mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">
        {editingFaq ? "Update FAQ" : "Add FAQ"}
      </button>
    </form>
  );
}
