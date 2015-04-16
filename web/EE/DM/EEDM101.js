
button_query_onclick = function ()
{
	efgrid.submitInqu("ef_grid_result", "","CMIMDevice","query");
}

button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "","CMIMDevice","delete", true );
}

button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "","CMIMDevice","insert",true );
}

button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "","CMIMDevice","update",true );
}