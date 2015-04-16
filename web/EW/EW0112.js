var curActivitySetting=null;

efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
    var editor=parent.getCurrentEditor();
	curActivitySetting = new ActivityParticipantsSetting(editor);
	curActivitySetting.renderRoleWithOrg();
}


function button_confirm_onclick() {
	curActivitySetting.finishEpassRoleWithInputOrgSelection();
	parent.closeDialog('EW0112');
}

function button_cancel_onclick() {
	parent.closeDialog('EW0112');
}

 
 