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
    discover: '#discover-wrapper',
    categoryWidget: '#category-widget',
    categoryList: '.categories-list',
  },
  all: {
    player: '.player',
    playPauseBtn: '#home .holder',
    article: 'article',
  },
  nav: {
    links: '.main-nav a',
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
  active: 'active',
  search: {
    hidden: 'hidden',
  },
  discover: {
    hidden: 'hidden',
  },
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
