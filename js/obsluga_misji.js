



// -------moving misssions-------------

	// add click actions to missions
	$(document).on('click', 'ul.mission-undone li', function(){
		showThumbs($(this))
	})

	$(document).on('click', 'ul.mission-wait li', function(){
		if (kidMode()){
			showAlert('Czekamy na akceptacje','wait');
		} else {
			showThumbs($(this))
		}
	})

	$(document).on('click', 'ul.mission-done li', function(){
		if (kidMode()){
			showAlert('Już wykonałeś ta misję','done');
		} else {
			showThumbs($(this))
		}
	})

	//show thumbs on left/right side of mission
	function showThumbs(mission){
		$('.thumb').show().appendTo(mission)
		//move mission to be on higher layer
		mission.css('z-index','500')
		showAlert('')
	}


	// add thumb actions - moving state up/down
	$(document).on('click','.thumb',function(event){
		
		//thumb is inside circle-mid class, if we don't stop propagation then it activate circle-mid actions too
		event.stopPropagation();

		//get info about mission
		var thumb = $(this)
		var mission = thumb.parents('li');
		var missionId = mission.attr('name');
		var missionType = mission.parents('ul').attr('class')
		
		//get info about day we are in
		var datIndex =$('.day').index(mission.parents('.day'));

		// in day mpode there is no datIndex
		if (datIndex<0) {datIndex=0}
		var doneDate = new Date(currentDate);
		doneDate.setDate(currentDate.getDate()+datIndex)

		hideAlert();

		//if thumb-up move mission state up
		if (thumb.hasClass('thumb-up')){
			//can't move DONE any higher
			if (missionType!=='mission-done'){ 
				if (kidMode()) {
					// kids can only move mission into WAIT state
					$(document).trigger('addWaitMission',[missionId,doneDate])
				} else {
					// parents move missions directly into DONE state
					$(document).trigger('addDoneMission',[missionId,doneDate])
					if (missionType =='mission-wait'){
						// if previously was WAIT state, need to be deleted 
						$(document).trigger('deleteWaitMission',[missionId,doneDate])
					}
				}
			}
		// if thumb-down move mission state down
		} else {
			//can't move UNDONE any lower
			if (missionType!=='mission-undone'){
				//only available for parents to move directly into UNDONE
				if (missionType =="mission-wait"){
					//delete from WAIT list, will be UNDONE
					$(document).trigger('deleteWaitMission',[missionId,doneDate])
				} else {
					//delete from DONE list, will be UNDONE
					$(document).trigger('deleteDoneMission',[missionId,doneDate])
				}
			}
		}
	})


// --- button acceptAll -- moves all Mission from WAIT to DONE

$(document).on('click','button.acceptAll', function(){
	var missionList=$('ul.mission-wait li.circle-mid')
	var missionsToAccept=[]
	missionList.each( function(){

		var missionId = $(this).attr('name');

		//get info about day we are in
		var datIndex =$('.day').index($(this).parents('.day'));
		var doneDate = new Date(currentDate);
		doneDate.setDate(currentDate.getDate()+datIndex)

		var missionToAccept=[missionId,doneDate]
		missionsToAccept.push(missionToAccept)
	})

	missionsToAccept.forEach(function(mission){
		$(document).trigger('addDoneMission',[mission[0],mission[1]])
		$(document).trigger('deleteWaitMission',[mission[0],mission[1]])
	})
})

// --- button doneAll -- moves all Mission from UNDONE to DONE

$(document).on('click','button.doneAll', function(){
	var missionList=$('ul.mission-undone li.circle-mid')
	var missionsToAccept=[]
	missionList.each( function(){

		var missionId = $(this).attr('name');

		//get info about day we are in
		var datIndex =$('.day').index($(this).parents('.day'));
		var doneDate = new Date(currentDate);
		doneDate.setDate(currentDate.getDate()+datIndex)

		var missionToAccept=[missionId,doneDate]
		missionsToAccept.push(missionToAccept)
	})

	missionsToAccept.forEach(function(mission){
		$(document).trigger('addDoneMission',[mission[0],mission[1]])
	})
})


// -------alerts

	//show alert with text MESSAGE and picture of some TYPE
	function showAlert(message,type) {

		//add class .alert - top layer 
		$('.container').append($('<div class ="alert"> <span onclick="hideAlert()"> X </span> <p>' + message + '</p> </div>'))

		// different types of alerts - pictures/animations/etc.
		if (type=='wait') {
			$('.kid .alert>p').prepend($('<img src="assets/hourglass.svg"> <br>'));
			$('.kid img.bohater').animate({
	 	 		width: "60%",
			},1000)
		}
		if (type=='done') {
			$('.kid .alert>p').prepend($('<img src="assets/like.svg"> <br>'));
			$('.kid img.bohater').animate({
	 	 		width: "60%",
			},1000)
		}
	}

	function hideAlert() {

		//removes alert
		$('.alert').remove()

		//move mission to be standard layer
		$('li').css('z-index','auto')

		//hides thumbs
		$('.thumb').hide().appendTo($('.container'))

		//moves hero back to starting position
		$('.kid img.hero').animate({
	 	 	width: "20%",
		},1000)
	}


// tymczasowe pokazuje gdzie klikamy
// $(document).on('click',function(event){
// 	console.log(event.target)
// })
