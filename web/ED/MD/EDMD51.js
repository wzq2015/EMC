var fkey = "";

efform_onload = function ()
{

}

button_query_onclick = function () 
{
    if (efvalidateForm(ef.get("EDMD51"))) {
      efgrid.submitInqu( "ef_grid_result", "ed","EDMD51","query");
    }
}
    
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDMD51","update",true );
}

button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDMD51","delete", true );
} 

button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDMD51","insert",true );
}


efgrid_cellclick = function( grid_id, row_index, col_index, value ) 
{
}


efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{

}

efgrid_onGridDisplayReady = function( div_node )
{
}

efgrid_onAddNewRow = function( grid_id )
{
  if(grid_id == "ef_grid_result" )
  {
	 efbutton.setButtonStatus("INSERT", true);
	 efbutton.setButtonStatus("UPDATE", false);
  }
  return true;  
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	if( col_index == 0 )
	{
		//efform.openNewForm("EDMD51","methodName=query&inqu_status-0-templetNo="+value );	
	} 
}