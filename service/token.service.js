const { Token } = require('../models/Token');
const { logger } = require('../config/logger');

async function createToken(sessionId, name, positionX = 0, positionY = 0) {
    const token = await Token.query().insert({
        name: name,
        id_session: sessionId,
        position_x: positionX,
        position_y: positionY
    });

    logger.info(`new token created <${token.id}> for session <${sessionId}>`);

    return token;
}

async function getTokensForSession(sessionId) {
    return Token.query().where({ id_session: sessionId });
}

async function updateTokenPosition(sessionId, tokenId, positionX, positionY) {
    return Token.query().where({ id_session: sessionId, id: tokenId }).patch({
        position_x: positionX,
        position_y: positionY
    });
}

module.exports = {
    createToken,
    getTokensForSession,
    updateTokenPosition
};
