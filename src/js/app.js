import { select, settings, classNames } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';

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
    const url = settings.db.url + '/' + settings.db.songs;

    return fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
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

  initSearch() {
    const thisApp = this;
    new Search(thisApp.data.songs);
  },

  init: function() {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initData().then(function () {
      thisApp.initHome();
      thisApp.initSearch();
      thisApp.initGreenAudioPlayer();
    });
  }
};

app.init();
