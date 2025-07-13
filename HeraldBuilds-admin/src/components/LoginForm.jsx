import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    /* Temporary mock authentication 
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Use admin/password123");
    }*/
    
    // Uncomment this when your PHP backend is ready:
    
    try {
      const res = await axios.post("http://localhost/heraldbuilds/apis/admin/login.php", { username, password });
      if (res.data.success) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Server error");
    }
    
  };

  return (
    <div className="admin-login-page">
      <div className="admin-hero">
        <div className="admin-hero-content">
          <h1>Welcome to Herald Builds Admin</h1>
          <p>Manage your PC building platform with powerful admin tools</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="admin-container">
        <div className="admin-login-header">
          <h2 className="admin-title">Admin Portal</h2>
          <p className="admin-subtitle">Sign in to access the dashboard</p>
        </div>
        
        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="faq-form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="faq-form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="faq-form-button">
          Access Dashboard
        </button>
        
        <div className="admin-features">
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>Manage FAQs</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔧</span>
            <span>Tools Management</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📚</span>
            <span>Guides Control</span>
          </div>
        </div>
      </form>
    </div>
  );
}
