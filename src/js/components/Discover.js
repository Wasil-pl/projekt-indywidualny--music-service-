import { CATEGORIES_SEPARATOR, classNames, select, templates } from '../settings.js';
import SongPlayer from './SongPlayer.js';
import utils from '../utils.js';
import Footer from './Footer.js';

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
    thisDiscover.initFooter();
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

    for (let song of thisDiscover.songs) {
      song.classList.add(classNames.hidden);
    }

  }

  getTwohighestObject() {
    const thisDiscover = this;

    thisDiscover.top2Categories = Object
      .entries(thisDiscover.mostPopularMusic)
      .sort(({ 1: a }, { 1: b }) => b - a)
      .slice(0, 2)
      .map(([label]) => ([label]))
      .flat();

    thisDiscover.filteredSong = [];

    for (let song of thisDiscover.songs) {
      const songCategories = song.querySelector(select.containerOf.songCategories).innerHTML.toLowerCase().split(CATEGORIES_SEPARATOR);

      if ( songCategories.some(el => thisDiscover.top2Categories.includes(el))) {
        thisDiscover.filteredSong.push(song);
      }
    }
  }

  randomSong() {
    const thisDiscover = this;

    const randomSong = thisDiscover.songs[Math.floor(Math.random() * thisDiscover.songs.length)];
    const randomFilteredSong = thisDiscover.filteredSong[Math.floor(Math.random() * thisDiscover.filteredSong.length)];

    for (let song of thisDiscover.songs) {
      song.classList.add(classNames.hidden);

      if ( !thisDiscover.top2Categories.length ) {
        randomSong.classList.remove(classNames.hidden);
      }

      else if ( thisDiscover.filteredSong.length ) {
        randomFilteredSong.classList.remove(classNames.hidden);
      }
    }
  }

  initFooter() {
    const thisDiscover = this;

    new Footer (thisDiscover.dom.discoverContainer);
  }
}

export default Discover;
