/**
 * @author Marcos Barrios
 * @since 05_10_2023
 * @brief Component containing different cards with a table like appearance.
 *
 */

export default class CardGoods extends HTMLElement {
  // static observedAttributes = [];

  constructor() {
    super();
    const template = document.getElementById('card-goods');
    this.attachShadow(template, {mode: 'closed'});
  }

  createdCallback() {
    console.log('WebComponent CardGoods created.');
  }

  connectedCallback() {
    console.log('WebComponent CardGoods connected.');
  }

  disconnectedCallback() {
    console.log('WebComponent CardGoods disconnected.');
  }

  attributeChangedCallback() {

  }
}
