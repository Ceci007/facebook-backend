const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
let allowed = ["http://localhost:3000", "other link"];

function options(req, res) {
  let tmp;
  let origin = req.header("Origin");

  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: "No",
    };
  }

  res(null, tmp);
}

const app = express();
app.use(cors(options));

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.listen(8000, () => {
  console.log("server is lestining...");
});
