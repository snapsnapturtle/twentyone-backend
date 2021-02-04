import { logger } from '../config/logger';
import { io } from '../config/socket';
import { Events } from '../enum/Events';
import { getCampaign } from '../service/campaign.service';
import { getTokensForCampaign, updateTokenPosition } from '../service/token.service';
import { publishTokenPositions } from './token.publisher';

io.on('connection', async (socket: any) => {
    const room = socket.handshake['query']['r_var'];
    const campaignId = Number.parseInt(room);

    if (!room) {
        logger.warn('client attempted to connect without a room');
        return socket.disconnect();
    }

    const campaign = await getCampaign(campaignId);

    if (!campaign) {
        logger.warn(`campaign with id <${campaignId}> does not exist, will not join room!`);
        return socket.disconnect();
    }

    socket.join(room);

    socket.on(Events.REQUEST_CAMPAIGN_INIT, async () => {
        publishTokenPositions(room, await getTokensForCampaign(campaign.id));
    });

    socket.on(Events.UPDATE_TOKEN_POSITION, async (token: { id: number; x: number; y: number }) => {
        await updateTokenPosition(campaign.id, token.id, token.x, token.y);
        const tokens = await getTokensForCampaign(campaign.id);

        publishTokenPositions(room, tokens);
    });

    // disconnect is emitted when a client leaves the server
    socket.on('disconnect', () => {
        socket.leave(room);
    });
});
