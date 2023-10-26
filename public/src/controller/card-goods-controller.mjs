/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Make the REST API requests to fill the data the model needs.
 * @module CardGoodsController
 */

'use strict';

import CardGoodsModel from "../model/card-goods-model.mjs";
import CardGoodsView from "../view/card-goods-view.mjs";
import CardView from "../view/card-view.mjs";
import CardWebcomp from '../card-webcomponent.mjs'
import ScoreWebcomp from "../score-webcomponent.mjs";

/**
 * Make the REST API requests to fill the data the viewer needs.
 */
export default class CardGoodsController {

  /** @private @constant */
  #model = undefined;
  #view = undefined;

  /**
   * @param {object} parent where the view will get appended to
   */
  constructor(parent) {
    this.#model = new CardGoodsModel();
    this.#view = new CardGoodsView(parent);
    document.addEventListener('scoreIncrease', () => this.#view.update());
    document.addEventListener('scoreDecrease', () => this.#view.update());
  }

  updateGeometry(sideName, newValue) {
    if (sideName === 'cardwidth') {
      this.#view.setPlaceholdersWidth(newValue);
    } else if (sideName === 'cardheight') {
      this.#view.setPlaceholdersHeight(newValue);
    }
  }

  setLength(newLength) {
    if (/\d+/.test(newLength)) {
      const numericValue = parseInt(newLength.match(/\d+/g)[0]);
      this.#view.setAmountOfPlaceholders(numericValue);
    } else {
      throw new Error('newLength does not contain a number. CardGoods webcomp.');
    }
  }

  /**
   * The children of webcomponent that are inserted into a placeholder slot are
   *  passed to the view for it to manage them.
   * @param {object} children array of dom nodes
   */
  addWebcomponentChildren(children) {
    const childrenAssignedToSlots = children
        .filter((child) => child.slot && child.slot.includes('placeholder-slot-'));
    childrenAssignedToSlots.forEach(child => {
          child.setAttribute('width', this.#view.getPlaceholdersWidth());
          child.setAttribute('height', this.#view.getPlaceholdersHeight());
          this.#view.insertContent({
              domNode: child,
              scoringObject: child.getScoringObject(),
              potato: child.potato,
            });
        });
  }

  async requestAPIInfo() {
    const response = await fetch('assets/bienes.json');
    const json = await response.json();
    for (let i = 0; i < json.bienes.length; i++) {
      for (const key of Object.getOwnPropertyNames(json.bienes[i])) {
        if (CardView.acceptedKeys.indexOf(key) === -1) {
          delete json.bienes[i][key];
        }
        if (key === 'localizacion') {
          json.bienes[i][key] = `lat: ${json.bienes[i][key].lat}` +
              `, long: ${json.bienes[i][key].long}`;
        } else if (key === 'tipo') {
          json.bienes[i][key] = `Arquitectura: ${json.bienes[i][key].arquitectura}` +
              `, épica: ${json.bienes[i][key]['época']}`;
        }
      }
      const card = new CardWebcomp();
      card.setAttribute('width', this.#view.getPlaceholdersWidth());
      card.setAttribute('height', this.#view.getPlaceholdersHeight());
      const score = new ScoreWebcomp();
      card.insertIntoFoot(score);
      card.updateContent(json.bienes[i]);
      this.#view.insertContent({
        domNode: card,
        scoringObject: score.getScoringObject(),
      });
    }
  }

  getPlaceholdersHeight() {
    return this.#view.getPlaceholdersHeight();
  }

  getPlaceholderWidth() {
    return this.#view.getPlaceholdersWidth();
  }
}
