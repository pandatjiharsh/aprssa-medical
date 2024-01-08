const mongoose = require("mongoose");
const { Schema } = mongoose;

const Addadminchema = new mongoose.Schema({
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
  mobileNumber: { type: Number, required: true, unique: true },
  userName: { type: String, default: "", required: true, unique: true },
  password: { type: String, default: "" },
});

const Addadmin = mongoose.model("Addadmin", Addadminchema, "tbl_admin");

module.exports = { Addadmin };
