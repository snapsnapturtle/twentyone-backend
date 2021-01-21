import { router as sessionsRouter } from './controller/sessions.router';
import { router as tokensRouter } from './controller/tokens.router';
import './config/database';
import { app, server } from './config/express';
import { logger } from './config/logger';
import './socket/index';

const port = Number.parseInt(process.env.PORT!!);

app.use('/v1/sessions', sessionsRouter);
app.use('/v1/sessions/:key/tokens', tokensRouter);

server.listen(port, () => logger.info(`server started on port ${port}`));
