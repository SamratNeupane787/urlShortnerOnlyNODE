const express = require("express");
const app = express();
const port = 3000;
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const { connectToMongo } = require("./connect");
app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
connectToMongo("mongodb://localhost:27017/ShortUrl")
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch(() => {
    console.log("Failed To Connect with Database");
  });

app.listen(port, () => {
  console.log(`Server started at PORT : ${port}`);
});
