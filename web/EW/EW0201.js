efform_onload = function() {
	efform.hideFormHead();
	$('#efFormStatus').remove();
	$("#ef_tab_x").children('br').remove();	
}
/*
 * 角色信息的查询
 */
button_query2_onclick = function() {
	efgrid.submitInqu("ef_grid_Roles", "EW", "EW0201", "GetQueryRoles");
}
button_clear2_onclick = function() {
	efform.clearInputField($("#ef_region_inqu_2")[0]);
}


efgrid_onRowCheckboxClicked = function( grid_id, row_index, div_node ){  
  var grid = efgrid.getGridObject( grid_id );	
  if( !grid.isRowChecked( row_index ))
    selectRow(grid_id,row_index); 
}

selectRow = function(grid ,row_index){
  var gridCandidate = efgrid.getGridObject(grid);
  var rowData = gridCandidate.getRowData(row_index);
 $(parent.document).find('#identity').val(rowData["RoleId"]);
 $(parent.document).find('#identityDesc').val(rowData["RoleName"]);
 parent.closeDialog('EW0201');
}
 