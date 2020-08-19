const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierCode: {
    type: String,
    required: true,
    unique: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  supplierDescription: {
    type: String,
  },
  supplierAddress: {
    type: String,
    required: true,
  },
  supplierNumber: {
    type: String,
    required: true,
  },
  approvalStatus: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Number,
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lastModifiedAt: {
    type: Number,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

exports.Supplier = Supplier;
