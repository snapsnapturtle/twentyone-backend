import { logger } from './config/logger';
import {server, app} from './config/express';
import {router as sessionsRouter} from './api/sessions.router';
import './config/database'
import './socket/index'

const port = Number.parseInt(process.env.PORT || '8080');

app.use('/v1/sessions', sessionsRouter);

server.listen(port, () => logger.info(`server started on port ${port}`));

