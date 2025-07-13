import React from 'react';

const SafetyTip = ({ icon, title, description }) => (
  <div className="tip">
    <i className={icon}></i>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default SafetyTip;