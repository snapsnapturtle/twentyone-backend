import { BoardResponse } from './BoardResponse';

export interface CampaignResponse {
    id: number;
    boards: BoardResponse[];
}
