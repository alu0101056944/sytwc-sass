/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Make the REST API requests to fill the data the model needs.
 * @module CardGoodsController
 */

'use strict';

import CardGoodsModel from "../model/card-goods-model.mjs";
import CardGoodsView from "../view/card-goods-view.mjs";

/**
 * Make the REST API requests to fill the data the viewer needs.
 */
export default class CardGoodsController {

  /** @private @constant */
  #model = undefined;
  #view = undefined;

  /**
   * @param {object} parent where the view will get appended
   */
  constructor(parent) {
    this.#model = new CardGoodsModel();
    this.#view = new CardGoodsView(parent);
    (async () => {
      await Promise.new((resolve) => setTimeout(() => resolve(), 1000));
      const response = await fetch('assets/bienes.json');
      const json = await response.json();
      this.#view.updateCardContents(json);
    })();
  }

  updateGeometry(sideName, newValue) {
    if (sideName === 'cardwidth') {
      this.#view.updateCardWidth(newValue);
    } else if (sideName === 'cardheight') {
      this.#view.updateCardHeight(newValue);
    }
  }

  setLength(newLength) {
    if (/\d+/.test(newLength)) {
      const numericValue = parseInt(newLength.match(/\d+/g)[0]);
      this.#view.updateLength(numericValue);
    } else {
      throw new Error('newLength does not contain a number. CardGoods webcomp.');
    }
  }
}
