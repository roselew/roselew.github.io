
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
		mission.append($('<img src="assets/thumb_down.svg" class="thumb-down">'))
		mission.append($('<img src="assets/thumb_up.svg" class="thumb-up">'))
		showAlert('');
		//$('.container').append($('<div class="thumb-inactive"> </div>'))
		mission.css('z-index','500')

		$('img.thumb-down').on('click', function(ev){
			ev.stopPropagation();
			hideAlert();
		})

		$('img.thumb-up').on('click', function(ev){
			ev.stopPropagation();
			hideAlert();
			fromUndoneToWait(mission)
		})

	}

})



// show alert

function showAlert(message) {
	$('.container').append($('<div class ="alert"> <span onclick="hideAlert()"> X </span> <p>' + message + '</p> </div>'))
}
function hideAlert() {
	$('.alert').remove()
	$('img.thumb-up,img.thumb-down').remove()
	$('.circle-mid').css('z-index','auto')
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
	$('.progress>p span').text(number_undone)
	$('.progress-bar p').text(number_done + ' / ' + number_total)
	$('.progress-bar .progress-wait').width(100*(number_done+number_wait)/number_total + '%');
	$('.progress-bar .progress-done').width(100*number_done/number_total + '%');
	if (number_undone == 0 & number_wait > 0) {
		$('.progress>p').text('Wykonałeś wszystkie misje, czekamy tylko na akceptację mamy')
	}
}