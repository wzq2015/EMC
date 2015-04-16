efform_onload = function ()
{
}

button_f2_onclick = function () 
{	
    if (efvalidateForm(ef.get("ESDA02"))) {
      efgrid.submitInqu( "ef_grid_result", "ed","ESDA02","query");
    }
	
}
    
button_f3_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","ESDA02", "update", true );
}

button_f4_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","ESDA02", "delete", true );
}

button_f6_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","ESDA02", "insert", true );
}
