import { Board } from '../models/Board';
import { Session } from '../models/Session';

export async function getBoardsForSession(sessionKey: string) {
    return Session.relatedQuery<Board>('boards').for(Session.query().findOne({ session_key: sessionKey }));
}
