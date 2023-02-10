import { templates } from '../settings.js';
import utils from '../utils.js';

class SongPlayer {
  constructor(data, songContainer) {
    const thisSongs = this;

    thisSongs.data = data;
    thisSongs.songContainer = songContainer;

    thisSongs.renderInMenu();
  }

  renderInMenu() {
    const thisSongs = this;

    const generatedHTML = templates.menuSongs(thisSongs.data);
    thisSongs.element = utils.createDOMFromHTML(generatedHTML);
    thisSongs.songContainer.appendChild(thisSongs.element);
  }
}

export default SongPlayer;
