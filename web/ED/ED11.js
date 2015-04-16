button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ed","ED11","query");
}

button_f3_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","ED11","insert",true);
}

button_f4_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","ED11","update",true );
}

button_f5_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","ED11","delete", true );
}

button_export_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ed","ED11","export");
	efbutton.setButtonStatus("export", true);
}

button_import_onclick = function ()
{
	efform.openNewForm( "ED1101" );
}