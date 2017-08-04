
// show full day
$('.day').on('click',function(event){
	var full_day = $(this).parent('.one-day').next()
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
		showAlert('Czekamy na akceptacje');
	}
	if (mission.parent('ul').hasClass('mission-done')){
		showAlert('Już wykonałeś ta misję');
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
	$('.filter').css('border-bottom-color','#F95F62')
	$('.show-undone').css('background-color','#F95F62')

}

function showWait() {
	hideAll()
	$('.mission-wait').show()
	$('.filter').css('border-bottom-color','#FFBA5C')
	$('.show-wait').css('background-color','#FFBA5C')
}

function showDone() {
	hideAll()	
	$('.mission-done').show()
	$('.filter').css('border-bottom-color','#13CE66')
	$('.show-done').css('background-color','#13CE66')
}

function showAll() {
	$('.one-day').show()
	$('.one-full-day').hide()
	$('.mission-undone').show()		
	$('.mission-wait').show()
	$('.mission-done').show()
	deleteBackground()	
	$('.filter').css('border-bottom-color','#00A6FF')	
	$('.show-all').css('background-color','#00A6FF')
}

function hideAll(){
	$('.one-day').show()
	$('.one-full-day').show()
	$('.mission-undone').hide()		
	$('.mission-wait').hide()
	$('.mission-done').hide()
	deleteBackground()	
}

function deleteBackground(){
	$('.show-undone').css('background-color','#0C1A3F')
	$('.show-wait').css('background-color','#0C1A3F')
	$('.show-done').css('background-color','#0C1A3F')
	$('.show-all').css('background-color','#0C1A3F')
}

// show alert

function showAlert(message) {
	$('.container').append($('<div class ="alert"> <span onclick="hideAlert()"> X </span> <p>' + message + '</p> </div>'))
}
function hideAlert() {
	$('.alert').remove()
	//$('.thumb-up,.thumb-down').remove()
	$('.circle-mid').css('z-index','auto')
	$('.thumb-up,.thumb-down').hide().appendTo($('.container'))
}

// tymczasowe pokazuje gdzie klikamy
$(document).on('click',function(event){
	console.log(event.target)
})

function fromUndoneToWait(mission) {
	
	var WaitGroup = mission.closest('div').find('.mission-wait')
	mission.appendTo(WaitGroup).hide().fadeIn('slow')
	var smallMission = $(mission.closest('.one-full-day').prev().find('.small-mission-undone').children()[0])
	var smallWaitGroup = smallMission.closest('div').find('.small-mission-wait')
	smallMission.appendTo(smallWaitGroup).hide().fadeIn('slow')
	updateProgress();
}
	
function updateProgress() {
	var number_undone = $('.mission-undone .circle-mid').length
	var number_wait = $('.mission-wait .circle-mid').length
	var number_done = $('.mission-done .circle-mid').length
	var number_total = number_undone + number_wait + number_done
	$('.progress-bar .progress-wait').width(100*(number_done+number_wait)/number_total + '%');
	$('.progress-bar .progress-done').width(100*number_done/number_total + '%');

	$('.show-all span').text(number_total)
	$('.show-undone span').text(number_undone)
	$('.show-wait span').text(number_wait)
	$('.show-done span').text(number_done)



}

