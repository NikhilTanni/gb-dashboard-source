const   express         = require('express'),
        log             = require('./utils/logger').logger(__filename),
        fs              = require('fs'),
        path            = require('path'),
        config          = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json'))),
        ip              = require("ip"),
        app             = express(),
        cors            = require('cors');

const session = require('express-session');
const base = require('./api/base');

app.set('json spaces', 2);
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'tnik@123',
  resave: true,
  saveUninitialized: true
}));
app.use('/', base);


app.listen(config.port, '0.0.0.0', () => {
    log.info(`Server running: ${ip.address()}:${config.port}`);
});
