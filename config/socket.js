const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const port = Number.parseInt(process.env.PORT) || 4000;
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: '*'
    }
});

server.listen(port, () => console.log(`server started on port ${port}`));

module.exports = io;
