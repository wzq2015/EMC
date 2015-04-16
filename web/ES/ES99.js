button_query_onclick = function () 
{
//		efgrid.submitInqu( "ef_grid_result", "es","ES99","query");
	efgrid.submitGridsData( ["ef_grid_result","ef_grid_total"],"es","ES99","query");
}

efcalendar_1_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-startDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efcalendar_2_click = function (control_source) {
  var node = ef.getNodeById("inqu_status-0-endDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}   