check_job_property = function ()
{
    var grid = efgrid.getGridObject( "ef_grid_result" );
	var rows = grid.getCheckedRows();
	for( var i=0; i< rows.length; i++ )
	{
	    var classname = grid.getCellValue( rows[i], 0 );
		var mode = grid.getCellValue( rows[i], 2 );
		var delay = grid.getCellValue( rows[i], 4 );
		var period = grid.getCellValue( rows[i], 5 );
		var begintime = grid.getCellValue( rows[i], 3 );
        
		if( mode == 1 && !isAvailable(begintime) )
		{
			alert( "任务"+classname+"请选择定时开始时间！" );
			return false;
		}
	
		if( mode == 3  )
		{
			if( !isAvailable(begintime) )
			{
				alert( "任务"+classname+"请选择定时开始时间！" );
				return false;
			}
		    if( period == "0" )
		    {
				alert( "任务"+classname+"请选择周期！" );
				return false;
			}
		}
		
		if( mode == 4 && period == "0" )
		{
		    	alert( "任务"+classname+"请选择周期！" );
				return false;
		}
		
		if( mode == 5  )
		{
			if( !isAvailable(begintime) )
			{
				alert( "任务"+classname+"请选择定时开始时间！" );
				return false;
			}
		    if( period == "0" )
		    {
				alert( "任务"+classname+"请选择周期！" );
				return false;
			}
		}
		
		if( mode == 6 && period == "0" )
		{
		    	alert( "请选择周期！" );
				return false;
		}
	
	}
	
	return true;
}

button_query_onclick = function () 
{   	
	efgrid.submitInqu( "ef_grid_result", "eb","EB01","query");
}

button_create_onclick = function () 
{
    if( !check_job_property() )
      return;
		
	efgrid.submitForm( "ef_grid_result", "eb","EB01","insert",true);
}

button_update_onclick = function () 
{
    if( !check_job_property() )
      return;
	efgrid.submitForm( "ef_grid_result", "eb","EB01","update",true );
}

button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "eb","EB01","delete", true );
}
/*
efgrid_onDataCellSaved = function( grid_id, row_index, col_index, cell_value )
{
	var grid = efgrid.getGridObject( grid_id );
		
	if( col_index == 2 )
	{
		var mode = cell_value;
		if ( mode == "1" )
		{
		    grid.setDisplayStyle( grid_id, row_index, 4, "enable","false",TYPE_DATA );
		    
		}
	}	
}

*/
efgrid_onCellEditNodeDisplayReady = function( grid_id, row_index, 
	col_index, cell_value, data_type, div_node )
{
	var grid = efgrid.getGridObject( grid_id );
		
	if( col_index == 3 )
	{
		div_node.firstChild.setAttribute( "disabled", true ) ;
		
	}	
}


efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index, 
	col_index, data_type )
{
	var grid = efgrid.getGridObject( grid_id );
	
	if( col_index == 4 )
	{
	    var column = grid.getColumn( col_index, TYPE_DATA );
		var mode = grid.getCellValue( row_index, 2 );
		
		if ( mode == "1" )
		{
		    column.set( "enable", false );		    
		}
		if ( mode == "2" )
		{
		    column.set( "enable", true );	    
		}
		if ( mode == "3" )
		{
		    column.set( "enable", false );	    
		}
		if ( mode == "4" )
	    {
		    column.set( "enable", true );	    
		}
		if ( mode == "5" )
		{
		    column.set( "enable", false );	    
		}
		if ( mode == "6" )
		{
		    column.set( "enable", true );	    
		}
	}	
	
	if( col_index == 5 )
	{
	    var column = grid.getColumn( col_index, TYPE_DATA );
		var mode = grid.getCellValue( row_index, 2 );
		
		if ( mode == "1" )
		{
		    column.set( "enable", false );		    
		}
		if ( mode == "2" )
		{
		    column.set( "enable", false );	    
		}
		if ( mode == "3" )
		{
		    column.set( "enable", true );	    
		}
		if ( mode == "4" )
	    {
		    column.set( "enable", true );	    
		}
		if ( mode == "5" )
		{
		    column.set( "enable", true );	    
		}
		if ( mode == "6" )
		{
		    column.set( "enable", true );	    
		}
	}	
}


efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  var grid = efgrid.getGridObject( "ef_grid_result" );
  var isLoad = grid.getCellValue( row_index, 6 );
  switch( col_index ){
    case 7:
      if( isLoad == 0 )
         return "\<input value='加载' class='buttonRegular' type='button' onclick='loadJob("+ row_index  +" )'>" ;
      else
         return;
    case 8:
      if( isLoad == 1 )
         return "\<input value='卸载' class='buttonRegular' type='button' onclick='unloadJob("+ row_index  +" )'>" ;
      else
         return;
            
  }  
}

loadJob = function( row_index ){
  var grid = efgrid.getGridObject( "ef_grid_result" );
  var className = grid.getCellValue( row_index, 0 );
  if( !isAvailable(className) )
  {
    alert("选择的任务类名无效！");
   }
  else
  {
    window.location.href="DispatchAction.do?efFormEname=EB01&methodName=load&className="+ className ;
  }
}

unloadJob = function( row_index ){
  var grid = efgrid.getGridObject( "ef_grid_result" );
  var className = grid.getCellValue( row_index, 0 );
  if( !isAvailable(className) )
  {
    alert("选择的任务类名无效！");
   }
  else
  {
    window.location.href="DispatchAction.do?efFormEname=EB01&methodName=unload&className="+ className ;
  }
}


