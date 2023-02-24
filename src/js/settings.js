export const select = {
  templateOf: {
    menuSongs: '#template-menu-songs',
    subscribe: '#template-subscribe',
    search: '#template-search',
    discover: '#template-discover',
    categoryWidget: '#template-category-widget',
  },
  containerOf: {
    home: '#home-wrapper',
    pages: '#pages',
    search: '#search-list',
    songs: '#songs-list',
    homeSongs: '.home-wrapper .song',
    songCategories: '.categories',
    discover: '#discover-wrapper',
    categoryWidget: '#category-widget',
    categoryList: '.categories-list',
    numberOfSongsTxt: '.txt-number-of-songs'

  },
  all: {
    player: '.player',
    playPauseBtn: '.play-pause-btn',
    article: 'article',
    searchBtn: '.search-btn',
  },
  nav: {
    links: '.main-nav a',
  },
};

export const classNames = {
  active: 'active',

  hidden: 'hidden',
};

export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  },
};

export const templates = {
  menuSongs: Handlebars.compile(document.querySelector(select.templateOf.menuSongs).innerHTML),
  subscribe: Handlebars.compile(document.querySelector(select.templateOf.subscribe).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  categoryWidget: Handlebars.compile(document.querySelector(select.templateOf.categoryWidget).innerHTML),
};

export const CATEGORIES_SEPARATOR = ',';
