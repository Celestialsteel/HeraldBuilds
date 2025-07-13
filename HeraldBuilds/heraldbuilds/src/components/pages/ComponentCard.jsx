import React from 'react';

const ComponentCard = ({ image, title, description, tips }) => {
  // If image path does not start with '/' or 'http', assume it's in /images/tools/
  const getImageSrc = (img) => {
    if (!img) return '';
    if (img.startsWith('/') || img.startsWith('http')) return img;
    return `/images/tools/${img}`;
  };
  return (
    <div className="component-card">
      <div className="tool-image">
        <img src={getImageSrc(image)} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="component-tips">
        <h4>Tips:</h4>
        <ul>
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComponentCard;