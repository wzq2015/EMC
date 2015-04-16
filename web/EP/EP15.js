
efform_onload = function() {
	efbutton.setButtonStatus("F2", false);
	// alert(nodeUrl);
	ef.get("inqu_status-0-nodeURL").value = nodeUrl;
}

button_f1_onclick = function() {
	if (efvalidateDiv("ef_region_inqu")) {
		efgrid.submitInqu("ef_grid_result", "ef", "EP15", "query");
//		efbutton.setButtonStatus("F2", false);
	}
}

openSubGrid = function() {
	var inInfo = new EiInfo();
	// 设置查询条件
	inInfo.setByNode("ef_div_inqu");

	var bindingInputId = "inqu_status-0-nodeURL";
	var serviceName = "EP15";
	var queryMethod = "queryNode";

	EiCommunicator.send(serviceName, queryMethod, inInfo);
	if (ajaxEi == null)
		return;

	var subGridColumn = new efSubgridColumn();
	var eiColumn = new EiColumn(bindingInputId);

	// 指定数据返回块
	eiColumn.blockName = "node_result";

	subGridColumn.setEiMeta({}, eiColumn);
	subGridColumn.set("serviceName", serviceName);
	subGridColumn.set("queryMethod", queryMethod);

	// 预选定的列名称
	subGridColumn.set("valueProperty", "ip");

	var div = efform.getSubGridDiv();
	div.efDisplayCol = subGridColumn;
	efform.showSubGridWindow(bindingInputId, ajaxEi);
}

function efgrid_onRowClicked(grid_id, row_index) {
	if (grid_id == "ef_grid_result") {
		var thread = efgrid.getGridObject(grid_id).getRowData(row_index).thread;
		var logBlockId = "log_" + thread;
		var log_grid = efform.getGrid("ef_grid_log");
		log_grid.blockId = logBlockId;
		log_grid.refresh(ajaxEi);
		
		var traceBlockId = "trace_" + thread;
		var trace_grid = efform.getGrid("ef_grid_trace");
		trace_grid.blockId = traceBlockId;
		trace_grid.refresh(ajaxEi);
	} else if (grid_id == "_ef_grid_subgrid") {
		ef.get("inqu_status-0-nodeType").value = efgrid.getGridObject(grid_id)
				.getRowData(row_index)["type"];
	}
}
