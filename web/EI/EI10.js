
button_f2_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ed","EI10","query");
}

button_f3_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EI10","update",true );
}

button_f4_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ed","EI10","delete", true );
}

button_f6_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EI10","insert",true );
}

