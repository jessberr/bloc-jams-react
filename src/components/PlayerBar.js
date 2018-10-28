import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">

        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span className="icon ion-md-rewind"></span>
          </button>

          <button id="play-pause" onClick={this.props.handleSongClick} >
             <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}> </span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span className="icon ion-md-fastforward"></span>
          </button>
        </section>

      <section id="time-control">
          <div className="current-time">{this.props.currentTime}</div>
          <input
            type="range"
            className="seek-bar"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="total-time">{this.props.duration}</div>
        </section>

        <section id="volume-control">

          <div className="current-volume">{this.props.handleVolumeChange}</div>
            <div className="icon ion-md-volume-high">
              <input
                type="range"
                className="seek-bar"
                value={this.props.currentVolume}
                max="1"
                min="0"
                step=".01"
                onChange={this.props.handleVolumeChange}
              />
            </div>
        </section>
      </section>


    );
  }
}

export default PlayerBar;
