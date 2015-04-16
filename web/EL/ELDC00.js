
button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_r", "el","ELDC00","query");
}

button_f3_onclick = function () 
{
	efgrid.submitForm( "ef_grid_r", "el","ELDC00","update",true );
}

button_f4_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_r", "el","ELDC00","delete", true );
}

button_f6_onclick = function () 
{
	efgrid.submitForm( "ef_grid_r", "el","ELDC00","insert",true );
}

efcalendar_1_click = function (control_source) {
  var node = ef.getNodeById("startDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efcalendar_2_click = function (control_source) {
  var node = ef.getNodeById("endDate");
  efcalendar(control_source, node, 'yyyymmdd', true);
}

efgrid_cellclick = function( grid_id, row_index, col_index, value ) 
{
	alert( value );
}

efgrid_onCellDisplayReady = function( div_node, row_index, col_index, col_value_c, display_value )
{
	if( row_index == 3 && col_index == 7 )
	{
		div_node.getAttribute( "style" ).setAttribute( "color" , "red" );
	}
}

efgrid_onGridDisplayReady = function( div_node )
{
	efgrid.setDisplayStyle( div_node.id, 2, 7, "color", "pink" );
}
