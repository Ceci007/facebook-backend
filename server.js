const express = require("express");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
/*
let allowed = ["http://localhost:3000", "other link"];

function options(req, res) {
  let tmp;
  let origin = req.header("Origin");

  if (allowed.indexOf(origin) !== -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: false,
    };
  }

  res(null, tmp);
}*/

const app = express();
app.use(express.json());
app.use(cors(/*options*/));

// routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully!"))
  .catch((err) => console.log("connection error", err));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});
