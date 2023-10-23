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

/**
 * Make the REST API requests to fill the data the viewer needs.
 */
export default class CardGoodsController {

  /** @private @constant */
  #model = undefined;
  #view = undefined;

  /**
   * @param {object} parent where the view will get appended
   */
  constructor(parent) {
    this.#model = new CardGoodsModel();
    this.#view = new CardGoodsView(parent);
    document.addEventListener('finishedsetupwebcomp', () => {
      (async () => {
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
        }
        this.#view.updateCardContents(json);
      })();
    });
  }

  updateGeometry(sideName, newValue) {
    if (sideName === 'cardwidth') {
      this.#view.updateCardWidth(newValue);
    } else if (sideName === 'cardheight') {
      this.#view.updateCardHeight(newValue);
    }
  }

  setLength(newLength) {
    if (/\d+/.test(newLength)) {
      const numericValue = parseInt(newLength.match(/\d+/g)[0]);
      this.#view.updateLength(numericValue);
    } else {
      throw new Error('newLength does not contain a number. CardGoods webcomp.');
    }
  }
}
