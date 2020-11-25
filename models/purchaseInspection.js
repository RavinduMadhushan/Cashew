const Joi = require("joi");
const mongoose = require("mongoose");

const purchaseInspectionSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  sampleRawNutQty: {
    type: Number,
    required: true,
  },
  inspectedQty: {
    type: Number,
    required: true,
  },
  good: {
    type: Number,
    required: true,
  },
  spotted: {
    type: Number,
    required: true,
  },
  preMature: {
    type: Number,
    required: true,
  },
  rotten: {
    type: Number,
    required: true,
  },
  humidified: {
    type: Number,
    required: true,
  },
  sampleWeightwithshells: {
    type: Number,
    required: true,
  },
  healthyKernelsHusk: {
    type: Number,
    required: true,
  },
  acceptedKernels: {
    type: Number,
    required: true,
  },
  immaturePrickedkernelsShells: {
    type: Number,
    required: true,
  },
  rejectedKernelsShells: {
    type: Number,
    required: true,
  },
  moistureContent: {
    type: Number,
    required: true,
  },
  graining: {
    type: Number,
    required: true,
  },
  defectRate: {
    type: Number,
    required: true,
  },
  kor: {
    type: Number,
    required: true,
  },
  ra: {
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

const PurchaseInspection = mongoose.model(
  "PurchaseInspection",
  purchaseInspectionSchema
);

// function validateUser(user) {
//   const schema = {
//     name: Joi.string()
//       .min(5)
//       .max(50)
//       .required(),
//     type: Joi.string(),
//     email: Joi.string()
//       .min(5)
//       .max(255)
//       .required()
//       .email(),
//     password: Joi.string()
//       .min(5)
//       .max(1000)
//       .required(),
//     confirmpassword: Joi.string()
//       .min(5)
//       .max(1000)
//       .required(),
//     _id: Joi.string()
//   };

//   return Joi.validate(user, schema);
// }

exports.PurchaseInspection = PurchaseInspection;
// exports.validate = validateUser;
