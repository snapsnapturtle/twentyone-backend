import express from 'express';
import { getSession, getSessions } from '../service/session.service';
import { router as tokensRouter } from './tokens.router';

const router = express.Router({
    mergeParams: true
});

router.get('/', async (req, res) => {
    const sessions = await getSessions();

    return res.json({
        sessions: sessions
    });
});

router.get('/:key', async (req, res) => {
    const session = await getSession(req.params.key);

    if (!session) {
        return res.status(404).send('no session found for key');
    }

    return res.send({ id: session.$id(), sessionKey: session.session_key });
});

router.use('/:key/tokens', tokensRouter);

export {
    router
};
