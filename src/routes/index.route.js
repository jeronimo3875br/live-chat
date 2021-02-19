"use strict";

const { Router } = require("express");

const router = Router();

router("/", (req, res) => {
    res.sendFile("index.html");
});

module.exports = router;