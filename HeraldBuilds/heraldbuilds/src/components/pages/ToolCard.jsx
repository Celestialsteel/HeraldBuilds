import React from 'react';

const ToolCard = ({ image, title, description, tips }) => (
  <div className="tool-card">
    <div 
      className="tool-image" 
      style={{ backgroundImage: `url(${image})` }}
    ></div>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="tool-tips">
      <h4>Tips:</h4>
      <ul>
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default ToolCard;