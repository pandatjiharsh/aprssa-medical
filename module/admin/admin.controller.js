const express = require("express");
const bcrypt = require("bcryptjs");
const NodeWebcam = require("node-webcam");
const AdminService = require("./admin.service");
const nodemailer = require("nodemailer");
const { responseFun } = require("../../utils/common");
const logger = require("../../utils/loggers");

const webcam = NodeWebcam.create({ output: "jpeg", quality: 100 });

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harshsharma.cpl@gmail.com",
    pass: "rmyp kxbb xukt fcdy",
  },
});

function sendEmail(imagePath) {
  return {
    from: "harshsharma.cpl@gmail.com",
    to: "s_harsh@controlprint.com",
    subject: "Unauthorised Access",
    text: `Hello, This is System Genrated Email. Someone is trying to create the Admin. Please Check Admin Site.`,
    attachments: [
      {
        filename: "image.jpeg",
        path: imagePath,
      },
    ],
  };
}

module.exports = {
  addadmin: async (req, res) => {
    try {
      const timestamp = new Date().getTime();
      const imagePath = `src/image/image_${timestamp}.jpg`;

      logger.info(`API: "addadmin" request-Data: ${JSON.stringify(req.body)}`);

      if (
        req.body.UniqueCode !== "UnIqUe001Ayurveda" ||
        req.body.UniqueCode == "" ||
        req.body.UniqueCode == undefined
      ) {
        webcam.capture(imagePath, (err, data) => {
          if (!err) {
            const maildetails = sendEmail(imagePath);
            mailTransporter.sendMail(maildetails, function (err, data) {
              if (err) {
                console.log("Error Occurs", err);
              } else {
                console.log("Email sent successfully");
              }
            });
          } else {
            console.error(`Error capturing image: ${err}`);
          }
        });

        return res.json({
          status: 0,
          message: "Error in Creating Admin. Contact Administrator",
          data: null,
        });
      }

      var hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      let resObj = await AdminService.addadmin(req.body);
      let data = responseFun(resObj);
      console.log(data);
      logger.info(`API: addadmin response-Data: ${JSON.stringify(data)}`);
      res.status(200).send(data);

      if (data.status == 1) {
        const maildetails = {
          from: "harshsharma.cpl@gmail.com",
          to: "s_harsh@controlprint.com",
          subject: "New Admin Created",
          html: `<div>Hello, This is System Genrated Email. a New Admin is Successfully Added in the Admin Site. If not Done By You Please Check the admin site.</div><div> The New Admin all Details are Mentioned Below.<br></br><div>_id: ${data.data._id}</div> <div>Name: ${data.data.firstName} ${data.data.lastName}</div><div>Email: ${data.data.email}</div><div>Mobile: ${data.data.mobileNumber}</div><div>userName: ${data.data.userName}</div>`,
        };

        mailTransporter.sendMail(maildetails, function (err) {
          if (err) {
            console.log("Error Occurs", err);
          } else {
            console.log("Email sent successfully");
          }
        });
      } else {
        const maildetails = sendEmail(imagePath);
        mailTransporter.sendMail(maildetails, function (err) {
          if (err) {
            console.log("Error Occurs", err);
          } else {
            console.log("Email sent successfully");
          }
        });
      }
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

  loginadmin: async (req, res) => {
    try {
      if (
        req.body.SecretKey == "" ||
        req.body.SecretKey == undefined ||
        req.body.SecretKey !== "GauMauj53"
      ) {
        return res.json({
          status: 0,
          message: "Secret field Key is required",
          data: {},
        });
      }
      if (req.body.password == "" || req.body.password == undefined) {
        return res.json({
          status: 0,
          message: "password field is required",
          data: {},
        });
      }
      let resObj = await AdminService.Loginadmin(req.body);
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
