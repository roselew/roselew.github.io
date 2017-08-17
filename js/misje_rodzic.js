		//appends one STATE missions assigned for this DAY to HTML 
	function appendMission(day, stateMissions,stateName){

		stateMissions.forEach(function(missionId){
			//finds mission index by missionId
			var missionIndex = findUserMission(missionId)
			$('.mission-'+stateName).append($('<li class="circle-big" name='+missionId+'><p>'+userMissions[missionIndex].name+'</p><img src=' + userMissions[missionIndex].icon +'>'+starSvg+'<span>'+userMissions[missionIndex].points+'</span></li>'))
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

		$('.edit').append($('<button class="save">ZAPISZ ZMIANY</button>'))
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


$(document).on('click','.edit button.add',function(){
	var name=$('input[name="newMissionName"]').val();
	var icon=$('.edit li.circle-big img').attr('src');
	var points=$('input[name="newMissionPoints"]').val();
	$(document).trigger('addUserMission', [name, icon , points, 7, [0,1,2,3,4,5,6], true]);
	hideEdit();
})

$(document).on('click','.edit button.save',function(){
	var missionId=$('.edit li.circle-big').attr('name')
	var name=$('input[name="newMissionName"]').val();
	var icon=$('.edit li.circle-big img').attr('src');
	var points=$('input[name="newMissionPoints"]').val();
	$(document).trigger('updateUserMission', [missionId, name, icon , points, 7, [0,1,2,3,4,5,6], true]);
	hideEdit();
})


 //$("input[name='newMissionType']:checked").val()

function createEmptyForm(){
		var newMissionForm=$('<form class=newMissionForm></form>')
		newMissionForm.append($('<input type="text" name="newMissionName" placeholder="Nazwa misji">'))
		newMissionForm.append($('<span class="less">-</span>'))
		newMissionForm.append($('<input type="text" name="newMissionPoints" placeholder="Liczba punktów">'))
		newMissionForm.append($('<span class="more">+</span>'))
		newMissionForm.append($('<input type="radio" name="newMissionType" id="givenDays"/><label for="givenDays">W określone dni tygodnia</label>'))
  		newMissionForm.append($('<input type="radio" name="newMissionType" id="anyDays"/><label for="anyDays">W dowolne dni tygodnia</label>'))
		return newMissionForm;
}

//add own mission
$(document).on('click','.edit button.addOwn',function(){

	hideEdit();
	showEdit();
	//addOwn();
	$('.container ul').show('slow')
	
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