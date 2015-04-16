efform_onload = function () {

}

button_f2_onclick = function () 
{    
   efgrid.submitInqu( "ef_grid_result", "ed","ES53","query");    	
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
  if( grid_id =="ef_grid_result" && col_index == 2){
    var grid = efgrid.getGridObject( grid_id );
    var lb = grid.getCellValue(row_index, 0, TYPE_DATA);  
    return "\<div align='center'><a href='javascript:void(0)' onclick='authTarget(\""+ lb +"\" )'>&nbsp;授权&nbsp;</a></div>" ;			  
  } 
}
    

authTarget = function (target){
  efform.openNewForm('ES52', "inqu_status-0-target=" + target );
}