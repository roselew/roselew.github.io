
var color_done= '#13CE66'; // green
var color_wait= '#FFBA5C'; // yellow
var color_undone= '#F95F62'; //red
var color_base= '#00A6FF'; //blue
var color_back_kid = '#0C1A3F'; 
var color_back_parent= '#E6E8E5';

// show full day
$('.day>p').on('click',function(event){
	var full_day = $(this).parent('.day').children('.day-details')
	if (full_day.is(":hidden")) {
		full_day.slideDown('slow')
		$(this).children('span').html('&#x25B2')
	} else {
		full_day.slideUp('slow')
		$(this).children('span').html('&#x25BC');
		
	}
})


// move mission between undone and wait 
// generate alert if wait or done
$('.circle-mid').on('click', function(event){
	var mission = $(this)
	if (mission.parent('ul').hasClass('mission-wait')){
		showAlert('Czekamy na akceptacje','wait');
	}
	if (mission.parent('ul').hasClass('mission-done')){
		showAlert('Już wykonałeś ta misję','done');
	}
	if (mission.parent('ul').hasClass('mission-undone')){
		$('.thumb-down').show().appendTo(mission)
		$('.thumb-up').show().appendTo(mission)
		showAlert('');
		mission.css('z-index','500')

		$('.thumb-down').on('click', function(ev){
			ev.stopPropagation();
			hideAlert();
		})

		$('.thumb-up').on('click', function(ev){
			ev.stopPropagation();
			hideAlert();
			fromUndoneToWait(mission)
		})
	}
})

$('.show-undone').on('click',function(){
	showUndone();
})

$('.show-wait').on('click',function(){
	showWait();
})

$('.show-done').on('click',function(){
	showDone();
})

$('.show-all').on('click',function(){
	showAll();
})

function showUndone() {
	hideAll()
	$('.mission-undone').show()
	$('.show-undone').css('background-color',color_undone)
}

function showWait() {
	hideAll()
	$('.mission-wait').show()
	$('.show-wait').css('background-color',color_wait)
}

function showDone() {
	hideAll()	
	$('.mission-done').show()
	$('.show-done').css('background-color',color_done)
}

function showAll() {
	$('.day-line').show()
	$('.day-details').hide()
	$('.mission-undone').show()		
	$('.mission-wait').show()
	$('.mission-done').show()
	deleteBackground()	
	$('.show-all').css('background-color',color_base)
}

function hideAll(){
	$('.day-line').hide()
	$('.day-details').show()
	$('.mission-undone').hide()		
	$('.mission-wait').hide()
	$('.mission-done').hide()
	deleteBackground()	
}

function deleteBackground(){
	$('.parent .show-undone').css('background-color',color_back_parent)
	$('.parent .show-wait').css('background-color',color_back_parent)
	$('.parent .show-done').css('background-color',color_back_parent)
	$('.parent .show-all').css('background-color',color_back_parent)

	$('.kid .show-undone').css('background-color',color_back_kid)
	$('.kid .show-wait').css('background-color',color_back_kid)
	$('.kid .show-done').css('background-color',color_back_kid)
	$('.kid .show-all').css('background-color',color_back_kid)
}

function showAlert(message,type) {
	$('.container').append($('<div class ="alert"> <span onclick="hideAlert()"> X </span> <p>' + message + '</p> </div>'))
	if (type=="wait") {
		$('.kid .alert>p').prepend($('<img src="assets/hourglass.svg"> <br>'));
		$('.kid img.bohater').animate({
 	 		width: "60%",
		},1500)
	}
	if (type=="done") {
		$('.kid .alert>p').prepend($('<img src="assets/like.svg"> <br>'));
		$('.kid img.bohater').animate({
 	 		width: "60%",
		},1500)
	}


}

function hideAlert() {
	$('.alert').remove()
	$('.circle-mid').css('z-index','auto')
	$('.thumb-up,.thumb-down').hide().appendTo($('.container'))
	$('img.bohater').animate({
 	 	width: "20%"
	},1500)
}

function fromUndoneToWait(mission) {
	var waitGroup = mission.parents('.day-details').find('.mission-wait')
	mission.appendTo(waitGroup).hide().fadeIn('slow')
	var smallMission = mission.parents('.day').children('.day-line').find('.small-mission-undone').children().first()
	var smallWaitGroup = smallMission.parents('.day-line').find('.small-mission-wait')
	smallMission.appendTo(smallWaitGroup).hide().fadeIn('slow')
	updateProgress();
}
	
function updateProgress() {
	var number_undone = $('.mission-undone .circle-mid').length
	var number_wait = $('.mission-wait .circle-mid').length
	var number_done = $('.mission-done .circle-mid').length
	var number_total = number_undone + number_wait + number_done
	$('.progress-wait').width(100*(number_done+number_wait)/number_total + '%');
	$('.progress-done').width(100*number_done/number_total + '%');
	$('.show-all span').text(number_total)
	$('.show-undone span').text(number_undone)
	$('.show-wait span').text(number_wait)
	$('.show-done span').text(number_done)
}

// tymczasowe pokazuje gdzie klikamy
$(document).on('click',function(event){
	console.log(event.target)
})
