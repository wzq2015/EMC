var curActivitySetting=null;

efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new ActivityParticipantsSetting(editor);
	curActivitySetting.renderCustomizeDataset();
}


function button_confirm_onclick() {
	curActivitySetting.finishCustomizeDatasetSelection();	
	parent.closeDialog('EW0115');
}

function button_cancel_onclick() {	
	parent.closeDialog('EW0115');
}

 
 