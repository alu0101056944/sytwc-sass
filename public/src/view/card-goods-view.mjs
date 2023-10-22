/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Represents the html structure and the css style of dashboard with
 *    cards.
 * @module CardGoodsView
 *
 */

'use strict';

import CardView from "./card-view.mjs";

/**
 * Represents the html structure and the css style of dashboard with
 *    cards.
 */
export default class CardGoodsView {
  /** @private @constant */
  #parent = undefined;
  #content = undefined;
  #cardSample = undefined;
  #cardsParentDiv = undefined;
  
  /** @private */
  #cards = undefined;
  #cardsViews = undefined;
  #cardHeight = undefined;
  #cardWidth = undefined;

  // permitir una parte baja en cada carta, que sea un slot.

  constructor(parent) {
    this.#cards = [];
    this.#cardsViews = [];
    this.#parent = parent;
    this.#cardWidth = 200;
    this.#cardHeight = 25;
    this.#content = document
        .getElementById('card-goods-template')
        .content
        .cloneNode(true);
    this.#cardsParentDiv = this.#content.querySelector('.examples');
    this.#prepareTemplate();
    const cssLinkerNode = document.createElement('link');
    cssLinkerNode.setAttribute('rel', 'stylesheet');
    cssLinkerNode.setAttribute('href', 'styles/components/card-goods.css');
    cssLinkerNode.addEventListener('load', () => {
      console.log('CardGoodsView css style loaded.');
    });
    this.#parent.append(cssLinkerNode);
    this.#parent.append(this.#content);
  }

  #prepareTemplate() {
    this.#cardSample = this.#content.querySelectorAll('.example')[0]
        .cloneNode(true);
    this.#content.querySelectorAll('.example').forEach((e) => e.remove());
  }

  /**
   * 
   * @param {object} textsOfSpansPerCard array of objets for each card. 
   * @pre textsOfSpansPerCard.length === this.#cardsViews.length
   */
  updateTextOfCards(textsOfSpansPerCard) {
    if (textsOfSpansPerCard.length !== this.#cardsViews.length) {
      throw new Error('parameter array and internal array lengths are different' + 
          'at CardGoodsview.updateTextOfCards() method.');
    }
    for (let i = textsOfSpansPerCard.length - 1; i >= 0; i--) {
      for (spanName of Object.getOwnPropertyNames(textsOfSpansPerCard)) {
        this.#cardsViews[`setTextOf${spanName}`](textsOfSpansPerCard[spanName]);
      }
    }
  }

  updateLength(newLength) {
    if (newLength > this.#cards.length) {
      const INITIAL_CARD_LENGTH = this.#cards.length;
      for (let i = 0; i < newLength - INITIAL_CARD_LENGTH; i++) {
        const newCard = this.#cardSample.cloneNode(true);
        const newCardsMainPart = newCard.querySelector('.card-main');
        this.#cards.push(newCard);
        const newCardView = new CardView(newCardsMainPart);
        this.#cardsViews.push(newCardView);
        const slotOfNewCard = newCard.querySelector('slot');
        slotOfNewCard.name = `card-foot-space-${this.#cards.length + 1}`;
        this.#cardsParentDiv.append(newCard);
      }
    } else if (newLength < this.#cards.length) {
      while (newLength < this.#cards.length) {
        this.#cards.pop().remove();
        this.#cardsViews.pop();
      }
    }
  }

  updateCardWidth(newWidth) {
    this.#updateCardGeometry('width', newWidth);
    this.#cardWidth = newWidth;
  }

  updateCardHeight(newHeight) {
    this.#updateCardGeometry('height', newHeight);
    this.#cardHeight = newHeight;
  }

  /**
   * @param {string} sideName either width or height
   */
  #updateCardGeometry(sideName, newValue) {
    const exampleArray = this.#parent.querySelectorAll('.example');
    exampleArray.forEach((example) => {
      example.style[sideName] = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
    });
  }
}
