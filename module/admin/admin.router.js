const express = require("express");
var router = express.Router();
const route = require("./admin.controller");

router.post("/addadmin", route.addadmin);
router.post("/loginadmin", route.loginadmin);

module.exports = router;
