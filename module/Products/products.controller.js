const express = require("express");
const diService = require("./products.service");
const { responseFun } = require("../../utils/common");
const logger = require("../../utils/loggers");

// router.post("/add-di", route.adddi);
// router.post("/edit-di", route.editdi);
// router.post("/delete-di", route.deletedi);
// router.post("/show-di", route.showdi);
module.exports = {
  // -----------------------------------ADD DELIVERY INTENT DETAILS ----------------->
  addDeliveryIntent: async (req, res) => {
    try {
      logger.info(
        `API: "addDeliveryIntent" request-Data: ${JSON.stringify(req.body)}`
      );
      let resObj = await diService.addDeliveryIntent(req.body);
      logger.info(
        `API: addDeliveryIntent response-Data: ${JSON.stringify(resObj)}`
      );
      let data = responseFun(resObj);
      res.status(200).send(data);
    } catch (error) {
      console.log(error, "===error");
      logger.error(error);
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },
  // ---------------------------- UPDATE/EDIT DELIVERY INTENT DETAILS --------------------------->

  editDeliveryIntent: async (req, res) => {
    try {
      let resObj = await diService.editDeliveryIntent(req.body, req.params);
      let data = responseFun(resObj);
      res.status(200).send(data);
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },
  // ------------------------------------ DELETE DELIVERY INTENT BY _ID--------------------->
  deleteDeliveryIntent: async (req, res) => {
    try {
      let resObj = await diService.deleteDeliveryIntent(req.params);
      let data = responseFun(resObj);
      res.status(200).send(data);
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },
  // ---------------------------------LIST ALL DELIVERY INTENT --------------------------------------->
  listDeliveryIntent: async (req, res) => {
    try {
      let resObj = await diService.listDeliveryIntent(req.body);
      let data = responseFun(resObj);
      res.status(200).send(data);
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },
  // ---------------------------------LIST One  DELIVERY INTENT --------------------------------------->
  listDeliveryIntentById: async (req, res) => {
    try {
      let resObj = await diService.listDeliveryIntentById(req.body);
      let data = responseFun(resObj);
      res.status(200).send(data);
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },

  // ---------------------------- UPDATE/EDIT PRINTED QUANTITY DETAILS ----------------------------------->
  updatePrintedQTY: async (req, res) => {
    try {
      if (req.body.PrintedQTY == "" || req.body.PrintedQTY == undefined) {
        return res.json({
          status: 0,
          message: "Printed Quantity Required ",
          data: {},
        });
      }
      let resObj = await diService.updatePrintedQTY(req.body, req.params);
      let data = responseFun(resObj);
      res.status(200).send(data);
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },
  // ---------------------------- UPDATE/EDIT bagCountQTY1 DETAILS ---------------------->
  updateBagCountQTY: async (req, res) => {
    try {
      if (req.body.bag == "" || req.body.bag == undefined) {
        return res.json({
          status: 0,
          message: "bag number is Required",
          data: {},
        });
      }
      if (req.body.bagCountQTY == "" || req.body.bagCountQTY == undefined) {
        return res.json({
          status: 0,
          message: " bagCount Quantity is Required",
          data: {},
        });
      }
      let resObj = await diService.updateBagCountQTY(req.body, req.params);
      let data = responseFun(resObj);
      res.status(200).send(data);
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },
  // ---------------------------- UPDATE/EDIT Print Status DETAILS ---------------------->
  updatePrintStatus: async (req, res) => {
    try {
      if (req.body.printStatus == "" || req.body.printStatus == undefined) {
        return res.json({
          status: 0,
          message: "printStatus is Required",
          data: {},
        });
      }
      let resObj = await diService.updatePrintStatus(req.body, req.params);
      let data = responseFun(resObj);
      res.status(200).send(data);
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },
};
