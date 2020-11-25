const Joi = require("joi");
const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batchCode: {
    type: String,
    required: true,
  },
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Purchase",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  stage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cuttinginputdate: {
    type: Number,
  },
  cuttinginputtime: {
    type: Number,
  },
  cuttingoutputdate: {
    type: Number,
  },
  cuttingoutputtime: {
    type: Number,
  },
  dryingoutputdate: {
    type: Number,
  },
  dryingoutputtime: {
    type: Number,
  },
  peelingoutputdate: {
    type: Number,
  },
  peelingoutputtime: {
    type: Number,
  },
  cuttingWeight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CuttingWeight",
  },
  peelingWeight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PeelingWeight",
  },
  dryingWeight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DryingWeight",
  },
  purchaseInspection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseInspection",
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

const Batch = mongoose.model("Batch", batchSchema);

exports.Batch = Batch;
