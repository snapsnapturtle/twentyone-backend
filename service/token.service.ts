import { logger } from '../config/logger';
import { Token } from '../models/Token';

export async function createToken(sessionId: number, name?: string, positionX = 0, positionY = 0) {
    const token = await Token.query().insert({
        name: name,
        id_session: sessionId,
        position_x: positionX,
        position_y: positionY
    });

    logger.info(`new token created <${token.id}> for session <${sessionId}>`);

    return token;
}

export async function getTokensForSession(sessionId: number) {
    return Token.query().where({ id_session: sessionId });
}

export async function updateTokenPosition(sessionId: number, tokenId: number, positionX: number, positionY: number) {
    return Token.query().where({ id_session: sessionId, id: tokenId }).patch({
        position_x: positionX,
        position_y: positionY
    });
}
