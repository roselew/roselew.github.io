
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
			dayIndex.find('.mission-'+stateName).append($('<li class="circle-mid" name='+missionId+'><img src=' + userMissions[missionIndex].icon +'>'+starSvg+'<span>'+userMissions[missionIndex].points+'</li>'))
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
		var startDay=currentDate;
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
			$('.week a').text(startDay.getDate()+ ' - '+ endDay.getDate() + ' '+ endDayMonth)
		} else {
			$('.week a').text(startDay.getDate()+ ' ' + startDayMonth+ ' - '+ endDay.getDate() + ' '+ endDayMonth)
		}

		//update filter view
		$(document).trigger('updateFilterView');
	})


// ----- change week 

	//week before
	$('.week span').eq(0).on('click',function(){
		currentDate.setDate(currentDate.getDate()-7)	
		$(document).trigger('showWeek')
	})
	//week after
	$('.week span').eq(1).on('click',function(){
		currentDate.setDate(currentDate.getDate()+7)	
		$(document).trigger('showWeek')
	})


// ----- filtering

	// click event on all filter buttons
	$('.show-undone').on('click',function(){showOnly(this,'undone')})
	$('.show-wait').on('click',function(){showOnly(this,'wait')})
	$('.show-done').on('click',function(){showOnly(this,'done')})
	$('.show-all').on('click',function(){showAll(this)})


	//show only type missions in details mode
	function showOnly(button,type) {

		//turn off day detials buttons
		turnOffDayButtons()

		//remember which button clicked
		$('.filter button').removeClass('selected')
		$(button).addClass('selected')

		//first hide everything
		$('.day, .day-line, .day-details ul').hide()
		$('.day-details').show()

		//show only days that are not empty
		$('.day .mission-'+ type +' li').parents('.day').show()
		$('.mission-' + type).show()


		if (!kidMode()){
			if ($('button.show-wait').hasClass('selected')){
				$('button.acceptAll').show()
			} else {
				$('button.acceptAll').hide()
			}
			if ($('button.show-undone').hasClass('selected')){
				$('button.doneAll').show()
			} else {
				$('button.doneAll').hide()
			}	
		}

	}


	// show all missions but without details
	function showAll(button) {

		//turn on day details buttons
		turnOnDayButtons();

		//remember which button clicked
		$('.filter button').removeClass('selected')
		$(button).addClass('selected')

		$('.day, .day-line, .day-details ul').show()
		$('.day-details').hide()

		$('button.acceptAll, button.doneAll').hide()	
	}

	function turnOnDayButtons(){
		//add arrow down sign 
		$('.day>p span').html('&#x25BC');
		//turn off all actions on click (no click cumulation)
		$('.day>p').off('click')
		$(document).off('click','.day-line')
		//turn on day details button
		$('.day>p').on('click',function(){showDayDetails(this)})
		$(document).on('click','.day-line',function(){showDayDetails2(this)})

	}

	function turnOffDayButtons(){
		//turn off all actions on click
		$('.day>p').off('click')
		//remove arrow down sign
		$('.day>p span').html('');
		//remove color from day buttons
		$('.day>p').removeClass('selected')
	}

	// show day details 
	function showDayDetails(dayButton){
		var dayDetails = $(dayButton).parents('.day').children('.day-details')
		if (dayDetails.is(":hidden")) {
			//slowly show
			dayDetails.slideDown('slow')
			//change arrow type and background
			$(dayButton).children('span').html('&#x25B2')
			$(dayButton).addClass('selected')
		} else {
			//slowly hide
			dayDetails.slideUp('slow')
			//change arrow type
			$(dayButton).children('span').html('&#x25BC')
			$(dayButton).removeClass('selected')
		}
	}

	//the same us above, but allows to click on line and not the button
	function showDayDetails2(dayLine){
		var dayDetails = $(dayLine).parents('.day').children('.day-details');
		var dayButton = $(dayLine).parents('.day').find('p');
		if (dayDetails.is(":hidden")) {
			//slowly show
			dayDetails.slideDown('slow')
			//change arrow type and background
			$(dayButton).children('span').html('&#x25B2')
			$(dayButton).addClass('selected')
		} else {
			//slowly hide
			dayDetails.slideUp('slow')
			//change arrow type
			$(dayButton).children('span').html('&#x25BC')
			$(dayButton).removeClass('selected')
		}
	}


	//clicks one more time filter button
	//important becacuse filter hides days where no missions
	$(document).on('updateFilterView',function(){
		$('button').each(function(index){
			//except of first button
			if (index>0){
				if ($(this).hasClass('selected')) {
					$(this).trigger('click')
			    }
			}
		})
	})

// ----- automatically starts after launching page

	//keeps currently visible week day
	var today = new Date();
	today.setHours(0,0,0,0)

	//go to monday
	var currentDate =new Date(today);
	currentDate.setDate(today.getDate()-today.getUTCDay())

	//show all missions assigned for this week

	$(document).trigger('showWeek')
	$(document).trigger('noFilterMode')
	$('.show-all').trigger('click')