/**
 * @author Marcos Barrios
 * @since 24_10_2023
 * @brief Appearance of a score component in HTML/CSS
 * @module ScoreView
 */

'use strict';

export default class ScoreView {
  /** @private */
  #score = undefined;
  #scoreNode = undefined;

  /**
   * @param {object} parent DOM node
   */
  constructor(parent) {
    this.#score = 0;
    const containerObject = this;
    const cssLinkerNode = document.createElement('link');
    cssLinkerNode.setAttribute('rel', 'stylesheet');
    cssLinkerNode.setAttribute('href', 'styles/components/score.css');
    cssLinkerNode.addEventListener('load', () => {
      console.log('ScoreView css style loaded.');
    });
    parent.append(cssLinkerNode);
    this.#scoreNode = document.createElement('p');
    p.textContent = '0';
    parent.append(this.#scoreNode);
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', function() {
      containerObject.setScore(containerObject.getScore() + 1);
    });
    parent.append(likeButton);
    const dislikeButton = document.createElement('button');
    dislikeButton.textContent = 'Dislike';
    dislikeButton.addEventListener('click', function() {
      if (container.getScore() > 0) {
        containerObject.setScore(containerObject.getScore() - 1);
      }
    });
    parent.append(dislikeButton);
  }

  setScore(newScore) {
    this.#score = newScore;
    this.#scoreNode.textContent = this.#score;
  }

  getScore() {
    return this.#score;
  }
}
