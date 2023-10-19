/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Represents a dashboard with cards.
 * @module CardGoodsModel
 */

'use strict';

/**
 * Lowest level component, it has the data that represents a dashboard with
 * cards. It does not need to interact with anything, the controller uses this,
 * the view component receives info of this model by events.
 * 
 * WIP think about the comm thing, because controller gets inputs and passes
 * them to model and view as necessary. But can model pass info to view directly?
 */

/**
 * Represents a dashboard with cards.
 */
export default class CardGoodsModel {
  
  /** @private */
  #cards = undefined;

  constructor() {
    this.#cards = [];
  }

  getCards() {
    return this.#cards;
  }
}
