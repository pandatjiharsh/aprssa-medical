const express = require("express");
var router = express.Router();
const route = require("./di.controller");

router.post("/addDeliveryIntent", route.addDeliveryIntent);
router.put("/editDeliveryIntent/:_id", route.editDeliveryIntent);
router.delete("/deleteDeliveryIntent/:_id", route.deleteDeliveryIntent);
router.get("/listDeliveryIntent", route.listDeliveryIntent);
router.get("/listDeliveryIntentById", route.listDeliveryIntentById);
router.put("/updatePrintedQTY/:_id", route.updatePrintedQTY);
router.put("/updateBagCountQTY/:_id", route.updateBagCountQTY);
router.put("/updatePrintStatus/:_id", route.updatePrintStatus);

module.exports = router;
