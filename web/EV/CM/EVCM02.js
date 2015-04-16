var userId;
var flagadd;
//初始化
efform_onload = function (){
	var info=_getEi();
	userId = info.get("userId");
	
}
//点击查询按钮时候出发函数
button_query_onclick = function () 
{

	if(efvalidateDiv("ef_region_inqu")){
		efgrid.submitInqu( "ef_grid_result", "EVCM","EVCM02","query");
		 		
    }
}

//点击新增按钮的时候触发函数
button_insert_onclick = function () 
{
	//efform.openNewForm('EVCM1401', "inqu_status-0-insert=insert&userId="+userId);
	//efgrid.submitForm( "ef_grid_result", "EVCM","EVCM0201","insert", true );	
	efform.openNewForm('EVCM0201', null);
}
//点击修改按钮
button_update_onclick = function (id) 
{

	efform.openNewForm('EVCM0201',jQuery.param({"portletId":id}));
}

button_delete_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "EVCM","EVCM02","delete", true );
}

efform_onPopupReturn = function(winId, returnValue){
	
	if(winId == "EVCM03")
		efgrid.submitForm( "ef_grid_result_2", "EV","EVCM03","query");
	else 
		efgrid.submitForm( "ef_grid_result", "EV","EVCM02","query");
}

button_portletpara_onclick = function () 
{
  	var grid=efgrid.getGridObject("ef_grid_result");
    var rows=grid.getCheckedRows();
    var PortletId;
    if(rows.length!=1){
     	alert("请选中一条记录");
     	return;
    }
    else
    {
    	if(grid.getCellValue(rows[0],4,TYPE_DATA,false)=="2"){
    		alert("资源来源为内容管理Portlet无静态参数，请重新选择");
    		return;
    	}
    	else
     		PortletId= grid.getCellValue(rows[0],1,TYPE_FIX,false);   
    }
     	
	var childWindow = efform.openNewForm('EVCM09', "inqu_status-0-portletType=1&inqu_status-0-portletId="+PortletId);
	childWindow.focus();
}

//查询静态参数事件
//function efgrid_onRowClicked( grid_id, row_index ){
efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) {
	
	var tabId;
	if( grid_id == "ef_grid_result" && value!="")
	{
		var grid=efgrid.getGridObject("ef_grid_result");
	     if(grid.getCellValue(row_index,1,TYPE_DATA,false)=="2"){
	    		flagadd = false;
	    		
	    	}
	    	else {
	    	flagadd = true;
	    	}
      ef.get("inter_inqu_status-0-portletId").value = value;  
      ef.get("inter_inqu_status-0-portletType").value = '1';  
      efgrid.submitInqu( "ef_grid_inter", "ev","EVCM09","query");
	}
	
	
	if( grid_id == "ef_grid_result_2"&& value!="")
	{
		var grid=efgrid.getGridObject("ef_grid_result_2");
	     if(grid.getCellValue(row_index,3,TYPE_DATA,false)=="2"){
	    		flagadd = false;
	    	}else
	    	{
	    	tabId= grid.getCellValue(row_index,1,TYPE_FIX,false)
	    	flagadd = true;
	    	}
	  
      ef.get("inter_inqu_status-0-portletId").value = tabId;  
      ef.get("inter_inqu_status-0-portletType").value = '2';  
      efgrid.submitInqu( "ef_grid_inter_2", "ev","EVCM09","query");
	}
	
	
	
}

/*
  点击删除按钮后调用后台的service（静态参数）
*/
button_delete_i3_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_inter", "ev","EVCM09","delete", true,false); 	
}

/*
  点击新增按钮后调用后台的serviceECSM（静态参数）
*/
button_insert_i1_onclick = function () 
{ 
  	var grid=efgrid.getGridObject("ef_grid_inter");
  	var blockData = grid.getBlockData();
    var rows=grid.getCheckedRows();
    if(rows.length<1){
     	alert("请选中一条记录");
     	return;
    }
    else
    {
		for (var i = 0; i < grid.getRowCount(); i++ ) {
			if ( grid.isRowChecked(i) ) {
		    	var row=blockData.getRows()[i];
		    	row[0]=ef.get("inter_inqu_status-0-portletType").value;
		    	row[1]=ef.get("inter_inqu_status-0-portletId").value;
		    	for(var j=0; j< grid.getRowCount(); j++)
		    	{
		    		var rj=blockData.getRows()[j];
		    		if((j!=i)&&(rj[2]==row[2]))
		    		{
		    			alert("参数名称不能重复");
		    			return;
		    		}
		    	}
		    }
	    }
	}
	efgrid.submitForm( "ef_grid_inter", "ev","EVCM09","insert",true );
	//EiCommunicator.send( "ECTM10", "getUnitTypeCode" , info, null);
}

/*
  点击修改按钮后调用后台的service（静态参数）
*/
button_update_i2_onclick = function () 
{
	efgrid.submitForm( "ef_grid_inter", "ev","EVCM09","update",true );
}



button_query_tab_onclick = function () 
{
	if(efvalidateDiv("ef_region_inqu_2")){
    	efgrid.submitInqu( "ef_grid_result_2", "EVCM","EVCM03","query");
    	
    	
    }
}





button_insert_tab_onclick = function () 
{
	efform.openNewForm('EVCM0301', null);	
}




button_update_tab_onclick = function (tabId,id) 
{

	efform.openNewForm('EVCM0301',"portletId=" + jQuery.param({"portletId":id}) +"&"+jQuery.param({"tabId":tabId}));
	
	
	/*
	//efgrid.submitForm( "ef_grid_result", "EVCM","EVCM03","update", true );

	grid = efgrid.getGridObject( "ef_grid_result_2" );
	if(grid.getCheckedRowCount()>1){
		alert("一次只能修改一条记录!");
	}else if(grid.getCheckedRowCount()<1){
		alert("请选择一条记录!");
	}else{
	 	rowcount_current=grid.getRowCount();
		for(j=0;j<rowcount_current;j++){
			row= grid.getRowData(j);
	   		if(grid.isRowChecked(j)){
	   			//efform.openNewForm('EVCM0301',"portletId=" + row["portletId"]+"&tabId=" + row["tabId"]);
	   			efform.openNewForm('EVCM0301',"portletId=" + jQuery.param({"portletId":row["portletId"]}) +"&"+jQuery.param({"tabId":row["tabId"]}));
	   		}
		}
	}
//*/
}
button_delete_tab_onclick = function () 
{
    efgrid.submitForm( "ef_grid_result_2", "EVCM","EVCM03","delete", true );	
}




/*
  tab（静态参数）
*/
button_delete_i3_tab_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_inter_2", "ev","EVCM09","delete", true,false); 	
}

/*
  tab（静态参数）
*/
button_insert_i1_tab_onclick = function () 
{ 
  	var grid=efgrid.getGridObject("ef_grid_inter_2");
  	var blockData = grid.getBlockData();
    var rows=grid.getCheckedRows();
    if(rows.length<1){
     	alert("请选中一条记录");
     	return;
    }
    else
    {
		for (var i = 0; i < grid.getRowCount(); i++ ) {
			if ( grid.isRowChecked(i) ) {
		    	var row=blockData.getRows()[i];
		    	row[0]=ef.get("inter_inqu_status-0-portletType").value;
		    	row[1]=ef.get("inter_inqu_status-0-portletId").value;
		    	for(var j=0; j< grid.getRowCount(); j++)
		    	{
		    		var rj=blockData.getRows()[j];
		    		if((j!=i)&&(rj[2]==row[2]))
		    		{
		    			alert("参数名称不能重复");
		    			return;
		    		}
		    	}
		    }
	    }
	}
	efgrid.submitForm( "ef_grid_inter_2", "ev","EVCM09","insert",true );
	//EiCommunicator.send( "ECTM10", "getUnitTypeCode" , info, null);
}

/*
  tab（静态参数）
*/
button_update_i2_tab_onclick = function () 
{
	efgrid.submitForm( "ef_grid_inter_2", "ev","EVCM09","update",true );
}




efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{

  //多Grid时的检验
  if (grid_id == "ef_grid_result"){ 

  var grid = efgrid.getGridObject( grid_id );
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
  
  if(columnEname == "editProtlet") {
   var id = grid.getCellValue(row_index,1,TYPE_FIX);
   if(id != "")
  
 	return "\<input value='修改' align='center' class='buttonClass' type='button' onclick='button_update_onclick(\"" + id + "\")'>" ;
 	}
 	else if(columnEname=="referTab"){
 		var id = grid.getCellValue(row_index,1,TYPE_FIX);
 		return "<a onclick=\"showreferTab('"+id+"')\" href='#'> 相关TAB</a>";
 	}
 	
  }
  else if(grid_id == "ef_grid_result_2"){ 

   var gridTab = efgrid.getGridObject( grid_id );
  var columnEnametab = gridTab.getColumn(col_index, TYPE_DATA).getEname();
  
  if(columnEnametab == "editTab") {
   var tabId = gridTab.getCellValue(row_index,1,TYPE_FIX);
   var id =gridTab.getCellValue(row_index,2,TYPE_FIX);
   if(id != "" && tabId != "")
  
 	return "\<input value='修改' align='center' class='buttonClass' type='button' onclick='button_update_tab_onclick(\"" + tabId +  "\",\"" + id + "\")'>" ;
 	}
 	
  
  }
}

function showreferTab(id){

	ef.get("inqu_status-0-portletId_show").value=id;
	eftab_show("ef_tab_y",1);
	button_query_tab_onclick();
}



function efgrid_onGridDisplayReady( paintDivElement ){

		if("ef_grid_result" == paintDivElement.id){
			grid = efgrid.getGridObject("ef_grid_result");
			if(grid.getRowCount() > 0){
				efgrid_onFixCellClick("ef_grid_result",0,null,grid.getCellValue(0,1,TYPE_FIX));
			}
		}
		if("ef_grid_result_2" == paintDivElement.id){
		grid = efgrid.getGridObject("ef_grid_result_2");
			if(grid.getRowCount() > 0){
				efgrid_onFixCellClick("ef_grid_result_2",0,null,grid.getCellValue(0,1,TYPE_FIX));
			}
		}
}

efgrid_onAddNewRow = function(grid_id) {

if (grid_id == "ef_grid_result") {
	    button_insert_onclick();
		return false;
	}
if (grid_id == "ef_grid_result_2") {
	    button_insert_tab_onclick();
		return false;
	}

if (grid_id == "ef_grid_inter" && flagadd ==false){
	alert("资源来源为内容管理Portlet无静态参数，请重新选择");
	    		return false;
	}

if (grid_id == "ef_grid_inter_2" && flagadd ==false){
	alert("资源来源为内容管理Tab无静态参数，请重新选择");
	    		return false;
	}


return true;
}
