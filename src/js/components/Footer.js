import { templates } from '../settings.js';
import utils from '../utils.js';

class Footer {
  constructor(footerContainer) {
    const thisFooter = this;

    thisFooter.footerContainer = footerContainer;
    thisFooter.renderInMenu();
  }

  renderInMenu() {
    const thisFooter = this;

    const generatedHTML = templates.footer();
    thisFooter.element = utils.createDOMFromHTML(generatedHTML);
    thisFooter.footerContainer.appendChild(thisFooter.element);

  }
}

export default Footer;
