
$(document).ready(function(){
	
	$(".topMenu").mouseenter(function(){
		if (parentSlideIndex == 1 || parentSlideIndex == 2) { // for "work" (parentslideindex == 1) and "contact" (2) slides, color the underline black since background will be white
			$('.bottom').css('background-color','black');
		} else {
			$('.bottom').css('background-color','white'); // in the "about" (parentslideindex == 0) color the underline white
		}
		$(this).find('.bottom').css('width','0%').css('position','relative').css('float','left');
		// $(this).find('.bottom').css('left','0px');
		$(this).find('.bottom').stop().animate({
			width : "100%"
		}, 500, function(){}); 
		//
		//
	});
	$(".topMenu").mouseleave(function(){
		
		$(this).find('.bottom').css('width','100%').css('position','relative').css('float','right');
		$(this).find('.bottom').stop().animate({
			width : "0%"
		}, 500, function(){}); 
	});
});


