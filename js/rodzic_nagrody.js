//show USER MISSIONS

	//appends one STATE missions assigned for this DAY to HTML 
	
	function appendGifts(stateMissions,stateName){
        
                stateMissions.forEach(function(gift){
                    //finds mission index by missionId
            
                    $('.mission-'+stateName).append($('<li class="circle-big" name='+gift.id+'>'
                        +'<p>'+gift.name+'</p>'
                        +'<img src=' + gift.icon +'>'+starSvg
                        +'<span>'+gift.points+'</span></li>'))
                })
            }
        
            //append ALL missions assigned for this DAY to HTML 
            function showUserGifts(){
        
                // get from database mission type assigned for this day and appends to HTML
                appendGifts(userGifts,'neutral')
            }
        
            $(document).on('showGifts', function (event){
                $('.mission-neutral li').remove()
                showUserGifts();
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
    
// ADDING NEW GIFT - STEP 1 

// when click on PLUS sign
    $('.plus').on('click',function (event){
        
        showEdit()

        $('.edit').prepend($('<h2> polecane przez ekspertów </h2>'))
        $('.edit').prepend($('<h1> Wybierz nagrody </h1>'))
        $('.edit ul').append($('<span class="showMore bounce">&#x25BC</span>'))
        $('.edit').append($('<button class="addOwn">...lub dodaj własną nagrodę</button>'))
        appendExpertGifts();

    })

        function appendExpertGifts(){
    
            expertGifts.forEach(function(gift){
                $('.edit ul.mission-neutral').append($('<li class="circle-mid" name='+gift.id+'><p>'+gift.name+'</p><img src=' + gift.icon +'></li>'))
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


	//case 1 - add new expert gift
	$(document).on('click','.edit li.circle-mid',function(){
		var giftId=$(this).attr('name');
		var newGift=expertGifts[findExpertGift(giftId)];
		giftDetails(newGift)
	})        

    //case 2 - add own gift
	$(document).on('click','.edit button.addOwn',function(){
		var newGift={};
		giftDetails(newGift)
	})

	//case 3 - edit existing user gift
	$(document).on('click', '.container>ul li.circle-big', function(){
		var giftId=$(this).attr('name');
		var newGift=userGifts[findUserGift(giftId)];
		giftDetails(newGift)
	})


	// in all 3 cases missionDetails is called
	function giftDetails(newGift){

		hideEdit();
		showEdit();

		//create circle with icon if it is given for this misison
		$('.edit ul.mission-neutral').append($('<li class="circle-big">' + (newGift.icon ? '<img  src='+ newGift.icon +'>' : "") +  '</li>'))

		//creates empty form 
		$('.edit').append(createEmptyForm());

		//if name is given show in the form
		$('input[name="newGiftName"]').val(newGift.name ? newGift.name : "")

		//if points are given (which means it is user mission) show in the form 
		if (newGift.hasOwnProperty('points')){
			$('input[name="newGiftPoints"]').val(newGift.points)
			//for user mission save missionId
			$('.edit li.circle-big').attr('name',newGift.id)

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
		var newGiftForm=$('<form class=newGiftForm></form>')
		newGiftForm.append($('<input type="text" name="newGiftName" placeholder="Nazwa prezentu">'))
		newGiftForm.append($('<p>Liczba punktów</p>'))
		newGiftForm.append($('<span class="less">-</span>'))
		newGiftForm.append($('<input type="number" name="newGiftPoints" placeholder="Liczba punktów">'))
		newGiftForm.append($('<span class="more">+</span>'))

	
		return newGiftForm;
	}
    
$(document).trigger('showGifts')