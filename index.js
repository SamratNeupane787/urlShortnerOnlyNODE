const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");

const { connectToMongo } = require("./connect");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", urlRoute);

app.use("/", staticRouter);
app.get("/url/:shortId", async (req, res) => {
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
