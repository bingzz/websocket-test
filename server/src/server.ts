import express from 'express'
import http from 'http'
import io, { Server, Socket } from 'socket.io'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const socket = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
})

const port = 3000

app.use(express.json())
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}))

socket.on('connection', (socket: Socket) => {
  console.log('Connected to a Client')
  console.log('Socket ID:', socket.id)

  socket.emit('getNotification', Math.floor(Math.random() * 10))

  socket.on('disconnect', () => {
    console.log('User disconnected')
    socket.disconnect()
  })

  socket.on('login', (data) => {
    console.log('Login:', data)

    socket.emit('login', `Hello ${data.username}`)
  })
})

server.listen(port, () => {
  console.log('Server listening:', port)
})