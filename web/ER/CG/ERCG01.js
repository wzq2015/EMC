var ercg01_modalWin;
var ercg01_isShow;

efform_onload = function ()
{
  ef.get("inqu_status-0-siteType").value=1;
  ercg01_modalWin  = new EFModalWindow('ercg01_progressWindow');
  ercg01_isShow = false;
};



efgrid_onGridDisplayReady = function(divnode){
	if(ercg01_isShow){
		ercg01_modalWin.hide();
		ercg01_isShow = false;
	}
};


/*
  点击同步按钮后调用后台的service
*/
button_tongbu_onclick = function () 
{
	 var grid = efgrid.getGridObject( "ef_grid_result" );
  	 var rows=grid.getCheckedRows();
   	if(rows.length<1){
     alert("请选中一条记录");
     return;
     }
   
	ercg01_modalWin.showProgressBar();
	ercg01_isShow = true;
	
  	efgrid.submitForm( "ef_grid_result", "ec","ERCG01","synchronize",true);
}



/*
  点击清空按钮后调用后台的service
*/
button_qingkong_onclick = function () 
{
    
 	var grid = efgrid.getGridObject( "ef_grid_result" );
  	 var rows=grid.getCheckedRows();
   	if(rows.length<1){
     alert("请选中一条记录");
     return;
     }
    var sure=confirm("确认清空?");
	if(sure){
		ercg01_modalWin.showProgressBar();
		ercg01_isShow = true;
		efgrid.submitForm( "ef_grid_result", "ec","ERCG01","clean",true);
	}
}

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "er","ERCG01","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "er","ERCG01","delete", true,false,true );
  	if(ajaxEi!=null){
  	  if(ajaxEi.get("tag")=="true"){
  	  alert("站点下面有栏目,不能删除");
  	  }
  	}
}

/*
  点击新增按钮后调用后台的serviceECSM
*/
button_insert_onclick = function () 
{  
  //  if(efvalidateDiv("ef_grid_result"))
	efgrid.submitForm( "ef_grid_result", "er","ERCG01","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "er","ERCG01","update",true );
	
}

/*
  点击文章查询按钮后调用后台的service
*/
button_display_onclick=function(){
   
   var grid = efgrid.getGridObject( "ef_grid_result" );
   var rows=grid.getCheckedRows();
   if(rows.length!=1){
     alert("请选中一条记录");
     return;
     }
   var value=grid.getCellValue(rows[0],1,TYPE_DATA,true); 
 
   var childWindow = efform.openNewForm('ECSM02', "serviceName=ECSM02&methodName=queryArticle&inqu_status-0-siteId=" + value);
   childWindow.focus();
}