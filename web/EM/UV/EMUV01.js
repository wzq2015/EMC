
efgrid_onFixCellClick = function(grid_id, row_index, col_index, cell_value) {
	var grid = efgrid.getGridObject(grid_id);
	var urls;
	if(grid_id == "ef_grid_businessmsg")
	{
		var msgcode = 	grid.getCellValue(row_index,1,TYPE_FIX,false);			
		var formename = grid.getCellValue(row_index,0,TYPE_DATA,true);
		//var appname = grid.getCellValue(row_index,1,TYPE_DATA,true);
		//var msgtype = grid.getCellValue(row_index,2,TYPE_DATA,true);
		urls = "inqu_status-0-msgCode=" + encodeURI(encodeURI(msgcode));		
		efform.openNewForm(formename, urls, true);
	}
	else if(grid_id == "ef_grid_worklist")
	{
		var processid = grid.getCellValue(row_index,1,TYPE_FIX,false);
		var taskid = grid.getCellValue(row_index,0,TYPE_DATA,true);		
		var formename = grid.getCellValue(row_index,6,TYPE_DATA);		
		urls = "inqu_status-0-processid=" + processid;
		urls += "&&inqu_status-0-taskid=" + taskid;
		efform.openNewForm(formename, urls, true);
	}

}



/**
 * 该回调仅在grid显示前调用。
 * 注：若grid使用Ajax模式，当请求查询重画表格数据区后，以下效果将不再显示！
 */
efgrid_onBeforeGridDisplay = function(grid_id) {
	if (grid_id == "ef_grid_submitlist" || grid_id == "ef_grid_workhistory") {
		var grid = efgrid.getGridObject(grid_id);
		var count = grid.getRowCount();
		for (i = 0; i < count; i++){	// 给数据列第3~4列自定义列设置文本
		{
			grid.setCellValue(i, 0, "详情");	
			grid.setCellValue(i, 5, "审批人清单");	
		}
	 }
	}
}

/**点击数据列的回调函数：当列类型为hyperlink或textbutton时点击有效 */
efgrid_onDataCellClick = function(grid_id, row_index, col_index, cell_value) {
	if (grid_id == "ef_grid_submitlist" || grid_id == "ef_grid_workhistory") {
		var grid = efgrid.getGridObject(grid_id);
		var processid = grid.getCellValue(row_index,1,TYPE_FIX);
		var urls = "inqu_status-0-processid="+processid;
		if (col_index == 0)
		{					
			efform.openNewForm('EMUV02', urls, true);
		}
		else if (col_index == 5)
		{			
			efform.openNewForm('EMUV03', urls, true);
		}	
	}
}