button_f2_onclick = function () 
{
		document.getElementById("efFormEname").value ='ED10' ;
		document.getElementById("serviceName").value = 'ED10';
		efgrid.submitInqu( "ef_grid_result", "ed","ED10","query");
}

button_f3_onclick = function () 
{
	document.getElementById("efFormEname").value ='ED10' ;
	document.getElementById("serviceName").value = 'ED10';
	if(efvalidateDiv("ef_grid_result"))
	efgrid.submitForm( "ef_grid_result", "ed","ED10","insert",true );
}

button_f4_onclick = function () 
{
 	document.getElementById("efFormEname").value ='ED10' ;
	document.getElementById("serviceName").value = 'ED10';
	if(efvalidateDiv("ef_grid_result"))
  	efgrid.submitForm( "ef_grid_result", "ed","ED10","update", true );
}

button_f5_onclick = function () 
{
	document.getElementById("efFormEname").value ='ED10' ;
	document.getElementById("serviceName").value = 'ED10';
  	efgrid.submitForm( "ef_grid_result", "ed","ED10","delete", true );
}

efgrid_onDataCellClick = function( grid_id, row_index, col_index, value ) {
		
		document.getElementById("efFormEname").value ='ED11' ;
		document.getElementById("serviceName").value = 'ED11';
        document.getElementById('methodName').value = 'query';
        document.getElementById('inqu_status-0-fproviderkey').value=value;
 		document.forms[0].submit();
    
}
