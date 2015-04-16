button_query_onclick = function () {
	if (efvalidateDiv("ef_region_inqu")) {
		efgrid.submitForm("ef_grid_result", "el", "EL00051", "query",true);
	}
}


button_filter_onclick = function () {
	var grid = efgrid.getGridObject("ef_grid_result");
	for(var i = 0 ; i< grid.getRowCount(); i++)
	{
		if(!grid.isRowChecked(i))
		{
			grid.removeRow(i--);
		}
	}	
	grid.refresh();
}

button_chart_onclick = function () {
	
	efgrid.submitForm("ef_grid_result", "el", "EL00051", "store",true);
 	
}

efcalendar_1_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-startDate");
	  efcalendar(control_source, node, 'yyyymmdd', true);
	}

efcalendar_2_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-endDate");
	  efcalendar(control_source, node, 'yyyymmdd', true);
	}  
function efgrid_onAjaxSubmitSuccess(gridId, service_name,
		method_name, eiInfo)
{
	var grid = efgrid.getGridObject(gridId);
	grid.refresh(eiInfo);
	if("ef_grid_result" == gridId 
			&& "EL00051" == service_name
			)
	{
		
		for(var i = 0 ; i< grid.getRowCount(); i++)
		{
			grid.setRowChecked(i,true);
			grid.refreshRow(i);
		}
		if("store" == method_name)
		{
			ef.get("chart").style.display="block";
			ef.get("chart").src="DispatchAction.do?efFormEname=EL000301";
		}
	}	
}