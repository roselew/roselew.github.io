

// -------moving misssions-------------

	// add click actions to missions
	$(document).on('click', 'ul.mission-undone li.circle-mid', function(){
		showThumbs($(this))
	})

	$(document).on('click', 'ul.mission-wait li.circle-mid', function(){
		if (kidMode()){
			showAlert('Czekamy na akceptacje','wait');
		} else {
			showThumbs($(this))
		}
	})

	$(document).on('click', 'ul.mission-done li.circle-mid', function(){
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
		var mission = thumb.parents('li.circle-mid');
		var missionId = mission.attr('name');
		var missionType = mission.parents('ul').attr('class')
		
		//get info about day we are in
		var datIndex =$('.day').index(mission.parents('.day'));
		var doneDate = new Date(currentWeek);
		doneDate.setDate(currentWeek.getDate()+datIndex)

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
		$('.circle-mid').css('z-index','auto')

		//hides thumbs
		$('.thumb').hide().appendTo($('.container'))

		//moves hero back to starting position
		$('.kid img.bohater').animate({
	 	 	width: "20%",
		},1000)
	}



// tymczasowe pokazuje gdzie klikamy
// $(document).on('click',function(event){
// 	console.log(event.target)
// })
