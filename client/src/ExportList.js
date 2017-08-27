import React from 'react';
import { Droppable } from 'react-drag-and-drop';
import SongList from './SongList';

const ExportList = ({ onDrop, songs, removeSong }) =>
  <div>
    <Droppable types={['song']} onDrop={onDrop}>
      <div className='droppable-list' style={songs.length ? {} : {
          textAlign: 'center',
          // paddingTop: 'calc(50vh - 60px)',
          border: '10px dashed rgb(40, 44, 52)',
          height: 'calc(100vh - 130px)',
          position: 'relative'
        }}>
        <SongList
          songs={songs}
          songProps={{ deleteSong: removeSong, buttonText: 'Remove' }}
          />
        <span style={{color: 'grey', fontStyle: 'italic', position: 'fixed', top: '50%',  left: '50%', width: 'calc(50vw - 10px)'}}>{songs.length ? '' : 'Drag songs here to be exported'}</span>
      </div>
    </Droppable>
  </div>

export default ExportList;
