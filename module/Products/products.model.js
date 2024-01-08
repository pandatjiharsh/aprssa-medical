const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddDeliveryIntentschema = new mongoose.Schema({
  companyCode: { type: String, default: "", required: true },
  diNo: { type: String, default: "", required: true },
  diDate: { type: Date, default: Date.now, required: true },
  truckNo: { type: String, default: "", required: true },
  productCode: { type: String, default: "", required: true },
  mrp: { type: Number, default: "", required: true },
  quantity: { type: Number, default: "", required: true },
  location: { type: String, default: "", required: true },
  PrintedQTY: { type: Number, default: 0 },
  bagCountQTY1: { type: Number, default: 0 },
  bagCountQTY2: { type: Number, default: 0 },
  bagCountQTY3: { type: Number, default: 0 },
  bagCountQTY4: { type: Number, default: 0 },
  status: { type: Number, default: 1 },
  printStatus: { type: Number, default: 0 },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

AddDeliveryIntentschema.pre("updateOne", function (next) {
  this.updateOne({}, { $set: { updateDate: { $currentDate: true } } });
  next();
});

const tbl_Delivery_Intent = mongoose.model(
  "AddDeliveryIntent",
  AddDeliveryIntentschema,
  "tbl_Delivery_Intent"
);

module.exports = { tbl_Delivery_Intent };
