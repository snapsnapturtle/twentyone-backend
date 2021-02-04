import { io } from '../config/socket';
import { Events } from '../enum/Events';
import { Token } from '../models/Token';

export function publishTokenPositions(campaignId: number, tokens: Token[]) {
    io.sockets.to(campaignId.toString()).emit(
        Events.ALL_TOKENS_CHANGED,
        tokens.map((it) => ({
            id: it.id,
            x: it.position_x,
            y: it.position_y
        }))
    );
}
