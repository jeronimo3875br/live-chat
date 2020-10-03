window.addEventListener("load", (event) => {

	$('#loginModal').modal("show")
	
	const formLogin = document.querySelector("#getUser");
	
	formLogin.addEventListener("submit", (event) => {
		
		event.preventDefault();
		
		let user = document.querySelector("#usr").value;
		
		window.localStorage.setItem("user", user);
		
		$("#loginModal").modal("hide");
		
	});

	var socket = io();

	function renderMessage(message){
		$("#messages").append("<strong>" + message.username + ": " + message.message + "</strong><hr/>");
	};

	function renderMyMessage(message){
		$("#messages").append("<strong style='color: #4282FD'>Eu: " + message.message + "</strong><hr/>");
	};

	socket.on("recivedMessage", function(message){
		window.navigator.vibrate(200);
		renderMessage(message);
	});

	socket.on("previusMessages", function(messages){
		for (message of messages){
			renderMessage(message);
		};
	});

	function htmlEscape(text) {
		return text.replace(/&/g, '&amp;').
			replace(/</g, '&lt;').
			replace(/"/g, '&quot;').
			replace(/'/g, '&#039;');
	};

	const form = document.querySelector("#messageForm");
	form.addEventListener("submit", (event) => {

		event.preventDefault();

		window.navigator.vibrate(200);

		var usr = htmlEscape(window.localStorage.getItem("user"));

		var msg = htmlEscape(document.querySelector("#msg").value);

		const Object = {
			username: (usr == null) ? "Anônimo" : usr,
			message: msg
		};

                socket.emit("sendMessage", Object);
		renderMyMessage(Object);

		return document.querySelector("#msg").value = "";

	});

});
