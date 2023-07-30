import React from 'react';
import './overlay.css';

const Overlay = ({ showAnimation }) => {
  return showAnimation ? (
    <div className="overlay">
      <img src={process.env.PUBLIC_URL + '/images/tekitouna.gif'} alt="Animation" />
    </div>
  ) : null;
};

export default Overlay;
