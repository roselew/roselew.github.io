

$(document).on('showWeek', function (event){
	
	showProgress()
	for (var i =0; i<10; i++){
		currentDate.setDate(currentDate.getDate()-7)	
		showProgress()
	}
		
})


function showProgress(){

	var newWeek = createEmptyWeek();
	showHistory(newWeek);
	$('.container').append(newWeek);
}	



function createEmptyWeek(){

	var newHref=$('<a href="rodzic_postepy.html"></a>')
	var newWeek = $('<div class="history"></div>')
	newHref.append(newWeek)
	newWeek.append($('<div class="week"><p></p></div>'))
	var newWeekProgress = $('<div class="progress"></div>')
	newWeekProgress.append($('<div class="progress-undone"> </div>'))
	newWeekProgress.append($('<div class="progress-wait"> </div>'))
	newWeekProgress.append($('<div class="progress-done"> </div> '))
	newWeekProgress.append($('<img src="assets/logo.png" class="logo">'))
	newWeekProgress.append($('<p></p>'))
	newWeek.append(newWeekProgress)
	return newHref
}


function showHistory(week){

		//first day of the week
		var startDay=currentDate;
		var startDayMonth = monthName[startDay.getMonth()]

		//last day of the week
		var endDay = new Date(startDay);
		endDay.setDate(startDay.getDate()+6);
		var endDayMonth=monthName[endDay.getMonth()]

		//update week name
		if (startDayMonth==endDayMonth) {
			week.find('.week p').text(startDay.getDate()+ ' - '+ endDay.getDate() + ' '+ endDayMonth)
		} else {
			week.find('.week p').text(startDay.getDate()+ ' ' + startDayMonth+ ' - '+ endDay.getDate() + ' '+ endDayMonth)
		}

		var number_undone = 0;
		var number_wait = 0;
		var number_done = 0;

		//show DAY by DAY
		for (i = 0; i < 7; i++) { 
			var oneDay= new Date(startDay)
			oneDay.setDate(startDay.getDate()+i);
			number_undone += getUndoneMissions(oneDay).length
			number_wait += getWaitMissions(oneDay).length
			number_done += getDoneMissions(oneDay).length
		}
		var number_total = number_undone + number_wait + number_done


		//width of progress bars
		week.find('.progress-wait').width(100*(number_done+number_wait)/number_total + '%');
		week.find('.progress-done').width(100*number_done/number_total + '%');
		week.find('.progress p').text(number_done + '/' + number_total);
		week.attr('name', currentDate);
}



$(document).on('click','.history', function(){
	currentDate=$(this).attr('name');


})


// ----- automatically starts after launching page

	//keeps currently visible week day
	var today = new Date();
	today.setHours(0,0,0,0)

	//go to monday
	var currentDate =new Date(today);
	currentDate.setDate(today.getDate()-today.getUTCDay())

	$(document).trigger('showWeek')