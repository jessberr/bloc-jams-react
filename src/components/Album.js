import React, { Component } from 'react';

import albumData from './../data/album';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor (props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovered: true,
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }


  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false })
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime })
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeupdate: e => {
        this.setState({ currentVolume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  componentWillUnmount() {
    this.audioElement.src=null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song })
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(4, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
    }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = (currentIndex + 1) >= 5 ? 0 : currentIndex + 1;
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
    }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime() {

  }

  handleVolumeChange(e) {
    const newVolume = this.audioElement.currentVolume;
    this.audioElement.currentVolume =newVolume;
    this.setState({ currentVolume: newVolume });
  }


  render() {
    return (
      <section className="album">
        <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>

        <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>

           <tbody>
             {this.state.album.songs.map((song, index) => (
               <tr
                 className="song"
                 key={index}
                 onClick={() => this.handleSongClick (song)}
                 onMouseEnter={() => this.setState({ isHovered: index + 1 })}
                 onMouseLeave={() => this.setState({ isHovered: false })}
               >
                 <td className="song-actions">
                   {this.state.isPlaying ? (
                     <span>
                       {this.state.currentSong.title === song.title ? (
                         <span className="icon ion-md-pause"/>
                       ) : (
                         <span>{index +1}</span>
                       )}
                     </span>
                   ) : this.state.isHovered === index + 1 ? (
                     <span className="icon ion-md-play"/>
                   ) : (
                     <span className="song-number">{index + 1}</span>
                   )}
                 </td>
                 <td className="song-title">{song.title}</td>
                 <td className="song-duration">
                   {song.duration}
                 </td>
                </tr>
             ) ) }
           </tbody>
       </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.songCurrent}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.audioElement.currentVolume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick(this.state.currentSong)}
          handleNextClick={() => this.handleNextClick(this.state.currentSong)}
          handleTimeChange={(e) => this.handleTimeChange(e)}
        />


      </section>
    );
  }
}

export default Album;
