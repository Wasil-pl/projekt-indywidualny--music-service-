import { select } from '../settings.js';
import Subscribe from './Subscribe.js';
import SongPlayer from './SongPlayer.js';

class Home {
  constructor(songList) {
    const thisHome = this;

    thisHome.songList = songList;
    thisHome.render();
    thisHome.initSongs();
    thisHome.initSubscribe();
  }

  render() {
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
}

export default Home;
