import { CATEGORIES_SEPARATOR, classNames, select, templates } from '../settings.js';
import SongPlayer from './SongPlayer.js';
import utils from '../utils.js';

class Discover {
  constructor(songList, mostPopularMusic) {
    const thisDiscover = this;

    thisDiscover.songList = songList;
    thisDiscover.mostPopularMusic = mostPopularMusic;
    console.log('mostPopularMusic:', mostPopularMusic);

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

    thisDiscover.songListId = [];

    for (let song in thisDiscover.songList){
      new SongPlayer (thisDiscover.songList[song], thisDiscover.dom.discoverContainer);
    }

    for (let song of thisDiscover.songs) {
      song.classList.add(classNames.hidden);
      const songId = song.getAttribute('song-id');
      thisDiscover.songListId.push(songId);
    }

    thisDiscover.randomSong();
  }

  getTwohighestObject() {
    const thisDiscover = this;

    thisDiscover.top2Categories = Object
      .entries(thisDiscover.mostPopularMusic)
      .sort(({ 1: a }, { 1: b }) => b - a)
      .slice(0, 2)
      .map(([label]) => ([label]))
      .flat();
  }

  randomSong() {
    const thisDiscover = this;

    const randomSongId = thisDiscover.songListId[Math.floor(Math.random() * thisDiscover.songListId.length)];

    for (let song of thisDiscover.songs) {
      const songId = song.getAttribute('song-id');
      const songCategories = song.querySelector(select.containerOf.songCategories).innerHTML.toLowerCase().split(CATEGORIES_SEPARATOR);

      song.classList.add(classNames.hidden);

      if ( Boolean(thisDiscover.top2Categories) && songId.includes(randomSongId)) {
        song.classList.remove(classNames.hidden);
      }

      if ( thisDiscover.top2Categories && songCategories.some(el => thisDiscover.top2Categories.includes(el)) && songId.includes(randomSongId)) {
        song.classList.remove(classNames.hidden);
      }
    }
  }
}

export default Discover;
