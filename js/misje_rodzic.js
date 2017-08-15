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



function appendExpertMission(){

	expertMissions.forEach(function(mission){
		$('.edit ul.mission-neutral').append($('<li class="circle-mid" name='+mission.id+'><p>'+mission.name+'</p><img src=' + mission.icon +'></li>'))
	})
}



$('.plus').on('click',function (event){
	$('.container ul').slideToggle('slow')
	
	showEdit('Wybierz misje','polecane przez ekspertów lub...')
	appendExpertMission();
	$('.edit').append($('<button>...dodaj własna misje</button>'))
})


$(document).on('click','.edit span.details', function(event){

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

$(document).on('click','.edit li.circle-mid',function(){

	hideEdit();
	addExpert($(this));
	$('.container ul').slideToggle('slow')
})

$(document).on('click','.edit button',function(){

	hideEdit();
	//addOwn();
	$('.container ul').slideToggle('slow')
	
})

function addExpert(mission){
	var missionId = mission.attr('name')
	var missionIndex= findExpertMission(missionId)

	$(document).trigger('addUserMission', [expertMissions[missionIndex].name, 	expertMissions[missionIndex].icon , 	1, 7, [0,1,2,3,4,5,6], true])
}


function showEdit2(){
	$('.plus').hide()
	//add class .alert - top layer 
	$('.container').append($('<div class ="edit"> <span onclick="hideEdit()"> X </span></div>'))
}

//show alert with text MESSAGE and picture of some TYPE
function showEdit(title,subtitle) {
	$('.plus').hide()
	//add class .alert - top layer 
	$('.container').append($('<div class ="edit"> <span onclick="hideEdit()"> X </span></div>'))
	$('.edit').append($('<h1>'+title+'</h1>'))
	$('.edit').append($('<h2>'+subtitle+'</h2>'))
	$('.edit').append($('<ul class="mission-neutral"></ul>'))
	$('.edit ul').append($('<span class="details">&#x25BC</span>'))
}


function hideEdit() {

	//removes alert
	$('.edit').remove()
	$('.plus').show()

}









// ----- automatically starts after launching page

	//keeps currently visible week day
	var today = new Date();
	today.setHours(0,0,0,0)
	var currentDate =new Date(today);

$(document).trigger('showWeek')