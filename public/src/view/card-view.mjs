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
    ['name', 'background', 'type', 'era'].forEach((e) => {
      this.#spanElements[e] = document.createElement('span');
      parent.append(this.#spanElements[e]);

      // create setters on runtime
      this[`setTextOf${e[0].toUpperCase() + e.slice(1)}`] = (newValue) => {
        this.#spanElements[e].textContent = newValue;
      }
    });
  }
}
