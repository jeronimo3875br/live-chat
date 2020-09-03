"use strict"

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cors());

const index = express.Router().get("/", (req, res) => {
        res.sendFile("index.html");
});

app.use("/", index);

const port = process.env.PORT || 8080;

server.listen(port, console.log("\n\n[+] - Rodando: " + port));

var messages = [];

io.on("connection", socket => {

	console.log("\n\n[+] - Conectado: " + socket.id);

	socket.emit("previusMessages", messages);

	socket.on("sendMessage", data => {
		messages.push(data);
		console.log(data);
		socket.broadcast.emit("recivedMessage", data);
	});

	socket.on("disconnect", () => {
		console.log("\n\n" + socket.id + " - saiu!");
	});

});
