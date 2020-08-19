const { Purchase } = require("../models/purchase");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/new", async (req, res) => {
  console.log(req.body);

  let date = new Date();
  date.setHours(0, 0, 0, 0);

  let purchase = new Purchase({
    purchaseCode: req.body.purchaseCode,
    lot: req.body.lotno,
    supplier: req.body.supplier,
    cost: req.body.cost,
    quantity: req.body.quantity,
    purchasedate: date.getTime(),
    product: req.body.product,
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
    .populate("product")
    .populate("supplier")
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

module.exports = router;
