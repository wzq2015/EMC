efform_onload = function ()
{
}

button_f2_onclick = function () 
{	
    if (efvalidateForm(ef.get("ESDA01"))) {
      efgrid.submitInqu( "ef_grid_result", "ed","ESDA01","query");
    }	
}
    
button_f3_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","ESDA01","update",true );
}

button_f4_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ed","ESDA01","delete", true );
}

button_f6_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","ESDA01","insert",true );
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  switch( col_index ){
    case 1:
    if (display_value)
      return "\<a href='javascript:void(0)' onclick='showSql(\""+ display_value + "\" )'>&nbsp;"+ display_value +"&nbsp;</a>" ;
    default:    
  }  
}

showSql = function( sql ){ 
    efform.openNewForm('ESDA02', "methodName=query&inqu_status-0-sqlId=" + encodeURI(sql) );   
}
