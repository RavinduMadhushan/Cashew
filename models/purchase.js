const Joi = require("joi");
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  purchaseCode: {
    type: String,
    required: true,
  },
  lot: {
    type: String,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchasedate: {
    type: Number,
    required: true,
  },
  approvalStatus: {
    type: String,
    required: true,
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

const Purchase = mongoose.model("Purchase", purchaseSchema);

exports.Purchase = Purchase;
