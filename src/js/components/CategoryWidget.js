import { classNames, select, templates } from '../settings.js';
import utils from '../utils.js';

class CategoryWidget {
  constructor(categoriesArray) {
    const thisCategoryWidget = this;

    thisCategoryWidget.categoriesArray = categoriesArray;
    thisCategoryWidget.getElements();
    thisCategoryWidget.renderInMenu();
    thisCategoryWidget.initAction();
    //thisCategoryWidget.hiddingSongs();
  }

  getElements() {
    const thisCategoryWidget = this;

    thisCategoryWidget.dom = {
      categoryContainer: document.querySelector(select.containerOf.categoryWidget),
    };
  }

  renderInMenu() {
    const thisCategoryWidget = this;

    const generatedHTML = templates.categoryWidget(thisCategoryWidget.categoriesArray);
    thisCategoryWidget.element = utils.createDOMFromHTML(generatedHTML);
    thisCategoryWidget.dom.categoryContainer.appendChild(thisCategoryWidget.element);
  }

  initAction(){
    const thisCategoryWidget = this;

    const categoriesList = document.querySelector(select.containerOf.categoryList);
    const allLinks = categoriesList.getElementsByTagName('li');

    for (let link = 0; link < allLinks.length; link++) {
      allLinks[link].addEventListener('click', function(event){
        event.preventDefault();
        const clickedElement = this;

        for (let link = 0; link < allLinks.length; link++) {
          if (clickedElement != allLinks[link]) {
            allLinks[link].classList.remove(classNames.active);
          }

          else if (clickedElement.classList.contains(classNames.active) === true) {
            clickedElement.classList.remove(classNames.active);
          }

          else {
            clickedElement.classList.add(classNames.active);
          }
        }

        const clickedCategory = clickedElement.innerHTML.toLowerCase();
        console.log('thisCategoryWidget.category:', thisCategoryWidget.category);

        // const songs = document.querySelectorAll('.home-wrapper .song');

        // for (let song of songs) {
        //   const category = song.querySelector('.categories').innerHTML.toLowerCase().replace('categories: ', '').replace(',', ' ');
        //   console.log('category:', category);

        //   if (category.indexOf(clickedCategory) == -1) {
        //     song.classList.add(classNames.hidden);
        //   }

        //   else {
        //     song.classList.remove(classNames.hidden);
        //   }
        // }

        thisCategoryWidget.initfilter(clickedCategory);
      });
    }
  }

  initfilter (clickedCategory) {

    const songs = document.querySelectorAll('.home-wrapper .song');

    for (let song of songs) {
      const category = song.querySelector('.categories').innerHTML.toLowerCase().replace('categories: ', '').replace(',', ' ');
      console.log('category:', category);

      if (category.indexOf(clickedCategory) == -1) {
        song.classList.add(classNames.hidden);
      }

      else {
        song.classList.remove(classNames.hidden);
      }
    }

  }

}

export default CategoryWidget;
