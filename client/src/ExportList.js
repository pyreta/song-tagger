import React from 'react';
import { Droppable } from 'react-drag-and-drop';
import SongList from './SongList';

const ExportList = ({ onDrop, songs, removeSong }) =>
  <div style={{display: 'flex'}}>
    <Droppable types={['song']} onDrop={onDrop} style={{height: '400px', justifyItems: 'center', flex: '100%'}}>
      <SongList
        songs={songs}
        songProps={{ deleteSong: removeSong, buttonText: 'Remove' }}
      />
      {songs.length ? '' : 'Drag songs here to be exported'}
    </Droppable>
  </div>

export default ExportList;
