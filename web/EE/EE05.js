button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_r", "ee","EE05","query");
}

button_save_onclick = function () 
{
	efgrid.submitForm( "ef_grid_r", "ee","EE05","update",true );
}

button_remove_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_r", "ee","EE05","delete", true );
}

button_create_onclick = function () 
{
	efgrid.submitForm( "ef_grid_r", "ee","EE05","insert",true );	
}


