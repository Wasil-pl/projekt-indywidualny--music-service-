export const select = {
  templateOf: {
    menuSongs: '#template-menu-songs',
    subscribe: '#template-subscribe',
  },
  containerOf: {
    menu: '#home-wrapper',
    pages: '#pages',
  },
  all: {
    player: '.player',
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
};
