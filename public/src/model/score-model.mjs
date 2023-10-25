/**
 * @author Marcos Barrios
 * @since 24_10_2023
 * @desc A score container
 * @module ScoreModel
 */

'use strict';

export default class ScoreModel {
  /** @private */
  #score = undefined;

  constructor() {
    this.#score = 0;
  }

  setScore(newScore) {
    this.#score = newScore
  }

  getScore() {
    return this.#score;
  }
}
