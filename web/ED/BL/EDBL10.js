efform_onload = function ()
{

}

button_search_onclick = function (){
	efgrid.submitInqu( "ef_grid_result", "ed","EDBL10","query");
}

button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDBL10","delete", true );
}


button_add_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDBL10","insert",true );
}

button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDBL10","update",true );
}