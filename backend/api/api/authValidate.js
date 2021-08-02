const path          = require('path'),
      log           = require(path.join(process.cwd(), 'utils', 'logger')).logger(__filename);

function authValidate(req, res, next) {
  log.info(JSON.stringify(req.session));
  next();
}
module.exports = authValidate;