const express = require('express');
const { io } = require('../config/socket');
const { getTokensForSession, createToken } = require('../service/token.service');
const { getSession } = require('../service/session.service');
const router = express.Router({
    mergeParams: true
});

router.get('/', async (req, res, next) => {
    const session = await getSession(req.params.key);

    if (!session) {
        return res.status(404).send('no session found for key');
    }

    const tokensForSession = await getTokensForSession(session.$id());

    return res.send({
        tokens: tokensForSession
    });
});

router.post('/', async function createTokenForSession(req, res) {
    const session = await getSession(req.params.key);
    if (!session) {
        return res.status(404).send('Session does not exist');
    }

    const createdToken = await createToken(session.$id(), req.body.name, req.body.x, req.body.y);

    io.sockets.to(session.session_key).emit('token_positions_changed', getTokensForSession(session.$id()));

    return res.send(createdToken);
});

module.exports = router;
