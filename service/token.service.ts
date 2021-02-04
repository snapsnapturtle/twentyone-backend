import { logger } from '../config/logger';
import { Token } from '../models/Token';

export async function createToken(campaignId: number, name?: string, positionX = 0, positionY = 0) {
    const token = await Token.query().insert({
        name: name,
        id_session: campaignId,
        position_x: positionX,
        position_y: positionY
    });

    logger.info(`new token created <${token.id}> for campaign <${campaignId}>`);

    return token;
}

export async function getTokensForCampaign(campaignId: number) {
    return Token.query().where({ id_session: campaignId });
}

export async function updateTokenPosition(campaignId: number, tokenId: number, positionX: number, positionY: number) {
    return Token.query().where({ id_session: campaignId, id: tokenId }).patch({
        position_x: positionX,
        position_y: positionY
    });
}
