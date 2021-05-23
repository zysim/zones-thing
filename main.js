"use strict";
const c = (tagName, content) => {
    return Object.assign(document.createElement(tagName), content);
};
const q = document.querySelector;
const addMessage = (toNote, message) => {
    toNote.append(c('span', { innerHTML: marked(message) }));
    return toNote;
};
const testNote = c('div', {
    className: 'note',
    textContent: 'Test',
});
addMessage(testNote, '**Howdy**');
document.body.append(testNote);
//# sourceMappingURL=main.js.map