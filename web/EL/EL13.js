efcalendar_1_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-startDate");
  efcalendar(control_source, node, 'yyyy-mm-dd', true);
}

efcalendar_2_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-endDate");
  efcalendar(control_source, node, 'yyyy-mm-dd', true);
}

button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_r", "el","EL13","query");
}


efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  switch( col_index ){
    case 4:
      return "\<input value='"+getI18nMessages("label.ELExceptionStack","异常栈")+"' class='buttonRegular' type='button' onclick='showStack("+ row_index + ","+ col_index +" )'>" ;      
    case 5:
      return "<a href='javascript:showService(\""+ display_value +"\")'>"+ display_value +"</a>" ;      
    default: 
  }
}

showStack = function( i, j ){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var sql = grid.getCellValue(i, j, TYPE_DATA); 
  document.getElementById("stack").value = sql;
}

showService = function( servId ){
  window.open( 'DispatchAction.do?efFormEname=ELBZ04&inqu_status-0-SERVID=' + servId , 'Title',"left=200,top=100,height=500,width=800,scroll=auto,close=no");    
}
