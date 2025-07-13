import React from 'react';
import './Styles/Testimonials.css'; 
import './Styles/base.css';

const Testimonials = () => {
  return (
    <section className="testimonials-container">
      <h2>What Our Users Say</h2>
      <div className="testimonial-card">
        <p>"I built my first PC with Herald Builds and it was super easy!"</p>
        <span>– Alex R.</span>
      </div>
      <div className="testimonial-card">
        <p>"Troubleshooting section saved me hours. Amazing resource!"</p>
        <span>– Priya T.</span>
      </div>
    </section>
  );
};

export default Testimonials;