
button_query_onclick = function () 
{
    if (efvalidateForm(ef.get("EDFA80"))) 
    {
      efgrid.submitInqu( "ef_grid_result", "ed","EDFA80","query");
    }
	
}

  
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDFA80","update",true );
}

button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDFA80","delete", true );
}


button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDFA80","insert",true );
}

