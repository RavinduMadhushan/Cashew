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
  moisture: {
    type: Number,
    required: true,
  },
  purchasedate: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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

exports.Purchase = Purchase;
// exports.validate = validateUser;
