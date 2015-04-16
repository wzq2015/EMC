var curActivitySetting=null;

efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	$("#ef_tab_x").children('br').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new ActivityParticipantsSetting(editor);
	curActivitySetting.renderActivityLastExecutor();
}


/*
 * 用户信息的查询
 */
button_query_onclick = function() {
	efgrid.submitInqu("ef_grid_Users", "EW", "EW0114", "GetQueryUsers");
}
button_clear_onclick = function() {
	efform.clearInputField($("#ef_region_inqu")[0]);
}
/*
 * 角色信息的查询
 */
button_query2_onclick = function() {
	efgrid.submitInqu("ef_grid_Roles", "EW", "EW0114", "GetQueryRoles");
}
button_clear2_onclick = function() {
	efform.clearInputField($("#ef_region_inqu_2")[0]);
}



function button_confirm_onclick() {
	curActivitySetting.finishCollaboratorSelection();
	parent.closeDialog('EW0114');
}

function button_cancel_onclick() {	
	parent.closeDialog('EW0114');
}

 
 