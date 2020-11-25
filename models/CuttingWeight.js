const Joi = require('joi')
const mongoose = require('mongoose')

const cuttingWeightSchema = new mongoose.Schema({
  husk: {
    type: Number,
    required: true,
  },
  kernel: {
    type: Number,
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
  },
  approvalStatus: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Number,
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lastModifiedAt: {
    type: Number,
  },
})

const CuttingWeight = mongoose.model('CuttingWeight', cuttingWeightSchema)

exports.CuttingWeight = CuttingWeight
