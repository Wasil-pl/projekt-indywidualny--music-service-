import { CATEGORIES_SEPARATOR, classNames, select, templates } from '../settings.js';
import SongPlayer from './SongPlayer.js';
import utils from '../utils.js';

class Search {
  constructor(songList, categoriesArray) {
    const thisSearch = this;

    thisSearch.songList = songList;
    thisSearch.categoriesArray = categoriesArray;

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

    const generatedHTML = templates.search(thisSearch.categoriesArray);
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

    const searchBtn = document.querySelector(select.all.searchBtn);
    const inputValue = document.getElementById('myInput');
    const selectCategory = document.getElementById('myCategories');
    const txtFoundSongs = document.querySelector(select.containerOf.numberOfSongsTxt);

    searchBtn.addEventListener('click', function(e){
      e.preventDefault();
      const searchValue = inputValue.value.toLowerCase();
      const selectedCategoryValue = selectCategory.value.toLowerCase();
      const numberOfSongsArray = [];

      for (let song of thisSearch.songs){
        const authorAndTitle = song.getAttribute('author-title').toLowerCase();
        const songCategories = song.querySelector(select.containerOf.songCategories).innerHTML.toLowerCase().split(CATEGORIES_SEPARATOR);

        song.classList.add(classNames.hidden);

        if (!selectedCategoryValue && Boolean(searchValue) && authorAndTitle.includes(searchValue)) {
          song.classList.remove(classNames.hidden);
          numberOfSongsArray.push(song);

        } else if (Boolean(searchValue) && authorAndTitle.includes(searchValue) && songCategories.includes(selectedCategoryValue)) {
          song.classList.remove(classNames.hidden);
          numberOfSongsArray.push(song);
        }
      }

      txtFoundSongs.innerHTML = '';

      if (numberOfSongsArray.length === 1) {
        const songsFoundHtml = '<h4>We have found ' + numberOfSongsArray.length + ' song</h4>';
        txtFoundSongs.insertAdjacentHTML('beforeend', songsFoundHtml);
      }

      else {
        const songsFoundHtml = '<h4>We have found ' + numberOfSongsArray.length + ' songs</h4>';
        txtFoundSongs.insertAdjacentHTML('beforeend', songsFoundHtml);
      }
    });
  }
}

export default Search;
