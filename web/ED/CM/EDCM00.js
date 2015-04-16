
button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ed","EDCM00","query");
}

button_f3_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDCM00","update",true );
}

button_f4_onclick = function () 
{
	if(confirm('是否需要删除代码类别对应的代码项？')) {
		ef.get("edcm00DeleteDetail").value = "true";
	} else {
		ef.get("edcm00DeleteDetail").value = "";
	}
	
  	efgrid.submitForm( "ef_grid_result", "ed","EDCM00","delete", true );
}

button_f6_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDCM00","insert",true );
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, cell_value ) 
{
	//document.getElementById("inqu_status-0-codesetCode").value=cell_value;
	//document.getElementById("efFormEname").value="JPJP10";
	//document.getElementById("serviceName").value="JPJP10";
	//efgrid.submitForm( "ef_grid_result", "JP","JPJP10","query",true );
	efform.openNewForm("EDCM01","methodName=query&inqu_status-0-codesetCode="+cell_value);	
}

