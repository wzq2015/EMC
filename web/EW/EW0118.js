efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();	
	$('#xml').mouseenter(function(event){
	  $(this).focus();
	});
}


function button_close_onclick() {
	parent.closeDialog('EW0118');
}

function button_save_onclick() {
	var xml = $('#xml').val().trim();
	if (xml.length == 0)
		return;
	parent.importProcess(categoryId, $('#xml').val());
	parent.closeDialog('EW0118');
}
