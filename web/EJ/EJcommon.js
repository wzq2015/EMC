have_check = function(gridId){
	var grid = efgrid.getGridObject( gridId );
 	var rows = grid.getCheckedRows();
 	if(rows.length>0){
 		return true;
 	}else{
 		return false;
 	}
}

check_newLine = function(gridId) {
	var grid = efgrid.getGridObject( gridId );
 	var rows = grid.getCheckedRows();
 	for ( var i = 0; i < rows.length; i++ ) {
	 	if(grid.isNewLine(rows[i])==1){
	  		return true;
	  	}
	}
	return false;
}

show_link_button = function ()
{
	efregion.show("ef_region_link");
	var ef_region_link_buttonbar = new efbuttonbar();
	ef_region_link_buttonbar.buttonCount = 5;
	ef_region_link_buttonbar.buttonData = [["b1",getI18nMessages("label.EJJobManagerPage","任务管理页面")],["b2",getI18nMessages("label.EJTriggerManagerPage","任务触发器定义页面")],["b3",getI18nMessages("label.EJRunningJobManagerPage","当前运行任务页面")],["b4",getI18nMessages("label.EJScheduleStatusManagerPage","任务调度器状态页面")],["b5",getI18nMessages("label.EJJobLogPage","任务日志页面")]];
	ef_region_link_buttonbar.paint("ef_region_link");
}	

button_b1_onclick = function () 
{
	window.location.href="DispatchAction.do?efFormEname=EJ10&serviceName=iplat4j_JobService&methodName=jobList";
}

button_b2_onclick = function () 
{
	window.location.href="DispatchAction.do?efFormEname=EJ11&serviceName=iplat4j_JobService&methodName=triggerList";
}

button_b3_onclick = function () 
{
	window.location.href="DispatchAction.do?efFormEname=EJ12&serviceName=iplat4j_JobService&methodName=jobRunList";
}

button_b4_onclick = function () 
{
	window.location.href="DispatchAction.do?efFormEname=EJ13&serviceName=iplat4j_JobService&methodName=scheduleStatus";
}

button_b5_onclick = function () 
{
	window.location.href="DispatchAction.do?efFormEname=EJ14&serviceName=iplat4j_JobService&methodName=jobLogList";
}