var subWindow;

efform_onload = function() {
	subWindow = new EFSubWindow("ef_region_copy", "复制功能模型", 500, 140);

	var data_grid = efform.getGrid("ef_grid_result_combineModel");
	data_grid.onRowDblClicked = dataMode_popup_save_onclick;
};

efgrid_onCellDisplayReady = function(div_node_html, row_index, col_index,
		col_value_c, display_value) {
	var grid = efgrid.getGridObject("ef_grid_result");
	var id = grid.getCellValue(row_index, 0, "", true);
	
	if (col_index == 6) {
		if (id != "") {
			return "\<input value='配置' class='buttonClass' type='button' onclick='editFuncModel("
			+ row_index + "," + col_index + " )'/>";
		} else {
			return "";
		}
	}
};

editFuncModel = function(row_index, col_index) {
	var grid = efgrid.getGridObject("ef_grid_result");
	var funcId = grid.getCellValue(row_index, 0, "", true);

	var href = "DispatchAction.do?efFormEname=EDMD46&inqu_status-0-funcId="
			+ funcId;
	window
			.open(
					href,
					'',
					"toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,"
							+ "width="
							+ (screen.availWidth - 10)
							+ ",height="
							+ (screen.availHeight - 30) + ",top=0," + "left=0");
};

button_query_onclick = function() {
	efgrid.submitInqu("ef_grid_result", "ed", "EDMD45", "query");
};

button_insert_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ed", "EDMD45", "insert", true);
};

button_update_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ed", "EDMD45", "update", true);
};

button_delete_onclick = function() {
	if(window.confirm("请谨慎删除功能模型！\n相关的页面可能受到影响！\n确定要删除么？")){
		efgrid.submitForm("ef_grid_result", "ed", "EDMD45", "delete", true);
	}
};

var selectedRowData;

button_copy_onclick = function() {
	var grid = efgrid.getGridObject("ef_grid_result");
	var count = grid.getCheckedRowCount();
	if (count == 0 || count > 1) {
		alert("请选中一条记录");
		return;
	}
	var selectedRowNo = grid.getCheckedRows()[0];
	selectedRowData = grid.getRowData(selectedRowNo);
//	ef.get("copy-0-funcEname").value = selectedRowData["funcEname"];
//	ef.get("copy-0-funcCname").value = selectedRowData["funcCname"];
//	ef.get("copy-0-moduleEname1").value = selectedRowData["moduleEname1"];
//	ef.get("copy-0-moduleEname2").value = selectedRowData["moduleEname2"];
	subWindow.show();
};

button_confirm_onclick = function() {
	var info = new EiInfo();
	info.set("copy", 0, "funcId", selectedRowData["id"]);
	info.set("copy", 0, "funcType", selectedRowData["funcType"]);
	info.set("copy", 0, "modelId", selectedRowData["modelId"]);

	info.set("copy", 0, "funcEname", ef.get("copy-0-funcEname").value);
	info.set("copy", 0, "funcCname", ef.get("copy-0-funcCname").value);
	info.set("copy", 0, "moduleEname1", ef.get("copy-0-moduleEname1").value);
	info.set("copy", 0, "moduleEname2", ef.get("copy-0-moduleEname2").value);
	EiCommunicator.send("EDMD45", "copy", info, copy_callback);
};

copy_callback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.getStatus() >= 0) {
			alert("复制成功");
			efgrid.submitInqu("ef_grid_result", "ed", "EDMD45", "query");
		} else {
			//alert("复制失败,原因:" + eiInfo.getMsg());
		}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
};
//
// var currentRowIndex = 0;
//
// efgrid_onBeforeCellEditNodeDisplay = function(grid_id, row_index, col_index,
// data_type) {
// // 单元格编辑时记录当前行行号
// currentRowIndex = row_index;
// }

/*
 * subgrid_save_onclick = function(gridId, cell_value) { setModelCnameValue(); };
 * 
 * setModelCnameValue = function() { var sub_grid =
 * efform.getGrid("_ef_grid_subgrid"); var index =
 * sub_grid.getCurrentRowIndex();
 * 
 * var div_node = efform.getSubGridDiv(); var column = div_node.efDisplayingCol;
 * var cell_value = sub_grid.getBlockData().getCell(index, "modelCname");
 * 
 * var grid = efgrid.getGridObject("ef_grid_result"); var row_index =
 * grid.getCurrentRowIndex(); grid.setCellValue(currentRowIndex, 6, cell_value,
 * TYPE_DATA); grid.refreshCell(currentRowIndex, 6, TYPE_DATA); }
 */

/**
 * 表格行被双击时的回调函数（当前行改变）
 * 
 * @member efgrid
 * @param {Object}
 *            grid_id : 对应的表格id
 * @param {Object}
 *            row_index : 行号
 * @return null
 */
/*
 * function efgrid_onRowDblClicked(gridId, row_index) { if (gridId ==
 * "_ef_grid_subgrid") {
 * 
 * var sub_grid = efform.getGrid("_ef_grid_subgrid"); var index =
 * sub_grid.getCurrentRowIndex(); if (index < 0) { alert("未选择记录"); return; }
 * 
 * var div_node = efform.getSubGridDiv(); var column = div_node.efDisplayingCol;
 * var cell_value = sub_grid.getBlockData().getCell(index,
 * column.getValueProperty()); efwindow.setValue(cell_value);
 * 
 * setModelCnameValue(); } }
 */

/**
 * 弹出列选择
 */
dataMode_query_onclick = function() {
	efgrid.submitInqu("ef_grid_result_combineModel", "ed", "EDMD41",
			"getCombineModel");
};

/**
 * 弹出框点击事件
 */
dataMode_popup_save_onclick = function() {
	var grid = efgrid.getGridObject("ef_grid_result_combineModel");
	var index = grid.getCurrentRowIndex();

	if (index < 0) {
		alert(getI18nMessages("ef.NotSelect", "未选择记录"));
		return;
	}

	var cell_value = grid.getBlockData().getCell(index, "modelId");
	var cell_label = grid.getBlockData().getCell(index, "dataModelName");

	// 调用efPopupColumn.transferDataToParent 函数，传递值和显示值给弹出的父Cell。
	efPopupColumn.transferDataToParent("dataModelId_Popup", cell_value,
			cell_label);
};