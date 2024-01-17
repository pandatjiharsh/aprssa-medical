const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
  // #   UPC: { type: Number, default: "", required: true },
  companyCode: { type: String, default: "", required: true },
  ProductCode: { type: Number, unique: true, required: true },
  ProductName: { type: String, default: "", required: true },
  BrandName: { type: String, default: "", required: true },
  ManufactureAddress: { type: String, default: "" },
  mrp: { type: Number, default: "", required: true },
  weight: { type: Number, default: "" },
  quantity: { type: Number, default: "", required: true },
  ManufactureDate: { type: Date },
  ExpiryDate: { type: Date, default: Date.now },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  img: { type: Array, default: "" },
});

const tbl_Product = mongoose.model(
  "ProductSchema",
  ProductSchema,
  "tbl_Product"
);

module.exports = { tbl_Product };
