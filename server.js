const express = require("express");
const app = express();
const port = 5002;
// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./utils/swaggerconfig.js");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const jwt = require("jsonwebtoken");
const DB = require("./DB/db.connection.js");
const config = require("./config.json");
const mainRoute = require("./module/mainRouter.js");
// const logger = require("./utils/loggers.js");

global.con = DB.con;

// Serve Swagger UI at /api-docs
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/*", function (req, res, next) {
  req.headers["socketIpAddress"] = req.socket.remoteAddress.split("::ffff:")[1];
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Apply CORS middleware before defining routes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Define the auth middleware here
const auth = async function (req, res, next) {
  var token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.appsecret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: "Invalid Token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No x-access-token provided",
    });
  }
};

// Apply auth middleware before defining routes that require authentication
app.use("*/aa", auth, mainRoute);

app.get("/", async (req, res) => {
  res.send("Ayurved apis");
  console.log("object123456789");
});
app.listen(port, () => {
  console.log(`Server listening on port no. ${port}`);
});
