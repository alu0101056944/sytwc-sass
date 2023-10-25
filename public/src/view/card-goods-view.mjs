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
  #exampleSample = undefined;
  #divParent = undefined;
  
  /** @private */
  #divCardMainArray = undefined;
  #cardViewArray = undefined;
  #placeholderHeight = undefined;
  #placeholderWidth = undefined;

  constructor(parent) {
    this.#divCardMainArray = [];
    this.#cardViewArray = [];
    this.#parent = parent;
    this.#placeholderWidth = 200;
    this.#placeholderHeight = 25;
    this.#content = document
        .getElementById('card-goods-template')
        .content
        .cloneNode(true);
    this.#divParent = this.#content.querySelector('.examples');
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
    this.#exampleSample = this.#content.querySelectorAll('.example')[0]
        .cloneNode(true);
    this.#content.querySelectorAll('.example').forEach((e) => e.remove());
  }

  /**
   * 
   * @param {object} textsOfSpansPerCard array of objets for each card. 
   * @pre textsOfSpansPerCard.length === this.#cardViewArray.length
   */
  updateTextOfCards(textsOfSpansPerCard) {
    if (textsOfSpansPerCard.length !== this.#cardViewArray.length) {
      throw new Error('parameter array and internal array lengths are different' + 
          'at CardGoodsview.updateTextOfCards() method.');
    }
    for (let i = textsOfSpansPerCard.length - 1; i >= 0; i--) {
      for (let spanName of Object.getOwnPropertyNames(textsOfSpansPerCard)) {
        const partOfMethodCall = spanName[0].toUpperCase() + spanName.slice(1);
        this.#cardViewArray[`setTextOf${partOfMethodCall}`](textsOfSpansPerCard[spanName]);
      }
    }
  }

  /**
   * @param {object} spansTexts each property is a span name in a card, and the
   *    value is the text for that span.
   * @param {number} index index of the card view object stored in this class..
   */
  updateTextOfCard(spansTexts, index) {
    for (let spanName of Object.getOwnPropertyNames(spansTexts)) {
      const partOfMethodCall = spanName[0].toUpperCase() + spanName.slice(1);
      this.#cardViewArray[index][`setTextOf${partOfMethodCall}`](spansTexts[spanName]);
    }
  }

  /**
   * I want the controller to be able to emulate a "pushed in" card, so
   * it needs to be able to pass content of one card to the next card.
   * @param {number} indexA origin card view object in this class
   * @param {number} indexB destination card view object in this class
   */
  transferTextsOfCard(indexA, indexB) {
    this.#cardViewArray[indexA].transferDataTo(this.#cardViewArray[indexB]);
  }

  /**
   * Push one card position to the next to make space for a new card,
   * do it for all the cards so that there is one free space at the
   * start.
   */
  transferAllTextsOfCards() {
    for (let i = this.#divCardMainArray.length - 1; i > 0; i--) {
      this.transferTextsOfCard(i - 1, i);
    }
    this.#cardViewArray[0].clear();
  }

  /**
   * Push a card content into 0 index per array element in bienes property.
   * @param {object} spansInfoPerCard contains a single property that is an
   *  array where each element is an object with the information to put
   *  into the different spans.
   */
  updateCardContents(spansInfoPerCard) {
    const array = spansInfoPerCard.bienes;
    array.forEach((spansInfo) => {
      this.transferAllTextsOfCards();
      for (const spanName of Object.getOwnPropertyNames(spansInfo)) {
        const PART_OF_METHOD_CALL = spanName[0].toUpperCase() + spanName.slice(1);
        this.#cardViewArray[0][`setTextOf${PART_OF_METHOD_CALL}`](spansInfo[spanName]);
      }
    });
  }

  updateLength(newLength) {
    if (newLength > this.#divCardMainArray.length) {
      const INITIAL_CARD_LENGTH = this.#divCardMainArray.length;
      for (let i = 0; i < newLength - INITIAL_CARD_LENGTH; i++) {
        const newCard = this.#exampleSample.cloneNode(true);
        const newCardsMainPart = newCard.querySelector('.card-main');
        this.#divCardMainArray.push(newCard);
        const newCardView = new CardView(newCardsMainPart);
        this.#cardViewArray.push(newCardView);
        const slotOfNewCard = newCard.querySelector('slot');
        slotOfNewCard.name = `card-foot-space-${this.#divCardMainArray.length + 1}`;
        this.#divParent.append(newCard);
      }
    } else if (newLength < this.#divCardMainArray.length) {
      while (newLength < this.#divCardMainArray.length) {
        this.#divCardMainArray.pop().remove();
        this.#cardViewArray.pop();
      }
    }
  }

  updatePlaceholderWidth(newWidth) {
    this.#updatePlaceholderGeometry('width', newWidth);
    this.#placeholderWidth = newWidth;
  }

  updatePlaceholderHeight(newHeight) {
    this.#updatePlaceholderGeometry('height', newHeight);
    this.#placeholderHeight = newHeight;
  }

  /**
   * @param {string} sideName either width or height
   */
  #updatePlaceholderGeometry(sideName, newValue) {
    const exampleArray = this.#parent.querySelectorAll('.example');
    exampleArray.forEach((example) => {
      example.style[sideName] = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
    });
  }
}
