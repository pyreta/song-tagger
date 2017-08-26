import React from 'react';

const Search = ({ onSearchType, onSearchClick }) =>
<div>
  <input
    onChange={e => onSearchType(e.target.value)}
    placeholder="Search titles and tags..."
  />
  <button onClick={onSearchClick}>Search</button>
</div>

export default Search
