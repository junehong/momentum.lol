var parentSlideIndex = 0; // About, Work, Contact. 3 only
var childSlideIndex = 0; // About has 3, Work as 3, Contact has only 1.
var maxAboutSlides = 3;
var maxWorkSlides = 6;
var deltaScrollY = 0;
var lastScrollY = 0;
var numSlides = 3; // gotta be a more elegant way than to hardcode the number of slides. I guess classing each slide div and then counting them? Meh.
var scrolling = false;


var resizeTimeoutFn;
$(document).ready(function(){
	MoveToSlide(0,0);

	$('body').css('padding-right',(Element.offsetWidth - Element.clientWidth)+'px');
	$('#container').css('padding-right',(Element.offsetWidth - Element.clientWidth)+'px');
	$('#downArrowAbout2').click(function(){
		// This only exists on about 1 (index 0,1) so scroll appropriately
		MoveToSlide(parentSlideIndex,childSlideIndex+1); //
	});
	$('#downArrowAbout3').click(function(){
		// This only exists on about 2( index 0,2 ) so scroll appropriately
		MoveToSlide(1,0); 
	});
	// prevent browser from trying to jump to the last scroll position on a reload (causes tab logic to malfunction).
	$(window).on('beforeunload', function() {
		
		$(window).scrollTop(0);
	});

	$(window).scroll(function(){
		lastScrollY = window.scrollY;
	});
	$(window).resize(function(){
		var h = window.innerHeight;
		MoveToSlide(parentSlideIndex,childSlideIndex);
		//resizeTimeoutFn = setTimeout(function(){MoveToSlide(parentSlideIndex,childSlideIndex);},100); // a short time after user finishes resizing window, move to the appropriate slide.
//
	});
	
	// Detect when user gave scroll input.
	 $('body').bind('mousewheel DOMMouseScroll, wheel', function(e){ 
		deltaScrollY = e.originalEvent.wheelDelta || -e.originalEvent.detail || -e.originalEvent.deltaY;
		e.preventDefault();
		if (scrolling) {
			return;
		}	
		if (deltaScrollY < 0) { // user scrolled down
			if (parentSlideIndex == 0){ // ABOUT
				if (childSlideIndex < maxAboutSlides-1) { 
					MoveToSlide(0,childSlideIndex+1);
				} else {
					MoveToSlide(1,0);
				}
			} else if (parentSlideIndex == 1){ // WORK
				if (childSlideIndex < maxWorkSlides-1){
					MoveToSlide(1,childSlideIndex+1);
				} else {
					MoveToSlide(2,0);
				}
			} else { // CONTACT
				// User could not slide down. Do nothing
			}
		} else if (deltaScrollY > 0){ // user scrolled up
			if (parentSlideIndex == 0){ // ABOUT
				if (childSlideIndex > 0) { 
					MoveToSlide(0,childSlideIndex-1); // Move up one About slide.
				} else {
					// User was at top of page, could not slide up. Do nothing.
				}
			} else if (parentSlideIndex == 1){ // WORK
				if (childSlideIndex > 0 ){
					MoveToSlide(1,childSlideIndex-1); // Move up one work slide.
				} else {
					MoveToSlide(0, maxAboutSlides-1); // Move up to the last About slide.
				}
			} else { // CONTACT
				MoveToSlide(1,maxWorkSlides-1); // Move to the last work slide.
			}
		}

	});

	$( "#navBar ul li").click(function(){
		MoveToSlide(Math.max($(this).index()-1,0),0);		
	});




	
});

function MoveToSlide(p,c){
	parentSlideIndex = p;
	childSlideIndex = c; 
	scrolling = true;

	// Hide slides by opactiy "0". We'll set the current parent slide opacity to "1" in a sec.	
	$('#aboutSlides').css('opacity','0');	
	$('#workSlides').css('opacity','0');	
	$('#contactSlide').css('opacity','0');	
	var h = $('#workSlides > ul > li').first().height(); // #get height of a typical work slide based on first li. Needed for scrolling to Nth work slide or Contact slide.

	if (parentSlideIndex == 0){ // The current slide was "About".
		 // Fade in the "About" slide.	
		$('#aboutSlides').css('opacity','1');

		$('#navBar').css('color','white'); // Because background is black on About slide.
		$('#navBar').css('background-color','transparent'); //
		$('#momentumLogo').css('background-image','url("css/img/momentum_white.png")');

		// Make sure we are scrolled to the TOP.
		$(window).scrollTop(0);

		// Remove "seleceted" class from all right-hand nav dots.	
		// then "select" class to appropraiate about dot.
		$( "#aboutDots ul li").each(function(){ 
			$(this).removeClass('selected');
		 }); 
		$('#aboutDots ul li:nth-child('+(childSlideIndex+1)+')').addClass('selected'); 

		// Hide each of the about texts, 
		// Then show only the selected by its childslideindex
		$( "#aboutSlides > ul li").each(function(){
			$(this).css('opacity','0');
		 }); 
		$('#aboutSlides > ul li:nth-child('+(childSlideIndex+1)+')').css('opacity','1'); 
	
		// Set the blur of the background based on the child index
		$('#aboutImage').css('-webkit-filter','blur('+(childSlideIndex * 5)+'px)');
		$('#aboutImage').css('filter','blur('+(childSlideIndex * 5)+'px)');

		// Move the background image position based on child index
		var n = '-'+(childSlideIndex * 50) + "px";
		$('#aboutImage').css('background-position-y',n);

		
	} else if (parentSlideIndex == 1){ // Work slides selected.
		// Show the work slide opacity 1.
		$('#workSlides').css('opacity','1');

		// Because background is white on Work slide.
		$('#navBar').css('color','black'); 
		$('#navBar').css('background-color','white'); 
		$('#momentumLogo').css('background-image','url("css/img/momentum_black.png")');
		
		// Calc how far we should scroll for each work child, and animate it.
		var scrollTop = (childSlideIndex + 1)  * h; 
		$('body').stop(true,true); 
		if ($('body').scrollTop() < h) $('body').scrollTop(h); // "snap" to the first work slide, if scrolling down from about.
		$('body').animate({
			scrollTop: scrollTop 
		}, {
			duration: 500
		});
		
		// Set the right-hand list nav ui.
		$('.verticalDots > ul > li > div').each(function(){ $(this).removeClass('selected'); }); 
		$('.verticalDots > ul li:nth-child('+(childSlideIndex+1)+') > div').addClass('selected');			

	} else if (parentSlideIndex == 2){
		$('#contactSlide').css('opacity','1');	
		$('#navBar').css('color','black'); // Because background is black on Contact slide.
		$('#navBar').css('background-color','white'); 
		$('#momentumLogo').css('background-image','url("css/img/momentum_black.png")');
		var scrollTop = (maxWorkSlides)  * h + $('#aboutImage').innerHeight(); 
		$('body').stop(true,true); 
		$('body').scrollTop(scrollTop - h); 
		$('body').animate({
			scrollTop: scrollTop 
		}, {
			duration: 500
		});
	
	}

	// If we were moving between about slides, 
		// mod the fade of the about background appropriately 
		// mod height offset of backgroun
		// and handle current text group  fade by index (li childes for text)
	
	// If we were navigating between contact, about and work,
		// Fade one out and the other in
		// Adjust background and padding for faded in slide.
	
	// If we were navigating between work slides,
		// scroll the page up or down accordingly

	// Set the underline to the appropriate index
	$( "#navBar ul li").each(function(){
		$(this).removeClass('selected').removeClass('selected_black');
	 }); 
	if (parentSlideIndex == 1 || parentSlideIndex == 2) {
		$('#navBar ul li:nth-child('+(parentSlideIndex+2)+')').addClass('selected_black');			
	
	} else { 
		$('#navBar ul li:nth-child('+(parentSlideIndex+2)+')').addClass('selected');			
	}	
	setTimeout(function() {	scrolling = false;		}, 900);
	return;

}

