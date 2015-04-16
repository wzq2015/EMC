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
      
      var returnValue = "referReportUdn=" + rowData.reportUdn;
      
      window.opener.efform_onPopupReturn("ER11", returnValue);	
    }
    window.close();
  }
}

/*
  点击查询按钮后调用后台的service
*/
button_search_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "er","ER11","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "er","ER11","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_add_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "er","ER11","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "er","ER11","update",true );
}
