const sid = require("shortid");
const URL = require("../models/url");

async function handlegenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({
      error: "No Url Found",
    });
  const shortID = sid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortID;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handlegenerateNewShortUrl,
  handleGetAnalytics,
};
