
import CardGoodsController from "./src/controller/card-goods-controller.mjs";

export default class CardGoodsWebcomponent extends HTMLElement {
  /** @static */
  static observedAttributes = ['cardWidth', 'cardHeight', 'length'];

  constructor() {}

  connectedCallback() {}
  disconnectedCallback() {}

  attributeChanged(name, oldValue, newValue) {
    new CustomEvent('attributeChanged', {
      detail: {
        name,
        oldValue,
        newValue
      }
    });
  }
}
