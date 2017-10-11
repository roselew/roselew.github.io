// ten skrypt zawiera bazę danych (dopóki nie zostanie wrzucona do jsona) i wszystkie skrypty które odpowiadają za aktualizację bazy danych lub pobranie z niej danych


var color={
done: '#13CE66',// green
wait: '#FFBA5C', // yellow
undone: '#F95F62', //red
base: '#00A6FF', //blue
back_kid: '#0C1A3F', 
back_parent: '#E6E8E5',
alert: 'rgba(66,75,100,0.95)'}

var starSvg='<svg class="star" viewBox="0 0 19.481 19.481" enable-background="new 0 0 19.481 19.481"><path d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"/></svg>'

var weekday = new Array(7);
weekday[0] = "PN";
weekday[1] = "WT";
weekday[2] = "ŚR";
weekday[3] = "CZ";
weekday[4] = "PT";
weekday[5] = "SB";
weekday[6] = "ND";


function convertDaysNames(days){
	var daysNames=[];
	days.forEach(function(day,index){
		daysNames[index]=weekday[day]
	})
	return daysNames.join(" ");
}

var monthName= new Array(12);
monthName[0]= "styczeń";
monthName[1]= "luty";
monthName[2]="marzec";
monthName[3]="kwiecień";
monthName[4]="maj";
monthName[5]="czerwiec";
monthName[6]="lipiec";
monthName[7]="sierpień";
monthName[8]="wrzesień";
monthName[9]="październik";
monthName[10]="listopad";
monthName[11]="grudzień";


var expertMissions = [
	{ id:'1',	name: 'Zęby rano',				icon: 'assets/toothbrush.svg'	},
	{ id:'2',	name: 'Zęby wieczór',			icon: 'assets/toothbrush.svg'	},
	{ id:'3',	name: 'Posprzątać pokój',		icon: 'assets/room.svg'			},	
	{ id:'4',	name: 'Poskładać zabawki',		icon: 'assets/block.svg'		},
	{ id:'5',	name: 'Opróżnić zmywarkę',		icon: 'assets/dishwasher.svg'	},	
	{ id:'6',	name: 'Wstawić pranie',			icon: 'assets/laundry.svg'		},
	{ id:'7',	name: 'Pościelić łóżko',		icon: 'assets/bed.svg'			},
	{ id:'8',	name: 'Odkurzyć podłogę',		icon: 'assets/vacuum.svg'		},
	{ id:'9',	name: 'Umyć podłogę',			icon: 'assets/cleaning.svg'		},	
	{ id:'10',	name: 'Nakryć stół',			icon: 'assets/cutlery.svg'		},
	{ id:'11',	name: 'Posprzątać ze stołu',	icon: 'assets/table.svg'		},	
	{ id:'12',	name: 'Wynieść śmieci',			icon: 'assets/garbage.svg'		},	
	{ id:'13',	name: 'Posprzątać po zwierzątku',icon: 'assets/kennel.svg'		},	
	{ id:'14',	name: 'Umyć auto',				icon: 'assets/car.svg'			},	
	{ id:'15',	name: 'Zetrzeć kurze',			icon: 'assets/clean.svg'		},	
	{ id:'16',	name: 'Nakarmić zwierzątko',	icon: 'assets/dog-food.svg'		},	
	{ id:'17',	name: 'Wyprowadzić zwierzątko',	icon: 'assets/pet.svg'			},	
	{ id:'18',	name: 'Rozpakować zakupy',		icon: 'assets/basket.svg'		},	
	{ id:'19',	name: 'Pomoc w ogródku',		icon: 'assets/tree.svg'			},	
	{ id:'20',	name: 'Umyć naczynia',			icon: 'assets/wash.svg'			},	
	{ id:'21',	name: 'Odrobić pracę domową',	icon: 'assets/carpentry.svg'	},	
	{ id:'22',	name: 'Przeczytać książkę',		icon: 'assets/book.svg'			},		
	{ id:'23',	name: 'Poskładać ubrania',		icon: 'assets/shirt.svg'		},
	{ id:'24',	name: 'Ubrać się samemu',		icon: 'assets/shirt.svg'		}	
]

var userMissions = [
	{
		id:'1',
		name: 'Pościelić łóżko',
		icon: 'assets/bed.svg',
		points: 1,
		days:[0,1,2,3,4,5,6],
		confirm: true,
		start: new Date("2015/12/31 00:00:00")	,
	},
	{
		id:'2',
		name: 'Odrobić pracę domową',
		icon: 'assets/carpentry.svg',
		points: 2,
		days: [0,1,3,5],
		confirm: true,
		start: new Date("2015/12/31 00:00:00"),
	},
	{
		id:'3',
		name:'Zetrzeć kurze',
		icon:'assets/clean.svg',
		points: 1,
		days:[0,2,4,6],
		confirm: true,
		start: new Date("2015/12/31 00:00:00"),
	},
	{
		id:'4',
		name:'Rozpakować zakupy',
		icon:'assets/basket.svg',
		points: 3,
		days:[1,4],
		confirm: true,
		start: new Date("2015/12/31 00:00:00"),
	}
]



var waitMissions = [
	{ missionId: '3', doneDate: new Date('2017/08/07 00:00:00')},
	{ missionId: '2', doneDate: new Date('2017/08/05 00:00:00')},
	{ missionId: '3', doneDate: new Date('2017/08/04 00:00:00')},
	{ missionId: '4', doneDate: new Date('2017/08/04 00:00:00')},
	{ missionId: '2', doneDate: new Date('2017/08/03 00:00:00')},
	{ missionId: '1', doneDate: new Date('2017/08/02 00:00:00')},
	{ missionId: '1', doneDate: new Date('2017/07/31 00:00:00')},
]



var doneMissions = [
	{ missionId: '8', doneDate: new Date('2017/08/07 00:00:00')},
	{ missionId: '1', doneDate: new Date('2017/08/07 00:00:00')},
	{ missionId: '1', doneDate: new Date('2017/08/06 00:00:00')},
	{ missionId: '1', doneDate: new Date('2017/08/05 00:00:00')},
	{ missionId: '7', doneDate: new Date('2017/08/04 00:00:00')},
	{ missionId: '1', doneDate: new Date('2017/08/04 00:00:00')},
	{ missionId: '6', doneDate: new Date('2017/08/03 00:00:00')},
	{ missionId: '8', doneDate: new Date('2017/08/02 00:00:00')},
	{ missionId: '3', doneDate: new Date('2017/07/31 00:00:00')},
	{ missionId: '2', doneDate: new Date('2017/07/31 00:00:00')},
]


var expertGifts = [
	{ id:'1',	name: 'Wyjście na lody', icon: 'assets/icecream.svg'},
	{ id:'2',	name: 'Wyjście do kina', icon: 'assets/tickets.svg'	},
	{ id:'3',	name: 'Wycieczka na weekend', icon: 'assets/walk.svg'},
	{ id:'4',	name: 'Aquapark ', icon: 'assets/swimming-pool.svg'},
	{ id:'5',	name: '15 min na gry', icon: 'assets/15-minutes.svg'},
	{ id:'6',	name: '30 min na gry', icon: 'assets/30-minutes.svg'},
	{ id:'7',	name: '45 min na gry', icon: 'assets/45-minutes.svg'},
	{ id:'8',	name: 'Nowa gra', icon: 'assets/remote-control.svg'},
	{ id:'9',	name: 'Nowa zabawka', icon: 'assets/gift2.svg'},
	{ id:'10',	name: 'Wieczór gier', icon: 'assets/dice.svg'},
	{ id:'11',	name: 'Deser', icon: 'assets/piece-of-cake.svg'},
	{ id:'12',	name: 'Późniejszy powrót do domu', icon: 'assets/history.svg'},
	{ id:'13',	name: 'Deskorolka', icon: 'assets/skateboard.svg'},
	{ id:'14',	name: 'Niespodzianka', icon: 'assets/gift2.svg'},
	{ id:'15',	name: 'Klocki LEGO', icon: 'assets/lego.svg'}
]

var userGifts = [
	{
		id:'1',
		name: 'Wyjście na lody',
		icon: 'assets/icecream.svg',
		points: 10,
	},
	{
		id:'2',
		name: 'Wieczór gier',
		icon: 'assets/dice.svg',
		points: 50,		
	}
]

// -------READ FROM DATABASE ---------------

//get from database ALL missions assigned for this DAY
function getAllMissions(day){
	var dayAllMissions = [];
	userMissions.forEach(function(mission){
		var startDate = new Date(mission.start)
		//if Mission is started
		if (day>=startDate) {
			// if Mission is not finished
			if (mission.finish == null || day<mission.finish){
				dayAllMissions.push(mission.id)
			}
		}	 
	})
	return dayAllMissions;
}


//get from database ALL missions assigned for this DAY
function getDayMissions(day){
	var dayAllMissions = [];
	userMissions.forEach(function(mission){
	//if Mission is started
	if (day>=mission.start) {
		// if Mission is not finished
		if (mission.finish == null || day<mission.finish){
			//if day of the week ok
			if (mission.days.indexOf(day.getUTCDay())!==-1){
				dayAllMissions.push(mission.id)
			}			
		}

	}
	})
	return dayAllMissions;
}


//get from database all missions DONE this DAY
function getDoneMissions(day){
	var dayDoneMissions = [];
	doneMissions.forEach(function(mission){
		// compare doneDate with day
		var doneDate = new Date(mission.doneDate);
		if (day.getTime()==doneDate.getTime()) {
			dayDoneMissions.push(mission.missionId);
		}
	})
	return dayDoneMissions;
}


//get from database all missions done this DAY but WAIT for acceptance
function getWaitMissions(day){
	var dayWaitMissions = [];
	waitMissions.forEach(function(mission){
		// compare doneDate with day
		var doneDate = new Date(mission.doneDate);
		if (day.getTime()==doneDate.getTime()) {
			dayWaitMissions.push(mission.missionId);
		}
	})
	return dayWaitMissions;
}


//get from database all UNDON missions assigned for this DAY
function getUndoneMissions(day){
	var dayUndoneMissions=[];
	var dayAllMissions = getDayMissions(day);
	var dayWaitMissions = getWaitMissions(day);
	var dayDoneMissions= getDoneMissions(day);

	//remove from All missions WAIT and DONE
	var toRemove=dayWaitMissions.concat(dayDoneMissions)
	var dayUndoneMissions = $.grep(dayAllMissions, function(value) {
    return $.inArray(value, toRemove) < 0;
	});

	return dayUndoneMissions;
}	


//------WRITE IN DATABASE -----------------


// add new user mission
$(document).on('addUserMission', function (event, name, icon,points,days,confirm,start) {

	var today=new Date();

	start = typeof start !== 'undefined' ? new Date(start) : today;
	start.setHours(0,0,0,0)

	var newId =String(Number(userMissions[userMissions.length-1].id)+1);
		var newUserMission={
				id: newId,
				name: name,
				icon: icon,
				points: points,
				days:days,
				confirm: confirm,
				start: start,
			}
	
	userMissions.push(newUserMission)
	$(document).trigger('showWeek')
})

$(document).on('deleteUserMission',function(event,missionId){

	var index = findUserMission(missionId);
	userMissions.splice(index,1);

	$(document).trigger('showWeek')
})
	

$(document).on('finishUserMission',function(event,missionId,finish){

	var index = findUserMission(missionId);
	userMissions[index].finish = today;
	
	$(document).trigger('showWeek')
})
	

$(document).on('updateUserMission', function (event, missionId, name, icon,points,days,confirm,start) {

	var index = findUserMission(missionId);

	userMissions[index].name=name;
	userMissions[index].icon=icon;
	userMissions[index].points=points;
	userMissions[index].days=days;
	userMissions[index].confirm=confirm;

	$(document).trigger('showWeek')
})

// finds index of WAIT / DONE mission in waitMissions / doneMissions
function findDoneMission(type, missionId, doneDate){
		var index = type.findIndex(function (mission) {
			return (missionId == mission.missionId && doneDate.getTime()==mission.doneDate.getTime())
		});
		return index
}

//finds index of USER mission in userMissions by ID
function findUserMission(missionId){
	var index = userMissions.findIndex(function (mission) {
		return missionId == mission.id
	});
	return index
}

function findExpertMission(missionId){
	var index = expertMissions.findIndex(function (mission) {
		return missionId == mission.id
	});
	return index
}


// add done mission
$(document).on('addDoneMission', function (event, missionId, doneDate){
	var newDoneMission = { missionId: missionId, doneDate: doneDate};
	doneMissions.push(newDoneMission)
	$(document).trigger('showWeek')
})

// add wait mission
$(document).on('addWaitMission', function (event, missionId, doneDate){
	var newWaitMission = { 
		missionId: missionId, 
		doneDate: doneDate
	};
	waitMissions.push(newWaitMission)
	$(document).trigger('showWeek')
})

// delete done mission
$(document).on('deleteDoneMission', function (event, missionId, doneDate){
	var index= findDoneMission(doneMissions,missionId,doneDate)
	if (index>-1){
		doneMissions.splice(index,1)
	}
	$(document).trigger('showWeek')
})

// delete wait mission
$(document).on('deleteWaitMission', function (event, missionId, doneDate){
	var index= findDoneMission(waitMissions,missionId,doneDate)
	if (index>-1){
		waitMissions.splice(index,1)
	}
	$(document).trigger('showWeek')
})


//finds index of USER mission in userMissions by ID
function findUserGift(giftId){
	var index = userGifts.findIndex(function (gift) {
		return giftId == gift.id
	});
	return index
}


function findExpertGift(giftId){
	var index = expertGifts.findIndex(function (gift) {
		return giftId == gift.id
	});
	return index
}



//function checking if we are in the kid mode
function kidMode() { return $('body').hasClass('kid') };




//add view user missions

//$(document).trigger('addUserMission', [name, icon, points,  days, confirm, {start}])
//start optional, Monday = 0
$(document).trigger('addUserMission', [expertMissions[0].name, 	expertMissions[0].icon , 	1, [1,2], true])
$(document).trigger('addUserMission', [expertMissions[15].name, expertMissions[15].icon , 	2, [3], true, '2015/12/24 00:00:00'])
$(document).trigger('addUserMission', [expertMissions[3].name, 	expertMissions[3].icon , 	3, [1], true, '2015/12/24 00:00:00'])
$(document).trigger('addUserMission', [expertMissions[4].name, 	expertMissions[4].icon , 	1, [0,2,4], true, '2016/12/24 00:00:00'])
$(document).trigger('addUserMission', [expertMissions[5].name, 	expertMissions[5].icon , 	2, [3], true, '2017/12/24 00:00:00'])