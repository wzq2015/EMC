
button_search_onclick = function (){
	efgrid.submitInqu( "ef_grid_result", "ed","EDBL11","query");
}

button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDBL11","delete", true );
}


button_add_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDBL11","insert",true );
}

button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDBL11","update",true );
}

