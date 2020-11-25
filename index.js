const express = require("express");
const compression = require("compression");
const app = express();
require("express-async-errors");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const users = require("./routes/users");
const auth = require("./routes/auth");
const suppliers = require("./routes/suppliers");
const product = require("./routes/product");
const purchase = require("./routes/purchase");
const purchaseInspection = require("./routes/purchaseInspection");
const arrivals = require("./routes/arrival");
const batch = require("./routes/batch");
const packing = require("./routes/packing");

const multer = require("multer");
const mongoose = require("mongoose");

const https = require("https");
const fs = require("fs");

const https_port = 5001;
const http_port = 5001;

const db_name = "Cashew";
const environment = process.env.environment || "dev";

app.use(compression());
app.use(express.static("logs"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("uploads"));
app.use(cors());

const accessLogStream = fs.createWriteStream("./logs/outfit.log", {
  flags: "a",
});

app.use(morgan("common", { stream: accessLogStream }));
app.use(morgan("dev"));
app.use("/api/user", users);
app.use("/api/products", product);
app.use("/api/purchases", purchase);
app.use("/api/auth", auth);
app.use("/api/supplier", suppliers);
app.use("/api/purchaseInspection", purchaseInspection);
app.use("/api/arrivals", arrivals);
app.use("/api/batch", batch);
app.use("/api/packing", packing);

const uri =
  "mongodb+srv://oqtavelabs:reactangular@cluster0-euzgp.gcp.mongodb.net/test";

const url = "mongodb://35.197.129.105:27017";

mongoose
  .connect(uri, {
    dbName: db_name,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((value) => {
    console.log(`Connected to database : ${db_name}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(http_port, () => {
  console.log(`http Server is listening on port : ${http_port}`);
});

if (environment == "production") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/oqtaveoutfit.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/oqtaveoutfit.com/cert.pem",
    "utf8"
  );
  const credentials = { key: privateKey, cert: certificate };

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(https_port, () => {
    console.log(`https Server is listening on port ${https_port}`);
  });
}
