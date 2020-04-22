window.addEventListener("load", (event) => {

	var socket = io("http://localhost:8080/");

	function renderMessage(message){
		$("#messages").append("<h2 id='data'>" + message.username + ": " + message.message + "</h2>");
	};

	socket.on("recivedMessage", function(message){
		renderMessage(message);
	});


	const form = document.querySelector(".form");
	form.addEventListener("submit", (event) => {

		event.preventDefault();

		var usr = document.querySelector("#usr").value;
		var msg = document.querySelector("#msg").value;

		const Object =  {
			username: usr,
			message: msg
		};

		socket.emit("sendMessage", Object);
		renderMessage(Object);

	});


});
