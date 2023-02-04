import { settings } from './settings.js';

const app = {

  initSongs() {
    const thisApp = this;

    for (let song in thisApp.data.songs){
      thisApp.data.songs[song].id, thisApp.data.songs[song];
      console.log('thisApp.data.songs[song]:', thisApp.data.songs[song]);
      console.log('thisApp.data.songs[song].id:', thisApp.data.songs[song].id);
    }
  },

  initData: function() {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })

      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
        thisApp.initSongs();
      });
    console.log('thisApp.data:', thisApp.data);
  },

  init: function() {
    const thisApp = this;

    thisApp.initData();
  }
};

app.init();
