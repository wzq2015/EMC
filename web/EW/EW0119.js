var curActivitySetting=null;

efform_onload = function() {
	efform.hideFormHead();
	$("#ef_tab_x").children('br').remove();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new ActivityParticipantsSetting(editor);
	//curActivitySetting.renderActivityLastExecutor();
}


/*
 * 用户信息的查询
 */
button_query1_onclick = function() {
	efgrid.submitInqu("ef_grid_Posts", "EW", "EW0119", "queryPost");
}

/*
 * 角色信息的查询
 */
button_query2_onclick = function() {
	efgrid.submitInqu("ef_grid_Groups", "EW", "EW0119", "queryGroup");
}

function button_confirm_onclick() {
	curActivitySetting.finishPostOrGroupSelection();
	parent.closeDialog('EW0119');
//	parent.$("#pgSelection").dialog("close");
//	parent.$("#pgSelection").remove();
}

function button_cancel_onclick() {	
	parent.closeDialog('EW0119');
//	parent.$("#pgSelection").dialog("close");
//	parent.$("#pgSelection").remove();
}

 
 