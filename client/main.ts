// import io from '../node_modules/socket.io/client-dist/socket.io.js'

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

// @ts-ignore We import this in index.html. Yes I should probably bundle this all eventually.
const socket = io()
;($('#new-message') as HTMLTextAreaElement).addEventListener('input', e => {
  const { currentTarget, inputType } = e as InputEvent
  if (inputType === 'insertLineBreak') {
    e.preventDefault()
    socket.emit('chat message', (currentTarget as HTMLTextAreaElement).value)
    ;(currentTarget as HTMLTextAreaElement).value = ''
  }
})

socket.on('chat message', (msg: string) => {
  console.log(`Recevied: ${msg}`)
})

document.body.append(testNote)
