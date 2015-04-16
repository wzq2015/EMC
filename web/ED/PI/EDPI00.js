efform_onload = function ()
{
  //efbutton.setButtonStatus("F6", false);
  //efregion.show("ef_region_inqu");
  //efregion.toggleShow("ef_region_inqu");
}

button_load_onclick = function () 
{
    //debugger;
	
    if (efvalidateForm(ef.get("EDPI00"))) {
      efgrid.submitInqu( "ef_grid_projectInfo", "ed","EDPI00","query");
    }
	
}

button_f3_onclick = function () 
{
    //debugger;
	
    if (efvalidateForm(ef.get("EDPI00"))) {
      efgrid.submitForm( "ef_grid_projectInfo", "ed","EDPI00","updateProjectInfo", true );
    }
	
}


