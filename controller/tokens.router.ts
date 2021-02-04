import express from 'express';
import { getCampaign } from '../service/campaign.service';
import { createToken, getTokensForCampaign } from '../service/token.service';
import { publishTokenPositions } from '../socket/token.publisher';
import { CreateTokenRequest } from './message/CreateTokenRequest';
import { TokenListResponse } from './message/TokenListResponse';
import { TokenResponse } from './message/TokenResponse';

const router = express.Router({
    mergeParams: true
});

router.get<{ id: number }, TokenListResponse>('/', async (req, res) => {
    const campaign = await getCampaign(req.params.id);

    if (!campaign) {
        return res.status(404).send();
    }

    const tokensForCampaign = await getTokensForCampaign(campaign.id);

    return res.send({
        tokens: tokensForCampaign.map((it) => ({
            id: it.id,
            name: it.name,
            // todo: return asset url
            assetUrl: undefined,
            position: {
                x: it.position_x,
                y: it.position_y
            }
        }))
    });
});

router.post<{ id: number }, TokenResponse, CreateTokenRequest>('/', async function createTokenForCampaign(req, res) {
    const campaign = await getCampaign(req.params.id);

    if (!campaign) {
        return res.status(404).send();
    }

    const createdToken = await createToken(campaign.id, req.body.name, req.body.position.x, req.body.position.y);

    publishTokenPositions(campaign.id, await getTokensForCampaign(campaign.id));

    return res.send({
        id: createdToken.id,
        name: createdToken.name,
        // todo: return asset url
        assetUrl: undefined,
        position: {
            x: createdToken.position_x,
            y: createdToken.position_y
        }
    });
});

export { router };
