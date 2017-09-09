//tu będą skrypty które są wspólne dla wszystkich ekranów rodzica

// show menu
$('label[for="nav"]').on('click',function(){
	$('nav').animate({width: 'toggle'})
})



	// buttons for + and - on the form 
	$(document).on('click','span.less',function(){
		var missionPoints=parseInt($(this).next().val());
		if (missionPoints>=1) {
			missionPoints=missionPoints-1;
		} else {
			missionPoints=0;
		}
		$(this).next().val(missionPoints)
	})

	$(document).on('click','span.more',function(){
		var missionPoints=parseInt($(this).prev().val());
		if (missionPoints>=0) {
			missionPoints=missionPoints+1;
		} else {
			missionPoints=1;
		}
		$(this).prev().val(missionPoints)
	})