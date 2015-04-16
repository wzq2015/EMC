var fkey = "";

efform_onload = function ()
{
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	if( grid_id == "ef_grid_result" )
	{
       ef.get("inqu_status-0-location").value = value;

       fkey = value;
       efgrid.submitInqu( "ef_grid_classes", "ed", "ED32","queryClass");
	}
}


