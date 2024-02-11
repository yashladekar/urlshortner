const express = require("express");
const router = express.Router();
// const URL = require("../models/url");
const {
  handleGenerateShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

router.get("/", (req, res) => {
  res.send("url get route");
});

router.post("/", handleGenerateShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
