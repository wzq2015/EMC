
/**
 * 根据传入的页面中的grid标识，结合项目名和页面标识，生成全局唯一的grid标识
 * dialogArguments[0]: 父页面window对象
 * dialogArguments[1]: 父页面中导出按钮所在grid标识
 */
efform_onload = function (){
	
	var pName = edfa7002_getProjectName();
	if(pName){
		var parentDoc = dialogArguments[0].document;
		ef.get("gridId").value = pName+"-"+ parentDoc.forms[0].id + "-" + dialogArguments[1];
		efgrid.submitInqu( "ef_grid_result", "ed","EDFA7002","query");
	} else{
		alert("Error occured on get project name");
		window.close();
	}
};

/**
 * 获取项目名称
 */
edfa7002_getProjectName = function(){
	var inInfo = new EiInfo();
	EiCommunicator.send( "EDFA7002", "getProjectEname" , inInfo);
	
	if(null == ajaxEi)
		return null;
	
	return ajaxEi.get("projectEname");
};


//---------------模板下载---------------

/**
 * grid单元格渲染回调函数
 * 在每条模板文件记录的最后添加下载链接
 */
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
	
  if (grid_id != "ef_grid_result") return;
  
  var grid = efgrid.getGridObject( "ef_grid_result" );
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
  var rowData = grid.getRowData(row_index);
 
  switch (columnEname) {
	case "download":
		 templateFilepath = rowData.templateFilepath;
		 if(undefined != templateFilepath && null != templateFilepath && "" != templateFilepath)
//			 return "\<a  href='ED/EDFA70Download.jsp?templateFilepath="+templateFilepath+"'>下载</a>" ;
			 return "<div align='center' efval=''><a  id='download_a' href='#' onclick=\"javascript:edfa7002_download_templateFile('"
		    	+ templateFilepath + "')\">下载</a></div>" ;
	 
  }
};

/**
* 点击下载链接的处理函数
*/
edfa7002_download_templateFile = function(templateFilepath){
	if(edfa7002_isFileExist(templateFilepath)){
		ef.get("download").href="ED/EDFA70Download.jsp?templateFilepath="+templateFilepath;
		ef.get("download").click();
	}else{
		alert("该模板文件不存在！");
	}	
};

/**
 * 判断模板文件是否存在
 */
edfa7002_isFileExist = function(filepath){
	var inInfo = new EiInfo();
	inInfo.set("templateFilepath",filepath);
	EiCommunicator.send("EDFA70","isFileExist", inInfo);
	if(null == ajaxEi)
		return false;
	
	if(ajaxEi.get("fileExist")=="false")
		return false;
	
	return true;
};


//---------------控制checkbox---------------

/**
 * 只能选择一条记录
 */
efgrid_onRowCheckboxClicked = function( grid_id, row_index,div_node ){
	var grid = efgrid.getGridObject(grid_id);
	var index = grid.getCheckedRows();
	
	if(index.length == 1){
	grid.setRowChecked(index[0],false);
	grid.refreshRow(index[0]);
	}
};

/**
 * 全选的checkbox不能选中
 */
efgrid_onSelectAllClicked = function( grid_id, div_node ){
	var checkBox = div_node.firstChild;
	checkBox.checked = false;

	return false;
};



//---------------模板上传---------------

/**
 * 上传模板
 */
button_upload_onclick = function () {
	
	if(edfa7002_isServiceExist(ef.get("gridId").value)){
		window.showModalDialog("DispatchAction.do?efFormEname=EDFA7001",
				window,"dialogWidth:500px;dialogHeight:300px;resizable:yes;help:no;");
	} 
	else
		alert("此页面不支持上传新模板，请与模板维护人员联系");
};

/**
 * 从上传页面放回时，重新查询该gridId对应的模板文件，体现出新增一条记录
 * EDFA7001.js关闭时回调edfa70_onDialogReturn，故不用edfa7002_前缀
 */
edfa70_onDialogReturn = function(){
	efgrid.submitInqu( "ef_grid_result", "ed","EDFA7002","query");
};

/**
 * 判断gridId是否有对应的导出数据获取服务
 */
edfa7002_isServiceExist = function(gridId){
	var inInfo = new EiInfo(); 
	inInfo.set("inqu_status", "0", "gridId", gridId);
	// judge if serviceEname & methodEname is registered
	EiCommunicator.send( "EDFA70", "query" , inInfo);
	
	if(null == ajaxEi)
		return false;
	
	if(ajaxEi.getBlock("result").rows.length > 0){
		return true;
	} else{
		return false;
	}
};



//---------------模板导出---------------

/**
 * 按模板导出Excel
 */
button_export_onclick = function() {

	// check the number of ticked chechbox
	var grid = efgrid.getGridObject("ef_grid_result");
	var rows = grid.getCheckedRows();
	if (rows.length < 1) {
		alert("请选择模板");
		return;
	} else if (rows.length > 1) {
		alert("只能选择一个模板");
		return;
	}

	// check the existing of template file
	var templateFilepath = grid.getBlockData().getCell(rows[0], "templateFilepath");

	if (!edfa7002_isFileExist(templateFilepath)) {
		alert("模板文件不存在，无法进行导出！");
	} else {
		var templateId = grid.getBlockData().getCell(rows[0], "templateId");
		var gridId = ef.get("gridId").value;

		// get service info and then export
		var serviceInfo = edfa7002_getServiceInfo(gridId);
		if (serviceInfo) {
			var block = serviceInfo.getBlock("result");
			var serviceEname = block.getCell(0, "serviceEname");
			var methodEname = block.getCell(0, "methodEname");

			edfa7002_exportExcel(gridId, templateId, serviceEname, methodEname);
		}
	}

	// ensure the export button to be enable
	efbutton.setButtonStatus("export", true);
};

/**
 * 获取gridId对应的导出数据获取服务
 */
edfa7002_getServiceInfo = function(gridId){
	var inInfo = new EiInfo(); 
	inInfo.set("inqu_status", "0", "gridId", gridId);
	EiCommunicator.send( "EDFA70", "query" , inInfo);
	
	return ajaxEi;
};

/**
 * 组织导出Excel的form，并提交给ServiceEDFA7002的exportExcel方法进行处理
 */
edfa7002_exportExcel = function(gId, tId, sName, mName){
	
	// copy query condition from parent page
	var export_form = document.forms["_eiTemplateExportForm"];
	if( export_form != null )
		document.body.removeChild( export_form );
	
	export_form = document.createElement( "form" );
	export_form.setAttribute( "id", "_eiTemplateExportForm" );
	export_form.setAttribute( "method", "POST" );
	export_form.setAttribute( "action", ef.get("actionUrl").value );
	
	var input_node = document.createElement("input");
	input_node.setAttribute( "type", "hidden" );
	input_node.setAttribute( "name", "efFormEname" );
	input_node.setAttribute( "value", "EDFA7002");
	export_form.appendChild(input_node);

	input_node = document.createElement("input");
	input_node.setAttribute( "type", "hidden" );
	input_node.setAttribute( "name", "serviceName" );
	input_node.setAttribute( "value", "EDFA7002");
	export_form.appendChild(input_node);
	
	input_node = document.createElement("input");
	input_node.setAttribute( "type", "hidden" );
	input_node.setAttribute( "name", "methodName" );
	input_node.setAttribute( "value", "exportExcel");
	export_form.appendChild(input_node);
	
	
	var inInfo = new EiInfo();
	
	var parentDoc = dialogArguments[0].document;
	var queryInfo = new EiInfo();
	queryInfo.setByNodeObject( parentDoc.forms[0] );
	input_node = document.createElement( "input" );
	input_node.setAttribute( "type", "hidden" );
	input_node.setAttribute( "name", "exportExcel_queryCondition" );
	input_node.setAttribute( "value", EiInfo2Json.prototype.EiInfo2JsonString(queryInfo) );
	export_form.appendChild( input_node );

	input_node = document.createElement("input");
	input_node.setAttribute( "type", "hidden" );
	input_node.setAttribute( "name", "exportExcel_gridId" );
	input_node.setAttribute( "value", gId);
	export_form.appendChild(input_node);

	input_node = document.createElement("input");
	input_node.setAttribute( "type", "hidden" );
	input_node.setAttribute( "name", "exportExcel_templateId" );
	input_node.setAttribute( "value", tId);
	export_form.appendChild(input_node);
	
	input_node = document.createElement("input");
	input_node.setAttribute( "type", "hidden" );
	input_node.setAttribute( "name", "exportExcel_serviceEname" );
	input_node.setAttribute( "value", sName);
	export_form.appendChild(input_node);
	
	input_node = document.createElement("input");
	input_node.setAttribute( "type", "hidden" );
	input_node.setAttribute( "name", "exportExcel_methodEname" );
	input_node.setAttribute( "value", mName);
	export_form.appendChild(input_node);
	
	document.body.appendChild( export_form );

	efform_submit_flag = true;
	export_form.submit();
};



/**
 * 关闭对话框
 */
button_close_onclick = function(){
	window.close();
};







