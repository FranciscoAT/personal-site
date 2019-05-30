const express = require("express");
const path = require("path");
const router = express.Router();

// index
let indexRouter = require(route("index"));

router.use("/", indexRouter);

// ----- Helper Functions -----

function route(routeName) {
    return path.join(__dirname, routeName);
}

module.exports = router;
