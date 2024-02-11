const URL = require("../models/url");
async function handleGenerateShortUrl(req, res) {
  const { nanoid } = await import("nanoid"); // Use dynamic import
  const shortId = nanoid(8);
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: "url is required" });
  }

  await URL.create({
    shortId: shortId,
    redirectUrl: req.body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  res.status(201).json({ shortId: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId: shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateShortUrl, handleGetAnalytics };
