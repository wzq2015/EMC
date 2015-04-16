var curActivitySetting=null;

efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
    var editor=parent.getCurrentEditor();
	curActivitySetting = new ActivityParticipantsSetting(editor);
	curActivitySetting.renderActivityLastExecutor();
}


function button_confirm_onclick() {
	curActivitySetting.finishActivityLastExecutorSelection();	
	parent.closeDialog('EW0113');
}

function button_cancel_onclick() {	
	parent.closeDialog('EW0113');
}

 
 