var english = true;

$(document).ready(function(){						

	$(document).on('click','#langSelector .unselected',function(){
		english = !english;
		if (english) {
			//SetNavigationColor("white");
			//$('#aboutImage').animate({ opacity : 0 }, 
			//	500, 
			//	function(){ 
			//		$(this)
			//			.css('background-image','url("css/img/b3_lights.jpg")')
			//			.css('opacity','1');
			//	}
			//);	
			$('.english').show();		
			$('.korean').hide();		
			$('#langSelector .en').addClass('selected');		
			$('#langSelector .en').removeClass('unselected');
			$('#langSelector .kr').removeClass('selected');		
			$('#langSelector .kr').addClass('unselected');		
		} else {
			//SetNavigationColor("black");
			//$('#aboutImage .korean').css('opacity','1'); 
			//$('#aboutImage .english').animate({ opacity : 0 },
			//	500,
			//	function(){
			//		$(this)
			//			.css('background-image','url("css/img/b1_flower.jpg")')
			//			.css('opacity','1');
			//	}
			//);
			$('.korean').show();		
			$('.english').hide();	
			$('#langSelector .kr').addClass('selected');		
			$('#langSelector .kr').removeClass('unselected');
			$('#langSelector .en').removeClass('selected');		
			$('#langSelector .en').addClass('unselected');		
			
		}
	});
});

