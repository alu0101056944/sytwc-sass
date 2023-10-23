/**
 * @author Marcos Barrios
 * @since 19_10_2023
 * @brief Appearance of a card in HTML-CSS
 * @module CardView
 */

'use strict';

export default class CardView {
  /** @private @constant */
  #spanElements = {};

  /**
   * 
   * @param {object} parent DOM node
   */
  constructor(parent) {
    ['nombre', 'antecedentes', 'tipo', 'localizacion'].forEach((e) => {
      this.#spanElements[e] = document.createElement('span');
      parent.append(this.#spanElements[e]);
      const PART_OF_METHOD_CALL = e[0].toUpperCase() + e.slice(1);

      // create setters on runtime
      this[`setTextOf${PART_OF_METHOD_CALL}`] = (newValue) => {
        this.#spanElements[e].textContent = newValue;
      }
      this[`getTextOf${PART_OF_METHOD_CALL}`] = () => {
        this.#spanElements[e].textContent = newValue;
      }
    });
  }

  transferDataTo(other) {
    for (let spanName of Object.getOwnPropertyNames(this.#spanElements)) {
      const partOfMethodCall = spanName[0].toUpperCase() + spanName.slice(1);
      other[`setTextOf${partOfMethodCall}`](this.#spanElements[spanName]);
    }
  }

  clear() {
    for (const spanName of Object.getOwnPropertyNames(this.#spanElements)) {
      delete this.#spanElements[spanName];
    }
  }
}
