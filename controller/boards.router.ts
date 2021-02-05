import express from 'express';
import { updateBoardInformation } from '../service/board.service';
import { BoardResponse } from './message/BoardResponse';
import { UpdateBoardRequest } from './message/UpdateBoardRequest';

const router = express.Router({
    mergeParams: true
});

router.put<{ id: number }, BoardResponse, UpdateBoardRequest>('/:id', async function (req, res) {
    const updatedBoard = await updateBoardInformation(req.params.id, {
        name: req.body.name,
        height: req.body.height,
        width: req.body.width,
        grid_type: req.body.gridType,
        grid_line_color: req.body.gridLineColor
    });

    return res.json({
        id: updatedBoard.id,
        name: updatedBoard.name,
        height: updatedBoard.height,
        width: updatedBoard.width,
        gridType: updatedBoard.grid_type,
        gridLineColor: updatedBoard.grid_line_color
    });
});

export { router };
