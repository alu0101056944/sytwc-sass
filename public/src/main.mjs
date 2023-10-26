// Script to be attached at index.html

import CardGoodsWebcomp from "./card-goods-webcomponent.mjs";
import ScoreWebcomp from "./score-webcomponent.mjs";
import CardWebcomp from "./card-webcomponent.mjs";

customElements.define('mb-cardgoods', CardGoodsWebcomp);
customElements.define('mb-score', ScoreWebcomp);
customElements.define('mb-card', CardWebcomp);
