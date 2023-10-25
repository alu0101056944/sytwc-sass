/**
 * @author Marcos Barrios
 * @since 24_10_2023
 * @brief Appearance of a score component in HTML/CSS
 * @module ScoreView
 */

'use strict';

export default class ScoreView {

  /** @private @constant */
  #scoreNode = undefined;
  #likeButton = undefined;
  #dislikeButton = undefined;

  /** @private */
  #score = undefined;

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
    this.#scoreNode = document.createElement('span');
    this.#scoreNode.textContent = '0';
    parent.append(this.#scoreNode);
    this.#likeButton = document.createElement('button');
    this.#likeButton.textContent = 'Like';
    this.#likeButton.addEventListener('click', function() {
      containerObject.setScore(containerObject.getScore() + 1);
      dispatchEvent(new CustomEvent('likeButtonClick'));
    });
    parent.append(this.#likeButton);
    this.#dislikeButton = document.createElement('button');
    this.#dislikeButton.textContent = 'Dislike';
    this.#dislikeButton.disabled = true;
    this.#dislikeButton.addEventListener('click', function() {
      containerObject.setScore(containerObject.getScore() - 1);
      dispatchEvent(new CustomEvent('dislikeButtonClick'));
    });
    parent.append(this.#dislikeButton);
  }

  setScore(newScore) {
    if (newScore <= 0) {
      this.#scoreNode.textContent = newScore;
      this.#score = 0;
      this.#dislikeButton.disabled = true;
    } else {
      this.#scoreNode.textContent = newScore;
      this.#score = newScore;
      this.#dislikeButton.disabled = false;
    }
  }

  getScore() {
    return this.#score;
  }
}
