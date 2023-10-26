/**
 * @author Marcos Barrios
 * @since 26_10_2023
 * @brief Component for card representation with a bunch of informatio.
 * @module CardWebcomp
 */

'use strict';

import CardController from "./controller/card-controller.mjs";

/**
 * Component for showing a user score
 */
export default class CardWebcomp extends HTMLElement {
  /** @static */
  static observedAttributes = [];

  /** @private @constant */
  #shadow = undefined;
  #controller = undefined;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'closed' });
    this.#controller = new CardController(this.#shadow);
    console.log('WebComponent Score created.');
  }
  
  getScoringObject() {
    return this.#controller.getView();
  }

  connectedCallback() {
    console.log('WebComponent Score connected.');
  }

  disconnectedCallback() {
    console.log('WebComponent Score disconnected.');
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log('Changed attribute ' + attributeName);
  }
}
