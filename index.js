const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io') (server)

app.use(express.static(path.join(__dirname, '/static')))

io.on('connection', socket => {
    console.log('Someone connected.');
})

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Listening on: *', port);
})
