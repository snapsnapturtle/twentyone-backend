import { logger } from '../config/logger';
import { io } from '../config/socket';
import { Events } from '../enum/Events';
import { getSession } from '../service/session.service';
import { getTokensForSession, updateTokenPosition } from '../service/token.service';
import { publishTokenPositions } from './token.publisher';

io.on('connection', async (socket: any) => {
    const room = socket.handshake[ 'query' ][ 'r_var' ];

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

    socket.on(Events.REQUEST_SESSION_INIT, async () => {
        publishTokenPositions(room, await getTokensForSession(session.$id()));
    });

    socket.on(Events.UPDATE_TOKEN_POSITION, async (token: { id: number; x: number; y: number }) => {
        await updateTokenPosition(session.$id(), token.id, token.x, token.y);
        const tokens = await getTokensForSession(session.$id());

        publishTokenPositions(room, tokens);
    });

    // disconnect is emitted when a client leaves the server
    socket.on('disconnect', () => {
        socket.leave(room);
    });
});
