const   winston         = require('winston'),
        fs              = require('fs'),
        path            = require('path'),
        config          = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json')));



module.exports.logger = function(modname) {
    // const orig              = Error.prepareStackTrace;
    // Error.prepareStackTrace = (_, stack) => stack;
    // const err               = new Error();
    // Error.captureStackTrace(err, arguments.callee);
    // const callee            = err.stack[0];
    // Error.prepareStackTrace = orig;

    const logConfig = {
        transports: [
            new winston.transports.Console({
                depth:true,
                colorize:true
            }),
            // new winston.transports.File({ filename: 'server.log' }),
        ],
        format: winston.format.combine(
            winston.format.label({
                // label: `${path.relative(process.cwd(), callee.getFileName())}:${callee.getLineNumber()}`,
                label: path.basename(modname)
            }),
            winston.format.timestamp({format: config.log.timestampPattern}),
            winston.format.printf(info => `${info.timestamp}  [${info.level}] - ${info.label} - ${info.message}`)
        )
    }
    return winston.createLogger(logConfig);
}