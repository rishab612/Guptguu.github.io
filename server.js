const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;

app.use(express.static(__dirname)); // Serve static files from current directory

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('user joined', (username) => {
        socket.broadcast.emit('user joined', username);
    });

    socket.on('send message', (message) => {
        io.emit('receive message', message);
    });

    socket.on('send file', (fileData) => {
        io.emit('receive file', fileData);
    });

    socket.on('typing', (username) => {
        socket.broadcast.emit('typing', username);
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing');
    });
});

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
