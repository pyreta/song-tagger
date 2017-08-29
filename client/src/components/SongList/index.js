import React from 'react';
import Song from '../Song';

const SongList = ({ songs, songProps }) => (
  <ul>
    {songs.map(song => (
      <Song key={song.id} song={song} {...songProps} />
    ))}
  </ul>
);

export default SongList;
