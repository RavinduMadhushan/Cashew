const { Arrival } = require("../models/arrival");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/new", async (req, res) => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);

  let arrival = new Arrival({
    purchase: req.body.purchase,
    arrivalDate: date.getTime(),
    arrivalTime: Date.now(),
    quantity: req.body.quantity,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await arrival.save();

  res.status(200).send({ error: false, success: true });
});

router.post("/getAll", async (req, res) => {
  let result = await Arrival.find({})
    .populate({
      path: "purchase",
      populate: { path: "supplier" },
    })
    .populate("purchase.supplier")
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/update", async (req, res) => {
  let result = await Arrival.findByIdAndUpdate(req.body.id, {
    ...req.body.entity,
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  res.status(200).send({ error: false, data: result });
});

module.exports = router;
