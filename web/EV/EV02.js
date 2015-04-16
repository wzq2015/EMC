/**
页面初始化
*/
efform_onload = function () {
  //efregion.show("ef_region_page");
  //efregion.show("ef_region_tab");
}

/**
查看权限
*/
button_f1_onclick = function() {
  portlet_grid = efgrid.getGridObject("ef_grid_p");
  selected_portlet_count = portlet_grid.getCheckedRowCount();
  if(selected_portlet_count<1){
    alert("至少选择一条资源");
    return false;
  }else if(selected_portlet_count>1){
    alert("只能选择一条资源");
    return false;
  }else{
     selected_portlet_id_view = portlet_grid.getSelectRowsData()[0]["portletId"];
	 showAuthorization("TYPE_PT","portlet_"+selected_portlet_id_view);
  }
}

/**
显示资源授权信息
type：资源类型
target：资源ID
*/
showAuthorization = function (type, target){
  //document.getElementById("inqu_status-target").value=target;  
  //document.getElementById("inqu_status-type").value=type;  
  ef.get("inqu_status-0-target").value=target;  
  ef.get("inqu_status-0-type").value=type;  
  efgrid.submitInqu( "ef_grid_c", "es","ES50","query");
}


/**
删除权限
*/
button_f3_onclick = function() 
{
  efgrid.submitForm( "ef_grid_c", "es","ES50","delete", true );
}

/**
选择用户
*/
button_f4_onclick = function() 
{
  efform.openNewForm("ESUT10", "chooseType=POST,PSTP&&efFormPopup=1");
}
/**
批量授权
*/
button_f5_onclick = function() {
  var sel = getSelection();
  if ( sel == "" ){
    alert( "请选中需要授权的Portlet资源!" );
    return;
  }
  //判断是否选择用户
  if(efgrid.getGridObject("ef_grid_r").getCheckedRowCount()<1){
    alert( "请选中需要授权的用户!" );
    return;
  }
  document.getElementById("inqu_status-0-authorize").value = sel;    
  efgrid.submitForm( "ef_grid_r", "es","ES50","insert", true );   
  page_grid = efgrid.getGridObject("ef_grid_p");
  page_grid._clearSelect();
  page_grid.refresh();  	
  
}

/**
删除用户
*/
button_f6_onclick = function(){
	var grid = efgrid.getGridObject("ef_grid_r");
	var rowLength = grid.getCheckedRows().length;
	for(i=rowLength-1;i>=0;i--){
		grid.removeRow(grid.getCheckedRows()[i]);
	}
	grid.refresh();	
	efform.setStatus(0,"删除"+rowLength+"条记录成功!");
}

/**
获取选择的portlet资源ID串
*/
function getSelection(){
  var auths = [];
  var page_grid = efgrid.getGridObject("ef_grid_p");
  var rows = page_grid.getSelectRowsData();
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];
    auths.push("TYPE_PT|");//TYPE_PT表示门户资源类型(epass规范)
    auths.push("portlet_"+row["portletId"]);//portlet资源label格式“portlet_”和portletId组成
    auths.push(",");
  }
  return auths.join('');
}





efform_onPopupReturn = function(eform, rows){    
  var grid = efgrid.getGridObject( "ef_grid_r" ); 
  var tempArray = new Array();
  //rows元数据：className：类型名称；clazz：类型标签；id：标识；label：标签；name：名称
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];  
    var uc = {};
    uc.clazz = row["clazz"];
    uc.clazzName = row["className"];
    uc.identity = row["id"];
    uc.desc = row["name"];
    tempArray.push(uc);
  }
  grid.addRowData(tempArray, false );
  grid.refresh();
}


/*
//对tab进行授权
efgrid_onRowClicked = function (id ,row_index){
  var grid = efgrid.getGridObject(id);
  if ( id == "ef_grid_p" ){     
    cell_value = grid.getCellValue( row_index, 0 );
    //使用ajax获取tab信息
    info = new EiInfo();
    info.set("portletId",cell_value);
	EiCommunicator.send("EVCM03", "queryTabByPortletId", info,onQueryTabByPortletId_callback);
  }
}

var onQueryTabByPortletId_callback = {
	onSuccess : function(eiInfo) {
		grid = efgrid.getGridObject( "ef_grid_t" ); 
		grid._clearSelect();
		//grid.setData(eiInfo);
		grid.addRowData(eiInfo.getBlock("result").getRows(),true);
		grid.refresh();
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}
*/
