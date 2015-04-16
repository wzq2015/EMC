efform_onload = function ()
{
  efbutton.setButtonStatus("DF6", false);
  ef.get("inqu_status-0-formEname").value = " ";
  ef.get("inqu_status-0-funcId").value = " ";

  //efregion.show("ef_region_inqu");
  //efregion.toggleShow("ef_region_inqu");
}

var _needRefresh = true;
var _status;
var _msg;
var _msgKey;

efgrid_onAddNewRow = function( grid_id )
{
  efbutton.setButtonStatus("DF6", true);
  return true;  
}

button_f2_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_dresult", "ed","EDFA51","queryDefine");
	
}


button_df4_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_dresult", "ed","EDFA51","deleteDefine", true );
}


button_df6_onclick = function ()
{
	efgrid.submitForm( "ef_grid_dresult", "ed","EDFA51","insertDefine",true );
}


/*
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){

	  var grid = efgrid.getGridObject( "ef_grid_dresult" );
	  var formEname = grid.getCellValue(row_index,1,TYPE_FIX);
	  var funcId = grid.getCellValue(row_index,2,TYPE_FIX);
	  

	  if( col_index == 1 ){
	  	if("" != formEname)
	    	return "\<input value='修改' class='buttonclass' type='button' onclick='openUpdateWindow(\""+formEname+ "\",\""+ funcId +"\")'>" ;
		else 
			return "";
	  }
}
*/
/*
openUpdateWindow = function(formEname,funcId) {
	//alert(formEname + funcId);
	efform.openNewForm( "EDFA5101","serviceName=EDFA51&methodName=queryAll&inqu_status-0-formEname=" + formEname + "&inqu_status-0-funcId=" + funcId );

}
*/

button_f3_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDFA51","update",true );
}

button_f4_onclick = function ()
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var rows = grid.getSelectRowsData();
	if(rows.length == 0) {
		alert("请选择记录！");
		return false;
	}
	
	for(i=0; i<rows.length; i++) {
		var row = rows[i];
		if(row['itemMustFlag'] == '1') {
			alert("必须字段不能被删除！");
			return false;
		}
	}
	
  	efgrid.submitForm( "ef_grid_result", "ed","EDFA51","delete", true );
  	
  	_needRefresh = false;
  	efgrid.submitInqu( "ef_grid_uresult", "ed","EDFA51","queryUnDefine");
  	
}


button_f6_onclick = function ()
{
	efgrid.submitForm( "ef_grid_uresult", "ed","EDFA51","insert",true );

  	_needRefresh = false;
	efgrid.submitInqu( "ef_grid_result", "ed","EDFA51","query");
	
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	//debugger;
	if( grid_id == "ef_grid_dresult" )
	{
	  var grid = efgrid.getGridObject( grid_id );
	  var formEname = grid.getCellValue(row_index,1,TYPE_FIX);
	  var funcId = grid.getCellValue(row_index,2,TYPE_FIX);
	
      ef.get("inqu_status-0-formEname").value = formEname;
      ef.get("inqu_status-0-funcId").value = funcId;
      
      _needRefresh = false;
      efgrid.submitInqu( "ef_grid_result", "ed", "EDFA51","query");
      _needRefresh = false;      
  	  efgrid.submitInqu( "ef_grid_uresult", "ed","EDFA51","queryUnDefine");
	}
}

efgrid_onAjaxSubmitSuccess = function( grid_id, service_name, method_name, eiInfo ){
    var ef_grid = efform.getGrid( grid_id );	 
    ef_grid.refresh( eiInfo );

	if(_needRefresh) {
  	  _status = eiInfo.status;
      _msg = eiInfo.msg;
      _msgKey = eiInfo.msgKey;
    }
  	else {
  	  efform.setStatus(_status, _msg, _msgKey);
  	  _needRefresh = true;
  	}

  	if ( grid_id == "ef_grid_dresult" ){
    	//alert(grid_id);
    	
    	/*
    	var tempInfo = new EiInfo();
    	
    	var tempBlock = new EiBlock("result");
    	tempInfo.addBlock(tempBlock);
    	tempBlock.addRow();
    	tempBlock.setBlockMeta(null);
    	
    	tempBlock = new EiBlock("uresult");
    	tempInfo.addBlock(tempBlock);
    	tempBlock.addRow();
    	tempBlock.setBlockMeta(null);

    	var t_grid = efform.getGrid("ef_grid_result");
    	t_grid.refresh(tempInfo);
    	t_grid = efform.getGrid("ef_grid_uresult");
    	t_grid.refresh(tempInfo); 
    	*/
    	
    	_needRefresh = false;
  		efgrid.submitInqu( "ef_grid_result", "ed", "EDFA51","initLoad");
  		_needRefresh = false;
  		efgrid.submitInqu( "ef_grid_uresult", "ed","EDFA51","initLoad");
  		ef.get("inqu_status-0-formEname").value = " ";
        ef.get("inqu_status-0-funcId").value = " ";
        
  	}
  	
}


//以下实现功能区域的级联下拉功能
/*
   在Grid中，当点击"功能标识"单元格时触发回调函数load_funcs
*/
efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index, 
	col_index, data_type )
{
	var grid = efgrid.getGridObject( grid_id );	
	if( col_index == 2 && data_type == TYPE_FIX )
	{
		load_funcs( row_index, grid.getCellValue( row_index, 1, TYPE_FIX  ) );
	}

}

/*
   在回调函数中调用后台service读取该页面下的所有功能区域
*/
load_funcs = function( row_index, formEname ) 
{
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{ 
				load_funcs_callback( row_index, eiInfo );
    		},
  		onFail: 
    		function(eMsg) 
			{
    			alert("服务调用失败: " + eMsg);
			}
	}; 	
	
	var ei_info = new EiInfo();	
	
	if(formEname == null || formEname == "")
		formEname = " ";
	ei_info.setByNameValue( "inqu_status-0-formEname", formEname );
	
	EiCommunicator.send( "EDFA53", "getFuncs" , ei_info, ajax_callback, false );
}

load_funcs_callback = function( row_index, eiInfo )
{
	/*
	var block = eiInfo.getBlock( "funcs" );
	
	if( !isAvailable( block ) || block.getRows().length <=0 )
	{
		return;
	}*/	
	
	var grid = efgrid.getGridObject( "ef_grid_dresult" );
	var column = grid.getColumn( 2, TYPE_FIX );	
	column.prepareData( eiInfo );
	
	grid.setCellValue( row_index, 2, "", TYPE_FIX  );
	grid.refreshCell( row_index, 2 , TYPE_FIX );
}


