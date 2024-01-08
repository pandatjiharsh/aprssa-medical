const mongoose = require("mongoose");
const { Schema } = mongoose;

const Adduserschema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: {
    type: String,
    default: "",
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Email must be in the @abc.xyz format",
    },
  },
  mobileNumber: { type: Number, required: true },
  userName: { type: String, default: "", required: true },
  password: { type: String, default: "" },
});

const Adduser = mongoose.model("Adduser", Adduserschema, "tbl_user");

module.exports = { Adduser };
