have_check = function(gridId){
	var grid = efgrid.getGridObject( gridId );
 	var rows = grid.getCheckedRows();
 	if(rows.length>0){
 		return true;
 	}else{
 		return false;
 	}
}

check_newLine = function(gridId) {
	var grid = efgrid.getGridObject( gridId );
 	var rows = grid.getCheckedRows();
 	for ( var i = 0; i < rows.length; i++ ) {
	 	if(grid.isNewLine(rows[i])==1){
	  		return true;
	  	}
	}
	return false;
}

check_allNewLine = function(gridId) {
	var grid = efgrid.getGridObject( gridId );
 	var rows = grid.getCheckedRows();
 	for ( var i = 0; i < rows.length; i++ ) {
	 	if(grid.isNewLine(rows[i])!=1){
	  		return false;
	  	}
	}
	return true;
}

button_query_onclick = function()
{
	efgrid.submitInqu("ef_grid_result", "", "EDMD90", "query");
}

button_insert_onclick = function () 
{
	var isNewLine = check_newLine("ef_grid_result");
 	if (!isNewLine) {
		alert("创建新记录才能执行新增操作！");
		return;
	}
	var isAllNewLine = check_allNewLine("ef_grid_result");
 	if (!isAllNewLine) {
		alert("存在非新增记录项，请检查！");
		return;
	}
	if (have_check("ef_grid_result")) {
		if(confirm('确实要创建记录？'))
			efgrid.submitForm( "ef_grid_result", "", "EDMD90", "insert", true, true);
	}
	else
		alert("未选中记录！");
}

button_update_onclick = function () 
{
	var isNewLine = check_newLine("ef_grid_result");

 	if(isNewLine) {
	  alert("请保存该记录后再进行编辑操作！");
	  return;
	}

	if(have_check("ef_grid_result")) {
	 	if(confirm('确实要编辑记录？'))
			efgrid.submitForm( "ef_grid_result", "", "EDMD90", "update", true ,true);
	}
	else
		alert("未选中记录！");
}

button_delete_onclick = function () {
	var isNewLine = check_newLine("ef_grid_result");

 	if(isNewLine){
		alert("请保存该记录后再进行删除操作！");
		return;
	}
	
	if(have_check("ef_grid_result")) {
		if(confirm('确实要删除记录？删除记录也会删除页面信息管理中的相关记录！'))
			efgrid.submitForm( "ef_grid_result", "", "EDMD90", "delete", true, true);
	}
	else
		alert("未选中记录！");
}

button_publish_onclick = function () {
	var isNewLine = check_newLine("ef_grid_result");

 	if(isNewLine){
		alert("请保存该记录后再进行发布操作！");
		return;
	}
	
	if(have_check("ef_grid_result")) {
		if(confirm('确实要发布表单？'))
			efgrid.submitForm( "ef_grid_result", "", "EDMD90", "publish", true, true);
	}
	else
		alert("未选中记录！");
}

button_stop_onclick = function () {
	var isNewLine = check_newLine("ef_grid_result");

 	if(isNewLine){
		alert("请保存该记录后再进行停用操作！");
		return;
	}
	
	if(have_check("ef_grid_result")) {
		if(confirm('确实要停用表单？'))
			efgrid.submitForm( "ef_grid_result", "", "EDMD90", "stop", true, true);
	}
	else
		alert("未选中记录！");
}

efgrid_onAjaxSubmitSuccess = function(gridId, service_name, method_name, eiInfo)
{
	efform.clearErrorMessage();
	if (method_name == "query") {
		var ef_grid = efform.getGrid(gridId);
  		ef_grid.refresh(eiInfo);
	}
	else {
		if (eiInfo.getMsg() != null)
		  	alert(eiInfo.getMsg());
		if (eiInfo.getStatus() != -1)
			button_query_onclick();
	}
}

//点击编辑按钮的相关操作
function onEditClick(row_index)
{
	var grid = efgrid.getGridObject("ef_grid_result");
	var formId = grid.getCellValue(row_index, 0, TYPE_DATA, true);
	var formName = grid.getCellValue(row_index, 0, TYPE_DATA);
	var count = 0;

	info = new EiInfo();
	info.set('formName', formName);
	EiCommunicator.send('EDMD90', 'getDataCount', info, {
		onSuccess : function(outInfo) {
			count = outInfo.get('count');
		},
		onFail : function(message) {
			alert(message);
			// just go ahead
		}
	}, false, false);

	if (count > 0 && !confirm("该表单的数据表不为空，\n编辑操作会导致数据表被清空，\n是否继续？"))
		return;
	
	var childWindow = efform.openNewForm('EDMD11', 'formId=' + formId + '&formName=' + formName);
	childWindow.focus();
}

//渲染编辑按钮
efgrid_onCellDisplayReady = function(div_node_html, row_index, col_index, col_value_c, display_value, grid_id)
{
	if(grid_id == "ef_grid_result"){
        var grid = efgrid.getGridObject( "ef_grid_result" );
        var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
        var status = grid.getCellValue(row_index, 2, TYPE_DATA);
        if(columnEname == "edit") {
        	return grid.isNewLine(row_index) || status == 'P' ?
            "<div align='center' efval=''><input value='编辑' class='buttonclass' type='button' align='center' style='color:gray'></div>" :
        	"<div align='center' efval=''><input value='编辑' class='buttonclass' type='button' align='center' onclick='onEditClick("+ row_index + ")'></div>";
        }
    }
}
