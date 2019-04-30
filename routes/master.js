const express = require("express");
const router = express.Router();

// index
let indexRouter = require("./index.js");

router.use("/", indexRouter);

module.exports = router;
