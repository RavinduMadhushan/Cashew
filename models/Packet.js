const Joi = require("joi");
const mongoose = require("mongoose");

const packetSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
  expiryDate: {
    type: Number,
    required: true,
  },
  manufacturingDate: {
    type: Number,
    required: true,
  },
  maxRetailPrice: {
    type: Number,
    required: true,
  },
  packed: {
    type: Boolean,
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

const Packet = mongoose.model("Packet", packetSchema);

exports.Packet = Packet;
