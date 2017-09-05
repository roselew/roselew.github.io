//tu będą skrypty które są wspólne dla wszystkich ekranów rodzica

// show menu
$('label[for="nav"]').on('click',function(){
	$('nav').animate({width: 'toggle'})
})