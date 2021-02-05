import { BoardResponse } from './BoardResponse';

export interface CampaignResponse {
    id: number;
    name: string;
    boards: BoardResponse[];
}
