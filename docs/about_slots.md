# Notes about slots

 - Shadow root is the encapsulated one. Then there is light root, which is non encapsulated normal DOM, and finally flattened root, which is the shadow root that would result from moving the slot assignments to the slots. Althought it isn't really moved, its only rendering, JS still sees the original structure, so querySelectorAll() will not find slot content that was assigned, because it is still in the original structure. Note that default content would be found because that's in the shadow root from the start.
 - JS looks for slot assignments on the same level of the shadow root, in the light root.
 - slot assignment nodes are not moved, it's just rendering that changes.
 - if two dom nodes are assigned to the same slot, then both are added in top-bottom order.
 - If there is a nameless slot, then all the dom nodes inside the webcomponent get inserted into that default slot.
 - The browser monitors slot assignments, and inmediatly updates the rendering.
 - There is a `slotchange` event that can be used when a slot has been assigned.
 - A slot element allows checking which DOM elements it has assigned and another deeper version. The `assignedElements()` and the `assignedNodes()` methods.

## On utility

Because the shadow root is closed, there is full independency in the css/html part of the webcomponent. However, a slot allows the users of the webcomponent to embbed html elements with their own css and html, probably coming from the light root. It can be useful then for allowing spaces inside the webcomponent for the client to insert anything it wants, and in the case of this assignemnt I could allow space for a user scoring web component.
