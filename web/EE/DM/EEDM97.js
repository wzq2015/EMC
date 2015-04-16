efform_onload = function(){

	var sub_grid = efform.getGrid( "ef_grid_company" );

	efform.msgDisplayStyle="alert"
	sub_grid.onRowDblClicked = eedm02_popup_save_onclick;
}

/** 点击查询按钮后调用后台的service */
button_query_onclick = function () {
	efgrid.submitInqu( "ef_grid_result", "ee", "EEDM97", "query");
}

/** 点击新增按钮后调用后台的service */
button_insert_onclick = function () {
	efgrid.submitForm( "ef_grid_result", "ee", "EEDM97", "insert", true );
}

/** 点击修改按钮后调用后台的service */
button_update_onclick = function () {
	efgrid.submitForm( "ef_grid_result", "ee", "EEDM97", "update", true );
}

/** 点击删除按钮后调用后台的service */
button_delete_onclick = function () {
  	efgrid.submitForm( "ef_grid_result", "ee", "EEDM97", "delete", true );
}

/** 根据列名获取cell的值 */
button_getcell_onclick = function () {
	var grid = efgrid.getGridObject("ef_grid_result");
	//根据行号和列名获取cell的值
  	alert("根据行号和列名获取产品名称列第二行的值:" + grid.getCellValueByColumnName(1,"productName"));
}

button_subgrid_query_onclick = function () {
	efgrid.submitInqu( "ef_grid_company", "ee", "EEDM97", "queryCompany");
}

/** EFPopupInput控件删除按钮回调 

popupInput_onClickDeleteButton = function(cellLabelName,cellName) {
	alert("deleteButton: "+cellLabelName);
	
}
*/

/**
 * 弹出框显示前调用的事件
 *
 * @param {} fieldId 当前PopupGrid输入框对应的fieldId属性
 * @param {} popType 使用的场景，在input中使用为("popupInput")、在Grid中使用为(popupGrid)
 * @param {} ei_info 访问后台之前，传递给后台的eiInfo，主要用来带用户自定义参数到后台。
 * @param {} sub_grid 弹出框中的Grid对象。
 * @return {Boolean} 控制Grid的刷新。 返回true时，grid每次弹出时，都会去刷新(即重新访问后台，重新带参数到后台)。
 */
popupGrid_beforeDisplay = function(fieldId, popType, ei_info, sub_grid)
{
	//alert("before:"+fieldId+" "+popType);

	//通过设置eiInfo中的值，设置额外的查询条件。
	var block = new EiBlock(fieldId+"_query");

	// 将页面上的值设置为参数
	var val = ef.get("inqu_status-0-productCode").value;

	if(val == null || val == "") {
		block.set("form_type","0");
	} else {
		block.set("form_type",val);
	}
	block.set("form_style","01");

    ei_info.addBlock(block);


	//可以设置sub_grid的各种参数，包括显示列，列名，导航栏等等。。
	sub_grid.setReadonly( true );
	sub_grid.customCols["metas"][1]["descName"] = "页面中文名(*)";

	//返回true，每次弹出下拉Grid时会重新访问后台service，刷新Grid。返回fals或者无返回值时，只有初次下拉时会访问一次后台。
	return true;
}

/**
 * 弹出框弹出后调用事件
 *
 * @param {} fieldId 当前PopupGrid输入框对应的fieldId属性
 * @param {} popType 当前PopupGrid输入框对应的fieldId属性
 * @param {} sub_grid 弹出框中的Grid对象。
 */
popupGrid_afterDisplay = function(fieldId, popType, sub_grid)
{
	var index = sub_grid.getCurrentRowIndex();
	var data = [];
	data.push("FORM_ENAME:"+sub_grid.getBlockData().getCell( index, "FORM_ENAME" ));
	data.push("FORM_CNAME:"+sub_grid.getBlockData().getCell( index, "FORM_CNAME" ));
	data.push("FORM_TYPE:"+sub_grid.getBlockData().getCell( index, "FORM_TYPE" ));
	data.push("IS_GRADE:"+sub_grid.getBlockData().getCell( index, "IS_GRADE" ));
	data.push("FORM_PARAM:"+sub_grid.getBlockData().getCell( index, "FORM_PARAM" ));
	data.push("FORM_STYLE:"+sub_grid.getBlockData().getCell( index, "FORM_STYLE" ));

	//alert(data.join('\n')+"\n\nafter:"+fieldId+" "+popType);
}

eedm02_popup_save_onclick = function()
{
	var grid = efgrid.getGridObject("ef_grid_company");
	var index = grid.getCurrentRowIndex();
	if( index < 0 ) {
		alert( getI18nMessages("ef.NotSelect","未选择记录")  );
		return;
	}
	var cell_value = grid.getBlockData().getCell( index, "companyCode" );
	var cell_label = grid.getBlockData().getCell( index, "companyName" );

	//调用efPopupColumn.transferDataToParent 函数，传递值和显示值给弹出的父Cell。
	efPopupColumn.transferDataToParent("ef_Popup",cell_value,cell_label);
}
