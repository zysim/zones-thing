type Note = HTMLDivElement

const c = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  content?: Partial<HTMLElementTagNameMap[K]>,
): HTMLElementTagNameMap[K] => {
  return Object.assign(document.createElement(tagName), content)
}

const q = document.querySelector

const addMessage = (toNote: Note, message: string): Note => {
  toNote.append(c('span', { innerHTML: marked(message) }))
  return toNote
}

const testNote = c('div', {
  className: 'note',
  textContent: 'Test',
})

addMessage(testNote, '**Howdy**')

document.body.append(testNote)
