button_f2_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_rjoblog", "","iplat4j_JobService","jobLogList");
}

button_f5_onclick = function () 
{
	if(have_check("ef_grid_rjoblog")){
		if(confirm(getI18nMessages("label.EJConfirmDeleteRecord","确实要删除记录?"))){
		  efgrid.submitForm( "ef_grid_rjoblog", "","iplat4j_JobService","jobLogDelete", true );
		}
	}else{
		alert(getI18nMessages("label.EJNoRecordSelected","未选中记录！"));
	}
}


efgrid_onAjaxSubmitSuccess = function(gridId, service_name, method_name, eiInfo)
{
	if(method_name=="jobLogList"){
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
	efform.setPageTitle("EJ14/"+getI18nMessages("label.EJJobLogPage","任务日志页面"));
	efregion.show("ef_region_qjoblog");
	var ef_region_qjoblog_buttonbar = new efbuttonbar();
	ef_region_qjoblog_buttonbar.buttonCount = 1;
	ef_region_qjoblog_buttonbar.buttonData = [["f2",getI18nMessages("label.query","查询")]];
	ef_region_qjoblog_buttonbar.paint("ef_region_qjoblog");
	efregion.show("ef_region_rjoblog");
	var ef_region_rjoblog_buttonbar = new efbuttonbar();
	ef_region_rjoblog_buttonbar.buttonCount = 1;
	ef_region_rjoblog_buttonbar.buttonData = [["f5",getI18nMessages("label.EJDeleteLog","删除日志")]];
	ef_region_rjoblog_buttonbar.paint("ef_region_rjoblog");
	show_link_button();
}	
