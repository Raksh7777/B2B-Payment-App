//const path=require('path')
//require('dotenv').config({ path: path.join(__dirname, '.env') })
const bodyParser = require("body-parser");
require("dotenv-flow").config();
const express = require("express");
const helmet = require("helmet");
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());

app.use(bodyParser.json({ limit: "2gb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "2gb", extended: true }));
//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => res.send(`<h1> Hello from node.js</h1>`));

const loginroute = require("./src/routes/User");
app.use("/", loginroute);

//app.use('/v',loginroute)

app.listen(port, () => {
  console.log(`Server running at ${port} !!`);
});
