const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Numbers} = require('./numbers');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const publicPath = path.join(__dirname, '../backend');
const port = 5000;

app.use(express.static(publicPath));

// здесь ты должен подцепится к БД и прокинуть в конструктор Numbers номера из неё
const DBResponse = [];
const numbers = new Numbers(DBResponse)

io.on('connection', (socket) => {
    console.log('New user connected');

    //приходит новый номер
    socket.on('addNumber', (message) => {
        console.log(message);
        if (message && message.number) {
            numbers.addNumber(message.number);
            io.emit('newNumbers', {numbers: numbers.getNumbers()});
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
