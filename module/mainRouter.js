const express = require("express");
var router = express.Router();
const user = require("./user/user.router.js");
const admin = require("./admin/admin.router.js");
router.use("/user", user);
router.use("/admin", admin);

module.exports = router;
