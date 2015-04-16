
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ea","EA1010","query");
}
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ea","EA1010","insert",true );
}
button_delete_onclick = function () 
{
	if(confirm("\u786e\u5b9a\u5220\u9664\u4e48\uff1f")){
	  	efgrid.submitForm( "ef_grid_result", "ea","EA1010","delete", true );
	}
}

button_update_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ea","EA1010","update", true );
}

button_handle_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ea","EA1010","doHandleMessage", true );
}


efgrid_onDataCellClick = function( grid_id, row_index, col_index, value ) {

	if( col_index == 6 )
	{
		var grid = efgrid.getGridObject( grid_id );
		if( grid )
		{
			var messageId = grid.getCellValue( row_index, 1, 1);
			// set current row to "checked"...
			grid.setRowChecked(row_index,true)
			efgrid.submitForm( "ef_grid_result", "ea","EA1010","doHandleMessage", true );
			
		}
	}

}
// 显示grid之前来设置数据 设置按钮上的文本
efgrid_onBeforeGridDisplay = function( grid_id )
{
	if(grid_id == "ef_grid_result" )
	{
		var grid = efgrid.getGridObject( "ef_grid_result" );
		if( grid )
		{
			var count = grid.getRowCount();
			for(var i=0 ; i<count;i++){
				grid.setCellValue(i,6,"执行本条",TYPE_DATA);
			}
		}
	}
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  switch( col_index ){
    case 7:
      return "\<input value='查看电文' class='buttonClass' type='button' onclick='showTeleWindow("+row_index+")'>" ;      
    default:
    
  }  
}

showTeleWindow = function (i){
  var grid = efgrid.getGridObject( "ef_grid_result" );

  var teleStr = grid.getCellValue(i, 1, TYPE_DATA);  
  var indexNumb = grid.getCellValue( i,0,TYPE_DATA);
  teleStr = teleStr.substring(1,teleStr.length-1);
  var teleIndexNumb = grid.getCellValue(i,1,TYPE_FIX);
  var getBean = "yes";
  var type = "receive";

  window.open( 'DispatchAction.do?efFormEname=ET10&teleIndexNumb='+teleIndexNumb+'&indexNumb='+indexNumb+'&getBean='+getBean +'&type='+type , '',"left=200,top=100,height=600,width=800,scrollbars=yes,close=no,resizable=yes"); 
}

// for date pop-window
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyy-mm-dd 23:59:59', true);
}