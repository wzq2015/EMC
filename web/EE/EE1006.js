button_save_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EE1006","update",true );
}

button_remove_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EE1006","delete", true );
}

button_create_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EE1006","insert", true );
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, cell_value )
{
	if( col_index >0 )
	{
		var grid = efgrid.getGridObject( grid_id );
		grid.setCurrentRowIndex( row_index );
	}
}

efgrid_onGridSubmit = function()
{
	alert( "本页面禁止翻页操作！" );
	return false;
}

efform_onload = function(){
	efregion.show("ef_region_codeDemo");
	efregion.toggleShow("ef_region_codeDemo");
}
