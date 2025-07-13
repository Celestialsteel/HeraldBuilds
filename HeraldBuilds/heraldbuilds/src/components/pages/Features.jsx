import React from 'react';


import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <section className="features container">
      <div className="feature-card">
        <h2>Build Guides</h2>
        <p>Step-by-step guides to help you build your dream PC</p>
        <Link to="/guides" className="btn">Explore Guides</Link>
      </div>
      <div className="feature-card">
        <h2>Expert Troubleshooting</h2>
        <p>Solutions to common problems</p>
        <Link to="/troubleshooting" className="btn">Get Help</Link>
      </div>
    </section>
  );
};

export default Features;