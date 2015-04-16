var formEname = "";

efform_onload = function() {
	efbutton.setButtonStatus("INSERT", false);
};

/**
 * 查询
 */
button_query_onclick = function() {
	efgrid.submitInqu("ef_grid_result", "ed", "EDDF02", "query");
};

efgrid_onAjaxSubmitSuccess = function(gridId, service_name, method_name, eiInfo) {
	if(gridId == "ef_grid_result") {
		if (eiInfo.getStatus() == 0) {
			//formEname = $("#inqu_status-0-form_ename").val();
			formEname = document.getElementById("inqu_status-0-form_ename").value;
			efbutton.setButtonStatus("INSERT", true);
		}
		var grid = efgrid.getGridObject("ef_grid_result");
		grid.refresh( eiInfo );
	} else {
		var grid = efgrid.getGridObject("_ef_grid_subgrid");
		grid.refresh( eiInfo );
	}
};

/**
 * 新增
 */
button_insert_onclick = function() {
	window.open("\DispatchAction.do?efFormEname=" + formEname,"_blank","menubar=no,resizable=yes");
};

/**
 * 修改
 */
button_update_onclick = function() {
	var grid = efgrid.getGridObject("ef_grid_result");
	if(grid == null) {
		alert("No Grid");
	} else {
		if(grid.getSelectRowsData().length == 1) {
			var rows = grid.getSelectRowsData();
			window.open("\DispatchAction.do?efFormEname=" + rows[0]["FORM_ENAME"] + "&ID=" + rows[0]["ID"],"_blank","menubar=no,resizable=yes");
		} else {
			alert("请选择一条数据已进行修改");
		}
	}
};

openSubGrid = function() {
	var inInfo = new EiInfo();
	// 设置查询条件
	inInfo.setByNode("ef_div_inqu");

	var bindingInputId = "inqu_status-0-form_ename";
	var serviceName = "EDDF02";
	var queryMethod = "queryFormList";

	EiCommunicator.send(serviceName, queryMethod, inInfo);
	if (ajaxEi == null)
		return;

	var subGridColumn = new efSubgridColumn();
	var eiColumn = new EiColumn(bindingInputId);

	// 指定数据返回块
	eiColumn.blockName = "result";

	subGridColumn.setEiMeta( {}, eiColumn);
	subGridColumn.set("serviceName", serviceName);
	subGridColumn.set("queryMethod", queryMethod);

	// 预选定的列名称
	subGridColumn.set("valueProperty", "form_ename");

	var div = efform.getSubGridDiv();
	div.efDisplayCol = subGridColumn;
	efform.showSubGridWindow(bindingInputId, ajaxEi);
};

efcalendar_click = function(control_source, id) {
	var node = ef.getNodeById(id);
	efcalendar(control_source, node, 'yyyymmdd', true);
};

button_delete_onclick = function () 
{	
  	efgrid.submitForm( "ef_grid_result", "ed","EDDF02","delete", true );
};