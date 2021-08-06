import express, { Request, Response } from 'express'
import fs from 'fs'
import https from 'https'
import path from 'path'
import process from 'process'
import tls from 'tls'
import { Server } from 'socket.io'

const app = express()
const port = parseInt(process.env.PORT || '', 10)
const publicRoot = path.join(process.cwd(), 'public')

const credentials: tls.SecureContextOptions = {
  cert: fs.readFileSync(process.env.CERT_PATH || ''),
  key: fs.readFileSync(process.env.KEY_PATH || ''),
  ecdhCurve: process.env.ECDH_CURVE,
  passphrase: process.env.KEY_PASSPHRASE,
}

const server = https.createServer(credentials, app)
const io = new Server(server)

app.use(express.static(publicRoot))

app.get('/', (_: Request, res: Response) => {
  res.sendFile(path.join(publicRoot, 'index.html'))
})

io.on('connection', socket => {
  console.log('User connected')
  socket.on('disconnect', reason => {
    // "transport close" -> User closed tab
    console.log(`User disconnected; reason: ${reason}`)
  })
})

server.listen(port, () => {
  console.log(`Listening at localhost:${port}`)
})
