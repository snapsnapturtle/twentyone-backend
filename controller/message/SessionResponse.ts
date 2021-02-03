import { BoardResponse } from './BoardResponse';

export interface SessionResponse {
    id: number;
    sessionKey: string;
    boards: BoardResponse[];
}
