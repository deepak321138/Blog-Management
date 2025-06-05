const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 8085;
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => {
  res.send("Hello with Node.js!");
});

app.use(morgan(':method :url :status :response-time ms - :date[iso]'));

app.use("/api", require("./api"));


app.listen(PORT, () => {
  console.log(`Server Running here :point_right: https://localhost:${PORT}`);
});