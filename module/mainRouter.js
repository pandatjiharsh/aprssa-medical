const express = require("express");
var router = express.Router();
const user = require("./user/user.router.js");
const admin = require("./admin/admin.router.js");
const product = require("./Products/products.router.js");
router.use("/user", user);
router.use("/admin", admin);
router.use("/product", product);

module.exports = router;
