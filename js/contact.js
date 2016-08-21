$(document).ready(function(){
	// Highlight all text when user selects input field
	$("input[type='text']").focus(function () {
	   $(this).select();
		$(this).css('color','#333');
	});

	$("textarea").focus(function() {
		var $this = $(this);
		$this.select();
		$(this).css('color','#333');

		// Work around Chrome's little problem
		$this.mouseup(function() {
			// Prevent further mouseup intervention
			$this.unbind("mouseup");
			return false;
		});
	});
	
	


}); 

function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		console.log('email:'+email+' was valid? ' +re.test(email));
        return re.test(email);
}
function saveContact(){
		$('#emailError').css('display','none');
		$('#nameError').css('display','none');
		if (validateEmail($('#email').val()) && $('#name').val() != "Your Name"){
			var name = $('#name').val();
			var email = $('#email').val();
			var select = $( "#select option:selected" ).text();
			var message = $('#message').val();
			var myData = {"name" : name, "email" : email, "message": message, "select" : select};
			$.ajax({
				url: "contact.php",
				//url: "https://docs.google.com/forms/d/19nnHJID3OwZsOsIxymsSmORnua58wTBsh8P2b1uqkfs/formResponse",
				data: myData,
				type: 'POST',
				success:function(jsonString){
					data= JSON.parse(jsonString);
					if (data['success']) {
						// alert(data['success']); 
						$('#contactInner').hide();
						$('#contactAfter').show();
					} else if (data['error']) alert(data['error']); 
				} 
			});
	} else {
		if (!validateEmail($('#email').val())) $('#emailError').css('display','block');
		if ($('#name').val() == "Your Name") $('#nameError').css('display','block');
	}
}
function saveContactKr(){
		$('#emailError_kr').css('display','none');
		$('#nameError_kr').css('display','none');
		if (validateEmail($('#email_kr').val()) && $('#name_kr').val() != "Your Name"){
			var name = $('#name_kr').val();
			var email = $('#email_kr').val();
			var select = $( "#select_kr option:selected" ).text();
			var message = $('#message_kr').val();
			var myData = {"name" : name, "email" : email, "message": message, "select" : select};
			console.log('mydata:'+myData+',name,email,select,message:'+name+','+email+','+select+','+message);
			$.ajax({
				url: "contact.php",
				//url: "https://docs.google.com/forms/d/19nnHJID3OwZsOsIxymsSmORnua58wTBsh8P2b1uqkfs/formResponse",
				data: myData,
				type: 'POST',
				success:function(jsonString){
					data= JSON.parse(jsonString);
					console.log('data:'+data);
					if (data['success']) {
						// alert(data['success']); 
						$('#contactInner_kr').hide();
						$('#contactAfter').show();
					} else if (data['error']) alert(data['error']); 
				} 
			});
	} else {
		if (!validateEmail($('#email_kr').val())) $('#emailError_kr').css('display','block');
		if ($('#name_kr').val() == "Your Name") $('#nameError_kr').css('display','block');
	}
}
