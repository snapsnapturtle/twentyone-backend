const { io } = require('../config/socket');
const { logger } = require('../config/logger');
const { toTokenResponse } = require('../mapper/toTokenResponse');
const { getTokensForSession, updateTokenPosition } = require('../service/token.service');
const { getSession } = require('../service/session.service');

const EVENTS = {
    UPDATE_TOKEN_POSITION: 'update_token_position',
    TOKEN_POSITIONS_CHANGED: 'token_positions_changed'
};

io.on('connection', async (socket) => {
    const room = socket.handshake['query']['r_var'];

    if (!room) {
        logger.warn('client attempted to connect without a room');
        return socket.disconnect();
    }

    const session = await getSession(room);

    if (!session) {
        logger.warn(`session with key <${room}> does not exist, will not join room`);
        return socket.disconnect();
    }

    socket.join(room);

    logger.info(`websocket client connected <${socket.id}> and joined room <${room}>`);

    socket.on('fetch_initial_positions', async () => {
        const tokens = await getTokensForSession(session.$id());
        socket.emit(EVENTS.TOKEN_POSITIONS_CHANGED, tokens.map(toTokenResponse));
    });

    socket.on(EVENTS.UPDATE_TOKEN_POSITION, async (token) => {
        await updateTokenPosition(session.$id(), token.id, token.x, token.y);
        const tokens = await getTokensForSession(session.$id());

        io.sockets.to(room).emit(EVENTS.TOKEN_POSITIONS_CHANGED, tokens.map(toTokenResponse));
    });

    // disconnect is emitted when a client leaves the server
    socket.on('disconnect', () => {
        logger.info('user disconnected');
        socket.leave(room);
    });
});
