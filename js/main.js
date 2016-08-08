var parentSlideIndex = 0; // About, Work, Contact. 3 only
var childSlideIndex = 0; // About has 3, Work as 3, Contact has only 1.
var maxAboutSlides = 3;
var maxWorkSlides = 5;
var deltaScrollY = 0;
var lastScrollY = 0;
var numSlides = 3; // gotta be a more elegant way than to hardcode the number of slides. I guess classing each slide div and then counting them? Meh.
var scrolling = false;
var shiftPadding = 100; // This is the amount each slide moves up or down between the white screen transition phase. The slide shifts this much as the white one is coming across

var resizeTimeoutFn;
$(document).ready(function(){
	MoveToSlide(0,0);



	$('body').css('padding-right',(Element.offsetWidth - Element.clientWidth)+'px');
	$('#container').css('padding-right',(Element.offsetWidth - Element.clientWidth)+'px');
	$('.downArrow').click(function(){
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
		clearTimeout(resizeTimeoutFn);
	//	MoveToSlide(parentSlideIndex,childSlideIndex);
		resizeTimeoutFn = setTimeout(function(){MoveToSlide(parentSlideIndex,childSlideIndex);},1000); // a short time after user finishes resizing window, move to the appropriate slide.
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

var allowScrollingTimeout;
function MoveToSlide(p,c){
	parentSlideIndex = p;
	childSlideIndex = c; 
	if (scrolling) return;
	scrolling = true;
	clearTimeout(allowScrollingTimeout);
	allowScrollingTimeout = setTimeout(function(){ scrolling = false; }, 1200);
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
		$('#momentumLogo').css('background-image','url("css/img/logo_white.svg")');

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
	
		// move text down a little, and then animate it moving to the correct position and opacity

		$('#aboutSlides > ul li:nth-child('+(childSlideIndex+1)+')').css('opacity','1'); 
		var targetTopPosition = parseInt($('#aboutSlides > ul li:nth-child('+(childSlideIndex+1)+') .aboutText').css('top'));
		var startTopPosition = targetTopPosition + 30;
		$('#aboutSlides > ul li:nth-child('+(childSlideIndex+1)+') .aboutText')
			.css('opacity',0)
			.css('top',startTopPosition+"px")
			.animate({
				opacity : 1, top : targetTopPosition }, "slow", $.easing['easeInSine'] );


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
		$('#momentumLogo').css('background-image','url("css/img/logo_black.svg")');
		
		// Calc how far we should scroll for each work child, and animate it.
		var scrollTopTarget = (childSlideIndex + 1)  * h - shiftPadding; 
		$('body').stop(true,true); 
		var dir = $('body').scrollTop() > scrollTopTarget ? -1 : 1; // determine if we were sliding up or down. "1" is scrolling "down"
		if ($('body').scrollTop() < h && childSlideIndex == 0) {
			$('body').scrollTop(h - shiftPadding +  $('#header').outerHeight()); // "snap" to the first work slide, if scrolling down from about.
			console.log('snap');
			dir = 1; // also override 'dir' in this case because the comparitive logic doesnt work for the first case (scrolltop is still smaller since we haven't actually scrolled down the page during about navigation)
		}
		var offset = shiftPadding / 2 * dir;

		// SmoothScroll 50 px towards destination, skip to 50 px from destination and pause while white screen happens, then smoothscroll remaining 50px 
		var scrollDuration = 1000;
		var whiteSheetDuration = scrollDuration * 2;
		var pauseDuration = 200;	
		// Show the white fx screen if scrolling *between* work slides, but not in or out of work slides.
		if ((dir == 1 && childSlideIndex != 0) || (dir == -1 && childSlideIndex != maxWorkSlides - 1)){ // this would == false if moving from about or contact slides to workslides. 
			console.log('offset:'+offset);
			WhiteSheetFX(dir,100,1000);// pauseDuration,whiteSheetDuration);	
			$('body').animate({	
				scrollTop: scrollTopTarget - h * dir + offset }, 
				scrollDuration/2, 
				function (){ // After initial scroll, 
					$(this)
					.scrollTop(scrollTopTarget - offset) // skip to "offset=50px" from target
					.delay(pauseDuration) // to sync up with white sheet animation
					.animate({		
						scrollTop: scrollTopTarget 		},
						scrollDuration/2  );
					}
			);
		} else {
			// Scroll "normally" without the white sheet fx
			console.log('norm scroll');
			$('body').animate({		
				scrollTop: scrollTopTarget 		},
				scrollDuration/2 ); 
					
		}

				
		// Set the right-hand list nav ui.
		$('.verticalDots > ul > li > div').each(function(){ $(this).removeClass('selected'); }); 
		$('.verticalDots > ul li:nth-child('+(childSlideIndex+1)+') > div').addClass('selected');			

	} else if (parentSlideIndex == 2){
		$('#contactSlide').css('opacity','1');	
		$('#navBar').css('color','black'); // Because background is black on Contact slide.
		$('#navBar').css('background-color','white'); 
		$('#momentumLogo').css('background-image','url("css/img/logo_black.svg")');
		var scrollTop = (maxWorkSlides)  * h + $('#aboutImage').innerHeight(); 
		$('body').stop(true,true); 
		$('body').scrollTop(scrollTop - h); 
		$('body').animate({
			scrollTop: scrollTop 
		}, {
			duration: 500
		}, function () { 
				// 	console.log('fin2');scrolling = false;
			 }); // this never gets called, can't figure out why?
	
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
	return;

}

function WhiteSheetFX(dir,pauseTime,duration){
	// Uses a white sheet that is the same hieght as the "Work tab" height, 
	// positions it at the top or bottom of screen (totally off screen)
	// then lerps it onto the screen in full, pauses for a second,
	// then lerps totally off screen in the same direction.

	var targetHeight = $('#workSlides > ul > li').first().height(); // #get height of a typical work slide based on first li. Needed for scrolling to Nth work slide or Contact slide.
	var headerHeight = $('#navBar').outerHeight();
	$('#whiteSheet')
		.stop() // stop previous animations,
		.css('height',targetHeight + "px") // make sure it height is correct,
		.css('display','block'); // show it
		
	if (dir == 1){ 
		// scrolling downwards. Position white screen at bottom.
		$('#whiteSheet').css('top',targetHeight + headerHeight + "px");

		// animate it moving upwards
		$('#whiteSheet').animate({ 
				top : headerHeight  }, 
				duration/2, 
				function() { 
					$(this).delay(pauseTime) //hold a sec
					.animate({
						top : -targetHeight + headerHeight },
						duration/2,
						function (){	
							$(this).hide(); // hide when done
						} 
					); 
				}
			);
	} else {
		// scrolling upwardss. Position white screen at top.
		$('#whiteSheet').css('top', -targetHeight  + headerHeight + "px");

		// animate it moving upwards
		$('#whiteSheet').animate({ 
				top : headerHeight  }, 
				duration/2, 
				function() { 
					$(this).delay(pauseTime) //hold a sec
					.animate({
						top : targetHeight + headerHeight },
						duration/2,
						function (){	
							$(this).hide(); // hide when done
						} 
					); 
				}
			);
	}
}



// Easing function extended from basic jquery easing
// suggested from http://stackoverflow.com/questions/5207301/jquery-easing-functions-without-using-a-plugin
$.easing.jswing = $.easing.swing;

$.extend($.easing,
{
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    }
});
