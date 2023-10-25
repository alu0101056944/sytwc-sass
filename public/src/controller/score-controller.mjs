/**
 * @author Marcos Barrios
 * @since 24_10_2023
 * @desc Persistency of score.
 * @module ScoreController
 */

'use strict';

import ScoreModel from "../model/score-model.mjs";
import ScoreView from "../view/score-view.mjs";

/**
 * Persistency of score.
 */
export default class ScoreController {

  /** @private @constant */
  #model = undefined;
  #view = undefined;

  /**
   * @param {object} parent where the view will get appended to
   */
  constructor(parent) {
    this.#model = new ScoreModel();
    this.#view = new ScoreView(parent);
  }

  getModel() {
    return this.#model;
  }

}
