const Joi = require("joi");
const mongoose = require("mongoose");

const packingListSchema = new mongoose.Schema({
  packingListCode: {
    required: true,
    type: String,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
  packets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Packet",
      required: true,
    },
  ],
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

const PackingList = mongoose.model("PackingList", packingListSchema);

exports.PackingList = PackingList;
