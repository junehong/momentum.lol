 function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}
function saveContact(){
		$('#emailError').css('display','none');
		$('#nameError').css('display','none');
	if (validateEmail($('#email').val()) && $('#name').val() != "Your Name"){
			var name = $('#name').val();
			var email = $('#email').val();
			var message = $('#message').val();
			var myData = {"name" : name, "email" : email, "message": message};
			$.ajax({
				url: "contact.php",
				//url: "https://docs.google.com/forms/d/19nnHJID3OwZsOsIxymsSmORnua58wTBsh8P2b1uqkfs/formResponse",
				data: myData,
				type: 'POST',
				success:function(jsonString){
					data= JSON.parse(jsonString);
					if (data['success']) alert(data['success']); 
					if (data['error']) alert(data['error']); 
				} 
			});
	} else {
		if (!validateEmail($('#email').val())) $('#emailError').css('display','block');
		if ($('#name').val() == "Your Name") $('#nameError').css('display','block');
	}
}

