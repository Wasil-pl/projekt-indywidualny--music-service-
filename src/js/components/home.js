import { select } from '../settings.js';
import Subscribe from './Subscribe.js';
import SongPlayer from './SongPlayer.js';

class Home {
  constructor(songList) {
    const thisHome = this;

    thisHome.songList = songList;
    thisHome.renderInMenu();
    thisHome.initSongs();
    thisHome.initSubscribe();
  }

  renderInMenu() {
    const thisHome = this;
    thisHome.songsContainer = document.querySelector(select.containerOf.home);
  }

  initSongs() {
    const thisSearch = this;

    for (let song in thisSearch.songList){
      new SongPlayer (thisSearch.songList[song].id, thisSearch.songList[song], thisSearch.songsContainer);
    }
  }

  initSubscribe() {
    new Subscribe();
  }
}

export default Home;
