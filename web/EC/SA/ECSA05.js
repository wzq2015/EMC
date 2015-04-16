/*
  点击查询按钮后调用后台的service
 */
button_query_onclick = function() {
    var siteColumn=ef.get("inqu_status-0-siteColumn").value;
    if(siteColumn==""){
    ef.get("inqu_status-0-columnId").value="";
    ef.get("inqu_status-0-siteId").value="";
    }
	if (!efvalidateDiv("ef_div_inqu")) {
		return;
	}

	var beginDate = ef.get("inqu_status-0-beginDate").value;
	var endDate = ef.get("inqu_status-0-endDate").value;

	if (beginDate.trim() != "" && endDate.trim() != "" && beginDate > endDate) {
		alert("文章创建开始日期不能大于截止日期!");
		return;
	}

	efgrid.submitInqu("ef_grid_result", "ec", "ECSA05", "query");
}

//	设置序号
efgrid_onCellDisplayReady = function(div_node_html, row_index, col_index,
		cell_value, display_value, grid_id) {
	if (grid_id == "ef_grid_result" && col_index == 0) {
		var ei = _getEi();
		var grid = efgrid.getGridObject(grid_id);

		return grid.getOffset() + row_index + 1;
	}
}

//	弹出站点栏目选择窗口
button_selectColumn_onclick = function() {
	efwindow.show(ef.getNodeById("inqu_status-0-siteColumn"), "selectColumn", "fixed");
}

var tableTreeModel = new eiTreeModel("ECCM04");

// 定义树组件
function configTree(tree) {
	tree.emptyNodeAsLeaf = false;
	tree.activeEmptyJudger = false;
	tree.topNodeActive = false;
	tree.nodeInitializer = treeNodeInitializer;
}

//	初始化树组件
function treeNodeInitializer(node) {
	node.type(new radioItemType(false));
	node.textClicked = function() {
		treeNodeClicked(node);
	};
	if (node.depth() == 1) {
		node.icon("EF/Images/eftree_foldericon.png");
		node.openIcon("EF/Images/eftree_openfoldericon.png");
	} else if (node.depth() > 1) {
		node.icon("EF/Images/eftree_file.png");
		node.openIcon("EF/Images/eftree_file.png");
	}
}

//	点击确定按钮
button_confirm_onclick = function() {
    var option = nTree.getOption();
   
	if (option == "") {
		alert("请选择站点栏目!");
		return;
	}

	if (option == null) {
		efwindow.hide();
		ef.get("inqu_status-0-columnId").value = "";
		ef.get("inqu_status-0-siteId").value = "";
		ef.get("inqu_status-0-siteColumn").value = "全部";
		return;
	}
   	var selectedItem = option.split("@");
   	 //alert(selectedItem[1]);
    if (selectedItem[0] == "column") {
	    var name = nTree.option._text;
		ef.get("inqu_status-0-columnId").value = selectedItem[1];
		ef.get("inqu_status-0-siteId").value = "";
		ef.get("inqu_status-0-siteColumn").value = name;
		efwindow.hide();
	} 
	if(selectedItem[0] == "site") {
	    var name = nTree.option._text;
	    ef.get("inqu_status-0-siteId").value = selectedItem[1];
	    ef.get("inqu_status-0-columnId").value = "";
	    ef.get("inqu_status-0-siteColumn").value = name;
		efwindow.hide();
	}
	
}

//	点击取消按钮
button_cancel_onclick = function() {
	efwindow.hide();
}

//	日历控件的操作
efcalendar_click = function(control_source, id) {
	var node = ef.getNodeById(id);
	efcalendar(control_source, node, 'yyyymmdd', true);
}
efform_onload = function ()
{
 efregion.show("ef_region_result")
}