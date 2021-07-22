const { LoggerSingletonFacade: Logger } = require('./logger');

const requestLoggableProxy = (routeFunc) => async (req, res, next) => {
  const logger = new Logger();
  logger.log(`[${req.method}] [path-'${req.route.path}']`);
  await routeFunc(req, res, next);
};

module.exports = {
  requestLoggableProxy,
};
