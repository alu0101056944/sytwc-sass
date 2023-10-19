/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Make the REST API requests to fill the data the model needs.
 * @module CardGoodsController
 */

'use strict';

import CardGoodsModel from "../model/card-goods-model.mjs";
import CardGoodsView from "../view/card-goods-view.mjs";
import CardGoodsWebcomp from "../card-goods-webcomponent.mjs";

/**
 * Make the REST API requests to fill the data the viewer needs.
 */
export default class CardGoodsController {

  /** @private @constant */
  #model = undefined;
  #view = undefined;
  #webcomponent = undefined;

  constructor() {
    this.#model = new CardGoodsModel();
    this.#webcomponent = new CardGoodsWebcomp();
    const shadow = this.#webcomponent.getShadow();
    this.#view = new CardGoodsView(shadow);
    document.addEventListener('attributeChanged', (event) => {
      const SIDE_NAME = event.detail.attributeName;
      const NEW_VALUE = event.detail.newValue;
      this.updateGeometry(SIDE_NAME, NEW_VALUE);
    });
  }

  updateGeometry(sideName, newValue) {
    if (sideName === 'width') {
      this.#view.updateCardWidth(newValue);
    } else if (sideName === 'height') {
      this.#view.updateCardHeight(newValue);
    }
  }
}
