const socketIO = require('socket.io');
const { server } = require('./express');

const io = socketIO(server, {
    cors: {
        origin: '*'
    }
});

module.exports = { io };
