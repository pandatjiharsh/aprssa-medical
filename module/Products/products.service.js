const mongoose = require("mongoose");
const Q = require("q");
var bcrypt = require("bcryptjs");
const { tbl_Delivery_Intent } = require("./products.model");

module.exports = {
  addDeliveryIntent: async (data) => {
    const deferred = Q.defer();
    try {
      var check = await tbl_Delivery_Intent.findOne({ diNo: data.diNo });
      if (check) {
        let obj = {
          status: 0,
          data: null,
          message: "Delivery Intent Number Already Exist",
        };
        deferred.resolve(obj);
      } else {
        tbl_Delivery_Intent.create(data, (err, result) => {
          if (err) {
            let obj = {
              status: 0,
              data: err,
              message: "Error in Creating Delivery Intent ",
            };
            deferred.resolve(obj);
          } else {
            let obj = {
              status: 1,
              data: result,
              message: "Details Added Successfully ",
            };
            deferred.resolve(obj);
          }
        });
      }
    } catch (error) {
      let obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  // ---------------------------------------------------UPDATE/EDIT DELIVERY INTENT ---------------------->
  editDeliveryIntent: async (data, id) => {
    const deferred = Q.defer();
    try {
      tbl_Delivery_Intent.findOneAndUpdate(
        { _id: id._id },
        data,
        (err, result) => {
          if (err) {
            let obj = {
              status: 0,
              data: err,
              message: "Error !!",
            };
            deferred.resolve(obj);
          } else {
            if (result != null) {
              let obj = {
                status: 1,
                data: data,
                message: "Updated Successfully",
              };
              deferred.resolve(obj);
            } else {
              let obj = {
                status: 0,
                data: [],
                message: "ID Not Exist",
              };
              deferred.resolve(obj);
            }
          }
        }
      );
    } catch (error) {
      let obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },

  // ----------------------------------------------DELETE DELIVERY INTENT BY _ID --------------------->
  deleteDeliveryIntent: async (data) => {
    const deferred = Q.defer();
    try {
      tbl_Delivery_Intent.findByIdAndDelete(
        { _id: data._id },
        (err, result) => {
          if (err) {
            let obj = {
              status: 0,
              data: null,
              message: "delivery Intent Number Not Exist",
            };
            deferred.resolve(obj);
          } else {
            if (result != null) {
              let obj = {
                status: 1,
                data: data,
                message: "Deleted Successfully",
              };
              deferred.resolve(obj);
            }
          }
        }
      );
    } catch (error) {
      let obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  // ----------------------------------------- LIST ALL DELIVERY INTENT -------------------------->
  listDeliveryIntent: async (data) => {
    const deferred = Q.defer();
    try {
      tbl_Delivery_Intent
        .aggregate([
          {
            $match: { printStatus: data.printStatus },
          },
          { $limit: data.size },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = {
              status: 0,
              data: err,
              message: "Error ! ",
            };
            deferred.resolve(obj);
          }
          if (result) {
            let obj = {
              status: 1,
              data: result,
              message: "List of Delivery Intent",
            };
            deferred.resolve(obj);
          } else {
            let obj = {
              status: 0,
              data: [],
              message: "No Record Found !! ",
            };
            deferred.resolve(obj);
          }
        });

      // tbl_Delivery_Intent.find({}, (err, result) => {
      //   if (err) {
      //     let obj = {
      //       status: 0,
      //       data: err,
      //       message: "Error ! ",
      //     };
      //     deferred.resolve(obj);
      //   }
      //   if (result.length) {
      //     let obj = {
      //       status: 1,
      //       data: result,
      //       message: "List of Delivery Intent",
      //     };
      //     deferred.resolve(obj);
      //   } else {
      //     let obj = {
      //       status: 0,
      //       data: [],
      //       message: "No Record Found !! ",
      //     };
      //     deferred.resolve(obj);
      //   }
      // });
    } catch (error) {
      let obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  // ----------------------------------------- LIST One DELIVERY INTENT -------------------------->
  listDeliveryIntentById: async (data) => {
    const deferred = Q.defer();
    console.log(data.diNo, "-------------->dino--");
    try {
      tbl_Delivery_Intent.find({ diNo: data.diNo }, (err, result) => {
        if (err) {
          let obj = {
            status: 0,
            data: err,
            message: "Error !!",
          };
          deferred.resolve(obj);
        } else {
          if (result.length) {
            let obj = {
              status: 1,
              data: result,
              message: "Success",
            };
            deferred.resolve(obj);
          } else {
            let obj = {
              status: 0,
              data: [],
              message: "delivery intent number Not Exist",
            };
            deferred.resolve(obj);
          }
        }
      });
    } catch (error) {
      let obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  // ----------------------------------------  UPDATE PRINTED QUANTITY ----------------------->
  updatePrintedQTY: async (data, id) => {
    const deferred = Q.defer();
    try {
      tbl_Delivery_Intent.findOneAndUpdate(
        { _id: id._id },
        { $inc: { PrintedQTY: data.PrintedQTY } },
        { new: true },
        (err, result) => {
          if (err) {
            let obj = {
              status: 0,
              data: err,
              message: "Error !!",
            };
            deferred.resolve(obj);
          } else {
            if (result != null) {
              let obj = {
                status: 1,
                data: result,
                message: "Updated Successfully",
              };
              deferred.resolve(obj);
            } else {
              let obj = {
                status: 0,
                data: [],
                message: "ID Not Exist",
              };
              deferred.resolve(obj);
            }
          }
        }
      );
    } catch (error) {
      let obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  // -------------------------------------UPDATE/EDIT bagCountQTY1 Details--------------------->
  updateBagCountQTY: async (data, id) => {
    const deferred = Q.defer();
    let data1 = {};
    if (data.bag == 1) {
      data1 = {
        bagCountQTY1: data.bagCountQTY,
      };
    } else if (data.bag == 2) {
      data1 = {
        bagCountQTY2: data.bagCountQTY,
      };
    } else if (data.bag == 3) {
      data1 = {
        bagCountQTY3: data.bagCountQTY,
      };
    } else if (data.bag == 4) {
      data1 = {
        bagCountQTY4: data.bagCountQTY,
      };
    } else {
      let obj = {
        status: 0,
        data: [],
        message: "Invalid Bag Number ",
      };
      deferred.resolve(obj);
    }
    try {
      tbl_Delivery_Intent.findOneAndUpdate(
        { _id: id._id },
        { $inc: data1 },
        { new: true },
        (err, result) => {
          if (err) {
            let obj = {
              status: 0,
              data: err,
              message: "Error !!",
            };
            deferred.resolve(obj);
          } else {
            if (result != null) {
              // console.log(result.bagCountQTY4 + data.bagCountQTY, "--------->");
              let obj = {
                status: 1,
                data: result,
                message: "Updated Successfully",
              };
              deferred.resolve(obj);
            } else {
              let obj = {
                status: 0,
                data: [],
                message: "ID Not Exist",
              };
              deferred.resolve(obj);
            }
          }
        }
      );
    } catch (error) {
      let obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  // ----------------------------------------  UPDATE PRINTED QUANTITY ----------------------->
  updatePrintStatus: async (data, id) => {
    const deferred = Q.defer();
    try {
      tbl_Delivery_Intent.findOneAndUpdate(
        { _id: id._id },
        data,
        (err, result) => {
          if (err) {
            let obj = {
              status: 0,
              data: err,
              message: "Error !!",
            };
            deferred.resolve(obj);
          } else {
            if (result != null) {
              let obj = {
                status: 1,
                data: result,
                message: "Updated Successfully",
              };
              deferred.resolve(obj);
            } else {
              let obj = {
                status: 0,
                data: [],
                message: "ID Not Exist",
              };
              deferred.resolve(obj);
            }
          }
        }
      );
    } catch (error) {
      let obj = { status: 0, data: null, message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
};
