const winston = require("winston");

let mydate = new Date();
let fileName =
  mydate.getFullYear() +
  "-" +
  mydate.getMonth() +
  "-" +
  mydate.getDate() +
  "-" +
  mydate.getHours() +
  "-" +
  "app.log";

const options = {
  file: {
    filename: `logs\\${fileName}`,
    handleExceptions: true,
    json: true,
    maxsize: 2000000, // 2MB
    colorize: false,
  },
  console: {
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [new winston.transports.File(options.file)],
});

module.exports = logger;
