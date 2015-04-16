/**
 * 树控件Demo文件列表： 1. web -> EE -> DM -> EEDM19.jsp 前台页面 2. web -> EE -> DM ->
 * EEDM19.js 前台javascript 3. src ->
 * com.baosight.iplat4j.ee.dm.service.ServiceEEDM19.java 后台服务，实现增删改查的业务逻辑 4. src ->
 * com.baosight.iplat4j.ee.dm.service.ServiceEEDM1901.java 定义如何获取树中的内容 5. src ->
 * com.baosight.iplat4j.ee.dm.domain.EEDM19.java 定义javabean 6. scr ->
 * com.baosight.iplat4j.ee.dm.sql.EEDM19.xml 定义sql语句映射 7. 数据库中iplat.TEE05表
 * 包括公司、产品、规格、合同号、金额字段
 */

/**
 * @author wuzhanqing
 * @since 2009-06-22
 */

// 树控件模型
// 在ServiceEEDM1901.java中定义如何获取树中的内容
var eedm19TreeModel = new eiTreeModel('EEDM1901');

// 存放选择的公司
var selectedCompany = "";

// //点击“增加新行”按钮时的回调函数
// //将树控件中选择的公司设置为公司列的默认值
// efgrid_onAddNewRow = function( grid_id ){
// var grid = efgrid.getGridObject(grid_id);
// //获取company所在列
// //demo中只有company一个列是不可见的
// column = grid.getInvisibleColumn(0);
// //将company列的默认值设为树控件中选择的公司
// column.set("defaultValue", selectedCompany);
// }

// 页面初始化
efform_onload = function() {

	splitter = efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
	splitter.ondblclick = function() {
		alert(111);
	}
	efregion.show("ef_region_result");
	efregion.show("ef_region_sp_manage");
	var ef_region_buttonbar = new efbuttonbar();
	ef_region_buttonbar.paint("ef_region_result");

	nTree.setCurrent(nTree.rootNode());

	reloadCurrentNode();

	disableButton();
	//efregion.show("ef_region_codeDemo");
	//efregion.toggleShow("ef_region_codeDemo");
}

function initTree() {
	var initType = ef.get("radio1").checked;
	if (initType == true) {

		nTree._rootNode.type(new radioItemType(false));
	} else {
		nTree._rootNode.type(new checkItemType(false));
	}
	nTree.reload(eedm19TreeModel);
}

efgrid_onCellEditNodeDisplayReady = function(grid_id, row_index, col_index,
		cell_value, data_type, div_node) {
	if (grid_id == "ef_grid_result") {
		// var textInput = div_node.firstChild; // 即编辑框

		var grid = efgrid.getGridObject(grid_id);
		var eicolumn = grid.getColumn(col_index, TYPE_DATA);

		if (eicolumn.getEname() == "product") { // 产品所在列
			currentNode = $(div_node).get(0);
			var info = new EiInfo();

			info.set("inqu_status", "0", "product", ef
							.get("inqu_status-0-product").value);
			var divWindow = efcascadeselect.createDivWindow("test_divwindow",
					"efwindow", "选择产品名称信息", 450, 270, false, "关闭");
			efwindow.show(currentNode, "test_divwindow_ajax_loading");

			EiCommunicator.send("EEDM19", "query", info,
					eedm19_country_callback, false, true);
			var textInput = div_node.firstChild;
			textInput.readOnly = true;
		} else {
			html_str = div_node.innerHTML;
			var img_left = div_node.parentNode.offsetWidth - 16;
			html_str += "<img style='position: absolute; top:2; left:"
					+ img_left
					+ ";        cursor:pointer' src='"
					+ efico.get("efform.efPopupWindow")
					+ "'    onclick=\"efwindow.show(null, 'selectColumn', 'center');\" />";

			div_node.innerHTML = html_str;
		}

	}

}

// 重新加载树中内容，起到刷新作用
reloadCurrentNode = function() {
	var nd = nTree.getCurrent();
	if (null == nd) {
		nTree.reload(eedm19TreeModel);
	} else {
		nd.reload();
	}
}

// 配置树控件参数
function configTree(tree) {
	tree.emptyNodeAsLeaf = false;
	tree.activeEmptyJudger = false;
	tree.topNodeActive = false;
	/*
	 * checkItemType.prototype.checkboxClicked = function(cked){ var node =
	 * this.item;
	 * 
	 * //选中节点的显示文本 // alert(node._text);
	 * 
	 * //选中节点的父节点的显示文本 var parent = node.parent(); // if(parent) //
	 * alert(parent._text); // else // alert("");
	 * 
	 * //选中节点的所有子节点的显示文本，只包括直接子节点 var children = node.getChildNodes();
	 * _showNodes(children);
	 * 
	 * //选中节点的所有被选中的子节点的显示文本，只包括直接子节点。此时getCheckedChildren(recursive)方法中recursive为false
	 * children = node.getCheckedChildren(false); _showNodes(children);
	 * 
	 * //选中节点的所有被选中的子节点的显示文本，包括直接和非直接的所有子节点。此时getCheckedChildren(recursive)方法中recursive为true
	 * children = node.getCheckedChildren(true); _showNodes(children);
	 * 
	 * //选中节点的所有未被选中的子节点的显示文本，只包括直接子节点。此时getCheckedChildren(recursive)方法中recursive为false
	 * children = node.getUncheckedChildren(false); _showNodes(children);
	 * 
	 * //选中节点的所有未被选中的子节点的显示文本，包括直接和非直接的所有子节点。此时getCheckedChildren(recursive)方法中recursive为true
	 * children = node.getUncheckedChildren(true); _showNodes(children);
	 *  };
	 */
	tree.nodeInitializer = treeNodeInitializer;
}

function _showNodes(nodes) {
	var content = [];
	if (nodes && nodes.length > 0) {
		for (var i = 0; i < nodes.length; i++) {
			content.push(nodes[i]._text + "\n");
		}
		content = content.join("");
		// alert(content);
	}
	// else
	// alert("");
}

// 树节点初始化
function treeNodeInitializer(node) {

	// 根节点
	var initType = ef.get("radio1").checked;
	if (initType == true) {
		node.type(new radioItemType(false));
	} else {
		node.type(new checkItemType(false));
	}
	if (node.depth() == 0) {
		// 设置为复选按钮类型
		//
	}
	// 公司所在节点
	else if (node.depth() == 1) {
		// 设置为复选按钮类型
		// node.type( new checkItemType(false) );
		// 设置关闭树节点时的图标
		node.icon(efico.get("eftree.folderIcon"));
		// 设置打开树节点时的图标
		node.openIcon("EF/Images/eftree_openfoldericon.png");
		// 关联文本点击事件
		node.textClicked = function() {
			treeNodeClicked(node);
		};
		node.addMenuItem("", {
					label : "add",
					parent : "",
					text : "新增",
					leaf : "1",
					func : function(id, label) {
						//此处添加事件
						alert("新增id：" + id +" label:" + label);
					}
				});
		node.addMenuItem("", {
					label : "remove",
					parent : "",
					text : "删除",
					leaf : "1",
					//此处添加事件
					func : function(id, label) {
						alert("新增id：" + id +" label:" + label);
					}
				});
	}
	// 产品所在节点
	else if (node.depth() > 1) {
		// node.type( new checkItemType(false) );
		node.icon(efico.get("eftree.file"));
	}
}

// 树节点文本点击处理函数
// 只有公司节点关联此函数
function treeNodeClicked(node) {
	// 填写查询条件中的公司
	// node.key属性在ServiceEEDM1901.java中定义
	ef.get("inqu_status-0-company").value = node.key;
	selectedCompany = node.key;
	// 提交查询请求
	efgrid.submitInqu("ef_grid_result", "ee", "EEDM19", "query");

	var grid = efgrid.getGridObject("ef_grid_result");
	// 获取company所在列
	// demo中只有company一个列是不可见的
	column = grid.getInvisibleColumn(0);
	// 将company列的默认值设为树控件中选择的公司
	column.set("defaultValue", selectedCompany);

	enableButton();
}

// 将增删改按钮设为不可用
function disableButton() {
	efbutton.setButtonStatus("create", false);
	efbutton.setButtonStatus("remove", false);
	efbutton.setButtonStatus("save", false);
}

// 将增删改按钮设为可用
function enableButton() {
	efbutton.setButtonStatus("create", true);
	efbutton.setButtonStatus("remove", true);
	efbutton.setButtonStatus("save", true);
}

// -----------------------------------------------------------------
// Grid高级示例

// 1.grid内某单元格的下拉框显示数据需通过grid外人工输入的文本框或下拉框值来筛选

/*
 * efgrid_onCellEditNodeDisplayReady = function(grid_id, row_index, col_index,
 * cell_value, data_type, div_node) { if (grid_id == "ef_grid_result") { var
 * textInput = div_node.firstChild; // 即编辑框
 * 
 * var grid = efgrid.getGridObject(grid_id); var eicolumn =
 * grid.getColumn(col_index,TYPE_DATA);
 * 
 * if (eicolumn.getEname() == "product") { // 产品所在列
 * 
 * if(parseInt(grid.getCellValue(row_index,0,TYPE_DATA))<10) textInput.readOnly =
 * true; // 合同编号小于10时，产品设置为只读， } } }
 */

// 2.某单元格的只读性可通过其他某单元格的输入值来动态改变

var currentNode = null;
/*
 * efgrid_onCellEditNodeDisplayReady = function(grid_id, row_index, col_index,
 * cell_value, data_type, div_node) { if (grid_id == "ef_grid_result") { // var
 * textInput = div_node.firstChild; // 即编辑框
 * 
 * var grid = efgrid.getGridObject(grid_id); var eicolumn =
 * grid.getColumn(col_index,TYPE_DATA);
 * 
 * if (eicolumn.getEname() == "product") { // 产品所在列 currentNode =
 * $(div_node).get(0); var info = new EiInfo();
 * 
 * info.set("inqu_status","0","product",ef.get("inqu_status-0-product").value);
 * var divWindow = efcascadeselect.createDivWindow( "test_divwindow",
 * "efwindow","选择产品名称信息",450,270,false,"关闭");
 * efwindow.show(currentNode,"test_divwindow_ajax_loading");
 * 
 * EiCommunicator.send( "EEDM19", "query", info, eedm19_country_callback
 * ,false,true );
 *  }
 *  } }
 * 
 */

eedm19_country_callback = {
	onSuccess : function(eiInfo) {

		var winId = "test_divwindow";
		efwindow.hide();
		var style_config = new Object();
		style_config["operationBar"] = "true";
		var grid = new efgrid("result", winId + "subNode");
		var custom_cols = {
			"index" : {},
			"metas" : []
		};
		grid.setEnable(false);
		grid.setReadonly(true);
		grid.setAjax(true);
		grid.setAutoDraw(true);
		grid.setServiceName("EEDM19");
		grid.setQueryMethod("query");
		grid.setCustomColumns(custom_cols);
		grid.setData(eiInfo);

		grid.setStyle(style_config);
		for (var i = grid.dataColumns.length; i >= 1; i--) {
			column = grid.getColumn(i - 1, TYPE_DATA);
			column.set("width", 300 / grid.dataColumns.length);
		}
		grid.paint();

		efwindow.show(currentNode, winId, "fixed");
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}

function efgrid_onRowClicked(grid_id, row_index) {
	if ("test_divwindowsubNode" == grid_id) {
		grid = efgrid.getGridObject("test_divwindowsubNode");
		tgrid = efgrid.getGridObject("ef_grid_result");
		currentNode.firstChild.value = grid.getCellValue(row_index, 0,
				TYPE_DATA);
		efwindow.hide();
	}

}

// -----------------------------------------------------------------
// 模式窗口示例

var ifShow = false;
var queryFlag = false;

/*
$(document).ready(function() {
	$("div#divStatus").ajaxStart(function() {
				if (ifShow == true) {
					var modalWin = new EFModalWindow('progressWindow');
					modalWin.showProgressBar();
					$("div#divStatus").ajaxStop(function() {
								if (queryFlag == true) {
									modalWin.hide();
									var grid = efgrid
											.getGridObject("ef_grid_result");
									grid.setData(ajaxEi);
									grid.refresh();
									queryFlag = false;

								}
							});
				}
			});
});
*/
// -----------------------------------------------------------------
// 子页面

// 显示子页面
button_show_subpage_onclick = function() {
	efwindow.show(ef.get("button_show_subpage"), "subpage");
}

// 子页面的查询
button_sp_query_onclick = function() {
	efgrid.submitInqu("ef_grid_sp_result", "ee", "EEDM19", "querySubpage");
}

// -----------------------------------------------------------------
// 页面按钮事件定义

button_query_onclick = function() {
	ifShow = true;
	// efgrid.submitInqu( "ef_grid_result", "ee","EEDM19","query");

	var grid = efgrid.getGridObject("ef_grid_result");
	var info = new EiInfo();
	info.setByNodeObject(document.forms[0]);
	var block = info.getBlock(grid.blockId);
	if (!isAvailable(block)) {
		block = new EiBlock(grid.getBlockData().getBlockMeta());
		info.addBlock(block);
	}

	block.setAttr(grid.getBlockData().getAttr());
	block.set("orderBy", grid.getOrderBy());
	queryFlag = true;
	EiCommunicator.send("EEDM19", "query", info, null, false, true);

	ifShow = false;

}

button_remove_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ee", "EEDM19", "delete", true);
	// 有时更改的结果不能及时反映在树控件中，暂时没有发现问题所在

	reloadCurrentNode();
}

button_create_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ee", "EEDM19", "insert", true);
	reloadCurrentNode();
}

button_save_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ee", "EEDM19", "update", true);
	reloadCurrentNode();
}
