/**
  *表头信息查询
  */
button_query_onclick = function () 
{   
	efgrid.submitInqu( "ef_grid_result", "ed","EDDBT0","queryModelTable");
	
}


/*
  点击返回按钮
*/
button_return_onclick = function () 
{
  var grid = efgrid.getGridObject("ef_grid_result");
  if (!window.opener.closed) {
	 window.opener.efform_onPopupReturn("EDDBT001", grid.getSelectRowsData());	
  }
  window.close();

}
