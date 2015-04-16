efform_onload = function(){
//ShowRightMenu();
	var grid = efgrid.getGridObject("ef_grid_s");
	grid.addMenuItem("", {label:"test", parent:"", text:"测试", leaf:"1" ,imgSrc:EF_IMAGES_PATH+"efgrid_front_desc.gif"} );
	grid.addMenuItem("", {label:"test1", parent:"", text:"测试1", leaf:"0" } );
	grid.addMenuItem("test1", {label:"test2", parent:"test1", text:"测试2", leaf:"1" ,imgSrc:EF_IMAGES_PATH+"efgrid_front_desc.gif"} );
	efregion.show("ef_region_codeDemo");
	efregion.toggleShow("ef_region_codeDemo");
}

button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_s", "ee","EE10","query");
}

button_save_onclick = function ()
{
	efgrid.submitForm( "ef_grid_s", "ee","EE10","update",true );
}

button_remove_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_s", "ee","EE10","delete", true );
}

button_create_onclick = function ()
{
	efgrid.submitForm( "ef_grid_s", "ee","EE10","insert",true );
}
/*

efgrid_onFixCellClick = function( grid_id, row_index, col_index, cell_value )
{
	if( col_index >0 )
	{
		var grid = efgrid.getGridObject( grid_id );
		if( grid )
		{
			var product_id = grid.getCellValue( row_index, 1, 1);
			window.open( "http://www.google.com/search?q=" + product_id );
		}
	}
}

efgrid_onDataCellClick = function( grid_id, row_index, col_index, cell_value )
{
	if( col_index == 4 )
	{
		window.open( cell_value );
	}
	if( col_index == 5 )
	{
		var grid = efgrid.getGridObject( grid_id );
		if( grid )
		{
			var product_id = grid.getCellValue( row_index, 1, 1);
			window.open( "http://www.google.com/search?q=" + product_id );
		}
	}
}

efgrid_onFixCellDisplayReady = function( div_node_html, row_index,
	col_index, cell_value, display_value, grid_id )
{
	return div_node_html;
}

efgrid_onCellDisplayReady = function( div_node_html, row_index,
	col_index, cell_value, display_value, grid_id )
{
	if( col_index == 3 && grid_id == "ef_grid_s" )
	{
		var div_node = document.createElement( "div" );
		div_node.innerHTML = div_node_html;

		if( eval(cell_value) > 2500 )
		{
			div_node.firstChild.style.color = "orange";
		}
		else if( eval(cell_value) < 1500 )
		{
			div_node.firstChild.style.color = "green";
		}
		else
		{
			div_node.firstChild.style.color = "blue";
		}
		return div_node.innerHTML;
	}
	return div_node_html;
}

efgrid_onGridDisplayReady = function( div_node )
{
	efgrid.setDisplayStyle( div_node.id, 2, 7, "color",
		"orange", TYPE_DATA );
	efgrid.setDisplayStyle( div_node.id, 0, 1, "backgroundColor",
		"blue", TYPE_FIX );
}

efgrid_onAddNewRow = function( grid_id )
{
	return true;
}

efgrid_getNewWindowUrl = function( grid_id, row_index, col_index, value )
{
	return "DispatchAction.do?efFormEname=EE1001";
}

efgrid_onRowCheckboxClicked = function( grid_id, row_index, div_node )
{
	var grid = efgrid.getGridObject( grid_id );

	if( !grid.isRowChecked( row_index ) && grid.getCheckedRowCount()>=2 )
	{
		alert( "不能选择超过2行！");
		div_node.firstChild.checked = false;
	}
}

efgrid_onSelectAllClicked = function( grid_id, div_node )
{
	alert( "不允许进行全选操作" );
	div_node.firstChild.checked = false;
	return false;
}

efform_onload = function()
{
	efgrid.setRowDisplayStyle( "ef_grid_s", 1, "buttonRegular" );
}
*/
function efgrid_onRowDblClicked(gridId,row_index){

	if(gridId == "ef_grid_s")
		alert("double"+gridId + ":::"+row_index);
	else if(gridId == "_ef_grid_subgrid"){

			var sub_grid = efform.getGrid( "_ef_grid_subgrid" );
			var index = sub_grid.getCurrentRowIndex();
			if( index < 0 ) {
				alert( "未选择记录" );
				return;
			}

			var div_node = efform.getSubGridDiv();
			var column = div_node.efDisplayingCol;
			var cell_value = sub_grid.getBlockData().getCell( index, column.getValueProperty() );
			efwindow.setValue( cell_value );
	}
}

var test = function (){
	alert('hello');

}

/*
function configMenu(menu){
  menu.depth(8);
  menu.textClicked = test;
  menu.hoverExpand = function(n){ if ( n.depth()==1 ) return false; else return true; }
}

*/

button_nMenu_onclick = function(){
	  $('#nMenu').append( nMenu.render()) ;
}

function efgrid_onExport_modleXls (gridId){
	alert(gridId);
}

gridmenu_test_onclick = function(gridId,label,row_index,col_index,data_type){
	alert("gridId:"+gridId+"#"+"label:"+label+"#"+"row_index:"+row_index+"#"+"col_index:"+col_index+"#"+"data_type:"+data_type);
}
gridmenu_test1_onclick = function(gridId,label,row_index,col_index,data_type){
	alert("gridId:"+gridId+"#"+"label:"+label+"#"+"row_index:"+row_index+"#"+"col_index:"+col_index+"#"+"data_type:"+data_type);
}
gridmenu_test2_onclick = function(gridId,label,row_index,col_index,data_type){
	alert("gridId:"+gridId+"#"+"label:"+label+"#"+"row_index:"+row_index+"#"+"col_index:"+col_index+"#"+"data_type:"+data_type);
}
