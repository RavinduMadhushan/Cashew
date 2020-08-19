const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
  },
  productDescription: {
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

const Product = mongoose.model("Product", productSchema);

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

exports.Product = Product;
// exports.validate = validateUser;
