const express = require("express");
const { pingServer } = require("./../controllers/appController");

const router = express.Router();

router.route("/").get(pingServer);

module.exports = router;
