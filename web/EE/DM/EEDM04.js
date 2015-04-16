
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
    if (efvalidateForm(ef.get("EEDM04"))) {
	    efgrid.submitInqu( "ef_grid_result", "ee","EEDM04","query",true);
	 }
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM04","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM04","update",true );
}

/*清空国家下拉框中的数据*/
clearSelectCountry = function()
{
  obj = document.getElementById("inqu_status-0-countryCode");
  for(i=obj.options.length-1 ; i>= 0 ; i--)
     obj.options[i] = null;
}

/*
  在洲下拉框中选择数据时触发的函数，要求国家下拉框的值随洲下拉框选择项的改变而改变
*/
getCountryOfContinent = function()
{
    var continent_code = ef.get("inqu_status-0-continentCode").value;
    var eiinfo = new EiInfo();
	eiinfo.set("continentCode",continent_code);
    EiCommunicator.send( "EEDM04", "getCoutryOfContinent", eiinfo, ajax_getCountryOfContinent_callback, false );
}

/*
  在ajax的后台回调函数中获取了该洲下的所有国家记录后，将国家下拉框的数据填充好
*/
var ajax_getCountryOfContinent_callback = {
  onSuccess :
    function(eiInfo){
      clearSelectCountry();//先清空下拉框数据
      var eiBlock = eiInfo.getBlock("country");
      var objOption = new Option("全部","");
      ef.get("inqu_status-0-countryCode").options[ef.get("inqu_status-0-countryCode").options.length]=objOption;
      for(i=0;i<eiBlock.getRows().length;i++){
         strName = eiBlock.getCell(i,"countryName");
         strValue = eiBlock.getCell(i,"countryCode");
         var objOption = new Option(strName,strValue);
         ef.get("inqu_status-0-countryCode").options[ef.get("inqu_status-0-countryCode").options.length]=objOption;
        }
    },
  onFail    :
    function(eMsg) {
    }
}

/*
   在Grid中，当焦点离开"所在洲"单元格时触发回调函数load_country
*/
efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index,
	col_index, data_type )
{
	var grid = efgrid.getGridObject( grid_id );
	if( col_index == 4 && data_type == TYPE_DATA )
	{
		load_country( row_index, grid.getCellValue( row_index, 3, TYPE_DATA  ) );
	}

}

/*
   在回调函数中调用后台service读取该洲下的所有国家信息
*/
load_country = function( row_index, continentCode )
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
	ei_info.setByNameValue( "continentCode", continentCode );

	EiCommunicator.send( "EEDM04", "getCoutryOfContinent" , ei_info, ajax_callback );
}

load_country_callback = function( row_index, eiInfo )
{
    var grid = efgrid.getGridObject( "ef_grid_result" );
    var column = grid.getColumn( 4, TYPE_DATA );
	column.prepareData( eiInfo );

	var block = eiInfo.getBlock( "country" );
/*	if( !isAvailable( block ) || block.getRows().length <=0 )
	{
	    grid.setCellValue( row_index, 4, "", TYPE_DATA  );
	    grid.refreshCell( row_index, 4 , TYPE_DATA );
		return;
	}
*/
	grid.setCellValue( row_index, 4, "", TYPE_DATA  );
	grid.refreshCell( row_index, 4 , TYPE_DATA );
}

/*
efgrid_onDataCellSaved = function( grid_id, row_index, col_index, cell_value )
{
	var grid = efgrid.getGridObject( grid_id );

	if( col_index == 3 )
	{
		grid.setCellValue( row_index, 4, "", TYPE_DATA  );
		grid.refreshCell( row_index, 4 , TYPE_DATA );
	}

}
*/

/*
 点击主表里的主键字段触发的回调
*/
efgrid_onFixCellClick = function( grid_id, row_index, col_index, value )
{
    var ajax_callback =
	{
		onSuccess :
    		function(eiInfo)
			{
				 var eiBlock = eiInfo.getBlock("detail");
			 	if( !isAvailable( eiBlock ) || eiBlock.getRows().length <=0 )
				{
					return;
				}
				 var company_name = eiBlock.getCell(0,"companyName");
				 var company_code = eiBlock.getCell(0,"companyCode");
                 alert("该公司["+company_code+"]"+"的名称为:["+company_name+"]");

    		},
  		onFail:
    		function(eMsg)
			{
    			alert("服务调用失败: " + eMsg);
			}
	};
	if( grid_id == "ef_grid_result" )
	{
        var eiinfo = new EiInfo();
		eiinfo.set("companyCode",value);
        EiCommunicator.send( "EEDM04", "getDetailOfCompany", eiinfo, ajax_callback);
	}
}
