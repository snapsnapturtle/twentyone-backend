import { io } from '../config/socket';
import { Events } from '../enum/Events';
import { Token } from '../models/Token';

export function publishTokenPositions(sessionKey: string, tokens: Token[]) {
    io.sockets.to(sessionKey).emit(
        Events.ALL_TOKENS_CHANGED,
        tokens.map((it) => ({
            id: it.id,
            x: it.position_x,
            y: it.position_y
        }))
    );
}
