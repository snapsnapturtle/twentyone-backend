import { logger } from '../config/logger';
import { Session } from '../models/Session';

export async function createSession() {
    const session = await Session.query().insert({
        session_key: Math.random().toString(36).substring(4)
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
