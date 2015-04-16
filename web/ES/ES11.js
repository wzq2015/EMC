efform_onload = function ()
{
  efbutton.setButtonStatus("F6", false);
  //efregion.show("ef_region_inqu");
  //efregion.toggleShow("ef_region_inqu");
}

button_f2_onclick = function () 
{
	
    if (efvalidateForm(ef.get("ES11"))) {
      efgrid.submitInqu( "ef_grid_result", "es","ES11","query");
    }
	
}

button_f3_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "es","ES11","update",true );
}

button_f4_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "es","ES11","delete", true );
}

button_f6_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "es","ES11","insert",true );
}


efgrid_onAddNewRow = function( grid_id )
{
  efbutton.setButtonStatus("F6", true);
  efbutton.setButtonStatus("F3", false);
  return true;  
}