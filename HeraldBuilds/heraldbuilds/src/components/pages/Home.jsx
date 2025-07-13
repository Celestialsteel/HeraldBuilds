import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';  
import Benefits from './Benefits';
import Testimonials from './Testimonials';
import DreamSection from './DreamSection';


import './Styles/index.css';
import Footer from './Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <DreamSection />
      <Features />
      <Benefits />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;