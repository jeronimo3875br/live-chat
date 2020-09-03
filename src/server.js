"use strict"

const app = require("./app");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 8080;

app.set("port", port);
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

});
