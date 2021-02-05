import { PartialModelObject } from 'objection';
import { Board } from '../models/Board';
import { Campaign } from '../models/Campaign';
import { publishBoardUpdate } from '../socket/board.publisher';

export async function getAllBoardsForCampaign(campaignId: number) {
    return Campaign.relatedQuery<Board>('boards').for(campaignId);
}

export async function updateBoardInformation(boardId: number, partialBoard: PartialModelObject<Board>) {
    const updatedBoard = await Board.query().patchAndFetchById(boardId, partialBoard);

    publishBoardUpdate(updatedBoard.id_campaign, updatedBoard);

    return updatedBoard;
}
