const Joi = require("joi");
const mongoose = require("mongoose");

const peelingWeightSchema = new mongoose.Schema({
  whole: {
    type: Number,
    required: true,
  },
  split: {
    type: Number,
    required: true,
  },
  pieces: {
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

const PeelingWeight = mongoose.model("PeelingWeight", peelingWeightSchema);

exports.PeelingWeight = PeelingWeight;
