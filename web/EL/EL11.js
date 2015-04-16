efcalendar_1_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-startDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efcalendar_2_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-endDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_r", "el","EL11","query");
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  switch( col_index ){
    case 8:
      return "\<a href='javascript:void(0)' onclick='showSql("+ row_index + ","+ col_index +" )'>&nbsp;"+getI18nMessages("label.ELLook","查看")+"&nbsp;</a>" ;
      //return "\<input value='SQL调用' class='buttonRegular' type='button' onclick='showSql("+ row_index + ","+ col_index +" )'>" ;      
    case 9:
      return "\<a href='javascript:void(0)' onclick='showException("+ row_index + ","+ col_index +" )'>&nbsp;"+getI18nMessages("label.ELLook","查看")+"&nbsp;</a>" ;
      //return "\<input value='系统异常' class='buttonRegular' type='button' onclick='showException("+ row_index + ","+ col_index +" )'>" ;      
    default:    
  }  
}

showSql = function( i, j ){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var id = grid.getCellValue(i, 5, TYPE_DATA);  
  if ( isAvailable(id) ){
    efform.openNewForm('EL12', "methodName=query&inqu_status-0-serverId=" + id );
  } else {
    alert(getI18nMessages("label.EJUnknowServiceInvoke","未知的服务调用"));
  } 
}

showException = function( i, j ){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var id = grid.getCellValue(i, 5, TYPE_DATA);
  if ( isAvailable(id) ){
    efform.openNewForm('EL13', "methodName=query&inqu_status-0-serverId=" + id );
  } else {
    alert(getI18nMessages("label.EJUnknowServiceInvoke","未知的服务调用"));
  }  
}
