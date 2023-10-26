/**
 * @author Marcos Barrios
 * @since 19_10_2023
 * @brief Appearance of a card in HTML-CSS
 * @module CardView
 */

'use strict';

export default class CardView {

  /** @private @constant */
  #divContainer = undefined;
  #divMain = undefined;
  #divFoot = undefined;

  /** @private  */
  #cardHeight = undefined;
  #cardWidth = undefined;

  /** @static */
  static acceptedKeys = ['nombre', 'antecedentes', 'tipo', 'localizacion'];

  /** @private @constant */
  #spanElements = {};

  /**
   * @param {object} parent DOM node
   */
  constructor(parent) {
    this.#cardHeight = 30;
    this.#cardWidth = 30;
    this.#divContainer = document.createElement('div');
    this.#divContainer.className = 'card';
    this.#divContainer.innerHTML = `
      <div class="card-main"></div>
      <div class="card-foot">
        <slot name="card-foot-space-1"></slot>
      </div>
    `;
    parent.append(this.#divContainer);
    this.#divMain = this.#divContainer.querySelector('.card-main');
    this.#divFoot = this.#divContainer.querySelector('.card-foot');
    const cssLinkerNode = document.createElement('link');
    cssLinkerNode.setAttribute('rel', 'stylesheet');
    cssLinkerNode.setAttribute('href', 'styles/components/card.css');
    cssLinkerNode.addEventListener('load', () => {
      console.log('Card css style loaded.');
    });
    parent.append(cssLinkerNode);
    CardView.acceptedKeys.forEach((e) => {
      this.#spanElements[e] = document.createElement('p');
      this.#divMain.append(this.#spanElements[e]);
      const PART_OF_METHOD_CALL = e[0].toUpperCase() + e.slice(1);

      // create setters on runtime
      this[`setTextOf${PART_OF_METHOD_CALL}`] = (newValue) => {
        this.#spanElements[e].textContent = newValue;
      }
      this[`getTextOf${PART_OF_METHOD_CALL}`] = () => {
        return this.#spanElements[e].textContent;
      }
    });
  }

  transferDataTo(other) {
    for (let spanName of Object.getOwnPropertyNames(this.#spanElements)) {
      const partOfMethodCall = spanName[0].toUpperCase() + spanName.slice(1);
      other[`setTextOf${partOfMethodCall}`](this.#spanElements[spanName].textContent);
    }
  }

  clear() {
    for (const spanName of Object.getOwnPropertyNames(this.#spanElements)) {
      this.#spanElements[spanName].textContent = '';
    }
  }

  insertIntoFoot(domNode) {
    this.#divFoot.append(domNode);
  }

  setCardWidth(newWidth) {
    this.#setCardGeometry('width', newWidth);
    this.#cardWidth = newWidth;
  }

  setCardHeight(newHeight) {
    this.#setCardGeometry('height', newHeight);
    this.#cardHeight = newHeight;
  }

  /**
   * @param {string} sideName either width or height
   */
  #setCardGeometry(sideName, newValue) {
    this.#divContainer.style[sideName] = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
  }
}
