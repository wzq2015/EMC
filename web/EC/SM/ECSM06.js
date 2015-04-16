efform_onload = function ()
{
    //var siteId = parent.ef.get("inqu_status-0-siteId").value;
    //document.getElementById("siteId").value=siteId;
    //document.getElementById("nodeId").value=siteId;
    var siteId = ef.get("inqu_status-0-siteId").value;
	document.getElementById("nodeId").value=siteId;
}	

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ec","ECSM06","query",true,false);
}

/*
  点击启用按钮后调用后台的service
*/
button_start_onclick = function () 
{
	if(!confirm("是否执行启用操作？"))
	{
		return false;
	}
	document.getElementById("d-0-status").value = "00";
  	efgrid.submitForm( "ef_grid_result", "ec","ECSM06","updateStatus", true,false); 	
}

/*
  点击禁止按钮后调用后台的service
*/
button_stop_onclick = function () 
{
	if(!confirm("是否执行禁止操作？"))
	{
		return false;
	}
	document.getElementById("d-0-status").value = "01";
  	efgrid.submitForm( "ef_grid_result", "ec","ECSM06","updateStatus", true,false); 		
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
	if(!confirm("是否执行删除操作？"))
	{
		return false;
	}
  	efgrid.submitForm( "ef_grid_result", "ec","ECSM06","delete", true,false); 	
}

/*
  点击删除按钮后调用后台的service删除一条数据
*/
deleteCurrent = function (transId) 
{
	if(!confirm("是否执行删除操作？"))
	{
		return false;
	}
	document.getElementById("d-0-transId").value = transId;
  	efgrid.submitForm( "ef_grid_result", "ec","ECSM06","deleteOne", true,false); 	
}

/*
  点击保存按钮后调用后台的service
*/
button_save_onclick = function () 
{
	if(!confirm("是否保存当前数据？"))
	{
		return false;
	}

	var method = document.getElementById("d-0-flag").value;
 // 	efgrid.submitForm( "ef_grid_result", "ec","ECSM06",method, true,false); 	
 	var info = new EiInfo();
	info.setByNode("ef_region_inqu");
	info.setByNode("ef_region_detail");
  	EiCommunicator.send( "ECSM06", method , info, ajax_callback_save );
}

ajax_callback_save = {
	onSuccess :
   		function(eiInfo)
		{
			efgrid.submitForm( "ef_grid_result", "ec","ECSM06","query", true,false);
   		},
 		onFail:
   		function(eMsg)
		{
   			alert("链接失败，原因："+eMsg);
		}
};

//修改当前行数据
button_edit_onclick = function(row_index)
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
  	var status=grid.getCellValue(row_index,0,TYPE_DATA,false);
  	var transMode=grid.getCellValue(row_index,1,TYPE_DATA,false);
  	var transAddr=grid.getCellValue(row_index,2,TYPE_DATA,false);
  	var transId=grid.getCellValue(row_index,0,TYPE_DATA,true);
  	var siteId=grid.getCellValue(row_index,1,TYPE_DATA,true);
  	var accId=grid.getCellValue(row_index,2,TYPE_DATA,true);
  	var password=grid.getCellValue(row_index,3,TYPE_DATA,true);
	
	document.getElementById("d-0-flag").value="update";
	document.getElementById("d-0-status").value=status;
	document.getElementById("d-0-transMode").value=transMode;
	document.getElementById("d-0-transAddr").value=transAddr;
	document.getElementById("d-0-transId").value=transId;
	document.getElementById("d-0-siteId").value=siteId;
	document.getElementById("d-0-accId").value=accId;
	document.getElementById("d-0-password").value=password;
  	efwindow.show(null,"detailContent","center");
}

button_insert_onclick = function () 
{
	document.getElementById("d-0-flag").value="insert";
	efwindow.show(null,"detailContent","center");
	efform.clearDiv("detailContent");
	document.getElementById("d-0-siteId").value=document.getElementById("nodeId").value;
}

//渲染按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
      	var grid = efgrid.getGridObject( "ef_grid_result" );
      	var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      	var status=grid.getCellValue(row_index,0,TYPE_DATA,false);
      	var transMode=grid.getCellValue(row_index,1,TYPE_DATA,false);
      	var transAddr=grid.getCellValue(row_index,2,TYPE_DATA,false);
      	var transId=grid.getCellValue(row_index,0,TYPE_DATA,true);
      	var siteId=grid.getCellValue(row_index,1,TYPE_DATA,true);
      	var accId=grid.getCellValue(row_index,2,TYPE_DATA,true);
      	var password=grid.getCellValue(row_index,3,TYPE_DATA,true);
      	if(columnEname=="option"){   
    		return "\<input value='修改' class='buttonclass' type='button' align='center' onclick='button_edit_onclick(\""+row_index+"\")'><input value='删除' class='buttonclass' type='button' align='center' onclick='deleteCurrent(\""+transId+"\")'>" ;
      	}
      }
}

//测试链接按钮
button_testconnect_onclick = function()
{
	var info = new EiInfo();
	info.setByNode("ef_region_detail");
  	EiCommunicator.send( "ECSM06", "testconnect" , info, ajax_callback_test );
}

ajax_callback_test = {
	onSuccess :
   		function(eiInfo)
		{
			if(eiInfo.getMsg()!=null){
				alert(eiInfo.getMsg());
			}
   		},
 		onFail:
   		function(eMsg)
		{
   			alert("链接失败，原因："+eMsg);
		}
};

//关闭弹出框
button_close_onclick = function () 
{
	efform.clearDiv("detailContent");
	efwindow.hide(null,"detailContent","center");
}
