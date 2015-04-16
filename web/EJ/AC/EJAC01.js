/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ej","EJAC01","query");
}
/*
  清空从表中数据    
*/
refreshparamgrid = function()
{
       grid = efgrid.getGridObject("ef_grid_param");	  
	   var count = grid.getRowCount();
  	   for(i=0;i<count;i++)
  	      grid.removeRow(i);
  	   grid.refresh();
}
/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{

    if(confirm(getI18nMessages("label.EJACConfirmDeleteWorkDefAndParamDef","此次操作将删除该作业定义和该作业下的所有参数定义，要继续吗？"))){
  	   efgrid.submitForm( "ef_grid_result", "ej","EJAC01","delete", true );
  	}
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ej","EJAC01","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ej","EJAC01","update",true );
}

/*
 点击主表里的主键字段触发的回调
*/
efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	if( grid_id == "ef_grid_result" )
	{
	   ef.get("param_inqu_status-0-paramEname").value = "";
	   ef.get("param_inqu_status-0-paramCname").value = "";
       ef.get("param_inqu_status-0-workEname").value = value;
       efgrid.submitInqu( "ef_grid_param", "ej", "EJAC01","queryParam");
	}
}

/*
  点击删除按钮后调用后台的service
*/
button_delete1_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_param", "ej","EJAC01","deleteParam", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert1_onclick = function () 
{
	efgrid.submitForm( "ef_grid_param", "ej","EJAC01","insertParam",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update1_onclick = function () 
{
	efgrid.submitForm( "ef_grid_param", "ej","EJAC01","updateParam",true );
}

/**
	grid单元格显示时，显示按钮信息。
*/
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
         var grid = efgrid.getGridObject( "ef_grid_result" );
         var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
         var workEname=grid.getCellValue(row_index,1,TYPE_FIX);
 
         if(columnEname=="asyOperate"){ 
              return "<div align='center' efval='' style='width:100%; position:relative; height:24px;'><input value='"+getI18nMessages("label.EJACAsyOperate","自助运行")+"' class='buttonclass' type='button' align='center' onclick='showWindowOfEJAC02(\""+workEname+"\")'></div>" ;
          }
       }
}

/**
	弹出自助运行页面
*/
showWindowOfEJAC02 = function(workEname){

    if(!workEname)
    {
       alert(getI18nMessages("label.EJACPleaseAddWorkInfomation","请先添加作业信息！"));
       return;
    }
    var inInfo = new EiInfo();
    inInfo.set("workEname", workEname);
	var childWindow = efform.openNewForm('EJAC02', "serviceName=EJAC02&methodName=getWorkInfo&workEname=" + workEname);
    childWindow.focus();
}

/*
  点击从表区域查询按钮后调用后台的service
*/
button_query1_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_param", "ej","EJAC01","query1");
}

button_start_onclick = function () 
{
	var inInfo = new EiInfo();
	var jobName = "test";
	var jobData = "serviceName=EEDM01,methodName=query,a=a1,b=a2";
	
    inInfo.set("jobName", jobName);
    inInfo.set("jobData", jobData);
	var childWindow = efform.openNewForm('EJAC03', "serviceName=EJAC03&methodName=startACParamJob&jobName=" + jobName + "&jobData=" + jobData);
    childWindow.focus();
}