import { select, templates } from '../settings.js';
import utils from '../utils.js';

class Search {
  constructor() {


    const thisSearch = this;

    thisSearch.renderInMenu();
  }

  renderInMenu() {
    const thisSearch = this;

    const generatedHTML = templates.search();
    thisSearch.element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.containerOf.search);
    menuContainer.appendChild(thisSearch.element);

  }
}

export default Search;
