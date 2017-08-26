import React from 'react';

const PageCounter = ({ onPageDown, onPageUp, page, totalPages }) => (
  <div>
    <button onClick={onPageDown} style={{display: 'inline'}}>{'<'}</button>
    <div style={{display: 'inline', padding: '10px'}}>{`Page: ${page} of ${totalPages}`}</div>
    <button onClick={onPageUp}>{'>'}</button>
  </div>
);

export default PageCounter;
