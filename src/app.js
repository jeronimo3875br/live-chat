"use strict"

const express = require("express");
const path = require("path");

const cors = require("cors");

const routeIndex = require("./routes/index.js");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", routeIndex);

app.use(cors());

module.exports = app;
