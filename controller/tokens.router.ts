import express from 'express';
import { getSession } from '../service/session.service';
import { createToken, getTokensForSession } from '../service/token.service';
import { publishTokenPositions } from '../socket/token.publisher';
import { CreateTokenRequest } from './message/CreateTokenRequest';
import { TokenListResponse } from './message/TokenListResponse';
import { TokenResponse } from './message/TokenResponse';

const router = express.Router({
    mergeParams: true
});

router.get<{ key: string }, TokenListResponse>('/', async (req, res, next) => {
    const session = await getSession(req.params.key);

    if (!session) {
        return res.status(404).send();
    }

    const tokensForSession = await getTokensForSession(session.$id());

    return res.send({
        tokens: tokensForSession.map(it => ({
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

router.post<{ key: string }, TokenResponse, CreateTokenRequest>('/', async function createTokenForSession(req, res) {
    const session = await getSession(req.params.key);

    if (!session) {
        return res.status(404).send();
    }

    const createdToken = await createToken(session.$id(), req.body.name, req.body.position.x, req.body.position.y);

    publishTokenPositions(session.session_key, await getTokensForSession(session.$id()));

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
