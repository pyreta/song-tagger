import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import Button from '../Button';
import './Song.css';

const tagString = song =>
  song.tags.map(tag => tag.name).join(', ');

class EditSong extends React.Component {
  constructor() {
    super();
    this.state = { songName: '', tags: '' }
  }

  componentWillMount() {
    this.setState({
      songName: this.props.song.name,
      tags: tagString(this.props.song)
    });
  }

  componentDidMount() {
    this.songNameInput.focus();
  }

  changeSongName(e) {
    this.setState({songName: e.target.value});
  }

  changeTags(e) {
    this.setState({tags: e.target.value});
  }

  render() {
    const { song, setToEdit, update } = this.props
    return (
      <div className="edit-song" style={{padding: '10px'}}>
        <input
          style={{ width: '300px', marginLeft: 0}}
          value={this.state.songName}
          onChange={this.changeSongName.bind(this)}
          ref={(input) => { this.songNameInput = input; }}
        />
        <input
          style={{display: 'block', width: '300px', marginLeft: 0}}
          value={this.state.tags}
          onChange={this.changeTags.bind(this)}
        />
      <div style={{display: 'flex', paddingTop: '10px'}}>
        <Button onButtonClick={() => setToEdit(null)} text="Cancel"/>
        <div style={{width: '5px'}}></div>
        <Button onButtonClick={() => update(song.id, this.state)} text="Update" />
      </div>
      </div>
    )
  }
}

const ShowSong = ({song, buttonText = 'Delete', type, deleteSong, setToEdit=()=>{}}) =>
  <div onDoubleClick={() => setToEdit(song.id)}>
    <Draggable type={type} data={song.id}>{song.name}</Draggable>
    <div className="tags">{tagString(song)}</div>
    <Button onButtonClick={() => deleteSong(song.id)} text={buttonText} color="rgb(222, 108, 117)" />
  </div>

const Song = props => {
  return (
    <li style={{padding: props.songBeingEdited === props.song.id ? 0 : '10px'}} className="slideInLeft animated song">
      {props.songBeingEdited === props.song.id ?
        <EditSong {...props} /> :
        <ShowSong {...props} />
      }
    </li>
  )
}

export default Song;
