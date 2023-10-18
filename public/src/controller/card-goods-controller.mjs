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

  constructor() {
    this.#model = new CardGoodsModel();
    this.#view = new CardGoodsView();
  }
}
