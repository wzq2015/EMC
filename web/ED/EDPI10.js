
button_f2_onclick = function ()
{
	//debugger;
	efgrid.submitInqu( "ef_grid_result", "ed","EDPI10","query");
}

button_f3_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDPI10","update",true );
}

button_f4_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDPI10","delete", true );
}

button_f6_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDPI10","insert",true );
}

efgrid_onFixCellClick = function(grid_id, row_index, col_index, cell_value)
{
	if (grid_id != "ef_grid_result") return;
	
	if (col_index == 2) {
		var win = window.open("DispatchAction.do?efFormEname=EDFA02" + "&methodName=query&inqu_status-0-form_ename=" + cell_value);
		win.focus();
	}
}

button_generatei18nresources_onclick = function ()
{
	var info = new EiInfo(); 
	info.setByNodeObject( document.forms[0] );
	EiCommunicator.send("EDPI10", "generateI18nResources", info, null);
};