var curActivitySetting=null;

efform_onload = function() {
	efform.hideFormHead();
	$("#ef_tab_x").children('br').remove();
	$('#efFormStatus').remove();
	$('#_efFormGuide').remove();
	var editor=parent.getCurrentEditor();
	curActivitySetting = new ManualActivitySetting(editor);
	//curActivitySetting.renderActivityLastExecutor();
}


/*
 * 用户信息的查询
 */
button_query_onclick = function() {
	efgrid.submitInqu("ef_grid_Users", "", "EW0120", "GetQueryUsers");
	return false;
}
button_clear_onclick = function() {
	efform.clearInputField($("#ef_region_inqu")[0]);
}
/*
 * 角色信息的查询
 */
button_query2_onclick = function() {
	efgrid.submitInqu("ef_grid_Roles", "", "EW0120", "GetQueryRoles");
}

button_clear2_onclick = function() {
	efform.clearInputField($("#ef_region_inqu_2")[0]);
}


function button_confirm_onclick() {
	curActivitySetting.finishParticipantsSelection();
	parent.closeDialog('EW0120');
}

function button_cancel_onclick() {	
	parent.closeDialog('EW0120');
}

 
 