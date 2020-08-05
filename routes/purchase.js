const { Purchase } = require("../models/purchase");
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

  let new_supplier = new Purchase({
   supplier: req.body.supplier,
    cost: req.body.cost,
    quantity: req.body.quantity,
    purchasedate: req.body.purchasedate,
    product: req.body.product,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now()
  });

  await new_supplier.save();
  //   console.log(req);

  res.status(200).send({ error: false, success: true });
});

router.get("/getAll", async (req, res) => {
  let result = await SupPurchaseplier.find({})
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

module.exports = router;