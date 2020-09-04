const { Product, Purchase } = require("../models/purchase");
const { PurchaseInspection } = require("../models/purchaseInspection");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/new", async (req, res) => {
  let purchaseInspection = new PurchaseInspection({
    purchase: req.body.purchase,
    sampleRawNutQty: req.body.sampleRawNutQty,
    inspectedQty: req.body.inspectedQty,
    good: req.body.good,
    spotted: req.body.spotted,
    preMature: req.body.preMature,
    rotten: req.body.rotten,
    humidified: req.body.humidified,
    sampleWeightwithshells: req.body.sampleWeightwithshells,
    healthyKernelsHusk: req.body.healthyKernelsHusk,
    acceptedKernels: req.body.acceptedKernels,
    immaturePrickedkernelsShells: req.body.immaturePrickedkernelsShells,
    rejectedKernelsShells: req.body.rejectedKernelsShells,
    moistureContent: req.body.moistureContent,
    graining: req.body.graining,
    defectRate: req.body.defectRate,
    kor: req.body.kor,
    ra: req.body.ra,
    defectRate: req.body.defectRate,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await purchaseInspection.save();

  let purchase = await Purchase.findByIdAndUpdate(req.body.purchase, {
    purchaseInspection: purchaseInspection._id,
  });

  res.status(200).send({ error: false, success: true });
});

router.post("/getAll", async (req, res) => {
  let result = await PurchaseInspection.find({})
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/update", async (req, res) => {
  let result = await PurchaseInspection.findByIdAndUpdate(req.body.id, {
    ...req.body.entity,
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  res.status(200).send({ error: false, data: result });
});

router.post("/id", async (req, res) => {
  console.log(req.body);

  let result = await PurchaseInspection.findById(req.body.id);

  res.status(200).send({ error: false, data: result });
});

module.exports = router;
