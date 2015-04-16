efform_onload = function ()
{
  //efbutton.setButtonStatus("F6", false);
  //efregion.show("ef_region_inqu");
  //efregion.toggleShow("ef_region_inqu");
}


button_f2_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ed","EDFA51","query");
}

button_f3_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDFA51","update",true );
}

button_f4_onclick = function ()
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var rows = grid.getSelectRowsData();
	if(rows.length == 0) {
		alert("请选择记录！");
		return false;
	}
	
	for(i=0; i<rows.length; i++) {
		var row = rows[i];
		if(row['itemMustFlag'] == '1') {
			alert("必须字段不能被删除！");
			return false;
		}
	}
	
  	efgrid.submitForm( "ef_grid_result", "ed","EDFA51","delete", true );
  	efgrid.submitInqu( "ef_grid_uresult", "ed","EDFA51","queryUnDefine");
  	
}


button_f6_onclick = function ()
{
	efgrid.submitForm( "ef_grid_uresult", "ed","EDFA51","insert",true );
	efgrid.submitInqu( "ef_grid_result", "ed","EDFA51","query");
	
}
