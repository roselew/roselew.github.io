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


$(document).on('click', '.container>ul li.circle-big', function(){
	var missionId=$(this).attr('name');

	hideEdit();
	showEdit();

	missionDetails('user',missionId)
})

// ADDING & EDITING

//show new window for adding/edition on whole screen with X button  
function showEdit() {
	$('.container>ul').hide()
	$('.plus').hide()
	//add class .edit
	$('.container').append($('<div class ="edit"> <span class="X" onclick="hideEdit()"> X </span></div>'))
	$('.edit').append($('<ul class="mission-neutral"></ul>'))
}

function hideEdit() {
	//removes alert
	$('.edit').remove()
	$('.plus').show()
	$('.container>ul').show()
}


// ADDING NEW MISSION - STEP 1 

$('.plus').on('click',function (event){
	//hides user missions
	

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

// SHOW MORE EXPERT MISSIONS

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


// ADDING NEW MISSION - STEP 2 

//add new expert mission
$(document).on('click','.edit li.circle-mid',function(){

	var missionId=$(this).attr('name');

	hideEdit();
	showEdit();
	missionDetails('expert',missionId)

})

// show details of mission
// expert - add new proposed by experts
// user - edit existing user mission
// empty - add new own mission

function missionDetails(type,missionId){

	if (type=="expert"){
		var missionIndex = findExpertMission(missionId);
		var newMission=expertMissions[missionIndex]
		$('.edit ul.mission-neutral').append($('<li class="circle-big"><img src=' + newMission.icon +'></li>'))
		$('.edit').append(createEmptyForm());
		$('input[name="newMissionName"]').val(newMission.name)

		$('.edit').append($('<button class="add">DODAJ</button>'))
	}  
	if (type=="user"){
		var missionIndex = findUserMission(missionId);
		var newMission=userMissions[missionIndex]
		$('.edit ul.mission-neutral').append($('<li class="circle-big"><img src=' + newMission.icon +'></li>'))
		$('.edit li.circle-big').attr('name',missionId)
		$('.edit').append(createEmptyForm());
		$('input[name="newMissionName"]').val(newMission.name)
		$('input[name="newMissionPoints"]').val(newMission.points)

		if (newMission.days){
			$('#givenDays').prop("checked", true).trigger('click')
			newMission.days.forEach(function(day){
				$('input[name="newMissionDays"]').eq(day).trigger('click')
			})
		} else {
			$('#anyDays').prop("checked", true).trigger('click')
			$('input[name="newMissionFrequency"]').val(newMission.frequency)	
		}

		$('.edit').append($('<button class="save">ZAPISZ ZMIANY</button>'))
	}
	if (type=="empty"){
		$('.edit ul.mission-neutral').append($('<li class="circle-big"></li>'))
		$('.edit').append(createEmptyForm());
		$('.edit').append($('<button class="add">DODAJ</button>'))
	}
}



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



$(document).on('click','.edit button.add',function(){

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
		$(document).trigger('addUserMission', [name, icon , points, frequency, days, true]);
		hideEdit();
	} else {
		alert('Czegoś nie uzupełniłeś')
	}

	
	
})

$(document).on('click','.edit button.save',function(){

	var missionId=$('.edit li.circle-big').attr('name')
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
		$(document).trigger('updateUserMission', [missionId, name, icon , points, frequency, days, true]);
		hideEdit();
	} else {
		alert('Czegoś nie uzupełniłeś')
	}
})


// creates Empty Form for adding / editing missions with all inputs but without button and without image
function createEmptyForm(){
		var newMissionForm=$('<form class=newMissionForm></form>')
		newMissionForm.append($('<input type="text" name="newMissionName" placeholder="Nazwa misji">'))
		newMissionForm.append($('<p>Liczba punktów</p>'))
		newMissionForm.append($('<span class="less">-</span>'))
		newMissionForm.append($('<input type="text" name="newMissionPoints" placeholder="Liczba punktów">'))
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
		newMissionFrequency.append($('<input type="text" name="newMissionFrequency" placeholder="Ile razy w tyg.">'))
		newMissionFrequency.append($('<span class="more">+</span>'))
		return newMissionForm;
}

$(document).on('click','input[name="newMissionType"]',function(){
	if ($('#givenDays').is(':checked')){
		$('.newMissionDays').slideDown('slow')
		$('.newMissionFrequency').hide()
	} else {
		$('.newMissionDays').hide()
		$('.newMissionFrequency').slideDown('slow')
	}
})

//add own mission
$(document).on('click','.edit button.addOwn',function(){

	hideEdit();
	showEdit();
	missionDetails('empty')
	
})

function addExpert(mission){
	var missionId = mission.attr('name')
	var missionIndex= findExpertMission(missionId)

	$(document).trigger('addUserMission', [expertMissions[missionIndex].name, 	expertMissions[missionIndex].icon , 	1, 7, [0,1,2,3,4,5,6], true])
}



// ----- automatically starts after launching page

	//keeps currently visible week day
	var today = new Date();
	today.setHours(0,0,0,0)
	var currentDate =new Date(today);

$(document).trigger('showWeek')