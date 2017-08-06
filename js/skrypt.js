
var color={
done: '#13CE66',// green
wait: '#FFBA5C', // yellow
undone: '#F95F62', //red
base: '#00A6FF', //blue
back_kid: '#0C1A3F', 
back_parent: '#E6E8E5'}

// -------show day details-------------

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


// -------moving misssions-------------

$('.circle-mid').on('click', function(event){

	var mission = $(this);
	var missionType = mission.parents('ul').attr('class')
	var kid_mode=mission.parents('body').hasClass('kid');

	//undone
	if (missionType == 'mission-undone'){
		if (kid_mode) {
			showThumbs(mission)
		} else {
			showThumbs(mission)
		}
	}

	//wait
	if (missionType =='mission-wait'){
		if (kid_mode) {
			showAlert('Czekamy na akceptacje','wait');
		} else {
			showThumbs(mission)
		}
	}

	//done
	if (missionType == 'mission-done'){
		if (kid_mode){
			showAlert('Już wykonałeś ta misję','done');

		} else {
			showThumbs(mission)
		}
	}

})

function showThumbs(mission){

	$('.thumb-down').show().appendTo(mission)
	$('.thumb-up').show().appendTo(mission)
	mission.css('z-index','500')
	showAlert('')

}

$('body').on('click','.thumb-up',moveMissionUp)
$('body').on('click','.thumb-down',moveMissionDown)

function moveMissionUp(event){
	var mission = $(this).parents('li');
	var missionType = mission.parents('ul').attr('class')
	var kid_mode=mission.parents('body').hasClass('kid');

	event.stopPropagation();
	hideAlert();

	if (missionType!=="mission-done"){ 
		if (kid_mode) {
			state='wait'
		} else {
			state="done"
		}

		moveIt(mission,missionType,state)
	}
}

function moveMissionDown(event){
	var mission = $(this).parents('li');
	var missionType = mission.parents('ul').attr('class')
	var kid_mode=mission.parents('body').hasClass('kid');

	event.stopPropagation();
	hideAlert();

	if (missionType!=="mission-undone"){ 
		state="undone"

		moveIt(mission,missionType,state)
	}
}

function moveIt(mission,missionType,state){
	var midGroup=mission.parents('.day-details').find('.mission-'+state)
	mission.appendTo(midGroup).hide().fadeIn('slow')
	var smallMission = mission.parents('.day').find('.small-'+missionType).children().first()
	var smallGroup = smallMission.parents('.day-line').find('.small-mission-'+state)
	smallMission.appendTo(smallGroup).hide().fadeIn('slow')	

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

// -------filtering-------------

$('.show-undone').on('click',function(){
	showOnly('undone')
})

$('.show-wait').on('click',function(){
	showOnly('wait')
})

$('.show-done').on('click',function(){
	showOnly('done')
})

$('.show-all').on('click',function(){
	showAll();
})

function showOnly(type) {
	hideAll()
	//show only days that are not empty
	$('.day .mission-'+ type +' li').parents('.day').show()
	$('.mission-' + type).show()
	$('.show-'+type).css('background-color',color[type])
}

function showAll() {
	$('.day').show()
	$('.day-line').show()
	$('.day-details').hide()
	$('.mission-undone').show()		
	$('.mission-wait').show()
	$('.mission-done').show()
	deleteBackground()	
	$('.show-all').css('background-color',color.base)
}

function hideAll(){
	$('.day').hide()
	$('.day-line').hide()
	$('.day-details').show()
	$('.mission-undone').hide()		
	$('.mission-wait').hide()
	$('.mission-done').hide()
	deleteBackground()	
}

function deleteBackground(){
	$('.parent .show-undone').css('background-color',color.back_parent)
	$('.parent .show-wait').css('background-color',color.back_parent)
	$('.parent .show-done').css('background-color',color.back_parent)
	$('.parent .show-all').css('background-color',color.back_parent)

	$('.kid .show-undone').css('background-color',color.back_kid)
	$('.kid .show-wait').css('background-color',color.back_kid)
	$('.kid .show-done').css('background-color',color.back_kid)
	$('.kid .show-all').css('background-color',color.back_kid)
}


// -------alerts-------------

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
	$('.kid img.bohater').animate({
 	 	width: "20%",
	},1500)
}



// tymczasowe pokazuje gdzie klikamy
// $(document).on('click',function(event){
// 	console.log(event.target)
// })
