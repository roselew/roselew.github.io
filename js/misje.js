		//appends one STATE missions assigned for this DAY to HTML 
	function appendMission(day, stateMissions,stateName){

		stateMissions.forEach(function(missionId){
			//finds mission index by missionId
			var missionIndex = findUserMission(missionId)
			$('.day-view').find('.mission-'+stateName).append($('<li class="circle-big" name='+missionId+'><img src=' + userMissions[missionIndex].icon +'>'+starSvg+'<span>'+userMissions[missionIndex].points+'</li>'))
		})
	}


	//append ALL missions assigned for this DAY to HTML 
	function showDay(day){

		// get from database mission type assigned for this day and appends to HTML
		appendMission(day, getUndoneMissions(day),'undone')
		appendMission(day, getWaitMissions(day),'wait')
		appendMission(day, getDoneMissions(day),'done')
	}


$(document).on('showWeek', function (event){
	$('.day-view li').remove()
	showDay( currentDate);
	var currentMonth = monthName[currentDate.getMonth()]
	$('.dayName p').text(currentDate.getDate()+ ' '+ currentMonth)
})


// ----- change week 

	//week before
	$('.dayName span').eq(0).on('click',function(){
		currentDate.setDate(currentDate.getDate()-1)	
		$(document).trigger('showWeek')
	})
	//week after
	$('.dayName span').eq(1).on('click',function(){
		currentDate.setDate(currentDate.getDate()+1)	
		$(document).trigger('showWeek')
	})


// ----- automatically starts after launching page

	//keeps currently visible week day
	var today = new Date();
	today.setHours(0,0,0,0)
	var currentDate =new Date(today);

$(document).trigger('showWeek')