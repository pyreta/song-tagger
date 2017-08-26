import React from 'react';
import './Button.css';

const Button = ({ onButtonClick, text, background = 'transparent' }) => (
  <div className="button" style={{
    background,
    cursor: 'pointer',
    width: '50px',
    height: '16px',
    textAlign: 'center',
    borderRadius: '2px',
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }} onClick={onButtonClick}><span style={{
  }}>{text}</span></div>
);

export default Button;
