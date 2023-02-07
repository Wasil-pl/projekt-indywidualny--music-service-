export const select = {
  templateOf: {
    menuSongs: '#template-menu-songs',
    subscribe: '#template-subscribe',
    search: '#template-search',
    discover: '#template-discover',
  },
  containerOf: {
    home: '#home-wrapper',
    pages: '#pages',
    search: '#search-list',
    songs: '#songs-list',
    discover: '#discover-wrapper',
  },
  all: {
    player: '.player',
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
  search: {
    hidden: 'hidden',
  },
  discover: {
    hidden: 'hidden',
  }
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
};
