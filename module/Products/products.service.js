const mongoose = require("mongoose");
const Q = require("q");
var bcrypt = require("bcryptjs");
const { tbl_Product } = require("./products.model");

module.exports = {
  addProduct: async (data, file) => {
    const deferred = Q.defer();
    try {
      const check = await tbl_Product.findOne({
        ProductCode: data.ProductCode,
      });
      if (check) {
        const obj = {
          status: 0,
          data: null,
          message: "Product Already Exists",
        };
        deferred.resolve(obj);
      } else {
        data["img"] = file;
        tbl_Product.create(data, (err, result) => {
          if (err) {
            const obj = {
              status: 0,
              data: err,
              message: "Error in Creating Product",
            };
            deferred.resolve(obj);
          } else {
            const obj = {
              status: 1,
              data: result,
              message: "Product Added Successfully",
            };
            deferred.resolve(obj);
          }
        });
      }
    } catch (error) {
      const obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },

  getProduct: async (data) => {
    const deferred = Q.defer();
    try {
      const check = await tbl_Product.findOne({
        _id: data._id,
      });
      if (check) {
        if (check.img.length > 0) {
          for (file of check.img) {
            console.log(file, "Image");
          }
          const obj = {
            status: 1,
            data: check,
            message: "Product Added Successfully",
          };
        } else {
          const obj = {
            status: 0,
            data: null,
            message: "Image Not Found",
          };
          deferred.resolve(obj);
        }
        deferred.resolve(obj);
      } else {
        const obj = {
          status: 0,
          data: null,
        };
        deferred.resolve(obj);
      }
    } catch (error) {
      const obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
};
