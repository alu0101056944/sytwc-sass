/**
 * @author Marcos Barrios
 * @since 24_10_2023
 * @brief Component for showing a user score
 * @module ScoreWebcomp
 */

'use strict';

import ScoreController from "./controller/score-controller.mjs";

/**
 * Component for showing a user score
 */
export default class ScoreWebcomp extends HTMLElement {
  /** @static */
  static observedAttributes = [];

  /** @private @constant */
  #shadow = undefined;
  #controller = undefined;

  constructor() {
    super();
    this.length = 6;
    this.#shadow = this.attachShadow({ mode: 'closed' });
    this.#controller = new ScoreController(this.#shadow);
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
