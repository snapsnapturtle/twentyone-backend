import './config/database';
import { app, server } from './config/express';
import { logger } from './config/logger';
import { router as boardsRouter } from './controller/boards.router';
import { router as sessionsRouter } from './controller/sessions.router';
import { router as tokensRouter } from './controller/tokens.router';
import './socket/index';

const port = Number.parseInt(process.env.PORT!!);

app.use('/v1/sessions', sessionsRouter);
app.use('/v1/sessions/:key/tokens', tokensRouter);
app.use('/v1/sessions/:key/boards', boardsRouter);

server.listen(port, () => logger.info(`server started on port ${port}`));
