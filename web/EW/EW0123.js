efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	$('#xml').val(parent.getCurrentEditor().formatXml(mxUtils.getXml(parent.tempSelectedPart)));
}




function button_close_onclick() {	
	parent.tempSelectedPart=null;
	parent.closeDialog('EW0123');
}

