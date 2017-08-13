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
	showEdit('Wybierz misje','polecane przez ekspertów lub...')
	appendExpertMission();
	$('.edit').append($('<button>...dodaj własna misje</button>'))
})


$(document).on('click','.edit button', function(event){

$('.edit ul').css('height','auto')
})



//show alert with text MESSAGE and picture of some TYPE
function showEdit(title,subtitle) {
	$('.plus').hide()
	//add class .alert - top layer 
	$('.container').append($('<div class ="edit"> <span onclick="hideEdit()"> X </span></div>'))
	$('.edit').append($('<h1>'+title+'</h1>'))
	$('.edit').append($('<h2>'+subtitle+'</h2>'))
	$('.edit').append($('<ul class="mission-neutral"></ul>'))
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