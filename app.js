const express = require("express");
const app = express();
const port = 3000;
const urlRouter = require("./routes/url");
const connectDb = require("./config/DbConnection");
const bodyParser = require("body-parser");
const URL = require("./models/url");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");

const { restrictToLoggedInOnly } = require("./middlewares/auth");

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", restrictToLoggedInOnly, urlRouter); //inline middleware
app.use("/user", userRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!entry) {
    return res.status(404).json({ message: "url not found" });
  }
  res.redirect(entry.redirectUrl);
});

connectDb("mongodb://localhost:27017/url-shortener")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });

app.listen(port, () => {
  console.log(`server is started on port ${port} as http://localhost:${port}`);
});
