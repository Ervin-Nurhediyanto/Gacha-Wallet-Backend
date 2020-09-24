require('dotenv').config()
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socket(server)
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./src/routes/index')

io.on('connection', socket => {
  console.log('client connect')

  socket.on('welcomeMessage', user => {
    // console.log('socketId: ' + user.socketId)
    // user.socketId.map((item) => {
    //   socket.join(item)
    // })
    // socket.join(2)
    // socket.join(3)
    for (let i = 1; i<100; i++) {
      socket.join(i)
    }
    // socket.emit('notif', 'Hallo ' + user.username)
    socket.broadcast.to(user.room).emit('notif', 'both: user join... ' + user.username)
  })

  socket.on('sendMessage', (data) => {
    socket.join(data.socketId)
    io.to(data.socketId).emit('message', {
      socketId: data.socketId,
      message: data.message,
      userId: data.userId,
      image: data.image,
      location: data.location
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnect')
  })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api/v1/', routes)

const PORT = process.env.PORT

app.use('/uploads', express.static('./uploads'))
server.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT + ' 🚀'))
