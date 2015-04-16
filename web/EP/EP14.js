
efform_onload = function ()
{
	efbutton.setButtonStatus("F2", false);
//	alert(nodeUrl);

	ef.get("inqu_status-0-nodeURL").value = nodeUrl;
}

button_f1_onclick=function()
{
	if(efvalidateDiv("ef_region_inqu")){
		ef.get("inqu_status-0-soTimeout").value=ef.get("inqu_status-0-soTimeout_in").value;
		ef.get("inqu_status-0-connectionTimeout").value=ef.get("inqu_status-0-connectionTimeout_in").value;
		efgrid.submitInqu( "ef_grid_result", "ef","EP14","query");
		efbutton.setButtonStatus("F2", false);
	}
	
}

button_f2_onclick=function()
{
	var grid = efgrid.getGridObject("ef_grid_result");
	var eiinfo = new EiInfo();
	var map = grid.getSelectRowsData()[0];
	map["isDetail"] = "true";
	map["soTimeout"] = ef.get("inqu_status-0-soTimeout").value;
	map["connectionTimeout"] = ef.get("inqu_status-0-connectionTimeout").value;
	map["nodeType"] = ef.get("inqu_status-0-nodeType").value;
	eiinfo.setAttr(map);
	var ajax_callback = efform.getSystemAjaxCallback("ef_region_detail");
	EiCommunicator.send("EP14", "getDetail", eiinfo, ajax_callback,true,true);
	
}

openSubGrid = function ()
{
  var inInfo = new EiInfo();
  //设置查询条件
  inInfo.setByNode("ef_div_inqu");
  
  var bindingInputId = "inqu_status-0-nodeURL";
  var serviceName = "EP14";
  var queryMethod = "queryNode";
  
  EiCommunicator.send(serviceName, queryMethod, inInfo);
  if (ajaxEi == null) return;
  
  var subGridColumn = new efSubgridColumn();
  var eiColumn = new EiColumn(bindingInputId);
  
  //指定数据返回块
  eiColumn.blockName = "node_result";
  
  subGridColumn.setEiMeta({}, eiColumn);
  subGridColumn.set("serviceName", serviceName);
  subGridColumn.set("queryMethod", queryMethod); 
  
  //预选定的列名称
  subGridColumn.set("valueProperty", "ip");
  
     
  var div = efform.getSubGridDiv();
  div.efDisplayCol = subGridColumn;
  efform.showSubGridWindow(bindingInputId, ajaxEi);
}

function efgrid_onDataCellClick(grid_id,row_index)
{
	var grid = efgrid.getGridObject("ef_grid_result");
	var funcId = grid.getCellValue(row_index, 0, "", true);
	var grid = efgrid.getGridObject(grid_id);
	var eiinfo = new EiInfo();
	eiinfo.setAttr(grid.getRowData(row_index));
	eiinfo.set("soTimeout", ef.get("inqu_status-0-soTimeout").value);
	eiinfo.set("connectionTimeout", ef.get("inqu_status-0-connectionTimeout").value);
	eiinfo.set("nodeType", ef.get("inqu_status-0-nodeType").value);
	var ajax_callback = efform.getSystemAjaxCallback("ef_region_detail");
	EiCommunicator.send("EP14", "clearCache", eiinfo, ajax_callback,true,true);
}
function efgrid_onRowClicked( grid_id, row_index ) {
	if( grid_id == "ef_grid_result" ) {
		
			var grid = efgrid.getGridObject(grid_id);
			var eiinfo = new EiInfo();
			var lastChecked = grid.getSelectRowsData()[0]
			grid._clearSelect();
			grid.refresh();
			grid.setRowChecked(row_index,true);
			grid.refreshRow(row_index);
			
			eiinfo.setAttr(grid.getRowData(row_index));
			eiinfo.set("soTimeout", ef.get("inqu_status-0-soTimeout").value);
			eiinfo.set("connectionTimeout", ef.get("inqu_status-0-connectionTimeout").value);
			eiinfo.set("nodeType", ef.get("inqu_status-0-nodeType").value);

			var ajax_callback = efform.getSystemAjaxCallback("ef_region_detail");
			EiCommunicator.send("EP14", "getDetail", eiinfo, ajax_callback,true,true);
		
		
		
		if(null != grid.getSelectRowsData()[0])
			efbutton.setButtonStatus("F2", true);
		else
			efbutton.setButtonStatus("F2", false);
	}else if(grid_id == "_ef_grid_subgrid")
	{
		ef.get("inqu_status-0-nodeType").value=efgrid.getGridObject(grid_id).getRowData(row_index)["type"];
	}
}



/**
 * 只能选择一条记录
 */
efgrid_afterRowCheckboxClicked = function( grid_id, row_index,div_node ){
	efgrid_onRowClicked( grid_id, row_index );
};

/**
 * 全选的checkbox不能选中
 */
efgrid_onSelectAllClicked = function( grid_id, div_node ){
	if(grid_id == "ef_grid_result")
	{
		var checkBox = div_node.firstChild;
		checkBox.checked = false;
	
		return false;
	}
};