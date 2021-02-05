import express from 'express';
import { getAllBoardsForCampaign } from '../service/board.service';
import { createCampaign, getCampaign } from '../service/campaign.service';
import { CampaignResponse } from './message/CampaignResponse';

const router = express.Router({
    mergeParams: true
});

router.get<{ id: number }, CampaignResponse>('/:id', async function (req, res) {
    const campaign = await getCampaign(req.params.id);

    if (!campaign) {
        return res.status(404).send();
    }

    const boards = await getAllBoardsForCampaign(campaign.id);

    return res.send({
        id: campaign.id,
        name: campaign.name,
        boards: boards.map((it) => ({
            id: it.id,
            name: it.name,
            width: it.width,
            height: it.height,
            gridType: it.grid_type,
            gridLineColor: it.grid_line_color
        }))
    });
});

router.post<{ key: string }, CampaignResponse>('/', async function (req, res) {
    const createdCampaign = await createCampaign();

    return res.json({
        id: createdCampaign.id,
        name: createdCampaign.name,
        boards: []
    });
});

export { router };
