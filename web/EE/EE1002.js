
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_s", "ee","EE1002","query");	
}

button_save_onclick = function () 
{
	var grid = efgrid.getGridObject( "ef_grid_s" );
	window.returnValue = grid.getSelectRowsData();
	window.close();
}

button_create_onclick = function () 
{
	var return_value = window.showModalDialog( 
		"DispatchAction.do?efFormEname=EE1002", "", 
		"dialogWidth:800px; dialogHeight:600px;resizable:yes");
	
	var grid = efgrid.getGridObject( "ef_grid_s" );
	
	grid.addRowData( return_value );
}

efgrid_onFixCellDisplayReady = function( div_node_html, row_index, 
	col_index, cell_value, display_value, grid_id )
{
	return div_node_html;
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, 
	col_index, cell_value, display_value, grid_id )
{
	return div_node_html;	
}

efgrid_onGridDisplayReady = function( div_node )
{
	
}

efgrid_getNewWindowUrl = function( grid_id, row_index, col_index, value ) 
{
	//return "DispatchAction.do?efFormEname=EE1002";
}

efgrid_onRowCheckboxClicked = function( grid_id, row_index, div_node )
{
}

efgrid_onSelectAllClicked = function( grid_id, div_node )
{
}

efgrid_onRowClicked = function( grid_id, row_index )
{
	alert( "Grid[" + grid_id + "] row[" + row_index + "] is clicked!");
	document.getElementById( "currentRow" ).innerText = row_index;
}

efform_onload = function()
{
	efform.setNewWindowStyle( "dialogWidth:800px; dialogHeight:600px;resizable:yes" );
	
	//efbutton.setButtonStatus("create", true); 
}
