/** 点击查询按钮后调用后台的service */
button_query_onclick = function () {
	efgrid.submitInqu( "ef_grid_result", "ed", "EDMD02", "query");
}

/** 点击新增按钮后调用后台的service */
button_insert_onclick = function () {
	efgrid.submitForm( "ef_grid_result", "ed", "EDMD02", "insert", true );
}

/** 点击修改按钮后调用后台的service */
button_update_onclick = function () {
	efgrid.submitForm( "ef_grid_result", "ed", "EDMD02", "update", true );
}

/** 点击删除按钮后调用后台的service */
button_delete_onclick = function () {
  	efgrid.submitForm( "ef_grid_result", "ed", "EDMD02", "delete", true );
}

efgrid_onBeforeGridDisplay = function(grid_id) {
	if (grid_id == "ef_grid_result") {
		var grid = efgrid.getGridObject(grid_id);
		var count = grid.getRowCount();
		for (i = 0; i < count; i++){
			grid.setCellValue(i, 3, "控件属性配置");
		}
	}
}

efgrid_onDataCellClick = function(grid_id, row_index, col_index, cell_value) {
	if (grid_id == "ef_grid_result") {
		if (col_index == 3){
		}
	}
}