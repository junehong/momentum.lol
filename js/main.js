var currentSlideIndex = 0;
var deltaScrollY = 0;
var lastScrollY = 0;
var numSlides = 3; // gotta be a more elegant way than to hardcode the number of slides. I guess classing each slide div and then counting them? Meh.
var scrolling = false;


// Some preparation to disable and enable the scroll since we are controlling the user scrolling experience like a slideshow.
// 

$(document).ready(function(){
	$(window).scroll(function(){
		return;
		deltaScrollY = window.scrollY - lastScrollY;
		lastScrollY = window.scrollY;
//		console.log('scrolto[:'+deltaScrollY);
		if (scrolling) return; // page was auto-scrolling, ignore scroll input from user.
		if (deltaScrollY > 0 && currentSlideIndex < numSlides - 1){ // user scrolled down
			console.log('animation started DOWN! ');
			scrolling = true;
			MoveToSlide(currentSlideIndex + 1)
		} else if (deltaScrollY < 0 && currentSlideIndex > 0){
			console.log('animation started UP! ');
			scrolling = true;
			MoveToSlide(currentSlideIndex - 1);
		}
	});



	
});

function MoveToSlide(index){
	console.log('move to slide called!');
	currentSlideIndex = index;
	$('body').animate({
        scrollTop: currentSlideIndex * $(window.top).height() 
    }, {
		duration: 2000,
		complete:function(){
			console.log('animation complete!');
			scrolling = false;
		}
	});
}
