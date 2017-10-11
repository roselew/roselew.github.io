//show USER MISSIONS

	//appends one STATE missions assigned for this DAY to HTML 
	
	function appendMission(day, stateMissions,stateName){

		stateMissions.forEach(function(missionId){
			//finds mission index by missionId
			var mission=userMissions[findUserMission(missionId)]
	
			$('.mission-'+stateName).append($('<li class="circle-big" name='+missionId+'>'
				+'<p><span class=dayList>'+ convertDaysNames(mission.days) +'</span>'+mission.name+'</p>'
				+'<img src=' + mission.icon +'>'+starSvg
				+'<span>'+mission.points+'</span></li>'))
		})
	}

	//append ALL missions assigned for this DAY to HTML 
	function showDay(day){

		// get from database mission type assigned for this day and appends to HTML
		appendMission(day, getAllMissions(day),'neutral')
	}

	$(document).on('showWeek', function (event){
		$('.mission-neutral li').remove()
		showDay( today);
	})



// SHOW and HIDE new window 

	//show new window for adding/edition on whole screen with X button  
	function showEdit() {
		$('.container>ul').hide()
		$('.plus').hide()
		//add class .edit
		$('.container').append($('<div class ="edit"> <span class="X" onclick="hideEdit()"> X </span></div>'))
		$('.edit').append($('<ul class="mission-neutral"></ul>'))
	}

	function hideEdit() {
		//removes class .edit
		$('.edit').remove()
		$('.plus').show()
		$('.container>ul').show()
	}


// ADDING NEW MISSION - STEP 1 

// when click on PLUS sign
	$('.plus').on('click',function (event){
		
		showEdit()

		$('.edit').prepend($('<h2> polecane przez ekspertów </h2>'))
		$('.edit').prepend($('<h1> Wybierz misje </h1>'))
		$('.edit ul').append($('<span class="showMore bounce">&#x25BC</span>'))
		$('.edit').append($('<button class="addOwn">...lub dodaj własną misję</button>'))
		appendExpertMission();

	})

	function appendExpertMission(){

		expertMissions.forEach(function(mission){
			$('.edit ul.mission-neutral').append($('<li class="circle-mid" name='+mission.id+'><p>'+mission.name+'</p><img src=' + mission.icon +'></li>'))
		})
	}

	// when click on show more expert mission

	$(document).on('click','.edit span.showMore', function(event){

		if ($(this).hasClass('selected')) {
			$('.edit ul').css('height','240px')
			$(this).html('&#x25BC')
			$(this).removeClass('selected')
		} else {
			$('.edit ul').css('height','auto')
			$(this).html('&#x25B2')
			$(this).addClass('selected')
		}
	})


// SHOW WINDOW FOR EDITING / ADDING


	//case 1 - add new expert mission
	$(document).on('click','.edit li.circle-mid',function(){
		var missionId=$(this).attr('name');
		var newMission=expertMissions[findExpertMission(missionId)];
		missionDetails(newMission)
	})

	//case 2 - add own mission
	$(document).on('click','.edit button.addOwn',function(){
		var newMission={};
		missionDetails(newMission)
	})

	//case 3 - edit existing user mission
	$(document).on('click', '.container>ul li.circle-big', function(){
		var missionId=$(this).attr('name');
		var newMission=userMissions[findUserMission(missionId)];
		missionDetails(newMission)
	})


	// in all 3 cases missionDetails is called
	function missionDetails(newMission){

		hideEdit();
		showEdit();

		//create circle with icon if it is given for this misison
		$('.edit ul.mission-neutral').append($('<li class="circle-big">' + (newMission.icon ? '<img  src='+ newMission.icon +'>' : "") +  '</li>'))

		//creates empty form 
		$('.edit').append(createEmptyForm());

		//if name is given show in the form
		$('input[name="newMissionName"]').val(newMission.name ? newMission.name : "")

		//if points are given (which means it is user mission) show in the form 
		if (newMission.hasOwnProperty('points')){
			$('input[name="newMissionPoints"]').val(newMission.points)
			//for user mission save missionId
			$('.edit li.circle-big').attr('name',newMission.id)
			//for user missions show also days
			newMission.days.forEach(function(day){
				$('input[name="newMissionDays"]').eq(day).trigger('click')
			})

			//for user mission show SAVE button
			$('.edit').append($('<button class="save">ZAPISZ ZMIANY</button>'))
			// and FINISH / DELETE button
			$('.edit').append($('<button class="left infoFinish">ZAKOŃCZ</button><button class="right infoDelete">USUŃ</button>'))
		} else {
			//for NOT user missions show ADD button
			$('.edit').append($('<button class="add">DODAJ</button>'))
		}
	}


// CREATE EMPTY FORM

	// creates Empty Form for adding / editing missions with all inputs but without button and without image
	function createEmptyForm(){
		var newMissionForm=$('<form class=newMissionForm></form>')
		newMissionForm.append($('<input type="text" name="newMissionName" placeholder="Nazwa misji">'))
		newMissionForm.append($('<p>Liczba punktów</p>'))
		newMissionForm.append($('<span class="less">-</span>'))
		newMissionForm.append($('<input type="number" name="newMissionPoints" placeholder="Liczba punktów">'))
		newMissionForm.append($('<span class="more">+</span>'))
		newMissionForm.append($('<p>W które dni tygodnia?</p>'))
  		newMissionForm.append($('<div class="newMissionDays"></div>'))
  		weekday.forEach(function(day,index){
  			newMissionForm.children('.newMissionDays').append($('<input type="checkbox" name="newMissionDays" id="givenDay'+index+'" value='+index+'><label for="givenDay'+index+'">'+day+'</label>'))
  		})

  		
		return newMissionForm;
	}




	// BUTTONS FOR SUBMIT THE FORM
	$(document).on('click','.edit button.add, .edit button.save',function(){

		var name=$('input[name="newMissionName"]').val();
		var icon=$('.edit li.circle-big img').attr('src');
		var points=$('input[name="newMissionPoints"]').val();
		var days=[]
		$('input[name="newMissionDays"]:checked').each(function(){
			days.push(parseInt($(this).val()))
		})

		if (validateNewMission()) {
			if ($(this).hasClass('add')) {
				$(document).trigger('addUserMission', [name, icon , points, days, true]);
			} else {
				var missionId=$('.edit li.circle-big').attr('name'); 
				$(document).trigger('updateUserMission', [missionId, name, icon , points, days, true]);
			}
			hideEdit();
		} else {
			alert('Czegoś nie uzupełniłeś')
		}
	})


	// validation before submittion

	function validateNewMission(){
		if($('input[name="newMissionName"]').val()==""){
			return false
		}
		var points=$('input[name="newMissionPoints"]').val()
		if (points=="" || points <=0){
			return false
		}
		if ($('input[name="newMissionDays"]:checked').length==0) {
			return false
		}
		return true
	}



$(document).on('click','.edit button.infoFinish',function(){

	
	var missionId=$('.edit li.circle-big').attr('name');
	var newMission=userMissions[findUserMission(missionId)];
	hideEdit();
	showEdit();
	$('.edit ul.mission-neutral').append($('<li class="circle-big">' + (newMission.icon ? '<img  src='+ newMission.icon +'>' : "") +  '</li>'))
	$('.edit li.circle-big').attr('name',missionId)
	$('.edit').append($('<p class="info">' + newMission.name+'</p>'))
	$('.edit').append($('<p class="info">Zakończenie oznacza, że od dziś Dziecko nie musi wykonywać już tej misji, ale zapamiętana zostanie historia związana z tą misją - w tym punkty, które dziecko uzyskało w przeszłości</p>'))
	$('.edit').append($('<button class="finishMission">ZAKOŃCZ</button>'))
})

$(document).on('click','.edit button.finishMission',function(){

	var missionId=$('.edit li.circle-big').attr('name');
	var newMission=userMissions[findUserMission(missionId)];
	$(document).trigger('finishUserMission',missionId)
	hideEdit();
})

$(document).on('click','.edit button.infoDelete',function(){
	
	var missionId=$('.edit li.circle-big').attr('name');
	var newMission=userMissions[findUserMission(missionId)];
	hideEdit();
	showEdit();
	$('.edit ul.mission-neutral').append($('<li class="circle-big">' + (newMission.icon ? '<img  src='+ newMission.icon +'>' : "") +  '</li>'))
	$('.edit li.circle-big').attr('name',missionId)
	$('.edit').append($('<p class="info">' + newMission.name+'</p>'))
	$('.edit').append($('<p class ="info">Usunięcie misji oznacza, że nie tylko Dziecko nie musi wykonywać już tej misji, ale też usuwana jest cała historia zwiazana z tą misją - w tym punkty, które dziecko uzyskało w przesłości</p>'))
	$('.edit').append($('<button class="deleteMission">USUŃ</button>'))
})

$(document).on('click','.edit button.deleteMission',function(){

	var missionId=$('.edit li.circle-big').attr('name');
	var newMission=userMissions[findUserMission(missionId)];
	$(document).trigger('deleteUserMission',missionId)
	hideEdit();
})

// ----- automatically starts after launching page

	//keeps currently visible week day
	var today = new Date();
	today.setHours(0,0,0,0)
	var currentDate =new Date(today);

$(document).trigger('showWeek')