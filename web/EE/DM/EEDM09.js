/*
	页面加载时的回调 页面加载时查询公司信息
*/
efform_onload = function ()
{
	button_query_onclick();

}
/*
	日历框点击时的触发函数，主要配置日历的显示格式
*/
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyy/mm/dd', true);
}

efcalendarSpan_click = function (control_source, idStart,idEnd) {
  var nodeStart = ef.getNodeById(idStart);
  var nodeEnd = ef.getNodeById(idEnd);
  efcalendarSpan(control_source, nodeStart,nodeEnd,'yyyy/mm/dd', true);
}
/*
	公司信息的查询
*/
button_query_onclick = function (){
	efgrid.submitInqu( "ef_grid_result", "EE","EEDM09","query",true);

}
/*
	grid显示之前的回调 实现设置当前行为第一行
	该功能也可以在grid里配置 ，效果是一样的
	<EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_result"
	ajax="true" serviceName="EEDM09" queryMethod="query" style="initSelect:true">
*/
function efgrid_onGridDisplayReady( paintDivElement ){
		if("ef_grid_result" == paintDivElement.id){
			grid = efgrid.getGridObject("ef_grid_result");
			if(grid.getRowCount() > 0){
				grid.setCurrentRowIndex(0);
			}
		}
}

/*
	grid行点击时的回调函数
	当grid为公司主表的grid时改功能主要是把公司主表的内容放到明细表的子表信息中显示
	产品从表显示该公司的产品信息
	当grid为国家代号查询的弹出div中的grid时，把当前选中的国家代号放入国家输入框中
*/
function efgrid_onRowClicked( grid_id, row_index ){
	if("ef_grid_result" == grid_id){
	//设置明细信息
	    grid = efgrid.getGridObject("ef_grid_result");
	    var company_code = grid.getCellValue(row_index,0,TYPE_DATA);
	    var eiinfo = new EiInfo();
		eiinfo.set("companyCode",company_code);
		var ajax_callback = efform.getSystemAjaxCallback( "ef_region_result2" );
        EiCommunicator.send( "EEDM09", "queryCompany", eiinfo, ajax_callback);
	// 查询公司从表信息

		companyId = grid.getCellValue(row_index,0,TYPE_DATA);
		ef.get("inqu_status-0-productCompanyCode").value = companyId;
		ef.get("rowIndex").value = row_index;
		button_query3_onclick();
	}else if("test_divwindowsubNode" == grid_id){
		grid = efgrid.getGridObject("test_divwindowsubNode");
		ef.get("inqu_status-0-countryCode").value = grid.getCellValue(row_index,0,TYPE_DATA);
		efwindow.hide();
	}

}

/*
	根据公司主表的当前选择公司，查询产品从表信息
*/
button_query3_onclick = function (){
	efgrid.submitInqu( "ef_grid_result3", "EE","EEDM09","queryProduct",true);

}
/*
	删除公司主表信息
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "EE","EEDM09","delete", true );
}
/*
	删除产品从表信息
*/
button_delete3_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result3", "EE","EEDM09","deleteProduct", true );
}

/*
	插入公司主表信息
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "EE","EEDM09","insert",true );
}

/*
	 插入产品从表信息
*/
button_insert3_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result3", "EE","EEDM09","insertProduct",true );
}
/*
	修改公司信息
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "EE","EEDM09","update",true );
}

/*
	修改产品从表信息
*/
button_update3_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result3", "EE","EEDM09","updateProduct",true );
}

/*
	公司明细信息修改
*/
button_update2_onclick = function ()
{
	var ajax_callback =
	{
		onSuccess :
    		function(eiInfo)
			{
				//efform.setStatus(-1,"修改的明细信息成功!");
				var row_index = parseInt(eiInfo.get("rowIndex"));
				grid = efgrid.getGridObject("ef_grid_result");
				grid.setCellValue(row_index,0,ef.get("result2-0-companyCode").value,TYPE_DATA);
				grid.setCellValue(row_index,1,ef.get("result2-0-companyName").value,TYPE_DATA);
				grid.setCellValue(row_index,2,ef.get("result2-0-companyTel").value,TYPE_DATA);
				grid.setCellValue(row_index,3,ef.get("result2-0-companyAddr").value,TYPE_DATA);
				grid.setCellValue(row_index,4,ef.get("result2-0-countryCode").value,TYPE_DATA);
				grid.setCellValue(row_index,5,ef.get("result2-0-companyDate").value,TYPE_DATA);
				grid.refreshCell( row_index, 0 , TYPE_DATA );
				grid.refreshCell( row_index, 1 , TYPE_DATA );
				grid.refreshCell( row_index, 2 , TYPE_DATA );
				grid.refreshCell( row_index, 3 , TYPE_DATA );
				grid.refreshCell( row_index, 4 , TYPE_DATA );
				grid.refreshCell( row_index, 5 , TYPE_DATA );
    		},
  		onFail:
    		function(eMsg)
			{
    			alert("服务调用失败: " + eMsg);
			}
	};

	if(ef.get("result2-0-companyCode").value == ""){
		efform.setStatus(-1,"没有可修改的明细信息!");
	}else{
		var info = new EiInfo();

		info.setById("result2-0-companyCode");
		info.setById("result2-0-companyName");
		info.setById("result2-0-companyTel");
		info.setById("result2-0-companyAddr");
		info.setById("result2-0-countryCode");
		info.setById("result2-0-companyDate");
		info.setById("rowIndex");
	  	EiCommunicator.send( "EEDM09", "updateCompany", info, ajax_callback );
  	}

}

/**
	grid单元格显示时的回调，是否生产用checkbox显示
*/
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ,grid_id)
{
  if("ef_grid_result3" == grid_id){
	  switch( col_index ){
	     case 4:

	          var html = "";
	          if(display_value =='1'){
	          	html = "<div align=center><input hidefocus='-1' type='checkbox' checked onclick='setProducted("+row_index+",this.checked);'/></div>";
	          }else {
	           	html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setProducted("+row_index+",this.checked)'/></div>";
	          }
	          return html;
	    default:
	  }
  }

}

/*
	产品是否生产checkbox点击时的触发函数
*/
setProducted = function(row_index,flage){

	var grid = efgrid.getGridObject("ef_grid_result3");
	var is_producted = grid.getCellValue(row_index, 4, TYPE_DATA);

	if(flage){
		grid.setCellValue(row_index, 4, '1',TYPE_DATA);
	}else{
		grid.setCellValue(row_index, 4, '0',TYPE_DATA);
	}
}

/**
	国家信息subgrid选择框的回调函数
*/
country_callback = {
      onSuccess : function(eiInfo){

	var divwindow = document.getElementById("test_divwindow");
	  efwindow.hide();
   	  var style_config = new Object();
	  style_config["operationBar"] = "true";
	  var grid = new efgrid("result",divwindow.id+"subNode");
	  var custom_cols = {"index":{},"metas":[]};
	  grid.setEnable( false );
	  grid.setReadonly( true );
	  grid.setAjax( true );
	  grid.setAutoDraw( true );
	  grid.setServiceName( "EEDM09" );
	  grid.setQueryMethod( "queryCountry" );
	  grid.setCustomColumns( custom_cols );
	  grid.setData( eiInfo );

	  grid.setStyle( style_config );
	  for(i=grid.dataColumns.length;i>=1;i--){
	  	column = grid.getColumn( i-1, TYPE_DATA );
	  	column.set( "width", 300/grid.dataColumns.length);
	  }
	  grid.paint();

	  efwindow.show(document.getElementById("inqu_status-0-countryCode"),divwindow.id,"fixed");      				;
                  },
      onFail    : function(eMsg){
                     alert("failure");
                  }
    }
/*
	国家信息输入框后图标被选择时的触发函数
*/
function show_divwindow(){
      var info = new EiInfo();
      info.set("countryCode",ef.get("inqu_status-0-countryCode").value);
      var divWindow = efcascadeselect.createDivWindow( "test_divwindow", "efwindow","选择国家代号信息",350,270,"","关闭");
      efwindow.show(ef.get("inqu_status-0-countryCode"),"test_divwindow_ajax_loading");

      EiCommunicator.send( "EEDM09", "queryCountry", info, country_callback ,false,true );

}
/*
	国家信息选择框 上的确定按钮被点击时，隐藏该div窗口
*/
efcascadeselect.ensure_onclick = function(){
	efwindow.hide();
}

