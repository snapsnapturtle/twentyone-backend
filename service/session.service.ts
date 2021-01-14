import { logger } from '../config/logger';
import { Session } from '../models/Session';

export async function createSession() {
    throw Error('not implemented');

    // todo: generate a random session key
    const session = await Session.query().insert({
        session_key: '55'
    });

    logger.info(`new session created <${session.id}>`);

    return session;
}

export async function getSession(sessionKey: string) {
    return Session.query().findOne({ session_key: sessionKey });
}

export async function getSessions() {
    return Session.query();
}
