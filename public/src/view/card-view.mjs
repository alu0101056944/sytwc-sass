/**
 * @author Marcos Barrios
 * @since 19_10_2023
 * @brief Appearance of a card in HTML-CSS
 * @module CardView
 */

'use strict';

export default class CardView {

  /** @private @constant */
  #mainDiv = undefined;

  /** @static */
  static acceptedKeys = ['nombre', 'antecedentes', 'tipo', 'localizacion'];

  /** @private @constant */
  #spanElements = {};

  /**
   * @param {object} parent DOM node
   */
  constructor(parent) {
    this.#mainDiv = document.createElement('div');
    this.#mainDiv.className = 'card';
    this.#mainDiv.innerHTML = `
      <div class="card-main"></div>
      <div class="card-foot">
        <slot name="card-foot-space-1"></slot>
      </div>
    `;
    this.parent.append(this.#mainDiv);
    const cssLinkerNode = document.createElement('link');
    cssLinkerNode.setAttribute('rel', 'stylesheet');
    cssLinkerNode.setAttribute('href', 'styles/components/card.css');
    cssLinkerNode.addEventListener('load', () => {
      console.log('Card css style loaded.');
    });
    parent.append(cssLinkerNode);
    CardView.acceptedKeys.forEach((e) => {
      this.#spanElements[e] = document.createElement('p');
      parent.append(this.#spanElements[e]);
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
}
