import React from 'react';
import dreamPcImage from './images/backgrounds/sdl-sanjaya-hero-bg.webp';

const DreamSection = () => {
  const dreamImageStyle = {
    backgroundImage: `url(${dreamPcImage})`
  };

  return (
    <section className="dream-section container">
      <div className="dream-content">
        <div className="dream-text">
          <p>We help you achieve your ultimate PC-building dream</p>
        </div>
        <div className="dream-pc-image" style={dreamImageStyle}></div>
      </div>
    </section>
  );
};

export default DreamSection;