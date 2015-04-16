var fkey = "";

efform_onload = function ()
{
  efbutton.setButtonStatus("F6", false);
  ef.get("edfa00DeleteButton").value = "";
  //efregion.show("ef_region_inqu");
  //efregion.toggleShow("ef_region_inqu");
}

button_f2_onclick = function () 
{
    //debugger;
    var node = ef.getNodeById("efFormTime");
    var dd = new Date();
    node.value =  dd.getYear() + "-" + (dd.getMonth() + 1) + "-" + (dd.getDay() + 1) + "-" + dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "-" + dd.getMilliseconds();
	
    if (efvalidateForm(ef.get("EDFA00"))) {
      efgrid.submitInqu( "ef_grid_result", "ed","EDFA00","query");
    }
	
}

button_generatei18nresources_onclick = function () 
{
    //debugger;
    var node = ef.getNodeById("efFormTime");
    var dd = new Date();
    node.value =  dd.getYear() + "-" + (dd.getMonth() + 1) + "-" + (dd.getDay() + 1) + "-" + dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "-" + dd.getMilliseconds();
	
    if (efvalidateForm(ef.get("EDFA00"))) {
    	var info = new EiInfo(); 
    	info.setByNodeObject( document.forms[0] );

    	EiCommunicator.send("EDFA00", "generateI18nResources", info, null);
    }   
}

button_ajax_linked_onclick = function ()
{
	var info = new EiInfo();
	info.setById("inqu_status-0-form_ename");
//	info.setByNode("ef_region_inqu");
	EiCommunicator.send("EDFA00","query",info,button_ajax_linked_onclick_callback );
}

var button_ajax_linked_onclick_callback = {
	onSuccess :
		function(eiInfo){
			var block = eiInfo.getBlock("result");
			if(block.getRows().length >= 1){
				for(i = 0;i<block.getRows().length;i++)
					if(block.getCell(i,"form_ename") == ef.getNodeById("inqu_status-0-form_ename").value.toUpperCase()){
						ef.getNodeById("inqu_status-0-form_cname").value = block.getCell(i,"form_cname");
						break;
						}
					else 
						ef.getNodeById("inqu_status-0-form_cname").value = "";
				}
			else	
				ef.getNodeById("inqu_status-0-form_cname").value = "";	
		},
  onFail    : 
    function(eMsg) {
      alert("failure");
    }		
}
    
button_f3_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDFA00","update",true );
}

button_f4_onclick = function () 
{
	if(confirm('是否需要删除页面对应的按钮？')) {
		ef.get("edfa00DeleteButton").value = "true";
	} else {
		ef.get("edfa00DeleteButton").value = "";
	}
	
  	efgrid.submitForm( "ef_grid_result", "ed","EDFA00","delete", true );
}

button_f5_onclick = function ()
{
  //efgrid.submitForm( "ef_grid_result", "ed","EDFA00","synchronizeEpass", true );
	if(confirm('确定要设置所有符合查询条件的页面能授权吗？'))
		efgrid.submitForm( "ef_grid_result", "ed","EDFA00","authAll", true );
	else 
		return null;
		
} 

button_f6_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ed","EDFA00","insert",true );
}

//复用query方法，通过改变formename属性来跳向下载页面，
//但是复用query方法可能导致下载逻辑定制化困难，可能需要额外的参数来指明与query方法的区别
button_export2_onclick = function () 
{
	//win = efform.openNewForm("EU00","serviceName=EDFA00&methodName=query");
	//location.href="DispatchAction.do?efFormEname=EU00&serviceName=EDFA00&methodName=query";
	ef.getNodeById("efFormEname").value = "EU00";
    efgrid.submitInqu( "ef_grid_result", "ed","EDFA00","query");
    ef.getNodeById("efFormEname").value = "EDFA00";
      
}

//通过实现独立的方法来提供下载的数据，并且在方法中指定render跳向下载页面
//便于下载逻辑的定制，但需要实现额外的方法
button_export_onclick = function () 
{
	//win = efform.openNewForm("EU00","serviceName=EDFA00&methodName=query");
	//location.href="DispatchAction.do?efFormEname=EU00&serviceName=EDFA00&methodName=query";

      efgrid.submitInqu( "ef_grid_result", "ed","EDFA00","export");
      efbutton.setButtonStatus("export", true);
      efform.setStatus(0, "结束执行导出操作!");
      
}

//sql语句生成
button_sql_onclick = function () 
{
	//win = efform.openNewForm("EU00","serviceName=EDFA00&methodName=query");
	//location.href="DispatchAction.do?efFormEname=EU00&serviceName=EDFA00&methodName=query";


      efgrid.submitForm( "ef_grid_result", "ed","EDFA00","exportSql",true);
      efbutton.setButtonStatus("sql", true);
      efform.setStatus(0, "结束执行sql生成!");
      //使第二次以及以后的导出 正确
      if(!!ef.get("ef_grid_result_submit"))
      	ef.get("ef_grid_result_submit").parentNode.removeChild(ef.get("ef_grid_result_submit"));
      
}

efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}


efgrid_cellclick = function( grid_id, row_index, col_index, value ) 
{
}

//设置是否"分级授权"属性
setHierarchy = function(row_index, col_index, flage){

	var grid = efgrid.getGridObject("ef_grid_result");

	if(flage){
		grid.setCellValue(row_index, col_index, 'true',TYPE_DATA);
	}else{
		grid.setCellValue(row_index, col_index, 'false',TYPE_DATA);	
	}
}

setAllGrade = function (node){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(i=0;i<=grid.getRowCount()-1;i++){
		grid.getBlockData().setCell(i,"is_grade",node.checked+"");
	}
	grid.refresh();
}

setAllAuth = function (node){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(i=0;i<=grid.getRowCount()-1;i++){
		grid.getBlockData().setCell(i,"is_auth",node.checked+"");
	}
	grid.refresh();
}

//设置是否"授权"属性
setAuth = function(row_index, col_index, flage){

	var grid = efgrid.getGridObject("ef_grid_result");

	if(flage){
		grid.setCellValue(row_index, col_index, 'true',TYPE_DATA);
	}else{
		grid.setCellValue(row_index, col_index, 'false',TYPE_DATA);	
	}
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
  //多Grid时的检验
  if (grid_id != "ef_grid_result") return;
  var grid = efgrid.getGridObject( grid_id );
  if(!grid.getColumn(col_index, TYPE_DATA))
	  return;
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();

  switch (columnEname) {
     case "is_grade":
       //设置对”分级授权“属性checkbox
       var html = "";
       if (display_value == 'true'){
         html = "<div align=center><input hidefocus='-1' class='efgrid-cell' type='checkbox' checked onclick='setHierarchy("+row_index+","+col_index+",this.checked);'/></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setHierarchy("+row_index+","+col_index+",this.checked)'/></div>";
       }
       return html;
       
     case "is_auth":
       //设置对”授权“属性checkbox
       var html = "";
       if (display_value == 'true'){
         html = "<div align=center><input hidefocus='-1' class='efgrid-cell' type='checkbox' checked onclick='setAuth("+row_index+","+col_index+",this.checked);'/></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' class='efgrid-cell' type='checkbox' onclick='setAuth("+row_index+","+col_index+",this.checked)'/></div>";
       }
       return html;  
       break;    
  }
}

efgrid_onGridDisplayReady = function( div_node )
{
}

efgrid_onAddNewRow = function( grid_id )
{
  if(grid_id == "ef_grid_result" )
  {
	 efbutton.setButtonStatus("F6", true);
	 efbutton.setButtonStatus("F3", false);
  }
  else if(grid_id == "ef_grid_inter" )
  {
  	var grid = efgrid.getGridObject(grid_id); 	
  	var fproviderkeyColumn = grid.getInvisibleColumn( 0, TYPE_FIX );
	fproviderkeyColumn.set("defaultValue", "message");
	var fKeyColumn = grid.getColumn(1, TYPE_FIX);
	fKeyColumn.set("defaultValue", "E_Form." + fkey);
	fKeyColumn.set("enable", false);
  }
  return true;  
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	if( col_index >0 )
	{
        var node = ef.getNodeById("efFormPopup");
		if (node.value == "1") {
		  window.opener.efform_onPopupReturn(value);
		  
		  window.close();
		}
	}
}

openSubGrid = function ()
{
  var inInfo = new EiInfo();
  //设置查询条件
  inInfo.setByNode("ef_div_inqu");
  
  var bindingInputId = "inqu_status-0-form_ename";
  var serviceName = "EDFA00";
  var queryMethod = "query";
  
  EiCommunicator.send(serviceName, queryMethod, inInfo);
  if (ajaxEi == null) return;
  
  var subGridColumn = new efSubgridColumn();
  var eiColumn = new EiColumn(bindingInputId);
  
  //指定数据返回块
  eiColumn.blockName = "result";
  
  subGridColumn.setEiMeta({}, eiColumn);
  subGridColumn.set("serviceName", serviceName);
  subGridColumn.set("queryMethod", queryMethod); 
  
  //预选定的列名称
  subGridColumn.set("valueProperty", "form_ename");
     
  var div = efform.getSubGridDiv();
  div.efDisplayCol = subGridColumn;
  efform.showSubGridWindow(bindingInputId, ajaxEi);
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	if( grid_id == "ef_grid_result" )
	{
       ef.get("inter_inqu_status-0-fkey").value = "E_Form." + value;

       fkey = value;
       efgrid.submitInqu( "ef_grid_inter", "ed", "EDFA00","queryInter");
	}
}

button_f7_onclick = function () 
{
	efgrid.submitForm( "ef_grid_inter", "ed","EDFA00","insertInter",true );
}

button_f8_onclick = function () 
{
	efgrid.submitForm( "ef_grid_inter", "ed","EDFA00","updateInter",true );
}

button_f9_onclick = function () 
{
	efgrid.submitForm( "ef_grid_inter", "ed","EDFA00","deleteInter",true );
}

button_generate_onclick = function ()
{
	if(fkey == "")
	{
		alert("请选择一个页面");
	}
	else
	{
	   ef.get("inter_inqu_status-0-fkey").value = fkey;
       efgrid.submitForm( "ef_grid_inter", "ed", "EDFA00","generateInter",true);
	}
}
