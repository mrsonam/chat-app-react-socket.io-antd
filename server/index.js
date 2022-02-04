const app = require('express')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

io.on('connection', socket => {
    console.log("Connection Successful")
    socket.on('message', payload => {
        console.log('Message Recieved : ', payload)
        io.emit('message', payload)
    })
})

server.listen(7000, () => {
    console.log("Listening at port : 7000")
})

