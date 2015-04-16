efform_onload = function ()
{
  if (ef.get("efFormPopup").value == "1") {
    efform.setStatus(1, "点击查询出的报表文件名，即可将点选的纪录返回！");   
  } 
}


efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{

  if (grid_id != "ef_grid_result") return;
  if( col_index <= 0 ) return;

  if (ef.get("efFormPopup").value == "1") {
    if (!window.opener.closed) {
      var grid = efgrid.getGridObject( "ef_grid_result" );
      var rowData = grid.getRowData(row_index);
      
      var returnValue = "referReportFileName=" + rowData.reportFileName;
      
      window.opener.efform_onPopupReturn("ER10", returnValue);	
    }
    window.close();
  }
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){

  if (grid_id != "ef_grid_result") return;
  
  var grid = efgrid.getGridObject( "ef_grid_result" );
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
  var rowData = grid.getRowData(row_index);
  
  switch (columnEname) {	  
	case "view":
	  param = "reportFileName=" + rowData.reportFileName 
	    + "&reportId=" + rowData.reportId 
	    + "&reportBelongTo=" + rowData.reportBelongTo 
	    + "&reportVersion=" + rowData.reportVersion + "";
	  return "<a href=\"javascript:void(0)\" onclick=\"efform.openNewForm('ER23','"+ param + "', true)\">查看</a>" ;
	  break;	  
  }
}

/*
  点击查询按钮后调用后台的service
*/
button_search_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "er","ER10","query");
}
