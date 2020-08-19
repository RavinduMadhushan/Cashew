const { Supplier, validate } = require("../models/supplier");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/new", async (req, res) => {
  console.log(req.body);
  let supplier = await Supplier.findOne({
    supplierCode: req.body.suppliercode,
  });

  if (supplier) {
    return res
      .status(200)
      .send({ error: true, messege: "Already have a Supllier Name" });
  }

  let new_supplier = new Supplier({
    supplierCode: req.body.supplierCode,
    supplierAddress: req.body.supplierAddress,
    supplierDescription: req.body.supplierDescription,
    supplierName: req.body.supplierName,
    supplierNumber: req.body.supplierNumber,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await new_supplier.save();

  res.status(200).send({ error: false, success: true });
});

router.post("/getAll", async (req, res) => {
  let result = await Supplier.find({})
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/update", async (req, res) => {
  let result = await Supplier.findByIdAndUpdate(req.body.id, {
    ...req.body.entity,
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });
  res.status(200).send({ error: false, data: result });
});

module.exports = router;
