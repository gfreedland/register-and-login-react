import React from 'react';
import './Backdrop.css';

const backdrop = (props) => {
  const { show, clicked } = props;
  return (
    show ? <div className="Backdrop" onClick={clicked} /> : null
  );
};

export default backdrop;
