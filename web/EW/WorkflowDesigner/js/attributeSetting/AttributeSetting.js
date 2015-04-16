AttributeSetting=function (editor) {
	this.editor = editor;
	this.setting = this.getCurrentAttributeSetting();
	this.validator = new AttributeValidation();
};

AttributeSetting.prototype.setting = null;
AttributeSetting.prototype.editor = null;

AttributeSetting.prototype.parentDialogId=null;
AttributeSetting.prototype.validator=null;

AttributeSetting.prototype.getParentDialogId = function() {
	return this.setting.tagName.toLowerCase();
};

AttributeSetting.prototype.getUrl = function () {
	var url = location.href;
	var lastIndex = url.lastIndexOf("/");
	return url.substring(0, lastIndex).replace('WorkflowDesigner', '');
};

AttributeSetting.prototype.getCurrentAttributeSetting=function () {
	var graph = this.editor.graph;
	var model = graph.getModel();
	var cell = graph.getSelectionCell();
	if (cell == null) {
		cell = graph.getCurrentRoot();
		if (cell == null) {
			cell = graph.getModel().getRoot();
		}
	}
	var setting=cell.value;
	if($(setting).find('Extras')[0]==null){
		var doc = this.createXmlDocument();
		var extras = doc.createElement('Extras');
		setting.appendChild(extras);
	}	
	return setting;
};
	
AttributeSetting.prototype.updateAttributeSetting=function(){   	
	var graph = this.editor.graph;
	var model = graph.getModel();
	var cell = graph.getSelectionCell();
	model.beginUpdate();
	try {
		model.setValue(cell, this.setting);
	} finally {
		model.endUpdate();
	}
};
AttributeSetting.prototype.createXmlDocument =function() {
		var doc = null;
		document.implementation && document.implementation.createDocument
				? doc = document.implementation.createDocument("", "", null)
				: window.ActiveXObject
						&& (doc = new ActiveXObject("Microsoft.XMLDOM"));
		return doc;
};
/**
 * 创建一个数据表格
 * 
 * @param gridName
 *            数据表格名字
 * @param eiinfo
 *            数据表格初始化信息
 * @return
 */
AttributeSetting.prototype.constructGrid = function(gridName, eiinfo,
		hasRemoveBar) {
	var __grid_ef_grid_result = new efgrid(gridName, "ef_grid_" + gridName);
	__grid_ef_grid_result.setToolBarPosition("");
	var custom_cols = {
		"index" : {},
		"metas" : [],
		"groupIndex" : {},
		"columnGroups" : []
	};
	__grid_ef_grid_result.setEnable(true);
	__grid_ef_grid_result.setReadonly(false);
	__grid_ef_grid_result.setAjax(false);
	__grid_ef_grid_result.setCanPageAll(false);
	__grid_ef_grid_result.setAutoDraw('yes');
	__grid_ef_grid_result.setServiceName("");
	__grid_ef_grid_result.setQueryMethod("query");
	__grid_ef_grid_result.setCustomColumns(custom_cols);
	__grid_ef_grid_result.setXlsExportMode("");
	__grid_ef_grid_result.setButtonBarId("");
	__grid_ef_grid_result.setButtonBarPosition("");
	__grid_ef_grid_result.setData(eiinfo);
	if (hasRemoveBar == "true")
		__grid_ef_grid_result.setStyle({
					"removeBar" : "true",
					"navigationBar" : "false",
					"toolBar" : "false"
				});
	else
		__grid_ef_grid_result.setStyle({
					"operationBar" : "false",
					"navigationBar" : "false",
					"toolBar" : "false"
				});

	return __grid_ef_grid_result;
};
AttributeSetting.prototype.popTipsDialog = function(dialogInfo) {
        parent.$('body').append($('<div title="提示信息" style="display:none"/>')
				.attr('id', 'dialog').append($('<p>'+dialogInfo+'</p>')));
		parent.$("#dialog").dialog({
					autoOpen : true,
					modal : true,
					zIndex : 9999,
					resizable : false,
					close : function(event, ui) {
						$(event.target).dialog("destroy");
					}
				});
};
AttributeSetting.prototype.inputValidate = function() {
	return efvalidateDiv("basicAttrInputs");
};

AttributeSetting.prototype.newRecord = function(grid_id) {
	var grid = efform.getGrid(grid_id);
	if (grid) {
		var copy = false;
		if (typeof(efgrid_onAddNewRow) == "function") {
			// 调用用户自定义函数判断是否允许新增
			try {
				if (efgrid_onAddNewRow(grid_id) === false)
					return;
			} catch (ex) {
			}
		}
		var selcount = grid.getCheckedRowCount();
		if (selcount > 0)
			copy = confirm("[" + selcount + "]"
					+ getI18nMessages("ef.GridRowsCopy", "条记录被选中，将它们复制为新记录吗？"));

		grid.newLine(copy);

		if (typeof(efgrid_afterAddNewRow) == "function") {
			// 定义回调 新增数据之后的回调函数
			try {
				efgrid_afterAddNewRow(grid_id)
			} catch (ex) {
			}
		}

		grid.refresh();

		var grid_table = document.getElementById(grid_id + EF_SPLIT
				+ "grid_table");
		var dataDiv = efgrid.getDataDiv(grid_table);
		dataDiv.scrollTop = dataDiv.scrollHeight;

		var rows = grid.getCheckedRows();
		for (var i = 0; i < rows.length; i++) {
			if (grid.isNewLine(rows[i])) {
				grid.cellOriginNodeType = TYPE_FIX;
				efgrid._shiftCell(grid, rows[i], 0, 2);
				break;
			}
		}
	}
};