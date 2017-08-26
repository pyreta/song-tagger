import React from 'react';
import { Droppable } from 'react-drag-and-drop';
import SongList from './SongList';

const ExportList = ({ onDrop, songs, removeSong }) =>
  <div style={{display: 'flex'}}>
    <Droppable types={['song']} onDrop={onDrop} style={{height: '400px', justifyItems: 'center', flex: '100%', flexDirection: 'column', textAlign: songs.length ? 'left' : 'center', paddingTop: songs.length ? '0' : '50%'}}>
      <SongList
        songs={songs}
        songProps={{ deleteSong: removeSong, buttonText: 'Remove' }}
      />
    <span style={{color: 'grey', fontStyle: 'italic'}}>{songs.length ? '' : 'Drag songs here to be exported'}</span>
    </Droppable>
  </div>

export default ExportList;
