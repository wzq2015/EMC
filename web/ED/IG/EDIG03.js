efform_onload = function() {

	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");

	efregion.show("ef_region_inqu");

}

function buildInfo() {
	// 组织eiinfo结构，三个块，分别对应用户选中的工程、模块及表
	var info = new EiInfo();
	var pBlock = new EiBlock("project");
	var blockMeta = new EiBlockMeta("project");
	var meta = new EiColumn("project");
	meta.pos = 1;
	blockMeta.addMeta(meta);
	pBlock.setBlockMeta(blockMeta);
	info.addBlock(pBlock);

	var mBlock = new EiBlock("module");
	blockMeta = new EiBlockMeta("module");
	meta = new EiColumn("project");
	meta.pos = 1;
	blockMeta.addMeta(meta);
	meta = new EiColumn("module");
	meta.pos = 2;
	blockMeta.addMeta(meta);
	mBlock.setBlockMeta(blockMeta);
	info.addBlock(mBlock);

	var tBlock = new EiBlock("table");
	blockMeta = new EiBlockMeta("table");
	meta = new EiColumn("project");
	meta.pos = 1;
	blockMeta.addMeta(meta);
	meta = new EiColumn("table");
	meta.pos = 2;
	blockMeta.addMeta(meta);
	tBlock.setBlockMeta(blockMeta);
	info.addBlock(tBlock);

	var _selectedItems = nTree.getCheckedNods();
	var node;
	for ( var i = 0; i < _selectedItems.length; i++) {
		node = _selectedItems[i];
		if (node.depth() == 1) { // 工程
			var pMap = [];
			pMap[1] = node.project;
			pBlock.addRow(pMap);
		}
		if (node.depth() == 2 && !isParentChecked(node)) { // 模块
			var mMap = [];
			mMap[1] = node.project;
			mMap[2] = node.key;
			mBlock.addRow(mMap);
		}
		if (node.depth() == 3 && !isParentChecked(node)) { // 表
			var tMap = [];
			tMap[1] = node.project;
			tMap[2] = node.key;
			tBlock.addRow(tMap);
		}
	}

	return info;
}

isParentChecked = function(node) {
	if (node.depth() == 1)
		return false;

	var parentNode = node.parent();
	if (parentNode.type().checked)
		return true;

	return isParentChecked(parentNode);
};

button_sql_onclick = function() {
	var info = buildInfo();

	info.set("dbType", "oracle");

	EiCommunicator.send("EDIG03", "exportSql", info, null, false);
	if (ajaxEi != null) {
		var url = ajaxEi.get("url");
		ef.get("downloadObject").src = ef.get("url").value
				+ "?efFormEname=EDIG00&serviceName=ERBase&fileurl=" + url;
		// efbutton.setButtonStatus("execute", true);
	}
};

function button_db2sql_onclick() {

	var info = buildInfo();

	if (confirm("是否将数据、索引和大对象分开存放？")) {
		info.set("dbType", "customDb2");
	} else {
		info.set("dbType", "db2");
	}

	EiCommunicator.send("EDIG03", "exportSql", info, null, false);
	if (ajaxEi != null) {
		var url = ajaxEi.get("url");
		ef.get("downloadObject").src = ef.get("url").value
				+ "?efFormEname=EDIG00&serviceName=ERBase&fileurl=" + url;
		// efbutton.setButtonStatus("execute", true);
	}
};

var tableTreeModel = new eiTreeModel('EDDBTT');

function configTree(tree) {
	tree.emptyNodeAsLeaf = false;
	tree.activeEmptyJudger = false;
	tree.topNodeActive = false;
	tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node) {
	node.type(new checkItemType(false));// 给节点加复选框
	if (node.depth() == 1) {
		node.icon(efico.get("eftree.treeImgActv"));
		node.openIcon(efico.get("eftree.treeImgInActv"));
		return;
	}

	if (node.leaf()) {
		node.textClicked = function() {
			treeNodeClicked(node);
		};
		node.icon(efico.get("eftree.file"));
		node.openIcon(efico.get("eftree.file"));
		if (node.ref == "T")
			node.textDom().style.color = "red";
		return;
	}

	if (node.depth() == 2) {
		node.icon(efico.get("eftree.treeImgForum"));
		node.openIcon(efico.get("eftree.treeImgForum"));
	}

}

function treeNodeClicked(node) {
	var project = node.project;
	var table = node.key;
	ef.get("inqu_status-0-projectEname").value = project;
	ef.get("inqu_status-0-tableEname").value = table;
	efgrid.submitInqu("ef_grid_result", "ed", "EDIG02", "query");
}
