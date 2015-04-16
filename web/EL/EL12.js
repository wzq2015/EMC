efcalendar_1_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-startDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efcalendar_2_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-endDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_r", "el","EL12","query");
}

efgrid_onRowClicked = function (id ,row_index){
	var grid = efgrid.getGridObject(id);	
	var selectData = grid.getRowData(row_index);
	document.getElementById("sql").innerHTML = selectData["fsql"];
}

