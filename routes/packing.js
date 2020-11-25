const { Packet } = require("../models/Packet");
const { PackingList } = require("../models/PackingList");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { padZeros } = require("../utils");

router.post("/new", async (req, res) => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);

  let packets = req.body.packingList;

  let _packets = [];

  for (let index = 0; index < packets.length; index++) {
    const element = packets[index];
    for (let j = 0; j < parseInt(element.quantity); j++) {
      const _packet = element;
      _packets.push({
        weight: parseInt(_packet.weight),
        batch: element.batch,
        expiryDate: element.expiryDate,
        manufacturingDate: element.manufacturingDate,
        maxRetailPrice: parseInt(_packet.maxRetailPrice),
        packed: false,
        approvalStatus: "Pending",
        createdBy: req.body._id,
        createdAt: Date.now(),
        lastModifiedBy: req.body._id,
        lastModifiedAt: Date.now(),
      });
    }
  }

  let result = await Packet.insertMany(_packets, { rawResult: true });

  let ids = Object.values(result.insertedIds);

  let count = await PackingList.count();

  let packinglist = new PackingList({
    packingListCode: "PL-" + padZeros(count),
    batch: packets[0].batch,
    packets: ids,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now(),
  });

  await packinglist.save();

  res.status(200).send({ error: false, success: true });
});

router.post("/getAll", async (req, res) => {
  let result = await PackingList.find({})
    .populate("packets")
    .populate("batch")
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

router.post("/id", async (req, res) => {
  let result = await PackingList.findById(req.body.id)
    .populate("packets")
    .populate("createdBy")
    .populate("lastModifiedBy");

  res.status(200).send({ error: false, data: result });
});

module.exports = router;
