import React from 'react';
import frustrationImage from './images/backgrounds/the-frustrated-man-with-broken-pc-computer-2B2842E.webp';

const Benefits = () => {
  const frustrationImageStyle = {
    backgroundImage: `url(${frustrationImage})`
  };

  return (
    <section className="benefits container">
      <h2>Why Herald Builds?</h2>
      <div className="benefit-cards">
        <div className="card">
          <p>Beginner Friendly Guides</p>
        </div>
        <div className="card">
          <p>Optimized Build Recommendations</p>
        </div>
        <div className="card">
          <p>Quick Troubleshooting Help</p>
        </div>
      </div>
      <div className="avoid-frustration">
        <div className="frustration-text">
          <p>We Strive to Help You Avoid Frustration</p>
        </div>
        <div className="frustration-image" style={frustrationImageStyle}></div>
      </div>
    </section>
  );
};

export default Benefits;