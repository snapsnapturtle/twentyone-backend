import express from 'express';
import { getBoardsForSession } from '../service/board.service';
import { BoardListResponse } from './message/BoardListResponse';

const router = express.Router({
    mergeParams: true
});

router.get<{ key: string }, BoardListResponse>('/', async function (req, res) {
    const boards = await getBoardsForSession(req.params.key);

    return res.json({
        boards: boards.map(it => ({
            id: it.id,
            name: it.name,
            width: it.width,
            height: it.height,
            gridType: it.grid_type,
            gridLineColor: it.grid_line_color
        }))
    });
});

export { router };
