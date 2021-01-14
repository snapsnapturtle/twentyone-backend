const { server, app } = require('./config/express');
const { logger } = require('./config/logger');
const sessionsRouter = require('./api/sessions.router');
require('./config/database');
require('./socket/index');

const port = Number.parseInt(process.env.PORT) || 8080;

app.use('/v1/sessions', sessionsRouter);

server.listen(port, () => logger.info(`server started on port ${port}`));

