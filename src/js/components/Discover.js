import { classNames, select, templates } from '../settings.js';
import SongPlayer from './SongPlayer.js';
import utils from '../utils.js';

class Discover {
  constructor(songList, mostPopularMusic) {
    const thisDiscover = this;

    thisDiscover.songList = songList;
    thisDiscover.mostPopularMusic = mostPopularMusic;

    thisDiscover.getElements();
    thisDiscover.renderInMenu();
    thisDiscover.initSongs();
    thisDiscover.getTwohighestObject();
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
      song.classList.add(classNames.hidden);
    }

    thisDiscover.randomSongId = songListId[Math.floor(Math.random() * songListId.length)];
  }

  getTwohighestObject() {
    const thisDiscover = this;

    const top2Categories = Object
      .entries(thisDiscover.mostPopularMusic)
      .sort(({ 1: a }, { 1: b }) => b - a)
      .slice(0, 2)
      .map(([label, value]) => ({ label, value }));

    console.log('top2:', top2Categories);
  }

  randomSong() {
    const thisDiscover = this;

    for (let song of thisDiscover.songs) {
      const songId = song.getAttribute('song-id');
      if ( songId === thisDiscover.randomSongId) {
        song.classList.remove(classNames.hidden);
      }
    }
  }
}

export default Discover;
