type Note = HTMLDivElement

const c = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  content?: Partial<HTMLElementTagNameMap[K]>,
): HTMLElementTagNameMap[K] => {
  return Object.assign(document.createElement(tagName), content)
}

const $ = document.body.querySelector.bind(document.body)

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

// TODO: This isn't how you use Socket.IO. Keeping this here tho to remind me how to do standard CRUD shit
// ;($('#new-message') as HTMLTextAreaElement).addEventListener('input', e => {
//   if ((e as InputEvent).inputType === 'insertLineBreak') {
//     e.preventDefault()
//     const textArea = e.currentTarget as HTMLTextAreaElement
//     fetch('./newMessage', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ msg: textArea.value }),
//     })
//       .then(res => res.json().then(json => console.table(json)))
//       .catch(err => console.error(err))
//     textArea.value = ''
//   }
// })
