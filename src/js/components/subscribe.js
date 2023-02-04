import { select, templates } from '../settings.js';
import utils from '../utils.js';

class Subscribe {
  constructor() {
    const thisSubscribe = this;

    thisSubscribe.renderInMenu();
  }

  renderInMenu() {
    const thisSubscribe = this;

    const generatedHTML = templates.subscribe();
    thisSubscribe.element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.containerOf.menu);
    menuContainer.appendChild(thisSubscribe.element);

  }
}

export default Subscribe;
