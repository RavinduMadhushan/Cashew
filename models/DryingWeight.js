const Joi = require("joi");
const mongoose = require("mongoose");

const dryingWeightSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
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

const DryingWeight = mongoose.model("DryingWeight", dryingWeightSchema);

exports.DryingWeight = DryingWeight;
