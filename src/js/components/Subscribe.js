import { select, templates } from '../settings.js';
import utils from '../utils.js';

class Subscribe {
  constructor() {
    const thisSubscribe = this;

    thisSubscribe.render();
  }

  render() {
    const thisSubscribe = this;

    const generatedHTML = templates.subscribe();
    thisSubscribe.element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.containerOf.home);
    menuContainer.appendChild(thisSubscribe.element);

  }
}

export default Subscribe;
