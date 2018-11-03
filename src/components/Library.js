import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import albumData from './../data/album';
import './Library.css';


class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: albumData
    };
  }

  render() {
    return ( <
      section className = "library" >
      <div className = "row" >
      {this.state.albums.map((album, index) =>
          <div className = "col-sm-4" >
        <Link to = {`/album/${album.slug}`}
            key = {
            index} >
          <img className = "img img-responsive"
          src = {album.albumCover}
          alt = { album.title } /> <
          div > {album.title} < /div>
          <div > {album.artist} < /div> <
          div > { album.songs.length} songs < /div>
        </Link> <
          /div>
        )
      } <
      /div> <
      /section>
    );
  }
}

export default Library;
