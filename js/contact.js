 function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}
function postContactToGoogle(){
	var name = $('#name').val();
	var email = $('#email').val();
	var feed = $('#message').val();
	if (true){ //(name !== "") && (email !== "") && ((feed !== "") && (validateEmail(email)))) {
		$.ajax({
			url: "https://docs.google.com/spreadsheets/d/1Apy6bzPZjlx0fQkkGjM46RBu4joNLR0Id7aM8giHhRs/formResponse",

//			url: "https://docs.google.com/yourFormURL/formResponse",
			data: {"entry.1" : name, "entry.3" : email, "entry.4": feed},
			type: "POST",
			dataType: "xml",
			statusCode: {
				0: function (){

					$('#name').val("");
					$('#email').val("");
					$('#message').val("");
	
					//Success message
				},
				200: function (){
					$('#name').val("");
					$('#email').val("");
					$('#message').val("");
					//Success Message
				}
			}
		});
	}
	else {
		console.log('no');
		//Error message
	}
}
