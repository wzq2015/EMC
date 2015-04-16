button_f2_onclick = function () 
{
	document.getElementById("efFormEname").value ='EJ11' ;
	document.getElementById("serviceName").value = 'iplat4j_JobService';
	efgrid.submitInqu( "ef_grid_rjobrun", "","iplat4j_JobService","jobRunList");
}

button_f5_onclick = function () 
{
	if(have_check("ef_grid_rjobrun")){
		if(confirm(getI18nMessages("label.EJConfirmStopSelectedJob","确实要停止选中任务?"))){
		  document.getElementById("efFormEname").value ='EJ12' ;
		  document.getElementById("serviceName").value = 'iplat4j_JobService';
  		  efgrid.submitForm( "ef_grid_rjobrun", "","iplat4j_JobService","jobRunCancel", true );
		}
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}

efgrid_onAjaxSubmitSuccess = function(gridId, service_name, method_name, eiInfo)
{
	if(method_name=="jobRunList"){
		var ef_grid = efform.getGrid( gridId );	 
  	ef_grid.refresh( eiInfo );
	}else{
	   if ( eiInfo.getMsg() != null )
		  alert(eiInfo.getMsg());
		button_f2_onclick();
	}
}	

efform_onload = function ()
{
	efform.setPageTitle("EJ12/"+getI18nMessages("label.EJRunningJobManagerPage","当前运行任务页面"));
	efregion.show("ef_region_qjobrun");
	var ef_region_qjobrun_buttonbar = new efbuttonbar();
	ef_region_qjobrun_buttonbar.buttonCount = 1;
	ef_region_qjobrun_buttonbar.buttonData = [["f2",getI18nMessages("label.query","查询")]];
	ef_region_qjobrun_buttonbar.paint("ef_region_qjobrun");
	efregion.show("ef_region_rjobrun");
	var ef_region_rjobrun_buttonbar = new efbuttonbar();
	ef_region_rjobrun_buttonbar.buttonCount = 1;
	ef_region_rjobrun_buttonbar.buttonData = [["f5",getI18nMessages("label.EJStopJob","停止任务")]];
	ef_region_rjobrun_buttonbar.paint("ef_region_rjobrun");
	show_link_button();
}	
