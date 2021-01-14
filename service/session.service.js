const { Session } = require('../models/Session');
const { logger } = require('../config/logger');

async function createSession() {
    throw Error('not implemented')

    // todo: generate a random session key
    const session = Session.query().insert({
        session_key: 55
    });

    logger.info(`new session created <${session.id}>`);

    return session;
}

async function getSession(sessionKey) {
    return Session.query().findOne({ session_key: sessionKey });
}

async function getSessions() {
    return Session.query()
}

module.exports = {
    createSession,
    getSession,
    getSessions
};
