import { CATEGORIES_SEPARATOR, classNames, select, templates } from '../settings.js';
import utils from '../utils.js';

class CategoryWidget {
  constructor(categoriesArray) {
    const thisCategoryWidget = this;

    thisCategoryWidget.selectedCategoryElement = null;

    thisCategoryWidget.categoriesArray = categoriesArray;
    thisCategoryWidget.getElements();
    thisCategoryWidget.render();
    thisCategoryWidget.initAction();
  }

  getElements() {
    const thisCategoryWidget = this;

    thisCategoryWidget.dom = {
      categoryContainer: document.querySelector(select.containerOf.categoryWidget),
    };
  }

  render() {
    const thisCategoryWidget = this;

    const generatedHTML = templates.categoryWidget(thisCategoryWidget.categoriesArray);
    thisCategoryWidget.element = utils.createDOMFromHTML(generatedHTML);
    thisCategoryWidget.dom.categoryContainer.appendChild(thisCategoryWidget.element);
  }

  initAction(){
    const thisCategoryWidget = this;

    const categoriesList = document.querySelector(select.containerOf.categoryList);
    const allLinks = categoriesList.getElementsByTagName('li');

    for (let link of allLinks) {
      link.addEventListener('click', function(event){
        event.preventDefault();
        const clickedElement = this;

        for (let link of allLinks) {
          link.classList.remove(classNames.active);
        }

        if (clickedElement !== thisCategoryWidget.selectedCategoryElement) {
          clickedElement.classList.add(classNames.active);
          thisCategoryWidget.selectedCategoryElement = clickedElement;
          const categoryText = clickedElement.innerHTML.toLowerCase();
          return thisCategoryWidget.initFilter(categoryText);
        }

        thisCategoryWidget.selectedCategoryElement = null;
        thisCategoryWidget.initFilter();
      });
    }
  }

  initFilter(clickedCategory) {
    const songs = document.querySelectorAll(select.containerOf.homeSongs);

    for (let song of songs) {
      if (!clickedCategory) {
        song.classList.remove(classNames.hidden);
        continue;
      }

      song.classList.add(classNames.hidden);
      const songCategories = song.querySelector(select.containerOf.songCategories).innerHTML.toLowerCase().split(CATEGORIES_SEPARATOR);

      if (songCategories.includes(clickedCategory)) {
        song.classList.remove(classNames.hidden);
      }
    }

  }

}

export default CategoryWidget;
