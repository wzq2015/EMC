
var tab_map = [1,-3,0,2];
var isMulti = false;
efform_onload = function ()
{
	ef.get("inqu_status-0-restMessageState").value = 1;
	efbutton.setButtonStatus("invoke", true);    //默认不能点击
	efbutton.setButtonStatus("invokemulti", true); 
}
button_query_onclick = function () {
	
	if (efvalidateDiv("ef_region_inqu")) {
		efgrid.submitInqu("ef_grid_result", "emrs", "EMRS01", "query");
	}
}

button_selectall_onclick = function(){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(var i = 0 ; i< grid.getRowCount(); i++)
	{
		grid.setRowChecked(i,true);
		grid.refreshRow(i);
	}
	
}

button_selectnone_onclick = function(){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(var i = 0 ; i< grid.getRowCount(); i++)
	{
		grid.setRowChecked(i,false);
		grid.refreshRow(i);
	}
	
}
/**
 * 点击删除按钮
 */
button_delete_onclick = function () {
	efgrid.submitForm("ef_grid_result", "emrs", "EMRS01", "delete", true);
}

//回调函数
function efgrid_onAjaxSubmitSuccess(gridId, service_name,
		method_name, eiInfo)
{
	
	if("ef_grid_result" == gridId 
			&& "EMRS01" == service_name 
			&& "update" == method_name)
	{
		
		var ajax_callback = 
		 {
				onSuccess :
		    		function(eiInfo)
					{
						efgrid.submitInqu("ef_grid_result", "emrs", "EMRS01", "query");
		    		},
		  		onFail:
		  			function(eMsg)
					{
		    			alert(getI18nMessages("ef.ServiceFailed","服务调用失败: ") + eMsg);
					}
			};
		
		if(isMulti == true)
			EiCommunicator.send("EMRS01", "invokeRESTMultiT", eiInfo, ajax_callback,true,true);
//			efgrid.submitForm("ef_grid_result","emrs","EMRS01","invokeRESTMultiT",true,true,false,true);
		else
			EiCommunicator.send("EMRS01", "invokeRESTSingleT", eiInfo, ajax_callback,true,true);
//			efgrid.submitForm("ef_grid_result","emrs","EMRS01","invokeRESTSingleT",true,true,false,true);
	}
	
//	if("ef_grid_result" == gridId 
//			&& "EMRS01" == service_name 
//			&& method_name.indexOf("invokeREST") == 0 )
//	{
//		efgrid.submitInqu("ef_grid_result", "emrs", "EMRS01", "query");
//		return;
//	}

		var ef_grid = efform.getGrid(gridId);
		ef_grid.refresh(eiInfo);
	
}

button_invoke_onclick=function(){
	if(efvalidateDiv("ef_region_result")){
		isMulti = false;
		efgrid.submitForm( "ef_grid_result", "emrs","EMRS01","update",true,true,false,true);
	}
}

button_invokemulti_onclick=function(){
	if(efvalidateDiv("ef_region_result")){
		isMulti = true;
		efgrid.submitForm( "ef_grid_result", "emrs","EMRS01","update",true,true,false,true);
	}
}
function efgrid_onRowClicked(grid_id, row_index )
{
	if("ef_grid_result" == grid_id)
	{
		var grid = efgrid.getGridObject(grid_id);
		var eiinfo = new EiInfo();
		eiinfo.addBlock(new EiBlock("detail"));
		eiinfo.getBlock("detail").meta.metas = efgrid.getGridObject("ef_grid_result").blockData.meta.metas;
		eiinfo.getBlock("detail").addRow(eiinfo.getBlock("detail").getMappedArray(grid.getRowData(row_index)));
		efform.fillDiv("ef_region_detail", eiinfo);
	}
}

efcalendar_1_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-restMessageSendTime");
	  efcalendar(control_source, node, 'yyyymmdd', true);
}

function fun(currentIndex,index)
{
	var statusCode = tab_map[index];
	ef.get("inqu_status-0-restMessageState").value = statusCode;
	
	if(statusCode == 1 || statusCode == 2)
	{
		ef.get("inqu_status-0-restMessageState_1").value = "";
		ef.get("inqu_status-0-restMessageState_2").value = "";
		if(statusCode == 1)
		{
			efbutton.setButtonStatus("invoke", true);
			efbutton.setButtonStatus("invokemulti", true);
		}
		else{
			efbutton.setButtonStatus("invoke", false);
			efbutton.setButtonStatus("invokemulti", false);
		}
		
	}
	else
	{
		if(statusCode == -3)
		{
			ef.get("inqu_status-0-restMessageState_1").value = -1;
			ef.get("inqu_status-0-restMessageState_2").value = -2;
		}else{
			ef.get("inqu_status-0-restMessageState_1").value = "";
			ef.get("inqu_status-0-restMessageState_2").value = "";
		}
		efbutton.setButtonStatus("invoke", true);
		efbutton.setButtonStatus("invokemulti", true);
	}
	efgrid.submitInqu("ef_grid_result", "emrs", "EMRS01", "query");
	return true;
}
function efgrid_onDataCellClick(grid_id,row_index)
{
	if("ef_grid_result" == grid_id)
	{
		var grid = efgrid.getGridObject(grid_id);
		var map = grid.getRowData(row_index);
		var isSend = map["restIsSend"];
		if("查看返回结果" == isSend)
		{
			var eiinfo = new EiInfo();
			eiinfo.addBlock(new EiBlock("detail"));
			eiinfo.getBlock("detail").meta.metas = efgrid.getGridObject("ef_grid_result").blockData.meta.metas;
			eiinfo.getBlock("detail").addRow(eiinfo.getBlock("detail").getMappedArray(grid.getRowData(row_index)));
			efform.fillDiv("ef_region_detail", eiinfo);
		}
		
	}
}