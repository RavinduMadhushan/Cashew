const { Batch } = require("../models/batch");
const { CuttingWeight } = require("../models/CuttingWeight");
const { PeelingWeight } = require("../models/PeelingWeight");
const { DryingWeight } = require("../models/DryingWeight");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { padZeros } = require("../utils");

router.post("/new", async (req, res) => {
  let count = await Batch.count();

  let date = new Date();
  date.setHours(0, 0, 0, 0);

  let product = new Batch({
    batchCode: "B-" + padZeros(count),
    purchase: req.body.purchase,
    product: req.body.product,
    stage: "cutting",
    quantity: req.body.quantity,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
    cuttinginputdate: date.getTime(),
    cuttinginputtime: Date.now(),
  });

  await product.save();

  res.status(200).send({ error: false, success: true });
});

router.post("/getAll", async (req, res) => {
  let result = await Batch.find({})
    .populate("product")
    .populate({
      path: "purchase",
      populate: { path: "supplier" },
    })
    .populate("cuttingWeight")
    .populate("peelingWeight")
    .populate("dryingWeight")
    .populate("purchaseInspection")
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/getFinished", async (req, res) => {
  let result = await Batch.find({ stage: "finishing" })
    .populate("product")
    .populate({
      path: "purchase",
      populate: { path: "supplier" },
    })
    .populate("cuttingWeight")
    .populate("peelingWeight")
    .populate("dryingWeight")
    .populate("purchaseInspection")
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/update", async (req, res) => {
  let result = await Batch.findByIdAndUpdate(req.body.id, {
    ...req.body.entity,
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  res.status(200).send({ error: false, data: result });
});

router.post("/id", async (req, res) => {
  let result = await Batch.findById(req.body.id)
    .populate("product")
    .populate({
      path: "purchase",
      populate: { path: "supplier" },
    })
    .populate("cuttingWeight")
    .populate("peelingWeight")
    .populate("dryingWeight")
    .populate("purchaseInspection")
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/cuttingWeight", async (req, res) => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);

  await CuttingWeight.findOneAndRemove({ batch: req.body.batch });

  let cuttingWeight = new CuttingWeight({
    husk: parseFloat(req.body.husk).toFixed(3),
    kernel: parseFloat(req.body.kernel).toFixed(3),
    batch: req.body.batch,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await cuttingWeight.save();

  await Batch.findByIdAndUpdate(req.body.batch, {
    cuttingWeight: cuttingWeight._id,
    stage: "drying",
    cuttingoutputdate: date.getTime(),
    cuttingoutputtime: Date.now(),
  });

  res.status(200).send({ error: false, data: cuttingWeight });
});

router.post("/peelingWeight", async (req, res) => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);

  await PeelingWeight.findOneAndRemove({ batch: req.body.batch });

  let peelingWeight = new PeelingWeight({
    whole: parseFloat(req.body.whole).toFixed(3),
    split: parseFloat(req.body.split).toFixed(3),
    pieces: parseFloat(req.body.pieces).toFixed(3),
    batch: req.body.batch,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await peelingWeight.save();

  let result = await Batch.findByIdAndUpdate(req.body.batch, {
    peelingWeight: peelingWeight._id,
    stage: "finishing",
    peelingoutputdate: date.getTime(),
    peelingoutputtime: Date.now(),
  });

  console.log(result);
  res.status(200).send({ error: false, data: peelingWeight });
});

router.post("/dryingWeight", async (req, res) => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);

  await PeelingWeight.findOneAndRemove({ batch: req.body.batch });

  let dryingWeight = new DryingWeight({
    weight: parseFloat(req.body.weight).toFixed(3),
    batch: req.body.batch,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await dryingWeight.save();

  let result = await Batch.findByIdAndUpdate(req.body.batch, {
    dryingWeight: dryingWeight._id,
    stage: "peeling",
    dryingoutputdate: date.getTime(),
    dryingoutputtime: Date.now(),
  });

  console.log(result);
  res.status(200).send({ error: false, data: peelingWeight });
});

/* router.post("/drying", async (req, res) => {
  let result = await Batch.findByIdAndUpdate(req.body.batch, {
    stage: "peeling",
  });

  console.log(result);
  res.status(200).send({ error: false, data: result });
}); */

module.exports = router;
