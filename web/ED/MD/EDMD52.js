var fkey = "";

efform_onload = function ()
{
	ef.get("serviceName").value = "EDMD52";
}

button_query_onclick = function ()
{
      efgrid.submitInqu( "ef_grid_result", "ed","EDMD52","query");
}

button_update_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_result" ))
	{
		efgrid.submitForm( "ef_grid_result", "ed","EDMD52","update",true );
	}
}

button_delete_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_result" ))
	{
		if(window.confirm("确定要删除么？")){
			efgrid.submitForm( "ef_grid_result", "ed","EDMD52","delete", true );
		}
  	}
}

button_insert_onclick = function ()
{
	if( isGridRowChecked( "ef_grid_result" ))
	{
		efgrid.submitForm( "ef_grid_result", "ed","EDMD52","insert",true );
	}
}


button_synall_onclick = function()
{
	if( isGridRowChecked( "ef_grid_result" ))
	{
		var _info = getEFGridSubmitInfo();
		EiCommunicator.send("EDMD53","synchronizeAll",_info, null );
	}
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value )
{

	if( col_index == 1 )
	{
		var grid = efgrid.getGridObject( grid_id );
		if( grid )
		{
			var _formCname = grid.getCellValue( row_index, 0, 0);
			var _formId = grid.getCellValue( row_index, 0, TYPE_DATA, true );

			// alert( "formId:" + _formId );

			efform.openNewForm("EDMD53","formEname="+value+"&formCname="+encodeURI(_formCname)+"&formId="+_formId );
		}
	}
}

/**
 * 生成代码服务调用
 */
button_gencode_onclick = function ()
{
	/*
	if( isGridRowChecked( "ef_grid_result" ))
	{
		var _info = getEFGridSubmitInfo();
		EiCommunicator.send("EDMD55","genCode",_info, null );
	}
	*/
	if( !isGridRowChecked( "ef_grid_result" )) {
		return alert("请选择生成代码的页面!");
	}
	var selected = false;
	var codeTypes = document.forms[0].elements["gen_status-0-codeType"];
	for(var i=0; i<codeTypes.length; i++) {
		if (codeTypes[i].checked) {
			selected = true;
			break;
		}
	}
	if (!selected) {
		return alert("请选择生成的代码类型!");
	}
	efgrid.submitForm( "ef_grid_result", "ed", "EDMD55", "genFormCode", true);
	efbutton.setButtonStatus("genCode", true);
	efform.setStatus(0, "生成代码");
	// 不太好的处理方式
	if(!!ef.get("ef_grid_result_submit")) {
      	ef.get("ef_grid_result_submit").parentNode.removeChild(ef.get("ef_grid_result_submit"));
	}

	ef.get("serviceName").value = "EDMD52";
	ef.get("methodName").value = "query";
}

getEFGridSubmitInfo = function()
{
	var info = new EiInfo();
	var grid = efgrid.getGridObject( "ef_grid_result" );
	if( grid != null )
	{
		info.setByNodeObject( document.forms[0] );
		var block = info.getBlock( grid.blockId );
		if( !isAvailable( block ) ) {
			block = new EiBlock( grid.getBlockData().getBlockMeta() );
			info.addBlock( block );
		}

		efgrid._addSelectedData( block, grid );

	}
	return info;
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
