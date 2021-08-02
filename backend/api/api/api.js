const express       = require('express'),
      router        = express.Router(),
      path          = require('path'),
      resputil      = require(path.join(process.cwd(), 'utils', 'resp')),
      log           = require(path.join(process.cwd(), 'utils', 'logger')).logger(__filename),
      auth          = require('./auth'),
      authValidate  = require('./authValidate');

router.use('/auth', auth);

router.get('/test', authValidate, function(req, res) {
  res.json({}).status(400);
});

router.get('/', function(req, res, next) {
  var respStatus = 200, message = "", data = {};
  res.setHeader("Content-Type",'application/json');

  res.json(resputil.respJson(respStatus, message, data)).status(respStatus);
});
module.exports = router;
