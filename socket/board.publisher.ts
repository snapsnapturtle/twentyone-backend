import { io } from '../config/socket';
import { Events } from '../enum/Events';
import { Board } from '../models/Board';

export function publishBoardUpdate(campaignId: number, board: Board) {
    io.sockets.to(campaignId.toString()).emit(Events.UPDATE_BOARD, {
        id: board.id,
        name: board.name,
        width: board.width,
        height: board.height,
        gridType: board.grid_type,
        gridLineColor: board.grid_line_color
    });
}

export function publishBoardDelete(campaignId: number, boardId: number) {
    io.sockets.to(campaignId.toString()).emit(Events.DELETE_BOARD, {
        boardId
    });
}
