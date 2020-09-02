"use strict"

const express = require("express");
const path = require("path");

const routeIndex = require("./routes/index-route");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "../src/views");

app.use("/", routeIndex);
module.exports = app;
