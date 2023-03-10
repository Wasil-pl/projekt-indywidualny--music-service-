import { CATEGORIES_SEPARATOR, classNames, select, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
import CategoryWidget from './components/CategoryWidget.js';

const app = {

  mostPopularMusic: {},

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;
    for( let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        if (id === 'discover'){
          thisApp.discover.onPageActive();
        }

        thisApp.activatePage(id);


        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId) {
    const thisApp = this;

    /* add class active to matching pages, remove from non-matching */
    for(let page of thisApp.pages){
      page.classList.toggle(
        classNames.active,
        page.id == pageId
      );
    }
    /* add class active to matching links, remove from non-matching */
    for(let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initData: function() {
    const thisApp = this;

    thisApp.data = {};
    thisApp.categoriesArray = {categories: []};


    const url = settings.db.url + '/' + settings.db.songs;

    return fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
        for ( let song of thisApp.data.songs) {
          for ( let category of song.categories) {
            if (!thisApp.categoriesArray.categories.includes(category)) {
              thisApp.categoriesArray.categories.push(category);
            }
          }
        }
      });
  },

  initGreenAudioPlayer: function(){
    GreenAudioPlayer.init({
      selector:  select.all.player, // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  },

  initHome() {
    const thisApp = this;
    new Home(thisApp.data.songs);
  },

  initCategoryWidget(){
    const thisApp = this;

    new CategoryWidget(thisApp.categoriesArray);
  },

  initSearch() {
    const thisApp = this;
    new Search(thisApp.data.songs, thisApp.categoriesArray);
  },

  initDiscover() {
    const thisApp = this;

    thisApp.discover = new Discover(thisApp.data.songs, thisApp.mostPopularMusic);
  },

  getCategories() {
    const thisApp = this;

    const home = document.getElementById('home');
    const songs = home.getElementsByClassName('song');

    for ( let song of songs ) {
      const playPauseBtn = song.querySelector(select.all.playPauseBtn);
      playPauseBtn.addEventListener('click', function(){
        const categoriesArray = song.querySelector(select.containerOf.songCategories).innerHTML.toLowerCase().split(CATEGORIES_SEPARATOR);
        for (let categories of categoriesArray) {
          if (!thisApp.mostPopularMusic[categories]) {
            thisApp.mostPopularMusic[categories] = 1;
          } else {
            thisApp.mostPopularMusic[categories]++;
          }
        }
      });
    }
  },

  init: function() {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initData().then(function () {
      thisApp.initHome();
      thisApp.initSearch();
      thisApp.initDiscover();
      thisApp.initGreenAudioPlayer();
      thisApp.initCategoryWidget();
      thisApp.getCategories();
    });
  }
};

app.init();
