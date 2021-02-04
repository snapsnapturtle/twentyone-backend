import { Board } from '../models/Board';
import { Campaign } from '../models/Campaign';

export async function getAllBoardsForCampaign(campaignId: number) {
    return Campaign.relatedQuery<Board>('boards').for(campaignId);
}
