import React from 'react';

const HardwareGridItem = ({ image, title, specs }) => (
  <div className="grid-item">
    <div className="hardware-image-container">
      <img src={image} alt={title} />
    </div>
    <h3>{title}</h3>
    <div className="specs">
      {specs.map((spec, i) => (
        <div className="spec-item" key={i}>
          <span className="spec-label">{spec.label}</span>
          <span className="spec-value">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default HardwareGridItem;