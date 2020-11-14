const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io') (server)

app.use(express.static(path.join(__dirname, '/client')))

io.on('connection', socket => {
    console.log('Someone connected.');
})


server.listen(3000, () => {
    console.log('Listening on: *', 3000);
})
