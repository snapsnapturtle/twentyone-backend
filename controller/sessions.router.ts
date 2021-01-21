import express from 'express';
import { createSession, getSession, getSessions } from '../service/session.service';
import { SessionListResponse } from './message/SessionListResponse';
import { SessionResponse } from './message/SessionResponse';

const router = express.Router({
    mergeParams: true
});

router.get<{}, SessionListResponse>('/', async function (req, res) {
    const sessions = await getSessions();

    return res.json({
        sessions: sessions.map(it => ({
            id: it.id,
            sessionKey: it.session_key
        }))
    });
});

router.get<{ key: string }, SessionResponse>('/:key', async function (req, res) {
    const session = await getSession(req.params.key);

    if (!session) {
        return res.status(404).send();
    }

    return res.send({ id: session.$id(), sessionKey: session.session_key });
});

router.post<{ key: string }, SessionResponse>('/', async function (req, res) {
    const newSession = await createSession();

    return res.json({
        id: newSession.id,
        sessionKey: newSession.session_key
    });
});

export { router };
