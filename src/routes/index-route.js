const express = require("express");
const router = express.Router();

router.get("/", async(req, res, next) => {
	res.renderFile("index.html");
});


module.exports = router;
