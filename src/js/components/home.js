import { select, templates } from '../settings.js';
import utils from '../utils.js';

class SongsPlayer {
  constructor(id, data) {
    const thisSongs = this;

    thisSongs.id = id;
    thisSongs.data = data;

    thisSongs.renderInMenu();
  }

  renderInMenu() {
    const thisSongs = this;

    const generatedHTML = templates.menuSongs(thisSongs.data);
    thisSongs.element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.containerOf.menu);
    menuContainer.appendChild(thisSongs.element);

  }
}

export default SongsPlayer;
