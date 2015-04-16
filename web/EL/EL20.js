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
	efgrid.submitInqu( "ef_grid_result", "el","EL20","query");
}

efform_onload = function ()
{
  efregion.show("ef_region_result");
}

