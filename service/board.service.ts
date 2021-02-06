import { PartialModelObject } from 'objection';
import { BoardResponse } from '../controller/message/BoardResponse';
import { Board } from '../models/Board';
import { Campaign } from '../models/Campaign';
import { publishBoardDelete, publishBoardUpdate } from '../socket/board.publisher';

export async function getAllBoardsForCampaign(campaignId: number) {
    return Campaign.relatedQuery<Board>('boards').for(campaignId);
}

export async function updateBoardInformation(boardId: number, partialBoard: PartialModelObject<Board>) {
    const updatedBoard = await Board.query().patchAndFetchById(boardId, partialBoard);

    publishBoardUpdate(updatedBoard.id_campaign, updatedBoard);

    return updatedBoard;
}

export async function deleteBoard(boardId: number) {
    const boardToDelete = await Board.query().findById(boardId);

    await Board.query().deleteById(boardId);

    publishBoardDelete(boardToDelete.id_campaign, boardToDelete.id);
}
