import { classNames, select, templates } from '../settings.js';
import SongPlayer from './SongPlayer.js';
import utils from '../utils.js';

class Discover {
  constructor(songList, mostRecentCategory) {
    const thisDiscover = this;

    thisDiscover.songList = songList;
    thisDiscover.mostRecentCategory = mostRecentCategory;
    console.log('thisDiscover.mostRecentCategory:', thisDiscover.mostRecentCategory);
    thisDiscover.getElements();
    thisDiscover.renderInMenu();
    thisDiscover.initSongs();
    thisDiscover.randomSong();
  }

  getElements() {
    const thisDiscover = this;

    thisDiscover.dom = {
      discoverContainer: document.querySelector(select.containerOf.discover),
    };

    thisDiscover.songs = thisDiscover.dom.discoverContainer.getElementsByTagName(select.all.article);
  }

  renderInMenu() {
    const thisDiscover = this;

    const generatedHTML = templates.discover();
    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);
    thisDiscover.dom.discoverContainer.appendChild(thisDiscover.element);
  }

  initSongs() {
    const thisDiscover = this;

    for (let song in thisDiscover.songList){
      new SongPlayer (thisDiscover.songList[song], thisDiscover.dom.discoverContainer);
    }

    const songListId = [];

    for (let song of thisDiscover.songs) {
      const songId = song.getAttribute('song-id');
      songListId.push(songId);
      song.classList.add(classNames.discover.hidden);
    }

    thisDiscover.randomSongId = songListId[Math.floor(Math.random() * songListId.length)];
  }

  randomSong() {
    const thisDiscover = this;

    for (let song of thisDiscover.songs) {
      const songId = song.getAttribute('song-id');
      if ( songId === thisDiscover.randomSongId) {
        song.classList.remove(classNames.discover.hidden);
      }
    }

  }
}

export default Discover;
