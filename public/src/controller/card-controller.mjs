/**
 * @author Marcos Barrios
 * @since 26_10_2023
 * @desc Control both model and view of card webcomponent
 * @module CardController
 */

'use strict';

import CardModel from "../model/card-model.mjs";
import CardView from "../view/card-view.mjs";

/**
 * Control both model and view of card webcomponent
 */
export default class CardController {

  /** @private @constant */
  #model = undefined;
  #view = undefined;

  /**
   * @param {object} parent where the view will get appended to
   */
  constructor(parent) {
    this.#model = new CardModel();
    this.#view = new CardView(parent);
  }

  getView() {
    return this.#view;
  }

  updateContent(bienInfo) {
    CardView.acceptedKeys.forEach((key) => {
      const PART_OF_METHOD_CALL = key[0].toUpperCase() + key.slice(1);
      this.#view[`setTextOf${PART_OF_METHOD_CALL}`](bienInfo[key]);
    });
  }

  insertIntoFoot(domNode) {
    this.#view.insertIntoFoot(domNode);
  }

  setWidth(newWidth) {
    this.#view.setCardWidth(newWidth);
  }

  setHeight(newHeight) {
    this.#view.setCardHeight(newHeight);
  }

}
