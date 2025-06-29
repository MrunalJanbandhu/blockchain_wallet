const logger = require("../utils/logger");

module.exports = function auditTrail(req, res, next) {
  logger.info(`API ${req.method} ${req.originalUrl}`, {
    headers: req.headers,
    body: req.body,
  });
  next();
};
