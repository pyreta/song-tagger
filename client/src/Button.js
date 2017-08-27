import React from 'react';
import './Button.css';

// const Button = ({ onButtonClick, text, background = 'transparent' }) => (
//   <button className="button" style={{
//
//   }} onClick={onButtonClick}><span style={{
//   }}>{text}</span></button>
// );

const Button = ({ onButtonClick, text, background = 'transparent' }) => (
  <button className="button" style={{
    background,
    cursor: 'pointer',
    height: '16px',
    textAlign: 'center',
    margin: 0,
    borderRadius: '2px',
    fontSize: '11px',
    justifyContent: 'center',
    alignItems: 'center'
  }} onClick={onButtonClick}><span style={{
  }}>{text}</span></button>
);

export default Button;
