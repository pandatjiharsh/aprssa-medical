const express = require("express");
const path = require("path");
const fs = require("fs");
const ProductService = require("./products.service");
const { responseFun } = require("../../utils/common");
const logger = require("../../utils/loggers");
const productSchema = {
  companyCode: "company Code",
  ProductCode: "Product Code",
  ProductName: "Product Name",
  BrandName: "Brand Name",
  mrp: "MRP",
  quantity: "Quantity",
};

module.exports = {
  addProduct: async (req, res) => {
    logger.info(
      `API: "addProduct" request-Data: ${JSON.stringify(
        req.body,
        req.files.img
      )}`
    );
    try {
      let Errors = "";
      for (const key in productSchema) {
        if (!req.body[key]) {
          Errors += productSchema[key] + ", ";
        }
      }

      if (Errors) {
        Errors = String(Errors).slice(0, -2);
        return res.json({
          status: 0,
          message: `${Errors} is required!`,
          data: {},
        });
      }
      if (req.files.img.length > 0) {
        const folderPath = "Assets/ProductImage";
        ImgUrl = [];
        for (file of req.files.img) {
          const imageName = `PC_${req.body.ProductCode}-${Date.now()}.jpeg`;
          const imagePath = path.join(folderPath, imageName);
          var binaryData = file.data;
          fs.writeFileSync(imagePath, binaryData, "binary");
          ImgUrl.push(imagePath);
        }
      }
      let resObj = await ProductService.addProduct(req.body, ImgUrl);
      logger.info(`API: addProduct response-Data: ${JSON.stringify(resObj)}`);
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

  getProduct: async (req, res) => {
    try {
      logger.info(
        `API: "addProduct" request-Data: ${JSON.stringify(
          req.body,
          req.files.img
        )}`
      );
      let resObj = await ProductService.getProduct(req.params);
      logger.info(`API: addProduct response-Data: ${JSON.stringify(resObj)}`);
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
};
