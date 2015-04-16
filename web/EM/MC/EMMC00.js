
button_query_onclick = function () 
{
   efgrid.submitInqu( "ef_grid_result", "em","EMMC00","query");
}

button_insert_onclick = function()
{
	efgrid.submitForm( "ef_grid_result", "em","EMMC00","insert",true );
}

button_update_onclick = function()
{
	efgrid.submitForm( "ef_grid_result", "em","EMMC00","update",true );
}

button_delete_onclick = function()
{
	efgrid.submitForm( "ef_grid_result", "em","EMMC00","delete",true );
}