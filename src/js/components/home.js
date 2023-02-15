import { select } from '../settings.js';
import Subscribe from './Subscribe.js';
import SongPlayer from './SongPlayer.js';
import Footer from './Footer.js';

class Home {
  constructor(songList) {
    const thisHome = this;

    thisHome.songList = songList;
    thisHome.renderInMenu();
    thisHome.initSongs();
    thisHome.initSubscribe();
    thisHome.initFooter();
  }

  renderInMenu() {
    const thisHome = this;
    thisHome.songsContainer = document.querySelector(select.containerOf.home);
  }

  initSongs() {
    const thisHome = this;

    for (let song in thisHome.songList){
      new SongPlayer (thisHome.songList[song], thisHome.songsContainer);
    }
  }

  initSubscribe() {
    new Subscribe();
  }

  initFooter() {
    const thisHome = this;

    new Footer(thisHome.songsContainer);
  }
}

export default Home;
