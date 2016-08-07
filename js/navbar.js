
$(document).ready(function(){
	
	$('#navBar > ul > li').mouseenter(function(){
		$('#navBar > ul > li').each(function(){
			$(this).css('border-bottom',0);
		});
		if ($(this).index() != 0){		$(this).css('border-bottom','3px solid white'); }
	});
	$('#navBar > ul > li').mouseleave(function(){
		$('#navBar > ul > li').each(function(){
			$(this).css('border-bottom',0);
		});
		$('#navBar > ul > li:nth-child('+childSlideIndex+2+')').css('border-bottom','3px solid white');
	});
	

});
