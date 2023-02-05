import { select, settings, classNames } from './settings.js';
import SongsPlayer from './components/home.js';
import Subscribe from './components/subscribe.js';
import Search from './components/search.js';

const app = {

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
        classNames.pages.active,
        page.id == pageId
      );
    }
    /* add class active to matching links, remove from non-matching */
    for(let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initData: function() {
    const thisApp = this;

    thisApp.data = {};
    console.log('thisApp.data:', thisApp.data);

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })

      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
        thisApp.initSongs();
        thisApp.initGreenAudioPlayer();
      });
  },

  initSongs() {
    const thisApp = this;

    for (let song in thisApp.data.songs){
      new SongsPlayer (thisApp.data.songs[song].id, thisApp.data.songs[song]);
    }

    new Subscribe();

  },

  initGreenAudioPlayer: function(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  },

  initSearch() {
    const thisApp = this;

    new Search(thisApp.data, thisApp.songHTML);
  },

  init: function() {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initData();
    thisApp.initSearch();

  }
};

app.init();
