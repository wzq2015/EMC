button_query_onclick = function () {
	if (efvalidateDiv("ef_region_inqu")) {
		efgrid.submitInqu("ef_grid_result", "el", "EL0013", "query");
	}
}

efcalendar_1_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-startTime");
	  efcalendar(control_source, node, 'yyyymmdd', true);
}

efcalendar_2_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-endTime");
	  efcalendar(control_source, node, 'yyyymmdd', true);
}  
