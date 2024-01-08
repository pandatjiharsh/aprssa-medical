const express = require("express");
var router = express.Router();
const route = require("./user.controller.js");

router.post("/adduser", route.adduser);
router.post("/loginuser", route.loginuser);

module.exports = router;
