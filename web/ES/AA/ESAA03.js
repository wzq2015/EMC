button_f1_onclick = function ()
{
	var grid = efgrid.getGridObject("ef_grid_result");
	var selectedRows = new Array();
	selectedRows = grid.getCheckedRows();
	if (selectedRows.length > 1) {
		alert("角色不能多选！");
		return;
	}
	if (selectedRows.length < 1) {
		alert("请选择一个角色！");
		return;
	}
	efgrid.submitForm( "ef_grid_result", "ES", "ESAA03", "selectRole", true );
}

/**
 * 只能选择一条记录
 */
efgrid_onRowCheckboxClicked = function( grid_id, row_index,div_node ){
	if(grid_id == "ef_grid_result")
	{
		var grid = efgrid.getGridObject(grid_id);
		var index = grid.getCheckedRows();
		
		if(index.length == 1){
		grid.setRowChecked(index[0],false);
		grid.refreshRow(index[0]);
		}
	}
};

/**
 * 全选的checkbox不能选中
 */
efgrid_onSelectAllClicked = function( grid_id, div_node ){
	if(grid_id == "ef_grid_result")
	{
		var checkBox = div_node.firstChild;
		checkBox.checked = false;
	
		return false;
	}
};