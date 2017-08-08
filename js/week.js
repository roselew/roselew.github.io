
// ------  updates progress bar and filter buttons 

	$(document).on('updateProgress', function(){

		//count missions
		var number_undone = $('.mission-undone .circle-mid').length
		var number_wait = $('.mission-wait .circle-mid').length
		var number_done = $('.mission-done .circle-mid').length
		var number_total = number_undone + number_wait + number_done
		//width of progress bars
		$('.progress-wait').width(100*(number_done+number_wait)/number_total + '%');
		$('.progress-done').width(100*number_done/number_total + '%');
		//show numbers on filter buttons
		$('.show-all span').text(number_total)
		$('.show-undone span').text(number_undone)
		$('.show-wait span').text(number_wait)
		$('.show-done span').text(number_done)
	})

// ----- show week missions


	//appends one STATE missions assigned for this DAY to HTML 
	function appendMission(day, stateMissions,stateName){

		// for Monday dayNumber = 0
		var dayNumber=day.getUTCDay()
		// index of day class
		var dayIndex=$('.day').eq(dayNumber)

		stateMissions.forEach(function(missionId){
			//finds mission index by missionId
			var missionIndex = findUserMission(missionId)
			dayIndex.find('.small-mission-'+stateName).append($('<li class="circle-small"></li>'))
			dayIndex.find('.mission-'+stateName).append($('<li class="circle-mid" name='+missionId+'><img src=' + userMissions[missionIndex].icon +'></li>'))
		})
	}

	//append ALL missions assigned for this DAY to HTML 
	function showDay(day){

		// get from database mission type assigned for this day and appends to HTML
		appendMission(day, getUndoneMissions(day),'undone')
		appendMission(day, getWaitMissions(day),'wait')
		appendMission(day, getDoneMissions(day),'done')
	}

	//appends ALL missions assigned for this WEEK to HTML
	$(document).on('showWeek', function (event){

		//clear all missions 
		$('.day li').remove()

		//first day of the week
		var startDay=currentWeek;
		var startDayMonth = monthName[startDay.getMonth()]

		//last day of the week
		var endDay = new Date(startDay);
		endDay.setDate(startDay.getDate()+6);
		var endDayMonth=monthName[endDay.getMonth()]

		//show DAY by DAY
		for (i = 0; i < 7; i++) { 
			var oneDay= new Date(startDay)
			oneDay.setDate(startDay.getDate()+i);
			showDay(oneDay)
		}

		//update progress bar
		$(document).trigger('updateProgress');

		//update week name
		if (startDayMonth==endDayMonth) {
			$('.week p').text(startDay.getDate()+ ' - '+ endDay.getDate() + ' '+ endDayMonth)
		} else {
			$('.week p').text(startDay.getDate()+ ' ' + startDayMonth+ ' - '+ endDay.getDate() + ' '+ endDayMonth)
		}
	})


// ----- change week 

	//week before
	$('.week span').eq(0).on('click',function(){
		currentWeek.setDate(currentWeek.getDate()-7)	
		$(document).trigger('showWeek')
	})
	//week after
	$('.week span').eq(1).on('click',function(){
		currentWeek.setDate(currentWeek.getDate()+7)	
		$(document).trigger('showWeek')
	})


// ----- filtering

	// click event on all filter buttons
	$('.show-undone').on('click',function(){showOnly('undone')})
	$('.show-wait').on('click',function(){showOnly('wait')})
	$('.show-done').on('click',function(){showOnly('done')})
	$('.show-all').on('click',function(){showAll()})
	//show day details only in noFilterMode
	$(document).on('noFilterMode',function(){
		$('.day>p span').html('&#x25BC');
		$('.day>p').on('click',function(){showDayDetails(this)})
	})

	// hide everything
	function hideAll(){
		$('.day, .day-line, .day-details ul').hide()
		$('.day-details').show()
		deleteBackground()	
	}

	// get rid of colors on filter buttons
	function deleteBackground(){
		$('.parent .filter button').css('background-color',color.back_parent)
		$('.kid .filter button').css('background-color',color.back_kid)
	}

	//show only type missions in details mode
	function showOnly(type) {
		//first hide everything
		hideAll()
		//show only days that are not empty
		$('.day .mission-'+ type +' li').parents('.day').show()
		$('.mission-' + type).show()
		// change button color
		$('.show-'+type).css('background-color',color[type])
		//turn off day detials buttons
		$('.day>p').off('click')
		$('.day>p span').html('');
	}

	// show all missions but without details
	function showAll() {
		$('.day, .day-line, .day-details ul').show()
		$('.day-details').hide()
		deleteBackground()	
		// change button color
		$('.show-all').css('background-color',color.base)
		$(document).trigger('noFilterMode')
	}

	// show day details 
	function showDayDetails(dayButton){
		var dayDetails = $(dayButton).parents('.day').children('.day-details')
		if (dayDetails.is(":hidden")) {
			//slowly show
			dayDetails.slideDown('slow')
			//change arrow type
			$(dayButton).children('span').html('&#x25B2')
		} else {
			//slowly hide
			dayDetails.slideUp('slow')
			//change arrow type
			$(dayButton).children('span').html('&#x25BC');
		}
	}


// ----- automatically starts after launching page

	//keeps currently visible week day
	var today = new Date();
	today.setHours(0,0,0,0)

	//go to monday
	var currentWeek =new Date(today);
	currentWeek.setDate(today.getDate()-today.getUTCDay())

	//show all missions assigned for this week
	$(document).trigger('showWeek')
	$(document).trigger('noFilterMode')