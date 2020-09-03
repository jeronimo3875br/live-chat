window.addEventListener("load", (event) => {
	
	const user = window.prompt("Enter Username: ");
	
	window.localStorage.setItem("user", user);

	var socket = io();

	function renderMessage(message){
		$("#messages").append("<strong>" + message.username + ": " + message.message + "</strong><hr/>");
	};

	function renderMyMessage(message){
		$("#messages").append("<strong style='color: #4282FD'>Eu: " + message.message + "</strong></hr></br>");
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


	const form = document.querySelector("form");
	form.addEventListener("submit", (event) => {

		event.preventDefault();

		window.navigator.vibrate(200);

		var usr = window.localStorage.getItem("user");
		var msg = document.querySelector("#msg").value;

		if (usr == "" || msg == ""){
			
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