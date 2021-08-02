const express   = require('express'),
      router    = express.Router(),
      resputil  = require('../utils/resp'),
      api       = require('./api/api');

router.use('/api', api);

router.get('/', function (req, res) {
  var respStatus = 200, message = "", data = {};
  res.setHeader("Content-Type",'application/json');
  res.json(resputil.respJson(respStatus, message, data)).status(respStatus);
});

module.exports = router;