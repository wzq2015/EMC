button_f2_onclick = function () 
{
	if(confirm(getI18nMessages("label.EJConfirmRestartSchedule","确实要重启任务调度器?"))){
		var info = new EiInfo(); 
	  EiCommunicator.send( "iplat4j_JobService", "scheduleStart", info, ajax_action_callback  );   
	}	
}
button_f3_onclick = function () 
{
	if(confirm(getI18nMessages("label.EJConfirmPauseSchedule","确实要暂停任务调度器?"))){
		var info = new EiInfo(); 
	  EiCommunicator.send( "iplat4j_JobService", "scheduleStandby", info, ajax_action_callback  );   	
	}
}
button_f4_onclick = function () 
{
	if(confirm(getI18nMessages("label.EJConfirmStopSchedule","确实要停止任务调度器?"))){
		var info = new EiInfo(); 
  	EiCommunicator.send( "iplat4j_JobService", "scheduleShutdown", info, ajax_action_callback  );   
  }	
}
button_f5_onclick = function () 
{
	if(confirm(getI18nMessages("label.EJConfirmStopSchedule","确实要停止任务调度器?"))){
		var info = new EiInfo(); 
		info.set("waitJobComplete","true");
  	EiCommunicator.send( "iplat4j_JobService", "scheduleShutdown", info, ajax_action_callback  );   
  }	
}
button_f6_onclick = function () 
{
	window.location="DispatchAction.do?efFormEname=EJ13&serviceName=iplat4j_JobService&methodName=scheduleStatus";
}

var ajax_action_callback = {
  onSuccess : 
    function(eiInfo){  
			alert(eiInfo.getMsg());
			button_f6_onclick();
    },
  onFail    : 
    function(eMsg) {
      alert(eiInfo.getMsg());
    }
}


efform_onload = function ()
{
	efform.setPageTitle("EJ13/"+getI18nMessages("label.EJScheduleStatusManagerPage","任务调度器状态页面"));
	efregion.show("ef_region_job");
	var ef_region_job_buttonbar = new efbuttonbar();
	ef_region_job_buttonbar.buttonCount = 2;
	//ef_region_job_buttonbar.buttonData = [["F2","启动"],["F3","暂停"],["F4","停止"],["F5","等待任务完成停止"]];
	ef_region_job_buttonbar.buttonData = [["F2",getI18nMessages("label.EJStart","启动")],["F3",getI18nMessages("label.EJPause","暂停")]];
	ef_region_job_buttonbar.paint("ef_region_job");
	show_link_button();
}	
