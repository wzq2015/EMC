/** 在固定列显示前调用，可用于自定义单元格的显示 */
efgrid_onFixCellDisplayReady = function(div_node_html,
		row_index, col_index, cell_value, display_value, grid_id) {
	if (grid_id == "ef_grid_result") {
		if (row_index == 2 && col_index == 1) {	// 固定列第3行第2列(index从0开始)
			// 使用jQuery给该单元格添加一个黄色图标
			return $(div_node_html).append(
					"&nbsp;<img src='EF/Images/efform_status_yellow.gif'>").html();
		}
	}
}

/** 在数据列显示前调用，可用于自定义单元格的显示 */
efgrid_onCellDisplayReady = function(div_node_html,
		row_index, col_index, cell_value, display_value, grid_id ) {
	if (grid_id == "ef_grid_result") {
		if (col_index == 1) {		// 数据列第2列，即产品价格
			if (!cell_value.match(/^\d+(\.\d+)?$/))	// 由于没有校验，此处需检验用户输入是否为数字
				return;

			var price = eval(cell_value);
			if (price > 10000)		// 大于10000的用红色标识
				return $(div_node_html).css('color', 'red').attr('outerHTML');
			else if (price < 1000)	// 小于1000的用蓝色标识
				return $(div_node_html).css('color', 'blue').attr('outerHTML');
			else					// 介于1000~10000的用绿色标识
				return $(div_node_html).css('color', 'green').attr('outerHTML');
		}

		if (row_index == 4 && col_index == 0) {	// 数据列第5行第1列
			// 使用jQuery给该单元格添加一个绿色图标
			return $(div_node_html).append(
					"<img src='EF/Images/efform_status_green.gif'>&nbsp;").attr('outerHTML');
		}

		if (col_index == 4) {	// 数据列第5行第1列
			if (!cell_value.match(/^\d+(\.\d+)?$/))	// 由于没有校验，此处需检验用户输入是否为数字
				return;

			var price = eval(cell_value);
			// 使用jQuery给该单元格添加一个绿色图标
			return $(div_node_html).html(formatNumber(price*100, 2) + "%").attr('outerHTML');;
		}
	}

	return div_node_html;
}

function formatNumber(srcStr,nAfterDot){
　　var srcStr,nAfterDot;
　　var resultStr,nTen;
　　srcStr = ""+srcStr+"";
　　strLen = srcStr.length;
　　dotPos = srcStr.indexOf(".",0);
　　if (dotPos == -1){
　　　　resultStr = srcStr+".";
　　　　for (i=0;i<nAfterDot;i++){
　　　　　　resultStr = resultStr+"0";
　　　　}
　　　　return resultStr;
　　}
　　else{
　　　　if ((strLen - dotPos - 1) >= nAfterDot){
　　　　　　nAfter = dotPos + nAfterDot + 1;
　　　　　　nTen =1;
　　　　　　for(j=0;j<nAfterDot;j++){
　　　　　　　　nTen = nTen*10;
　　　　　　}
　　　　　　resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;
　　　　　　return resultStr;
　　　　}
　　　　else{
　　　　　　resultStr = srcStr;
　　　　　　for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
　　　　　　　　resultStr = resultStr+"0";
　　　　　　}
　　　　　　return resultStr;
　　　　}
　　}
}

/**
 * 该回调仅在grid显示前调用。
 * 注：若grid使用Ajax模式，当请求查询重画表格数据区后，以下效果将不再显示！
 */
efgrid_onBeforeGridDisplay = function(grid_id) {
	if (grid_id == "ef_grid_result") {
		var grid = efgrid.getGridObject(grid_id);

		var count = grid.getRowCount();
		for (i = 0; i < count; i++){	// 给数据列第3~4列自定义列设置文本
			grid.setCellValue(i, 3, "测试" + (i+1));
			//edit by wangyuqiu 2009-03-16 去掉 <div style='text-indent:10'> 引号 避免出现错误
			grid.setCellValue(i, 4, "<div style=text-indent:10>" +
					"--> 第" + (i+1) + "行</div>", TYPE_DATA);
		}
	}
}

/**
 * 在表格显示完成后调用，可进行用户自定义的操作。
 */
efgrid_onGridDisplayReady = function(div_node) {
	var grid_id = div_node.id;
	if (grid_id == "ef_grid_result") {
		// 将第3行的样式设为buttonRegular
		efgrid.setRowDisplayStyle(grid_id, 2, "buttonRegular" );

		var grid = efform.getGrid(grid_id);			// 根据grid_id得到grid对象

		if (grid.getRowCount() > 1)
			efgrid.setDisplayStyle(grid_id, 1, 0, 	// 数据列第2行第1列
					"color", "orange", TYPE_DATA );			// 字体颜色设为橙色

		if (grid.getRowCount() > 7)
			efgrid.setDisplayStyle(grid_id, 7, 1, 	// 固定列第8行第2列
					"backgroundColor", "blue", TYPE_FIX );	// 背景颜色设为蓝色
	}
}


/** 点击固定列的回调函数 */
efgrid_onFixCellClick = function(grid_id, row_index, col_index, cell_value) {
	if (grid_id == "ef_grid_result") {
		alert('fix');
		var grid = efgrid.getGridObject(grid_id);

		if (col_index == 1) {	// 点击第1列即产品代号
			// 获取该行数据列第0列，即产品名称
			var product_name = grid.getCellValue(row_index, 0, TYPE_DATA);
			window.open( "http://www.google.cn/search?q=" + product_name);
		}
	}
}

/**点击数据列的回调函数：当列类型为hyperlink或textbutton时点击有效 */
efgrid_onDataCellClick = function(grid_id, row_index, col_index, cell_value) {
	if (grid_id == "ef_grid_result") {
		if (col_index == 3)
			alert("这是一个textbutton：" + cell_value);
	}
}

/** 点击记录行时的回调函数 */
efgrid_onRowClicked = function(grid_id, row_index) {
	if (grid_id == "ef_grid_result") {
		alert("你选中了第" + (row_index + 1) + "行");
	}
}


/** 在单元格进入编辑状态前调用，可通过返回值指定是否允许被编辑 */
efgrid_onBeforeCellEditNodeDisplay = function(grid_id, row_index, col_index, data_type) {
	if (grid_id == "ef_grid_result") {
		if (data_type == TYPE_DATA &&
			row_index == 4 && col_index == 0) {	// 数据列第5行第1列(即带绿色图标的)
			alert("此单元格不允许被编辑！")
			return false;
		}
	}
}

/** 由于固定列不允许被修改，参数data_type始终等于TYPE_DATA */
efgrid_onCellEditNodeDisplayReady = function(grid_id, row_index, col_index, cell_value, data_type, div_node) {
	if (grid_id == "ef_grid_result") {
		var textInput = div_node.firstChild;	// 即编辑框

		if (col_index == 0)			// 数据列第1列，即公司名称
			textInput.readOnly = true;				// 设置为只读，仅允许SubGridDiv选择
		else if (col_index == 1)	// 数据列第2列，即产品价格
			textInput.style.textAlign = "right";	// 设置为右对齐
	}
}

/** 由于固定列不允许被修改，故该回调只有在新增记录时有效 */
efgrid_onFixCellSaved = function(grid_id, row_index, col_index, cell_value ) {
	if (grid_id == "ef_grid_result") {
		if (col_index == 1) {	// 固定列第2列，即产品代号
			alert("请注意产品代号[" + cell_value + "]必须唯一!");
		}
	}
}

/** 在编辑模式下保存数据时调用，可以通过该回调检验用户输入的数据 */
efgrid_onDataCellSaved = function(grid_id, row_index, col_index, cell_value ) {
	if (grid_id == "ef_grid_result") {
		if (col_index == 1) {	// 固定列第2列，即产品价格
			if (!cell_value.match(/^\d+(\.\d+)?$/))
				alert("产品价格必须为数值!");
			else if (eval(cell_value) < 0)
				alert("产品价格不能小于零!");
		}
	}
}

/** 点击添加新行时调用，通过confirm对话框返回值指定是否允许 */
efgrid_onAddNewRow = function(grid_id) {
	if (grid_id == "ef_grid_result")
		return confirm("efgrid_onAddNewRow: 是否允许添加新行？");

	return true;
}


/** 点击全选复选框时的回调（选中和取消选中均触发） */
efgrid_onSelectAllClicked = function(grid_id, div_node) {
	if (grid_id == "ef_grid_result") {
		if (div_node.firstChild.checked) {		// 如果选中SelectAll复选框
			var allowed = confirm("efgrid_onSelectAllClicked: 是否允许选择所有？");
			div_node.firstChild.checked = allowed;
			return allowed;
		}
	}

	return true;
}

/**
 * 点击记录行左侧复选框时的回调（选中和取消选中均触发）
 *
 * @param grid_id
 * @param row_index
 * @param div_node
 */
efgrid_onRowCheckboxClicked = function(grid_id, row_index, div_node) {
//	if (grid_id == "ef_grid_result") {
//		var grid = efgrid.getGridObject(grid_id);
//
//		// 如果选中当前行　且　已选择大于等于2行
//		if (!grid.isRowChecked(row_index) && grid.getCheckedRowCount() >= 2 ) {
//			alert("不允许选择超过2行!");
//			div_node.firstChild.checked = false;	// 取消选中当前行
//		}
//	}

	// 保证每次只选中一条记录
	if(grid_id == "ef_grid_result")
	{
		// ef_grid_result 仅允许单选
		var grid = efgrid.getGridObject(grid_id);
		if( !grid.isRowChecked( row_index )){
			var rows = grid.getCheckedRows();
			for(var i=0;i<rows.length;i++)
			{
				grid.setRowChecked(rows[i],false);
				grid.refreshRow(rows[i]);
			}
		}
	}
}


/**
 * 当且仅当调用efgrid.submitForm函数第7个参数need_callback=true时有效，
 * 详细参数说明请参考efgrid.submitForm函数说明，通过此回调函数可以提交
 * 如下的custom_ei，即提交自定义EiInfo数据。
 */
efgrid_onGridSubmit = function() {
	var custom_ei = new EiInfo();
	// ...
	return custom_ei;
}

/** 当且仅当efgrid为ajax请求方式时有效，如需演示请将EFGrid的ajax属性设为true */
efgrid_onAjaxSubmitSuccess = function(grid_id, service_name, method_name, eiInfo) {
	var ef_grid = efform.getGrid(grid_id);
	ef_grid.refresh(eiInfo);
	if (grid_id == "ef_grid_result") {
		// 默认效果为：efform.setStatus(eiInfo.status, eiInfo.msg, eiInfo.msgKey);
		efform.setStatus(1, "<font color='red'>这是Ajax回调消息!</font>", eiInfo.msgKey);
	}
}

