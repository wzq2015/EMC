var userId;
//初始化

efform_onload = function (){
	var info=_getEi();
	userId = info.get("userId");
}
//点击查询按钮时候出发函数
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "EV","EV14","initLoad");
}

//点击新增按钮的时候触发函数
button_insert_onclick = function () 
{	
	var portalId=document.getElementById("portalId").value;
	if(portalId==''){
		alert("门户编码为空，不能修改");
		return;
	}
	var rtn = window.showModalDialog("DispatchAction.do?efFormEname=EV1401&inqu_status-0-insert=insert&portalId="+portalId);
	if(rtn=='true'){
		efgrid.submitInqu( "ef_grid_result", "EV","EV14","initLoad");
	}
	//efform.openNewForm('EV1401', "inqu_status-0-insert=insert&portalId="+portalId);
}
//点击修改按钮
button_update_onclick = function () 
{
	var time=new Date();
	var portalId=document.getElementById("portalId").value;
	if(portalId==''){
		alert("门户编码为空，不能修改");
		return;
	}
	grid = efgrid.getGridObject( "ef_grid_result" );
	if(grid.getCheckedRowCount()>1){
		alert("一次只能修改一条记录!");
	}else if(grid.getCheckedRowCount()<1){
		alert("请选择一条记录!");
	}else{
	 	rowcount_current=grid.getRowCount();
		for(j=0;j<rowcount_current;j++){
			row= grid.getRowData(j);
	   		if(grid.isRowChecked(j)){
	   			var rtn = window.showModalDialog("DispatchAction.do?efFormEname=EV1401&inqu_status-0-insert=insert&time="+time+"&"+jQuery.param({"query_treeEname":row["treeEname"]}) +"&"+jQuery.param({"query_nodeEname":row["nodeEname"]})+"&"+jQuery.param({"portalId":portalId}))
	   			if(rtn=='true'){
					efgrid.submitInqu( "ef_grid_result", "EV","EV14","initLoad");
				}
	   			//efform.openNewForm('EV1401',jQuery.param({"query_treeEname":row["treeEname"]}) +"&"+jQuery.param({"query_nodeEname":row["nodeEname"]})+"&"+jQuery.param({"portalId":portalId}));
	   		}
		}
	}
}

button_delete_onclick = function () 
{
	var portalId=document.getElementById("portalId").value;
	if(portalId==''){
		alert("门户编码为空，不能修改");
		return;
	}
	if(userId == "anonymous")
		efgrid.submitForm( "ef_grid_result", "EVCM","EVCM0501","delete", true );
    else if(userId == "default")
    	efgrid.submitForm( "ef_grid_result", "EVCM","EVCM0601","delete", true );
    else
   	    efgrid.submitForm( "ef_grid_result", "EV","EV14","delete", true );	
}



