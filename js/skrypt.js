
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
		$('.container').append($('<div class="alert"> <span onclick="hideAlert()"> X </span> <p> Czekamy na akceptacje </p> </div>'))
	}
	if (mission.parent('ul').hasClass('mission-done')){
		$('.container').append($('<div class ="alert"> <span onclick="hideAlert()"> X </span> <p> Już wykonałeś ta misje </p> </div>'))
	}
	if (mission.parent('ul').hasClass('mission-undone')){
		var WaitGroup = mission.closest('div').find('.mission-wait')
		mission.appendTo(WaitGroup).hide().fadeIn('slow')
		var smallMission = $(mission.closest('.one-full-day').prev().find('.small-mission-undone').children()[0])
		var smallWaitGroup = smallMission.closest('div').find('.small-mission-wait')
		smallMission.appendTo(smallWaitGroup).hide().fadeIn('slow')
	}

})

// show alert
function hideAlert() {
	$('.alert').remove()
}

// tymczasowe pokazuje gdzie klikamy
$(document).on('click',function(event){
	console.log(event.target)
})