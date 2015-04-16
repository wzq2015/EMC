

/** 点击查询按钮后调用后台的service */
button_query_onclick = function () {
	efgrid.submitInqu( "ef_grid_result", "ee", "EEDM02", "query");
}

/** 点击新增按钮后调用后台的service */
button_insert_onclick = function () {
	efgrid.submitForm( "ef_grid_result", "ee", "EEDM02", "insert", true );
}

/** 点击修改按钮后调用后台的service */
button_update_onclick = function () {
	efgrid.submitForm( "ef_grid_result", "ee", "EEDM02", "update", true );
}

/** 点击删除按钮后调用后台的service */
button_delete_onclick = function () {
  	efgrid.submitForm( "ef_grid_result", "ee", "EEDM02", "delete", true );
}

/** 根据列名获取cell的值 */
button_getcell_onclick = function () {
	var grid = efgrid.getGridObject("ef_grid_result");
	//根据行号和列名获取cell的值
  	alert("根据行号和列名获取产品名称列第二行的值:"
  		+ grid.getCellValueByColumnName(1,"productName"));

  	// var column = grid.getColumnByName("productName");

  	grid.getBlockData().setCell(0, "productName", "最新数据1111");
	grid.refreshRow(0);

	// 清除查询区域数据
	efform.clearDiv("ef_region_inqu");

	alert("数据已经被清空");

	// 设置区域数据
	var info = new EiInfo();
	info.setByNameValue("inqu_status-0-productName", "最新产品");
	info.setByNameValue("inqu_status-0-isproduced", "1");

	efform.fillDiv("ef_region_inqu", info);

	efform.hideFormHead();
}

/** 打开公司名称选择列 */
function openSelectCompany() {
	// 为公司名称创建efSubgridColumn
	var col = new efSubgridColumn();
	index = custom_cols.index["companyCode"];
	col.setEiMeta(custom_cols.metas[index],{});
	col.prepareData(_getEi());

	// 使用SubGridDiv打开
	var div = efform.getSubGridDiv();
	div.efDisplayCol = col;
	efform.showSubGridWindow('inqu_status-0-companyCode')
}