button_f2_onclick = function() 
{
	efgrid.submitInqu( "ef_grid_r", "es","ES20","query");
}

button_f4_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_r", "es","ES20","delete", true );
}

button_f1_onclick = function() 
{
//	efgrid.submitForm( "ef_grid_r", "es","ES20","insert",true );	
	efform.openNewForm('ES21', "inqu_status-0-queryUserId=insert");

}

button_f5_onclick = function() 
{
//	efgrid.submitForm( "ef_grid_r", "es","ES20","insert",true );	
	efform.openNewForm('ES26');

}

button_f6_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ES20","update", true );
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  if( col_index == 1 ){
		return "\<a href='javascript:void(0)' onclick='authStation("+ row_index + ","+ col_index +" )'>&nbsp;"+ getI18nMessages("label.EFShow","查看") +"&nbsp;</a>" ;
  }  else if(col_index == 2) {
  		return "\<a href='javascript:void(0)' onclick='showStation("+ row_index + ","+ col_index +" )'>&nbsp;"+ getI18nMessages("label.EFShow","查看") +"&nbsp;</a>" ;
  }  else if(col_index == 4){
  		return "\<a href='javascript:void(0)' onclick='editInfo("+ row_index + ","+ col_index +" )'>&nbsp;"+ getI18nMessages("label.EFEdit","编辑") +"&nbsp;</a>" ;  
  }
}

showStation = function (row_index,col_index){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var loginName = grid.getCellValue(row_index, 1, TYPE_FIX); 
  efform.openNewForm('ES22', "inqu_status-0-loginName=" + loginName );
}

authStation = function (row_index,col_index){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var loginName = grid.getCellValue(row_index, 1, TYPE_FIX); 
  efform.openNewForm('ES56', "inqu_status-0-name=" + loginName + "&inqu_status-0-type=0&inqu_status-0-source=0" );
}
/*
viewDetail = function (row_index,col_index){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var userId = grid.getCellValue(row_index, 1, TYPE_FIX); 

  efform.openNewForm('ES21', "inqu_status-0-queryUserId=" + userId  +"&inqu_status-0-type=VIEW");
} */

editInfo = function (row_index,col_index){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var userId = grid.getCellValue(row_index, 1, TYPE_FIX); 

  efform.openNewForm('ES21', "inqu_status-0-queryUserId=" + userId );
}

