
button_query_onclick = function ()
{
	efgrid.submitInqu("ef_grid_result", "","CMIMCompany","query");
}

button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "","CMIMCompany","delete", true );
}

button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "","CMIMCompany","insert",true );
}

button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "","CMIMCompany","update",true );
}