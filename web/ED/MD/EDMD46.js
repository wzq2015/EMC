var subWindow;

var currentFuncId;

efform_onload = function() {
	currentFuncId = $("#inqu_status-0-funcId").val();

	if (currentFuncId == undefined || currentFuncId.trim() == "-1")
		efbutton.setButtonStatus("syncheck", false);
	subWindow = new EFSubWindow("ef_region_diff", "差异比较", 800, 500);
};

/**
 * 查询
 */
button_query_onclick = function() {
	if (efvalidateDiv("ef_region_inqu")) {
		efgrid.submitInqu("ef_grid_condition", "ed", "EDMD46", "query");
	}
};

function model_select() {
	efgrid.submitInqu("ef_grid_condition", "ed", "EDMD46", "query");
}

/**
 * 差异检查
 */
button_syncheck_onclick = function() {
	var funcId = currentFuncId;
	var info = new EiInfo();
	info.set("funcId", funcId);
	EiCommunicator.send("EDMD46", "diffCheck", info, syncheck_callback);
};

syncheck_callback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.getStatus() >= 0) {
			var grid = efgrid.getGridObject("ef_grid_diff");
			grid.setData(eiInfo);
			grid.paint();
			subWindow.show();
		}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
};

/**
 * 同步
 */
button_sync_onclick = function() {
	var grid = efgrid.getGridObject("ef_grid_diff");
	var info = grid.eiinfo;
	EiCommunicator.send("EDMD46", "synchronize", info, synchronize_callback);
};

synchronize_callback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.getStatus() >= 0) {
			alert(eiInfo.getMsg());
			efgrid.submitInqu("ef_grid_condition", "ed", "EDMD46", "query");
		}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
};

/**
 * 返回
 */
button_return_onclick = function() {
	window.close();
	// window.location.href = "DispatchAction.do?efFormEname=EDMD45";
};

/**
 * 更新条件
 */
button_update1_onclick = function() {
	if (!validateData("ef_grid_condition")) {
		return;
	}
	efgrid.submitForm("ef_grid_condition", "ed", "EDMD46", "updateCondition",
			true, true);
};

/**
 * 更新数据
 */
button_update2_onclick = function() {
	if (!validateData("ef_grid_data")) {
		return;
	}
	efgrid.submitForm("ef_grid_data", "ed", "EDMD46", "updateData", true, true);
};

var CONTROL_TYPE_COLUMN_POSITION = 9;
var DATA_COLUMN_COUNT = 70;

validateData = function(grid_id) {

	var grid = efgrid.getGridObject(grid_id);

	var checkedRows = grid.getCheckedRows();

	for ( var i = 0; i < checkedRows.length; i++) {
		var rowNumber = checkedRows[i];
		var controlTypeValue = grid.getCellValue(rowNumber,
				CONTROL_TYPE_COLUMN_POSITION, TYPE_DATA);
		if (controlTypeValue == 0) {
			alert("请选择控件类型!");
			return false;
		}
	}

	return true;
};

/**
 * 控件与属性联动处理
 */
efgrid_onDataCellSaved = function(grid_id, row_index, col_index, cell_value) {
	var ei = _getEi();
	var grid = efgrid.getGridObject(grid_id);

	var currentPos = CONTROL_TYPE_COLUMN_POSITION;

	if (col_index == CONTROL_TYPE_COLUMN_POSITION) {
		var propertiesBlock = ei.getBlock("propertiesBlock");
		var rows = propertiesBlock.getRows();

		// 清空属性
		for ( var i = CONTROL_TYPE_COLUMN_POSITION + 1; i < DATA_COLUMN_COUNT; i++) {
			grid.setCellValue(row_index, i, "", TYPE_DATA);
			grid.refreshCell(row_index, i, TYPE_DATA);
		}

		// 填充属性
		for ( var i = 0; i < rows.length; i++) {
			if (propertiesBlock.getCell(i, "compId") == cell_value
					&& currentPos < DATA_COLUMN_COUNT) {
				var propEname = propertiesBlock.getCell(i, "propEname");
				currentPos++;
				grid.setCellValue(row_index, currentPos, propEname, TYPE_DATA);
				grid.refreshCell(row_index, currentPos, TYPE_DATA);
				var propEnum = propertiesBlock.getCell(i, "propEnum");
				currentPos++;
				grid.setCellValue(row_index, currentPos, propEnum, TYPE_DATA);
				grid.refreshCell(row_index, currentPos, TYPE_DATA);
				var defaultValue = propertiesBlock.getCell(i, "defaultValue");
				currentPos++;
				grid.setCellValue(row_index, currentPos, defaultValue,
						TYPE_DATA);
				grid.refreshCell(row_index, currentPos, TYPE_DATA);
			}
		}
	}
};