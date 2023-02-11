import { classNames, select, templates } from '../settings.js';
import SongPlayer from './SongPlayer.js';
import utils from '../utils.js';

class Search {
  constructor(songList) {
    const thisSearch = this;

    thisSearch.songList = songList;
    thisSearch.getElements();
    thisSearch.renderInMenu();
    thisSearch.initSongs();
    thisSearch.searchSong();
  }

  getElements() {
    const thisSearch = this;

    thisSearch.dom = {
      songsContainer: document.querySelector(select.containerOf.songs),
      searchContainer: document.querySelector(select.containerOf.search),
    };

    thisSearch.songs = thisSearch.dom.songsContainer.getElementsByTagName(select.all.article);
  }

  renderInMenu() {
    const thisSearch = this;

    const generatedHTML = templates.search();
    thisSearch.element = utils.createDOMFromHTML(generatedHTML);
    thisSearch.dom.searchContainer.appendChild(thisSearch.element);
  }

  initSongs() {
    const thisSearch = this;

    for (let song in thisSearch.songList){
      new SongPlayer (thisSearch.songList[song], thisSearch.dom.songsContainer);
    }

    for ( let song of thisSearch.songs ) {
      song.classList.add(classNames.hidden);
    }
  }

  searchSong() {
    const thisSearch = this;

    const input = document.getElementById('myInput');

    input.addEventListener('keyup', function(){
      const searchValue = input.value.toLowerCase();

      for (let song of thisSearch.songs){
        const authorAndTitle = song.getAttribute('author-title').toLowerCase();
        song.classList.add(classNames.hidden);

        if (Boolean(searchValue) && authorAndTitle.includes(searchValue)) {
          song.classList.remove(classNames.hidden);
        }
      }
    });
  }
}

export default Search;
