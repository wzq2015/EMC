
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ea","EA1000","query");
}
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ea","EA1000","insert",true );
}
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ea","EA1000","delete", true );
}
button_update_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ea","EA1000","update", true );
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, cell_value ) 
{
	if( col_index >0 )
	{
		var grid = efgrid.getGridObject( grid_id );
		if( grid )
		{
			var msg_code = grid.getCellValue( row_index, 1, 1);
			
			//send
			var page="DispatchAction.do?efFormEname=EA1020&serviceName=EA1020&methodName=query&inqu_status-0-fd_message_id=&inqu_status-0-fd_message_code="+msg_code+"&iinqu_status-0-fd_message_state=&inqu_status-0-fd_message_group_name=&inqu_status-0-fd_message_type=&inqu_status-0-fd_message_send_time_begin=&inqu_status-0-fd_message_send_time_end="
			if(msg_code.substr(0,2)!="XS"){
				//receive
				page="DispatchAction.do?efFormEname=EA1010&serviceName=EA1010&methodName=query&inqu_status-0-fd_message_id=&inqu_status-0-fd_message_code="+msg_code+"&iinqu_status-0-fd_message_state=&inqu_status-0-fd_message_group_name=&inqu_status-0-fd_message_type=&inqu_status-0-fd_message_receive_time_begin=&inqu_status-0-fd_message_receive_time_end="
			}
			
			window.open( page );
		}
	}
}