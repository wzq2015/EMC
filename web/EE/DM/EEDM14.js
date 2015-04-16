
/*
	日历框点击时的触发函数，主要配置日历的显示格式
*/
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyy/mm/dd', true);
}

/*
	公司信息的查询
*/
button_query_onclick = function (){
	efgrid.submitInqu( "ef_grid_result", "EE","EEDM14","query",true);

}

button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "EE","EEDM09","insert",true );
}
/*
	删除公司主表信息
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "EE","EEDM14","delete", true );
}
/*
	修改公司信息
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "EE","EEDM14","update",true );
}

function efgrid_onRowClicked( grid_id, row_index ){
	 if("test_divwindowsubNode" == grid_id){
		grid = efgrid.getGridObject("test_divwindowsubNode");
		ef.get("inqu_status-0-countryCode").value = grid.getCellValue(row_index,0,TYPE_DATA);
		efwindow.hide();
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
	  grid.setServiceName( "EEDM14" );
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

      EiCommunicator.send( "EEDM14", "queryCountry", info, country_callback ,false,true );   

}
/*
	国家信息选择框 上的确定按钮被点击时，隐藏该div窗口
*/
efcascadeselect.ensure_onclick = function(){
	efwindow.hide();
}
/*
  保存查询条件的回调函数
*/
save_callback = {
      onSuccess : function(eiInfo){ 
                var info=eiInfo.get("info");
                if(info=='update')
                   alert("修改查询条件成功");
                else if(info=='insert')
                  alert("新增查询条件成功"); 
               },
      onFail   : function(eMsg){
                     alert("failure");
                  }
    }
/*
  点击保存查询条件按钮，调用后台的service
*/
button_savequery_onclick = function (){
    var iplat4jSName=ef.get("iplat4jSName").value;
    if(iplat4jSName.trim()=='')
    {
    alert("请输入查询条件名");
    return;
    }
    var info = new EiInfo();
    info.setByNode("ef_region_inqu");    
    var efFormEname=ef.get("efFormEname").value;
   info.set("efFormEname",efFormEname);
	EiCommunicator.send("EDSQ01","saveQuery",info,save_callback,false,true);

}
/*
  点击载入查询条件按钮，调用后台的service
*/
button_loadquery_onclick=function(){   
     var efFormEname=ef.get("efFormEname").value;
    var childWindow = efform.openNewForm('EDSQ02', "serviceName=EDSQ02&methodName=querySearch&inqu_status-0-pageNo=" + efFormEname+"&inqu_status-0-iplattag=false");
     childWindow.focus();
}
/*
  接收从EDSq02返回的EiInfo进行回填
*/
efform_onPopupReturn = function(winId, returnInfo){
    efform.fillDiv("ef_region_inqu", returnInfo,true );
}

