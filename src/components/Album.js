import React, {
  Component
} from 'react';

import albumData from './../data/album';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovered: true,
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = 0.5;
  }


  play() {
    this.audioElement.play();
    this.setState({
      isPlaying: true
    });
  }

  pause() {
    this.audioElement.pause();
    this.setState({
      isPlaying: false
    })
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({
          currentTime: this.audioElement.currentTime
        })
      },
      durationchange: e => {
        this.setState({
          duration: this.audioElement.duration
        });
      },
      volume: e => {
        this.setState({
          volume: this.audioElement.volume
        });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volume', this.eventListeners.volume);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volume', this.eventListeners.volume);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({
      currentSong: song
    })
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
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
    this.setState({
      currentTime: newTime
    });
  }

  formatTime(totalSeconds) {
    var mins = Math.floor((totalSeconds % 3600) / 60);
    var secs = Math.floor(totalSeconds % 60);
    var format = "";

    if (mins < 10) {
      format += mins < 10 ? "" : "";
    }

    format += mins + ":" + (secs < 10 ? "0" : "");
    format += "" + secs;
    return format;
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({
      volume: newVolume
    });
  }


  render() {

    const {
      album,
      currentSong,
      isPlaying,
      isHovered,
      currentTime,
      duration,
      volume
    } = this.state;

    return (
      <section className = "album">

      <section id = "album-info" >

      <img id = "album-cover-art"
      src = {
        album.albumCover
      }
      alt = {
        album.title
      }
      /> <
      div className = "album-details" >
      <
      h1 id = "album-title" > {
        album.title
      } < /h1> <
      h2 className = "artist" > {
        album.artist
      } < /h2> <
      div id = "release-info" > {
        album.releaseInfo
      } < /div> <
      /div> <
      /section>

      <
      table id = "song-list" >
      <
      colgroup >
      <
      col id = "song-number-column" / >
      <
      col id = "song-title-column" / >
      <
      col id = "song-duration-column" / >
      <
      /colgroup>

      <
      tbody > {
        album.songs.map((song, index) => ( <
          tr className = "song"
          key = {
            index
          }
          onClick = {
            () => this.handleSongClick(song)
          }
          onMouseEnter = {
            () => this.setState({
              isHovered: index + 1
            })
          }
          onMouseLeave = {
            () => this.setState({
              isHovered: false
            })
          } >
          <
          td className = "song-actions" > {
            isPlaying ? (

              <
              span > {
                currentSong.title === song.title ? ( <
                  span className = "icon ion-md-pause" / >
                ) : ( <
                  span > {
                    index + 1
                  } < /span>
                )
              } <
              /span>

            ) : isHovered === index + 1 ? ( <
              span className = "icon ion-md-play" / >
            ) : ( <
              span className = "song-number" > {
                index + 1
              } < /span>
            )
          } <
          /td>

          <
          td className = "song-title" > {
            song.title
          } < /td> <
          td className = "song-duration" > {
            this.formatTime(song.duration)
          } <
          /td> <
          /tr>
        ))
      } <
      /tbody> <
      /table> <
      PlayerBar isPlaying = {
        this.state.isPlaying
      }
      currentSong = {
        this.state.songCurrent
      }
      currentTime = {
        this.audioElement.currentTime
      }
      duration = {
        this.audioElement.duration
      }
      currentVolume = {
        this.currentVolume
      }
      handleSongClick = {
        () => this.handleSongClick(this.state.currentSong)
      }
      handlePrevClick = {
        () => this.handlePrevClick(this.state.currentSong)
      }
      handleNextClick = {
        () => this.handleNextClick(this.state.currentSong)
      }
      handleTimeChange = {
        (e) => this.handleTimeChange(e)
      }
      handleVolumeChange = {
        (e) => this.handleVolumeChange(e)
      }
      formatTime = {
        (totalSeconds) => this.formatTime(totalSeconds)
      }
      />

      <
      /section>
    );
  }
}

export default Album;
