//show USER MISSIONS

	//appends one STATE missions assigned for this DAY to HTML 
	
	function appendMission(day, stateMissions,stateName){

		stateMissions.forEach(function(missionId){
			//finds mission index by missionId
			var mission=userMissions[findUserMission(missionId)]
			if (mission.days==""){
				var when = 'x '+ mission.frequency
			} else {
				var when = convertDaysNames(mission.days)
			}

			$('.mission-'+stateName).append($('<li class="circle-big" name='+missionId+'>'
				+'<p><span class=dayList>'+ when +'</span>'+mission.name+'</p>'
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
		showDay( currentDate);
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
		$('.edit ul').append($('<span class="showMore">&#x25BC</span>'))
		$('.edit').append($('<button class="addOwn">...lub dodaj własna misje</button>'))
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
			//for user missions show also days/frequency
			if (newMission.days){
				$('#givenDays').prop("checked", true).trigger('click')
				newMission.days.forEach(function(day){
					$('input[name="newMissionDays"]').eq(day).trigger('click')
				})
			} else {
				$('#anyDays').prop("checked", true).trigger('click')
				$('input[name="newMissionFrequency"]').val(newMission.frequency)	
			}
			//for user mission show SAVE button
			$('.edit').append($('<button class="save">ZAPISZ ZMIANY</button>'))
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
		newMissionForm.append($('<input type="radio" name="newMissionType" id="givenDays"><label for="givenDays">określone</label>'))
  		newMissionForm.append($('<input type="radio" name="newMissionType" id="anyDays"><label for="anyDays">dowolne</label>'))
  		var newMissionDays = $('<div class="newMissionDays" hidden></div>')
  		newMissionForm.append(newMissionDays)
  		weekday.forEach(function(day,index){
  			newMissionForm.children('.newMissionDays').append($('<input type="checkbox" name="newMissionDays" id="givenDay'+index+'" value='+index+'><label for="givenDay'+index+'">'+day+'</label>'))
  		})
  		var newMissionFrequency= $('<div class="newMissionFrequency" hidden></div>')
  		newMissionForm.append(newMissionFrequency)
  		newMissionFrequency.append($('<p>Ile razy tygodniowo?</p>'))
  		newMissionFrequency.append($('<span class="less">-</span>'))
		newMissionFrequency.append($('<input type="number" name="newMissionFrequency" placeholder="Ile razy w tyg.">'))
		newMissionFrequency.append($('<span class="more">+</span>'))
		return newMissionForm;
	}

	// buttons for + and - on the form 
	$(document).on('click','.edit span.less',function(){
		var missionPoints=parseInt($(this).next().val());
		if (missionPoints>=1) {
			missionPoints=missionPoints-1;
		} else {
			missionPoints=0;
		}
		$(this).next().val(missionPoints)
	})

	$(document).on('click','.edit span.more',function(){
		var missionPoints=parseInt($(this).prev().val());
		if (missionPoints>=0) {
			missionPoints=missionPoints+1;
		} else {
			missionPoints=1;
		}
		$(this).prev().val(missionPoints)
	})

	// show more options when GIVEN / ANY days chosen
	$(document).on('click','input[name="newMissionType"]',function(){
		if ($('#givenDays').is(':checked')){
			$('.newMissionDays').slideDown('slow')
			$('.newMissionFrequency').hide()
		} else {
			$('.newMissionDays').hide()
			$('.newMissionFrequency').slideDown('slow')
		}
	})


	// BUTTONS FOR SUBMIT THE FORM
	$(document).on('click','.edit button.add, .edit button.save',function(){

		var name=$('input[name="newMissionName"]').val();
		var icon=$('.edit li.circle-big img').attr('src');
		var points=$('input[name="newMissionPoints"]').val();

		if ($('#givenDays').is(':checked')){
			var days=[]
			$('input[name="newMissionDays"]:checked').each(function(){
				days.push(parseInt($(this).val()))
			})
			var frequency=""
		} else {
			var days=""
			var frequency =$('input[name="newMissionFrequency"]').val();
		}

		if (validateNewMission()) {
			if ($(this).hasClass('add')) {
				$(document).trigger('addUserMission', [name, icon , points, frequency, days, true]);
			} else {
				var missionId=$('.edit li.circle-big').attr('name'); 
				$(document).trigger('updateUserMission', [missionId, name, icon , points, frequency, days, true]);
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
		if ($('#givenDays').is(':checked')){
			if ($('input[name="newMissionDays"]:checked').length==0) {
				return false
			}
		} else if ($('#anyDays').is(':checked')){	
			var frequency=$('input[name="newMissionFrequency"]').val()
			if(frequency=="" || frequency>7 || frequency<1){
				return false
			}
		} else {return false}
		return true
	}




// ----- automatically starts after launching page

	//keeps currently visible week day
	var today = new Date();
	today.setHours(0,0,0,0)
	var currentDate =new Date(today);

$(document).trigger('showWeek')