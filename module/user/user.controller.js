const express = require("express");
const UserService = require("./user.service.js");
var bcrypt = require("bcryptjs");
const { responseFun } = require("../../utils/common");

module.exports = {
  adduser: async (req, res) => {
    try {
      if (req.body.firstName) {
        if (
          typeof req.body.firstName == String ||
          !/^[a-zA-Z]+$/.test(req.body.firstName)
        ) {
          return res.json({
            responseStatus: 0,
            responseMsgCode: "firstName Must be an Alphabet Character",
            responseData: {},
          });
        }
      } else {
        return res.json({
          responseStatus: 0,
          responseMsgCode: "firstName field is required",
          responseData: {},
        });
      }

      if (!/^[a-zA-Z]+$/.test(req.body.lastName)) {
        return res.json({
          responseStatus: 0,
          responseMsgCode: "lastName Must be an Alphabet Character",
          responseData: {},
        });
      }
      if (req.body.email == "" || req.body.email == undefined) {
        return res.json({
          responseStatus: 0,
          responseMsgCode: "email field is required",
          responseData: {},
        });
      }
      if (
        req.body.userName == "" ||
        req.body.userName == undefined ||
        req.body.userName.length <= 4
      ) {
        return res.json({
          responseStatus: 0,
          responseMsgCode:
            "userName field is required with atleast 5 characters. ",
          responseData: {},
        });
      }
      if (
        req.body.mobileNumber == "" ||
        req.body.mobileNumber == undefined ||
        !/^\d{10}$/.test(req.body.mobileNumber)
      ) {
        return res.json({
          responseStatus: 0,
          responseMsgCode: "Enter the Correct Mobile Number",
          responseData: {},
        });
      }
      if (
        !req.body.password ||
        req.body.password <= 7 ||
        !/[A-Z]/.test(req.body.password) ||
        !/[a-z]/.test(req.body.password) ||
        !/[0-9]/.test(req.body.password) ||
        !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(req.body.password)
      ) {
        return res.json({
          responseStatus: 0,
          responseMsgCode:
            "Password must be atleast 8 characters long include at least one uppercase, lowercase, special character, and one numeric character. ",
          responseData: {},
        });
      }
      var hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      let resObj = await UserService.adduser(req.body);
      let data = responseFun(resObj);
      // console.log(data, "datadatadatat");
      res.status(200).send(data);
    } catch (error) {
      res.status(200).send({
        status: 0,
        message: "processFailed",
        data: { err: error },
      });
    }
  },
  // ---------------------------- LOGINUSER ----------------------------------------------->

  loginuser: async (req, res) => {
    try {
      // if (req.body.userName == "" || req.body.userName == undefined) {
      //   return res.json({
      //     responseStatus: 0,
      //     responseMsgCode: "userName field is required",
      //     responseData: {},
      //   });
      // }
      if (req.body.password == "" || req.body.password == undefined) {
        return res.json({
          responseStatus: 0,
          responseMsgCode: "password field is required",
          responseData: {},
        });
      }
      let resObj = await UserService.Loginuser(req.body);
      let data = responseFun(resObj);
      // console.log(data, "datadatadatat");
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
