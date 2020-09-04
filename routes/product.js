const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/new", async (req, res) => {
  let product = new Product({
    productDescription: req.body.productDescription,
    productCode: req.body.productCode,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await product.save();

  res.status(200).send({ error: false, success: true });
});

router.post("/getAll", async (req, res) => {
  let result = await Product.find({})
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/update", async (req, res) => {
  let result = await Product.findByIdAndUpdate(req.body.id,{...req.body.entity,lastModifiedBy : req.body._id, lastModifiedAt : Date.now()});

  res.status(200).send({ error: false, data: result });
});

module.exports = router;
