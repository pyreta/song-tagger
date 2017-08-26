import React from 'react';

export class SongForm extends React.Component {

  clearFields() {
    this.songNameInput.value = '';
    this.tagInput.value = '';
  }

  addSong() {
    this.clearFields();
    this.props.postSong();
  }

  render() {
    return <div>
      <input
        placeholder="Who Let the Dogs Out"
        onChange={e=>this.props.updateSongTitle(e.target.value)}
        ref={(input) => { this.songNameInput = input; }}
      />
      <input
        placeholder="worst, song, ever"
        onChange={e=>this.props.updateTags(e.target.value)}
        ref={(input) => { this.tagInput = input; }}
      />
      <button onClick={this.addSong.bind(this)}>Add song</button>
    </div>
  }
}

export default SongForm
