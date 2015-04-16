efform_onload = function ()
{
	efregion.show("ef_region_result");
}	
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "el","EL1501","query");
}

efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}