const express = require("express");
const router = express.Router();
const {
  handlegenerateNewShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

router.post("/", handlegenerateNewShortUrl);

router.get("/analytics/:id", handleGetAnalytics);
module.exports = router;
