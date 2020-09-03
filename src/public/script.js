window.addEventListener("load", (event) => {

	var socket = io();

	function renderMessage(message){
		$("#messages").append("<h2 id='data'>" + message.username + ": " + message.message + "</h2>");
	};

	function renderMyMessage(message){
		$("#messages").append("<h2 id='data'>Eu: " + message.message + "</h2>");
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


	const form = document.querySelector(".form");
	form.addEventListener("submit", (event) => {

		event.preventDefault();

		var usr = document.querySelector("#usr").value;
		var msg = document.querySelector("#msg").value;

		if (usr == "" || msg == ""){
			window.navigator.vibrate(200);
			window.alert("Fill in all fields!");
		}else{

			const Object =  {
				username: usr,
				message: msg
			};

			socket.emit("sendMessage", Object);
			renderMyMessage(Object);

		};

	});


});
