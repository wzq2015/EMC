
efform_onload = function () {

}

button_query_onclick = function() 
{
	efgrid.submitInqu( "ef_grid_r", "es","ES42","query");
}

button_delete_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_r", "es","ES42","delete", true );
}

button_insert_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES42","insert",true );	
}

button_update_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES42","update", true );
}

efgrid_onFixCellSaved = function( grid_id, row_index, col_index, cell_value ){
	
	var grid = efgrid.getGridObject( grid_id );
	
	if(col_index == 1) {
		var callback = {
		onSuccess :
		function(eiInfo) {
		var block = eiInfo.getBlock( "result" );
		
		var cname = block.getCell(0,"button_cname");
		
		grid.setCellValue( row_index, 0, cname, TYPE_DATA  );
		grid.refreshCell( row_index, 0 , TYPE_DATA );

		},
		onFail : 
		function(eMsg) {
			alert(eMsg);
			}
		};
		
		var ei_info = new EiInfo();
		ei_info.setByNameValue("result-0-button_ename",cell_value);
		EiCommunicator.send( "ES42", "queryButtonName" , ei_info, callback );
		
	}
	
}

