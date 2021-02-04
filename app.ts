import './config/database';
import { app, server } from './config/express';
import { logger } from './config/logger';
import { router as campaignsRouter } from './controller/campaigns.router';
import { router as tokensRouter } from './controller/tokens.router';
import './socket/index';

const port = Number.parseInt(process.env.PORT!!);

app.use('/v1/campaigns', campaignsRouter);
app.use('/v1/campaigns/:id/tokens', tokensRouter);

server.listen(port, () => logger.info(`server started on port ${port}`));
