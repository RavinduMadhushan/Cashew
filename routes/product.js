const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const _ = require("lodash");


router.post("/new", async (req, res) => {
  //   console.log(req.body);
//   let supplier = await Purchase.findOne({
//     $and: [{ supplierCode: req.body.suppliercode }]
//   });

//   if (supplier) {
//     return res
//       .status(200)
//       .send({ error: true, messege: "Already have a Supllier Name" });
//   }

  let product = new Product({
   descrption: req.body.descrption,
    code: req.body.code,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now()
  });

  await product.save();
  //   console.log(req);

  res.status(200).send({ error: false, success: true });
});

router.get("/getAll", async (req, res) => {
  let result = await Product.find({})
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

module.exports = router;