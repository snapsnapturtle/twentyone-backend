import { logger } from '../config/logger';
import { Campaign } from '../models/Campaign';

export async function createCampaign() {
    const campaign = await Campaign.query().insert({});

    logger.info(`new campaign created <${campaign.id}>`);

    return campaign;
}

export async function getCampaign(id: number) {
    return Campaign.query().findById(id);
}
