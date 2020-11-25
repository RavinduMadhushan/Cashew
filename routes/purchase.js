const { Purchase } = require("../models/purchase");
const { Batch } = require("../models/batch");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { padZeros } = require("../utils");

router.post("/new", async (req, res) => {
  console.log(req.body);

  let user = await Purchase.findOne({ purchaseCode: req.body.purchaseCode });

  if (user) {
    return res
      .status(200)
      .send({ error: true, message: "Purchase Code already registered." });
  }

  let date = new Date();
  date.setHours(0, 0, 0, 0);

  let count = await Purchase.count();

  let purchase = new Purchase({
    purchaseCode: "I-" + padZeros(count),
    lot: "L-" + padZeros(count),
    supplier: req.body.supplier,
    cost: req.body.cost,
    quantity: req.body.quantity,
    purchasedate: date.getTime(),
    moisture: req.body.moisture,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await purchase.save();

  res.status(200).send({ error: false, success: true });
});

router.post("/getAll", async (req, res) => {
  let result = await Purchase.find({})
    .populate("purchaseInspection")
    .populate("product")
    .populate("supplier")
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/batches", async (req, res) => {
  console.log(req.body);
  let result = await Batch.find({ purchase: req.body.id })
    .populate("product")
    .populate("cuttingWeight")
    .populate("peelingWeight")
    .populate("dryingWeight")
    .populate("purchaseInspection")
    .populate("createdBy")
    .populate("lastModifiedBy");
  console.log(result);
  res.status(200).send({ error: false, data: result });
});

module.exports = router;
