const mongoose = require("mongoose");
const Q = require("q");
var bcrypt = require("bcryptjs");
const { Addadmin } = require("./admin.model"); // Assuming you have a Mongoose model defined

module.exports = {
  addadmin: async (data) => {
    const deferred = Q.defer();
    try {
      // console.log(data, "--------->");
      var check = await Addadmin.findOne({
        $or: [{ userName: data.userName }, { mobileNumber: data.mobileNumber }],
      });
      // console.log(check, "check------");
      if (check) {
        if (check.userName === data.userName) {
          let obj = {
            status: 0,
            data: "null",
            message: "userName Already Exist",
          };
          deferred.resolve(obj);
        }
        if (check.mobileNumber === data.mobileNumber) {
          let obj = {
            status: 0,
            data: "null",
            message: "Mobile number Already Exist",
          };
          deferred.resolve(obj);
        }
        let obj = {
          status: 0,
          data: "null",
          message: "Already Exist",
        };
        deferred.resolve(obj);
      } else {
        Addadmin.create(data, (err, result) => {
          if (err) {
            let obj = {
              status: 0,
              data: err,
              message: "Error in Creating User",
            };
            deferred.resolve(obj);
          } else {
            let obj = {
              status: 1,
              data: result,
              message: "Data Added Successfully",
            };
            deferred.resolve(obj);
          }
        });
      }
    } catch (error) {
      // console.error("Error during user check:", error);
      let obj = { status: 0, data: "null", message: "Error" };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  // ---------------------------------------------LOGIN USER --------------------------------->
  Loginadmin: async (data) => {
    var deferred = Q.defer();
    // console.log(data, "--------data");
    try {
      var check = await Addadmin.findOne({
        $or: [{ userName: data.usermob }, { mobileNumber: data.usermob }],
      });
      // console.log(check, "-----check");
      if (check) {
        const isPass = await bcrypt.compare(data.password, check.password);
        if (isPass) {
          let obj = {
            status: 1,
            data: check,
            message: "Login Successful !",
          };
          deferred.resolve(obj);
        } else {
          let obj = {
            status: 0,
            data: null,
            message: "Wrong Password !",
          };
          deferred.resolve(obj);
        }
      } else {
        let obj = {
          status: 0,
          data: null,
          message: "Username / Mobile Number Not Found !",
        };
        deferred.resolve(obj);
      }
    } catch (error) {
      // console.log(error, "error-----------");
      let obj = {
        status: 0,
        data: null,
        message: "Error !",
      };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
};
