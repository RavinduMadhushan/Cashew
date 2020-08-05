const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/new", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res
      .status(200)
      .send({ error: true, message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res
      .status(200)
      .send({ error: true, message: "User already registered." });
  }

  user = new User({
    name: req.body.name,
    type: req.body.type,
    email: req.body.email,
    password: req.body.password,
    approvalStatus: "Pending",
    createdBy: req.body._id,
    createdAt: Date.now(),
    lastModifiedBy: req.body._id,
    lastModifiedAt: Date.now()
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(200).send(_.pick(user, ["name", "email", "type", "_id"]));
});

module.exports = router;
