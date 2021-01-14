const socketIO = require('socket.io');
const { server } = require('./express');

export const io = socketIO(server, {
    cors: {
        origin: '*'
    }
});
