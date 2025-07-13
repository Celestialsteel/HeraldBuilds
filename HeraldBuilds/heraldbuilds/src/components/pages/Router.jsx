import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
// Import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        {/* Add other routes */}
      </Routes>
    </Router>
  );
}

export default App;