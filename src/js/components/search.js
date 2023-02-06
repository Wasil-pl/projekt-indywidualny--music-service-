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
    // TODO: init song filtering on input change
  }

  getElements() {
    const thisSearch = this;

    thisSearch.dom = {
      songsContainer: document.querySelector(select.containerOf.songs),
      searchContainer: document.querySelector(select.containerOf.search),
    };

    thisSearch.songs = thisSearch.dom.songsContainer.getElementsByTagName('article');
    thisSearch.dom.songsContainer;

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
      new SongPlayer (thisSearch.songList[song].id, thisSearch.songList[song], thisSearch.dom.songsContainer);
    }

    for ( let song of thisSearch.songs ) {
      song.classList.add(classNames.search.hidden);
    }
  }

  searchSong() {
    const thisSearch = this;

    const input = document.getElementById('myInput');
    const songList = thisSearch.dom.songsContainer.getElementsByTagName('article');

    input.addEventListener('keyup', function(){
      let search = input.value.toLowerCase();

      for (let song of songList){
        let AuthorAndTitle = song.getAttribute('author-title').toLowerCase();

        if (AuthorAndTitle.indexOf(search) == -1) {
          song.classList.add(classNames.search.hidden);

        } else if (AuthorAndTitle.indexOf(search) != -1) {
          song.classList.remove(classNames.search.hidden);
        }

        if ( input.value == '') {
          song.classList.add(classNames.search.hidden);
        }
      }
    });
  }
}

export default Search;
