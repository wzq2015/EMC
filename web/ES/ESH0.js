efform_onload = function ()
{
  efregion.show("ef_region_result");
  var ef_region_buttonbar = new efbuttonbar();
  ef_region_buttonbar.paint("ef_region_result");
}

button_f2_onclick = function () 
{
  efgrid.submitInqu( "ef_grid_result", "es","ESH0","query");
	
}

efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

