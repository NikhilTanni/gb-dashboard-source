const express           = require('express'),
      router            = express.Router(),
      fs                = require('fs'),
      path              = require('path'),
      config            = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json'))),
      log               = require(path.join(process.cwd(), 'utils', 'logger')).logger(__filename),
      resputil          = require(path.join(process.cwd(), 'utils', 'resp')),
      { OAuth2Client }  = require('google-auth-library'),
      gClient           = new OAuth2Client(config.auth.google.clientId);

router.post('/google', async function (req, res) {
  var respStatus = 200, message = "", data = {};
  res.setHeader("Content-Type",'application/json');
  const { token }  = req.body
  const ticket = await gClient.verifyIdToken({
    idToken: token,
    audience: config.auth.google.clientId
  });
  log.info(JSON.stringify(ticket));
  const { name, email, picture } = ticket.getPayload();
  // TO-DO: update/insert to DB
  // using mock before impl
  const user = {
    id: 1000
  }
  
  message = "login successful";
  data.message = message;
  data.name = name;
  data.email = email;
  data.picture = picture;
  data.id = user.id;

  req.session.userId = user.id;

  res.json(resputil.respJson(respStatus, message, data)).status(respStatus);
});

router.post('/login', function (req, res) {

  var respStatus = 200, message = "", data = {};
  res.setHeader("Content-Type",'application/json');

  //login activity here
  if(!("username" in req.body && "password" in req.body)) {
    respStatus = 400;
    message = "credentials not provided"
  } else {
    let username = req.body.username,
        password = req.body.password;

    var data = {
      "username": username,
      "password": password
    }
  }
  res.json(resputil.respJson(respStatus, message, data)).status(respStatus);
  
});

module.exports = router;