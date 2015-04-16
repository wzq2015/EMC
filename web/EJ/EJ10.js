button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_rjob", "","iplat4j_JobService","jobList");
}

button_f3_onclick = function () 
{
 	if(have_check("ef_grid_rjob")){
	  if(confirm(getI18nMessages("label.EJConfirmCreateRecord","确实要创建记录?"))){
		efgrid.submitForm( "ef_grid_rjob", "","iplat4j_JobService","jobCreate",true,true );
	  }
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}


button_f4_onclick = function () 
{
 	var isNewLine = check_newLine("ef_grid_rjob");
 	if(isNewLine){
	  alert(getI18nMessages("label.EJPleaseEditAfterSaveJob","请保存该任务后再进行编辑操作！"));
	  return;
	}
	if(have_check("ef_grid_rjob")){
	 	if(confirm(getI18nMessages("label.EJConfirmEditRecord","确实要编辑记录?"))){
		  efgrid.submitForm( "ef_grid_rjob", "","iplat4j_JobService","jobUpdate", true,true );
		}
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}

button_f5_onclick = function () 
{
	var isNewLine = check_newLine("ef_grid_rjob");
 	if(isNewLine){
	  alert(getI18nMessages("label.EJPleaseDeleteAfterSaveJob","请保存该任务后再进行删除操作！"));
	  return;
	}
	if(have_check("ef_grid_rjob")){
		if(confirm(getI18nMessages("label.EJConfirmDeleteRecord","确实要删除记录?"))){
		  efgrid.submitForm( "ef_grid_rjob", "","iplat4j_JobService","jobDelete", true,true );
		}
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}

button_f6_onclick = function () 
{
	var isNewLine = check_newLine("ef_grid_rjob");
 	if(isNewLine){
	  alert(getI18nMessages("label.EJPleaseOperateAfterSaveJob","请保存该任务后再进行操作！"));
	  return;
	}
	if(have_check("ef_grid_rjob")){
		if(confirm(getI18nMessages("label.EJConfirmExecuteThisAsynJob","确实要异步执行此任务?"))){
		  efgrid.submitForm( "ef_grid_rjob", "","iplat4j_JobService","jobExecute", true,true );
		}
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}

button_f7_onclick = function () 
{
	var isNewLine = check_newLine("ef_grid_rjob");
 	if(isNewLine){
	  alert(getI18nMessages("label.EJPleaseOperateAfterSaveJob","请保存该任务后再进行操作！"));
	  return;
	}
	if(have_check("ef_grid_rjob")){
		if(confirm(getI18nMessages("label.EJConfirmCleanAllTriggers","确实要清除所有触发器吗?"))){
		  efgrid.submitForm( "ef_grid_rjob", "","iplat4j_JobService","jobUnschdule", true,true );
		}
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}

efgrid_onAjaxSubmitSuccess = function(gridId, service_name, method_name, eiInfo)
{
	if(method_name=="jobList"){
		var ef_grid = efform.getGrid( gridId );	 
  	ef_grid.refresh( eiInfo );
	}else{
	   if ( eiInfo.getMsg() != null )
		  alert(eiInfo.getMsg());
		button_f2_onclick();
	}
}	

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  var grid = efgrid.getGridObject( "ef_grid_rjob" );
  switch( col_index ){
    case 4:
         return "\<input value='"+getI18nMessages("label.EJDefineTrigger","定义触发器")+"' class='buttonclass' type='button' onclick='defineTrigger("+ row_index  +" )'>" ;
  }  
}

defineTrigger = function( row_index ){
  var grid = efgrid.getGridObject( "ef_grid_rjob" );
  if(grid.isNewLine(row_index)==1){
  	alert(getI18nMessages("label.EJPleaseDefineTriggerAfterSaveJob","请保存该任务后再进行其触发器定义操作！"));
  	return;
  }
  var jobName = grid.getCellValue( row_index, 1,TYPE_FIX );
  window.location.href="DispatchAction.do?efFormEname=EJ11&serviceName=iplat4j_JobService&methodName=triggerList&qtrigger-0-jobName="+ jobName ;
}

efform_onload = function ()
{
    //2012-10-12 liwei 增加充当子页面逻辑    
	if(ef.get("qjob-0-jobName").value!="")
	{		
		$("#qjob-0-jobName").attr("disabled","disabled").css({ "color":"#ccc"});
	}
	
	efform.setPageTitle("EJ10/"+getI18nMessages("label.EJJobManagerPage","任务管理页面"));
	efregion.show("ef_region_qjob");
	var ef_region_qjob_buttonbar = new efbuttonbar();
	ef_region_qjob_buttonbar.buttonCount = 1;
	ef_region_qjob_buttonbar.buttonData = [["f2",getI18nMessages("label.query","查询")]];
	ef_region_qjob_buttonbar.paint("ef_region_qjob");
	efregion.show("ef_region_rjob");
	var ef_region_rjob_buttonbar = new efbuttonbar();
	ef_region_rjob_buttonbar.buttonCount = 5;
	ef_region_rjob_buttonbar.buttonData = [["f3",getI18nMessages("label.add","新增")],["f4",getI18nMessages("label.edit","编辑")],["f5",getI18nMessages("label.delete","删除")],["f6",getI18nMessages("label.EJAsynExecute","异步执行")],["f7",getI18nMessages("label.EJCleanAllTriggers","清除所有触发器")]];
	ef_region_rjob_buttonbar.paint("ef_region_rjob");
	show_link_button();
}	

