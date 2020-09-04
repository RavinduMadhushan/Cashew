const Joi = require("joi");
const mongoose = require("mongoose");

const arrivalSchema = new mongoose.Schema({
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase",
  },
  arrivalDate: {
    type: Number,
    required: true,
  },
  arrivalTime: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
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

const Arrival = mongoose.model("Arrival", arrivalSchema);

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

exports.Arrival = Arrival;
// exports.validate = validateUser;
