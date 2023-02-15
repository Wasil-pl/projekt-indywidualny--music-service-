import { templates } from '../settings.js';
import utils from '../utils.js';

class Footer {
  constructor(subscribeContainer) {
    const thisSubscribe = this;

    thisSubscribe.subscribeContainer = subscribeContainer;
    thisSubscribe.renderInMenu();
  }

  renderInMenu() {
    const thisSubscribe = this;

    const generatedHTML = templates.footer();
    thisSubscribe.element = utils.createDOMFromHTML(generatedHTML);
    thisSubscribe.subscribeContainer.appendChild(thisSubscribe.element);

  }
}

export default Footer;
