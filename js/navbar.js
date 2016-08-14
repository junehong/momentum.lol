
$(document).ready(function(){
	
	$(".topMenu").mouseenter(function(){
		console.log('mousen');
		$(this).find('.bottom').css('width','0%').css('position','relative').css('float','left');
		// $(this).find('.bottom').css('left','0px');
		$(this).find('.bottom').stop().animate({
			width : "100%"
		}, 500, function(){}); 
		//
		//
	});
	$(".topMenu").mouseleave(function(){
		console.log('leave');
		$(this).find('.bottom').css('width','100%').css('position','relative').css('float','right');
		$(this).find('.bottom').stop().animate({
			width : "0%"
		}, 500, function(){}); 
	});
});


