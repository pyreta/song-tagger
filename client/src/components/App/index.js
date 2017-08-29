import React, { Component } from 'react';
import axios from 'axios';
import exportToCsv from '../../helpers/exportToCsv';
import SongList from '../SongList';
import SongForm from '../SongForm';
import Search from '../Search';
import PageCounter from '../PageCounter';
import ExportList from '../ExportList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      songs: {},
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
        songs: JSON.parse(r.data.songs).reduce((accum, song) => ({...accum, [song.id]: song}), {}),
        lastLoadedPage: parseInt(r.data.page, 10),
        pageSize: parseInt(r.data.page_size, 10),
        totalRecords: r.data.total_songs
      }));
  }

  deleteSong(id) {
    axios
      .delete(`/songs/${id}`, { song: { id } })
      .then(r => this.setState({
        songs: Object.values(this.state.songs).reduce((accum, song) =>
          song.id === id ? accum : {...accum, [song.id]: song}, {}
        ),
        totalRecords: this.state.totalRecords - 1,

      }));
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
        response ? this.setState({
          songs: {...this.state.songs, [response.id]: response },
          totalRecords: this.state.totalRecords + 1
        }) : alert(errors.join(' '));
      })
      .catch(error => alert(`Server error: ${error.message}`));
  }

  updateSong(id, { songName, tags }) {
    this.setState({ songBeingEdited: null });
    axios
      .patch(`/songs/${id}`, { song: { name: songName, tags } })
      .then(r => this.setState({ songs: {...this.state.songs, [id]: r.data.response} }))
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
    const newSong = this.state.songs[song];
    this.setState({
      songsToExport: {
        ...this.state.songsToExport,
        [newSong.id]: newSong
      }
    });
  }

  songsToExport() {
    return Object.values(this.state.songsToExport)
  }

  updateSongTitle(val) {
    this.setState({ songName: val });
  }

  updateTags(val) {
    this.setState({ tags: val });
  }

  onSearchType(search) {
    this.setState({ page: 1, search });
    if (search === '') this.getSongs({})
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
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <SongForm
          updateSongTitle={this.updateSongTitle.bind(this)}
          updateTags={this.updateTags.bind(this)}
          postSong={this.postSong.bind(this)}
        />
      <Search onSearchType={this.onSearchType.bind(this)} onSearchClick={this.onSearchClick.bind(this)} />
        <br />

      <div style={{display: 'flex', flex: '100%'}}>
        <div className="song-list-container list-container">
          <SongList songs={Object.values(this.state.songs)} songProps={this.songProps()} />
        </div>
          <div className="export-list-container list-container">
            <ExportList
              songs={this.songsToExport()}
              onDrop={this.onDrop.bind(this)}
              removeSong={this.removeSong.bind(this)}
              />
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{color: 'rgb(97, 174, 238)'}}>
            <PageCounter
              page={this.state.page}
              onPageUp={this.onPageUp.bind(this)}
              onPageDown={this.onPageDown.bind(this)}
              totalPages={totalPages}
              />
          </div>
          <div>
            {!!this.songsToExport().length && <button onClick={this.exportCsv.bind(this)} disabled={!this.songsToExport().length}>Export CSV</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
