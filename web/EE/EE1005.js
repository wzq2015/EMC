var all_countries = new Object();
var all_cities = new Object();

efgrid_onBeforeGridDisplay = function( grid_id )
{
	var ei = _getEi();
	var block = ei.getBlock( "all_countries" );
	for( var i=0; i< block.getRows().length; i++ )
	{
		all_countries[block.getCell(i,"country_ename")] =
			block.getCell(i,"country_cname");
	}
	block = ei.getBlock( "all_cities" );
	for( var i=0; i< block.getRows().length; i++ )
	{
		all_cities[block.getCell(i,"city_ename")] =
			block.getCell(i,"city_cname");
	}
}

efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index,
	col_index, data_type )
{
	var grid = efgrid.getGridObject( grid_id );

	if( col_index == 1 && data_type == TYPE_DATA )
	{
		load_country( row_index, grid.getCellValue( row_index, 0, TYPE_DATA  ) );
	}
	if( col_index == 2 && data_type == TYPE_DATA )
	{
		load_city( row_index, grid.getCellValue( row_index, 1, TYPE_DATA  ) );
	}
}

efgrid_onCellEditNodeDisplayReady = function( grid_id, row_index,
	col_index, cell_value, data_type, div_node )
{

}

efgrid_onCellDisplayReady = function( div_node_html, row_index,
	col_index, cell_value, display_value, grid_id )
{
	if( col_index == 1 && isAvailable(cell_value) )
	{
		var div_node = document.createElement( "div" );
		div_node.innerHTML = div_node_html;

		div_node.firstChild.innerText = all_countries[cell_value];

		return div_node.innerHTML;
	}
	if( col_index == 2 && isAvailable(cell_value) )
	{
		var div_node = document.createElement( "div" );
		div_node.innerHTML = div_node_html;

		div_node.firstChild.innerText = cell_value;

		return div_node.innerHTML;
	}
	return div_node_html;
}

efgrid_onDataCellSaved = function( grid_id, row_index, col_index, cell_value )
{
	var grid = efgrid.getGridObject( grid_id );

	if( col_index == 0 )
	{
		grid.setCellValue( row_index, 1, "", TYPE_DATA  );
		grid.setCellValue( row_index, 2, "", TYPE_DATA  );
		grid.setCellValue( row_index, 3, "", TYPE_DATA  );
		//grid.refreshRow( row_index );
		grid.refreshCell( row_index, 1 , TYPE_DATA );
		grid.refreshCell( row_index, 2 , TYPE_DATA );
		grid.refreshCell( row_index, 3 , TYPE_DATA );
	}
	if( col_index == 1 )
	{
		grid.setCellValue( row_index, 2, "", TYPE_DATA  );
		grid.setCellValue( row_index, 3, "", TYPE_DATA  );
		//grid.refreshRow( row_index );
		grid.refreshCell( row_index, 2 , TYPE_DATA );
		grid.refreshCell( row_index, 3 , TYPE_DATA );
	}
	if( col_index == 2 )
	{
		var cname = isAvailable( cell_value )? all_cities[cell_value]: "";
		grid.setCellValue( row_index, 3, cname, TYPE_DATA  );
		grid.refreshCell( row_index, 3 , TYPE_DATA );
	}
}

load_country = function( row_index, continent )
{
	var ajax_callback =
	{
		onSuccess :
    		function(eiInfo)
			{
				load_country_callback( row_index, eiInfo );
    		},
  		onFail:
    		function(eMsg)
			{
    			alert("服务调用失败: " + eMsg);
			}
	};
	var ei_info = new EiInfo();
	ei_info.setByNameValue( "inqu_data-0-continent_name", continent );

	EiCommunicator.send( "EE1005", "loadCountry" , ei_info, ajax_callback );
}

load_country_callback = function( row_index, eiInfo )
{
	var block = eiInfo.getBlock( "country" );
	if( !isAvailable( block ) || block.getRows().length <=0 )
	{
		return;
	}

	var grid = efgrid.getGridObject( "ef_grid_result" );
	var column = grid.getColumn( 1, TYPE_DATA );
	column.prepareData( eiInfo );

	grid.setCellValue( row_index, 1, "", TYPE_DATA  );
	grid.setCellValue( row_index, 2, "", TYPE_DATA  );
	grid.setCellValue( row_index, 3, "", TYPE_DATA  );

	grid.refreshCell( row_index, 1 , TYPE_DATA );
	grid.refreshCell( row_index, 2 , TYPE_DATA );
	grid.refreshCell( row_index, 3 , TYPE_DATA );

	//grid.refreshRow( row_index );
}

load_city = function( row_index, country )
{
	var ajax_callback =
	{
		onSuccess :
    		function(eiInfo)
			{
				load_city_callback( row_index, eiInfo );
    		},
  		onFail:
    		function(eMsg)
			{
    			alert("服务调用失败: " + eMsg);
			}
	};
	var ei_info = new EiInfo();
	ei_info.setByNameValue( "inqu_data-0-country_name", country );

	EiCommunicator.send( "EE1005", "loadCity" , ei_info, ajax_callback );
}

load_city_callback = function( row_index, eiInfo )
{
	var block = eiInfo.getBlock( "city" );
	if( !isAvailable( block ) || block.getRows().length <=0 )
	{
		return;
	}

	var grid = efgrid.getGridObject( "ef_grid_result" );
	var column = grid.getColumn( 2, TYPE_DATA );
	column.prepareData( eiInfo );

	grid.setCellValue( row_index, 2, "", TYPE_DATA  );
	grid.setCellValue( row_index, 3, "", TYPE_DATA  );

	grid.refreshCell( row_index, 2 , TYPE_DATA );
	grid.refreshCell( row_index, 3 , TYPE_DATA );
	//grid.refreshRow( row_index );
}
efform_onload = function(){
	efregion.show("ef_region_codeDemo");
	efregion.toggleShow("ef_region_codeDemo");
}