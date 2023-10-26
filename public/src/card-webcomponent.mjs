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
  static observedAttributes = ['width', 'height'];

  /** @private @constant */
  #shadow = undefined;
  #controller = undefined;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'closed' });
    this.#controller = new CardController(this.#shadow);
    console.log('WebComponent Card created.');
  }

  /**
   * Temporarily hardwired.
   * @todo Implement a score contract in card webcomponents.
   */
  getScoringObject() {
    const scoreComponent = this.querySelector('mb-score');
    return scoreComponent.getScoringObject();
  }

  insertIntoFoot(domNode) {
    this.#controller.insertIntoFoot(domNode);
  }

  updateContent(bienInfo) {
    this.#controller.updateContent(bienInfo);
  }

  connectedCallback() {
    console.log('WebComponent Card connected.');
  }

  disconnectedCallback() {
    console.log('WebComponent Card disconnected.');
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log('Changed attribute ' + attributeName);
    if (attributeName === 'width') {
      this.#controller.setWidth(newValue);
    } else if (attributeName === 'height') {
      this.#controller.setHeight(newValue);
    }
  }
}
