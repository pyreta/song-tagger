import React from 'react';
import { Draggable } from 'react-drag-and-drop';
import './Song.css';
import Button from './Button';

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
      <div className="edit-song">
        <input
          style={{ width: '300px'}}
          value={this.state.songName}
          onChange={this.changeSongName.bind(this)}
          ref={(input) => { this.songNameInput = input; }}
        />
        <input
          style={{display: 'block', width: '300px'}}
          value={this.state.tags}
          onChange={this.changeTags.bind(this)}
        />
        <button onClick={() => setToEdit(null)}>cancel</button>
        <button onClick={() => update(song.id, this.state)}>update</button>
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

  // <button onClick={() => deleteSong(song.id)}>{buttonText}</button>

const Song = props => {
  return (
    <li style={{padding: '10px'}} className="slideInLeft animated song">
      {props.songBeingEdited === props.song.id ?
        <EditSong {...props} /> :
        <ShowSong {...props} />
      }
    </li>
  )
}

export default Song;
