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
  #mainDiv = undefined;

  constructor() {
    super();
    this.#amountOfPlaceholderCards = this.length ? parseInt(this.length, 10) : 1;
    const templateContent = document.getElementById('card-goods').content;
    const templateCloneContent = templateContent.cloneNode(true);
    const childSlots = templateCloneContent.querySelectorAll('slot');
    let originalSlot;
    for (let i = 0; i < childSlots.length; i++) {
      if (childSlots[i].getAttribute('name') === 'card-goods-slot') {
        originalSlot = childSlots[i];
        break;
      }
    }
    if (!originalSlot) {
      throw new Error('Template does not have any card-goods-slot slot.');
    }
    this.#originalSlot = originalSlot.cloneNode(true);
    originalSlot.remove();
    this.#mainDiv = templateCloneContent.querySelector('.examples');
    for (let i = 1; i <= this.#amountOfPlaceholderCards; ++i) {
      const newSlot = this.#originalSlot.cloneNode(true);
      newSlot.name = 'card-goods-slot' + i;
      this.#mainDiv.append(newSlot);
    }
    this.#shadow = this.attachShadow({mode: 'closed'});
    this.#shadow.append(templateCloneContent);
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
      let oldLength;
      if (oldValue) {
        oldLength = parseInt(oldValue, 10);
      } else {
        const initialValue = this.#amountOfPlaceholderCards;
        oldLength = initialValue;
      }
      if (oldLength < newLength) {
        for (let i = oldLength + 1; i <= newLength; i++) {
          const newSlot = this.#originalSlot.cloneNode(true);
          newSlot.name = 'card-goods-slot' + i;
          this.#mainDiv.append(newSlot);
        }
      } else {
        for (let i = this.#amountOfPlaceholderCards; i >= newLength; i--) {
          const slotToRemove = document.getElementById('card-goods-slot' + i);
          slotToRemove.remove();
        }
      }
    }
  }
}
