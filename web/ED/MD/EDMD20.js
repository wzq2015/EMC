var dataModelEname = "";

button_query_onclick = function() {
	efgrid.submitInqu("ef_grid_result", "ed", "EDMD20", "query");
};

button_insert_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ed", "EDMD20", "insert", true);
};

button_update_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ed", "EDMD20", "update", true);
};

button_delete_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ed", "EDMD20", "delete", true);
};

button_deleteitem_onclick = function() {
	efgrid
			.submitForm("ef_grid_relatedItem", "ed", "EDMD21", "deleteItem",
					true);
};

button_importitem_onclick = function() {
	efgrid.submitForm("ef_grid_noRelatedItem", "ed", "EDMD21", "importItems",
			true);
};

button_deletesortcon_onclick = function() {
	efgrid.submitForm("ef_grid_sortCondition", "ed", "EDMD21",
			"deleteSortConditions", true);
};

button_insertsortcon_onclick = function() {
	efgrid.submitForm("ef_grid_relatedItem", "ed", "EDMD21",
			"addSortConditions", true);
};

button_updatesortcon_onclick = function() {
	efgrid.submitForm("ef_grid_sortCondition", "ed", "EDMD21",
			"updateSortConditions", true);
};

button_insertquerycon_onclick = function() {
	efgrid.submitForm("ef_grid_queryCondition", "ed", "EDMD22", "insert", true);
};

button_updatequerycon_onclick = function() {
	efgrid.submitForm("ef_grid_queryCondition", "ed", "EDMD22", "update", true);
};

button_deletequerycon_onclick = function() {
	efgrid.submitForm("ef_grid_queryCondition", "ed", "EDMD22", "delete", true);
};

/**
 * 在grid中，下拉框（项目英文名和表名）的联动 当项目英文名发生变化时，表名下拉框的内容随之变化
 */
efgrid_onBeforeCellEditNodeDisplay = function(grid_id, row_index, col_index,
		data_type) {
	if(grid_id == "ef_grid_result") {
		if (col_index == 4 && data_type == TYPE_DATA) {
			var grid = efgrid.getGridObject(grid_id);
			var projectEname = grid.getCellValue(row_index, 3, TYPE_DATA);
			var eiInfo = new EiInfo();
			eiInfo.set("projectEname", projectEname);
			EiCommunicator.send("EDMD20", "getTableOfProject", eiInfo, null, false);
			if (ajaxEi != null) {
				var column = grid.getColumn(4, TYPE_DATA);
				column.prepareData(ajaxEi);
				var eiBlock = ajaxEi.getBlock("table");
				grid.setCellValue(row_index, 4, "", TYPE_DATA);
				grid.refreshCell(row_index, 4, TYPE_DATA);
			}
		}
	}
};

efgrid_onFixCellClick = function(grid_id, row_index, col_index, value) {
	if (grid_id == "ef_grid_result") {
		var grid = efgrid.getGridObject(grid_id);
		refreshGrids(value);
	}
};

function refreshGrids(name) {
	ef.get("currentDataModel-0-dataModelEname").value = name;
	efgrid.submitInqu("ef_grid_relatedItem", "ed", "EDMD21", "queryItem");
	efgrid.submitInqu("ef_grid_noRelatedItem", "ed", "EDMD21",
			"queryIrrelatedItems");
	efgrid.submitInqu("ef_grid_queryCondition", "ed", "EDMD22",
			"queryConditionItems");
	efgrid.submitInqu("ef_grid_sortCondition", "ed", "EDMD21",
			"querySortItems");
}

function efgrid_onAjaxSubmitSuccess(gridId, service_name, method_name, eiInfo) {
	var ef_grid = efform.getGrid(gridId);
	ef_grid.refresh(eiInfo);

	//if (service_name == "EDMD20" && method_name == "delete") {
		//refreshGrids("");
	//}
	if (service_name == "EDMD21" && method_name == "deleteItem") {
		efgrid.submitInqu("ef_grid_noRelatedItem", "ed", "EDMD21",
				"queryIrrelatedItems");
		efgrid.submitInqu("ef_grid_queryCondition", "ed", "EDMD22",
				"queryConditionItems");
		efgrid.submitInqu("ef_grid_sortCondition", "ed", "EDMD21",
				"querySortItems");
	}
	
	if (service_name == "EDMD21" && method_name == "addSortConditions") {
		efgrid.submitInqu("ef_grid_sortCondition", "ed", "EDMD21",
				"querySortItems");
	}
	
	if (service_name == "EDMD21" && method_name == "importitem") {
		efgrid.submitInqu("ef_grid_relatedItem", "ed", "EDMD21",
				"queryItem");
	}
};

efgrid_onAddNewRow = function(grid_id) {
	if (grid_id == "ef_grid_queryCondition") {
		var grid = efgrid.getGridObject(grid_id);
		var dataModelEnameColumn = grid.getInvisibleColumn(0, TYPE_FIX);
		dataModelEnameColumn.set("defaultValue", dataModelEname);
	}
};