/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ei","EIIT00","query");
}

/*
  点击返回按钮
*/
button_return_onclick = function () 
{
  var grid = efgrid.getGridObject("ef_grid_result");
  if (!window.opener.closed) {
	 window.opener.efform_onPopupReturn("EIIT0001", grid.getSelectRowsData());	
  }
  window.close();

}

