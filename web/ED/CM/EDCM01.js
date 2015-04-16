
button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "aa","EDCM01","query");
}

button_f3_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "aa","EDCM01","update",true );
}

button_f4_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "aa","EDCM01","delete", true );
}

button_f6_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "aa","EDCM01","insert",true );
}


