var fkey = "";

efform_onload = function ()
{
	efgrid.getGridObject( "ef_grid_region" ).setLimit(100);
	efgrid.getGridObject( "ef_grid_rgargs" ).setLimit(100);
}

button_query_onclick = function ()
{
    efgrid.submitInqu( "ef_grid_result", "ed","EDMD50","query");
}

button_update_onclick = function ()
{
	if(  isGridRowChecked( "ef_grid_result" ) )
	{
		efgrid.submitForm( "ef_grid_result", "ed","EDMD50","update",true );
	}
}

isGridRowChecked = function( grid_id )
{
	if( grid_id == null || grid_id == undefined )
	{
		grid_id = "ef_grid_result";
	}

	var grid = efgrid.getGridObject( grid_id );
	if( grid != null )
	{
		if( grid.getCheckedRowCount() > 0)
		{
			return true;
		}
	}
	return false;
}

button_delete_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_result" ) )
	{
  		efgrid.submitForm( "ef_grid_result", "ed","EDMD50","delete", true );
  	}
}

button_insert_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_result" ) )
	{
		efgrid.submitForm( "ef_grid_result", "ed","EDMD50","insert",true );
	}
}

button_sync_arg_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDMD50","syncArg",true );
}

button_r_query_onclick = function ()
{
    efgrid.submitInqu( "ef_grid_region", "ed","EDMD51","query");
}

button_r_update_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_region" ) )
	{
		efgrid.submitForm( "ef_grid_region", "ed","EDMD51","update",true );
	}
}

button_r_delete_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_region" ) )
	{
  		efgrid.submitForm( "ef_grid_region", "ed","EDMD51","delete", true );
  	}
}

button_r_insert_onclick = function ()
{
	var _templetId = document.getElementById("region_inqu_status-0-templetId").value;
	if( _templetId == null ||  _templetId == '' || _templetId == undefined )
	{
		return;
	}

	if( isGridRowChecked( "ef_grid_region" ) )
	{
		efgrid.submitForm( "ef_grid_region", "ed","EDMD51","insert",true );
	}
}

//====== 区域参数的方法调用 =======//

button_a_query_onclick = function ()
{
    efgrid.submitInqu( "ef_grid_rgargs", "ed","EDMD16","query");
}

button_a_update_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_rgargs" ) )
	{
		efgrid.submitForm( "ef_grid_rgargs", "ed","EDMD16","update",true );
	}
}

button_a_delete_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_rgargs" ) )
	{
  		efgrid.submitForm( "ef_grid_rgargs", "ed","EDMD16","delete", true );
  	}
}

button_a_insert_onclick = function ()
{
	var _regionId = document.getElementById("rgargs_inqu_status-0-regionId").value;
	if( _regionId == null ||  _regionId == '' || _regionId == undefined )
	{
		return;
	}

	if( isGridRowChecked( "ef_grid_rgargs" ) )
	{
		efgrid.submitForm( "ef_grid_rgargs", "ed","EDMD16","insert",true );
	}
}


efgrid_onFixCellClick = function( grid_id, row_index, col_index, value )
{

	if( grid_id == "ef_grid_result" )
	{
		// 如果是 布局模板ID列
		if( col_index == 1 )
		{
			var grid = efgrid.getGridObject( grid_id );
			if( grid )
			{
				//var templateID = grid.getCellValue( row_index, 1, 1, false );
				var templateID = grid.getCellValue( row_index, 0, TYPE_DATA, true );
				if(templateID!=null&&templateID.trim()!="")
				{
					ef.get("region_inqu_status-0-templetId").value = templateID;
					efgrid.submitInqu( "ef_grid_region", "ed", "EDMD51","query");
				}
			}
		}
	}
	else if( grid_id == "ef_grid_region")
	{
		//alert(  "ef_grid_region col: " + col_index );
		var grid = efgrid.getGridObject( grid_id );
		if( grid )
		{
			if( col_index == 1)
			{
				var regionId = grid.getCellValue( row_index, 0, TYPE_DATA, true );
				//alert( "regionid:" + regionId);
				if(regionId!=null&&regionId.trim()!="")
				{
					ef.get("rgargs_inqu_status-0-regionId").value = regionId;
			        efgrid.submitInqu( "ef_grid_rgargs", "ed", "EDMD16","query");
				}
			}
		}
	}
	else
	{

	}
}
// 双击 显示模板图片
function efgrid_onRowDblClicked(gridId,row_index){
	if(gridId == "ef_grid_result"){
		var grid = efgrid.getGridObject("ef_grid_result");
		var cellValue = grid.getBlockData().getCell( row_index, "templetPath" );
		EFColorbox({left:5,top:0,width:'99%',href:cellValue,title:"模板图片"});
	}
}
