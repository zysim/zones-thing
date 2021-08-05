import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)

app.get('/', (_, res) => {
  res.send('<p>No</p>')
})

server.listen(3000, () => {
  console.log('Listening at 3000')
})
