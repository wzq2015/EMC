var callbackFunc = "efform_onColorboxReturn";
button_query_onclick = function () 
{
    var node = ef.getNodeById("efFormTime");
    var dd = new Date();
    node.value =  dd.getYear() + "-" + (dd.getMonth() + 1) + "-" + (dd.getDay() + 1) + "-" + dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "-" + dd.getMilliseconds();
	
    if (efvalidateForm(ef.get("EDMD33"))) {
      efgrid.submitInqu( "ef_grid_result", "ed","EDFA00","query");
    }	
}

button_return_onclick = function () 
{
    var grid = efgrid.getGridObject("ef_grid_result");
    if (!window.parent.closed) {
    	var cb = window.parent[callbackFunc];
    	var rows = grid.getSelectRowsData();
    	if(rows.length <= 0 || rows.length > 1){
    		alert("请选择一条记录！");
    		return;
    	}

    	cb.call(this, "EDMD33", rows);
    }
}

openSubGrid = function ()
{
	var inInfo = new EiInfo();
	//设置查询条件
	inInfo.setByNode("ef_div_inqu");
	
	var bindingInputId = "inqu_status-0-form_ename";
	var serviceName = "EDFA00";
	var queryMethod = "query";
	
	EiCommunicator.send(serviceName, queryMethod, inInfo);
	if (ajaxEi == null) return;
	
	var subGridColumn = new efSubgridColumn();
	var eiColumn = new EiColumn(bindingInputId);
	
	//指定数据返回块
	eiColumn.blockName = "result";
	
	subGridColumn.setEiMeta({}, eiColumn);
	subGridColumn.set("serviceName", serviceName);
	subGridColumn.set("queryMethod", queryMethod); 
	
	//预选定的列名称
	subGridColumn.set("valueProperty", "form_ename");
	
	var div = efform.getSubGridDiv();
	div.efDisplayCol = subGridColumn;
	efform.showSubGridWindow(bindingInputId, ajaxEi);
}
