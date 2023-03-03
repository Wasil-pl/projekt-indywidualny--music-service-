import { CATEGORIES_SEPARATOR, classNames, iD, select, templates } from '../settings.js';
import SongPlayer from './SongPlayer.js';
import utils from '../utils.js';

const formatSongExtension = function(numberOfSongs) {
  if (numberOfSongs === 1) return '';
  if (numberOfSongs >= 3) return 's to check out!';
  return 's';
};

class Search {
  constructor(songList, categoriesArray) {
    const thisSearch = this;

    thisSearch.songList = songList;
    thisSearch.categoriesArray = categoriesArray;

    thisSearch.getElements();
    thisSearch.render();
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

  render() {
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

    const searchBtn = thisSearch.dom.searchContainer.querySelector(select.all.searchBtn);
    const inputValue = document.getElementById(iD.search.myInput);
    const selectCategory = document.getElementById(iD.search.myCategories);
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
        } else if (songCategories.includes(selectedCategoryValue)) {
          song.classList.remove(classNames.hidden);
          numberOfSongsArray.push(song);
        }
      }

      const numberOfSongs = numberOfSongsArray.length;
      const songsFoundHtml = `<p>We have found ${numberOfSongs} song${formatSongExtension(numberOfSongs)}</p>`;
      txtFoundSongs.innerHTML = songsFoundHtml;
    });
  }
}

export default Search;
