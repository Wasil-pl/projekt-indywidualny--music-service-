import { templates } from '../settings.js';
import utils from '../utils.js';

class SongPlayer {
  constructor(id, data, songContainer) {
    const thisSongs = this;

    thisSongs.id = id; // TODO: czy ID nie mamy w data? Jeśli tak, może nie trzeba go przekazywać?
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
