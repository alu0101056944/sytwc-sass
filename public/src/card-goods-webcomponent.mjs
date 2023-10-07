/**
 * @author Marcos Barrios
 * @since 05_10_2023
 * @brief Component containing different cards with a table like appearance.
 *
 */

export default class CardGoods extends HTMLElement {
  static observedAttributes = ['length'];
  #amountOfPlaceholderCards = undefined;
  #originalSlot = undefined;
  #shadow = undefined;

  constructor() {
    super();
    this.#amountOfPlaceholderCards = this.length ? parseInt(this.length, 10) : 1;
    const template = document.getElementById('card-goods').content;
    const childSlots = template.querySelector('.slot');
    let originalNode;
    for (let i = 0; i < childSlots; i++) {
      if (childSlots[i].getAttribute('name') === 'card-goods-slot') {
        originalNode = childSlots[i];
        break;
      }
    }
    if (!originalNode) {
      throw new Error('Template does not have any card-goods-slot slot.');
    }
    this.#originalSlot = originalSlot.clone(true);
    const templateClone = template.cloneNode(true);
    originalSlot.remove();
    for (let i = 1; i <= this.#amountOfPlaceholderCards; ++i) {
      const newSlot = this.#originalSlot.cloneNode(true);
      newSlot.id = 'card-goods-slot' + i;
      templateClone.append(newSlot);
    }
    this.#shadow = this.attachShadow({mode: 'closed'});
    this.#shadow.append(templateClone);
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

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === 'length') {
      const newLength = parseInt(newValue, 10);
      const oldLength = parseInt(oldValue, 10);
      if (oldLength < newLength) {
        for (let i = this.#amountOfPlaceholderCards; i >= newLength; i--) {
          const slotToRemove = document.getElementById('card-goods-slot' + i);
          slotToRemove.remove();
        }
      } else {
        for (let i = oldLength + 1; i <= newLength; i++) {
          const newSlot = this.#originalSlot.clone(true);
          newSlot.id = 'card-goods-slot' + i;
          this.#shadow.append(newSlot);
        }
      }
    }
  }
}
