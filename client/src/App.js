import React, { Component } from 'react';
import axios from 'axios';
import exportToCsv from './helpers/exportToCsv';
import SongList from './SongList';
import SongForm from './SongForm';
import Search from './Search';
import PageCounter from './PageCounter';
import Button from './Button';
import ExportList from './ExportList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      songsToExport: {},
      moreSongs: true,
      songName: '',
      search: '',
      tags: '',
      page: 1,
      pageSize: 1,
      totalRecords: 1,
    };
  }
  componentWillMount() {
    this.getSongs({});
  }

  getSongs({ search = '', page = 1 }) {
    axios
      .get(`/songs?page=${page}&search=${search}`)
      .then(r => this.setState({
        songs: JSON.parse(r.data.songs),
        lastLoadedPage: parseInt(r.data.page, 10),
        pageSize: parseInt(r.data.page_size, 10),
        totalRecords: r.data.total_songs
      }));
  }

  deleteSong(id) {
    axios
      .delete(`/songs/${id}`, { song: { id } })
      .then(r => this.setState({ songs: r.data }));
  }

  songProps() {
    return {
      deleteSong: this.deleteSong.bind(this),
      type: 'song',
      setToEdit: this.setToEdit.bind(this),
      update: this.updateSong.bind(this),
      songBeingEdited: this.state.songBeingEdited
    };
  }

  setToEdit(id) {
    this.setState({ songBeingEdited: id })
  }

  postSong() {
    const { songName, tags } = this.state;
    axios
      .post('/songs', { song: { name: songName, tags } })
      .then(r => {
        const { response, errors } = r.data;
        response ? this.getSongs({}) : alert(errors.join(' '));
      })
      .catch(error => alert(`Server error: ${error.message}`));
  }

  updateSong(id, { songName, tags }) {
    this.setState({ songBeingEdited: null });
    axios
      .patch(`/songs/${id}`, { song: { name: songName, tags } })
      .then(r => this.setState({ songs: r.data }))
      .catch(error => alert(`Server error: ${error.message}`));
  }

  formatSongsForExport() {
    return this
      .songsToExport()
      .map((song, idx) => [song.name, song.tags.map(obj => obj.name).join(',')]);
  }

  exportCsv() {
    exportToCsv('songs-and-tags.csv', [['song', 'tags'], ...this.formatSongsForExport()]);
  }

  removeIdFromExports(id) {
    return Object.keys(this.state.songsToExport)
      .reduce(
        (accum, songId) =>
          songId === id.toString()
            ? accum
            : { ...accum, [songId]: this.state.songsToExport[songId] },
        {}
      );
  }

  removeSong(id) {
    this.setState({
      songsToExport: this.removeIdFromExports(id)
    });
  }

  onDrop({ song }) {
    const songIdx = this.state.songs.map(s => s.id).indexOf(parseInt(song, 10));
    const newSong = this.state.songs[songIdx];
    this.setState({
      songsToExport: {
        ...this.state.songsToExport,
        [newSong.id]: newSong
      }
    });
  }

  songsToExport() {
    return Object.values(this.state.songsToExport)
    // return Object.keys(this.state.songsToExport)
    //   .reduce((accum, id) => [...accum, this.state.songsToExport[id]], []);
  }

  updateSongTitle(val) {
    this.setState({ songName: val });
  }

  updateTags(val) {
    this.setState({ tags: val });
  }

  onSearchType(search) {
    this.setState({ page: 1, search });
  }

  onSearchClick() {
    this.getSongs({ page: 1, search: this.state.search });
  }

  onPageDown() {
    const page = this.state.page === 1 ? 1 : this.state.page - 1;
    this.setState({ page });
    this.getSongs({ page, search: this.state.search });
  }

  nextPage() {
    return this.state.moreSongs ?
      this.state.page + 1 :
      this.state.page;
  }

  onPageUp() {
    if (this.state.totalRecords > this.state.page * this.state.pageSize) {
      this.setState({ page: this.nextPage() });
      this.getSongs({ page: this.nextPage(), search: this.state.search });
    }
  }

  render() {
    const pageDiv = Math.floor(this.state.totalRecords / this.state.pageSize);
    const totalPages = this.state.totalRecords % this.state.pageSize <= 0 ?
      pageDiv :
      pageDiv + 1
    return (
      <div>
        <SongForm
          updateSongTitle={this.updateSongTitle.bind(this)}
          updateTags={this.updateTags.bind(this)}
          postSong={this.postSong.bind(this)}
        />
      <Search onSearchType={this.onSearchType.bind(this)} onSearchClick={this.onSearchClick.bind(this)} />
        <br />

      <div style={{display: 'flex'}}>
        <div style={{background: 'rgb(33, 37, 43)', color: 'rgb(152, 194, 121)', height: 'calc(100vh - 170px)', overflow: 'auto', flex: '100%', margin: '10px', border: '1px solid black'}}>
          <SongList songs={this.state.songs} songProps={this.songProps()} />
        </div>
          <div style={{background: 'rgb(33, 37, 43)', color: 'rgb(208, 154, 102)', height: 'calc(100vh - 170px)', overflow: 'auto', flex: '100%', margin: '10px', marginLeft: '0', border: '1px solid black'}}>
            <ExportList
              songs={this.songsToExport()}
              onDrop={this.onDrop.bind(this)}
              removeSong={this.removeSong.bind(this)}
              />
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{flex: '100%', paddingLeft: '10px', color: 'rgb(97, 174, 238)'}}>
            <PageCounter
              page={this.state.page}
              onPageUp={this.onPageUp.bind(this)}
              onPageDown={this.onPageDown.bind(this)}
              totalPages={totalPages}
              />
          </div>
          <div style={{flex: '100%'}}>
            <Button onButtonClick={this.exportCsv.bind(this)} disabled={!this.songsToExport().length} text="export"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
